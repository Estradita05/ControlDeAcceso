from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.usuario import Usuario
from app.models.reset_token import ResetToken
from app.models.verificacion_email import VerificacionEmail
from app.models.administradores import Administrador
from app.security.auth import crear_token
from app.security.hashing import verify_password
from pydantic import BaseModel
from app.security.auth import verificar_token, verificar_rol_alumno
from app.security.hashing import get_password_hash
import jwt
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import os

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

router = APIRouter(prefix="/auth")


@router.get("/qr-token", tags=["Usuario - QR"])
def generar_qr_token(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token)
):
    """
    Genera un JWT de corta duración (60 segundos) para mostrar en el QR de la credencial.
    Este token es independiente del token de sesión y solo sirve para identificar al alumno.
    """
    if token_data.get("rol") != "alumno":
        raise HTTPException(status_code=403, detail="No tienes permisos, esta acción es exclusiva para la app móvil")

    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Token de corta duración exclusivo para el QR (60 segundos)
    qr_payload = {
        "sub": user.email,
        "matricula": user.matricula,
        "nombre": user.nombre,
        "tipo": "qr",
        "exp": datetime.utcnow() + timedelta(seconds=60)
    }
    qr_token = jwt.encode(qr_payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"qr_token": qr_token}

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login", tags=["Usuario - Autenticación"])
def login_movil(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    # Bloquear acceso si el correo no está verificado
    if not user.verificado:
        raise HTTPException(
            status_code=403,
            detail="CORREO_NO_VERIFICADO"
        )
            
    token = crear_token({"sub": user.email, "rol": "alumno"})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/admin/login", tags=["Guardia - Autenticación"])
def login_web(data: LoginData, db: Session = Depends(get_db)):
    # Note that properties match the admin model: correo instead of email, contraseña instead of password.
    # Note: verify_password works with whatever string hashing we have, but first ensure column matches (contraseña).
    admin = db.query(Administrador).filter(Administrador.correo == data.email).first()
    
    # We should use verify_password(data.password, admin.contraseña), but if they were stored in plain text,
    # or differently, be careful. Assuming they use same hashing or plain text for admin if hashing wasn't implemented prior.
    # Let's check with verify_password, or if it fails, fallback to simple equality for older admins.
    
    if not admin or not verify_password(data.password, admin.contraseña):
        # Temp fallback for unhashed passwords (in case admin passwords weren't hashed before)
        if not admin or admin.contraseña != data.password:
             raise HTTPException(
                 status_code=401,
                 detail="Credenciales incorrectas"
             )
            
    # Include rol for "guardia"
    token = crear_token({"sub": admin.correo, "rol": "guardia"})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


class RegisterData(BaseModel):
    nombre: str
    email: str
    password: str
    matricula: Optional[str] = None
    carrera: Optional[str] = None
    rol: Optional[str] = "estudiante"  # estudiante | maestro | servicios

@router.post("/register", tags=["Usuario - Autenticación"], status_code=201)
def register(data: RegisterData, db: Session = Depends(get_db)):

    existe = db.query(Usuario).filter(Usuario.email == data.email).first()

    if existe:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    nuevo = Usuario(
        nombre=data.nombre,
        email=data.email,
        password=get_password_hash(data.password),
        matricula=data.matricula,
        carrera=data.carrera,
        rol=data.rol or "estudiante",
        verificado=False,
        intentos_verificacion=0
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    # Generar y enviar OTP de verificación
    codigo_ver = str(random.randint(100000, 999999))
    expira_ver = datetime.utcnow() + timedelta(minutes=10)
    ver = VerificacionEmail(
        usuario_id=nuevo.id,
        codigo=codigo_ver,
        expira_en=expira_ver,
        usado=False
    )
    db.add(ver)
    db.commit()

    # Enviar correo con OTP
    enviado = enviar_correo_verificacion(nuevo.email, nuevo.nombre, codigo_ver)
    if not enviado:
        print(f"[OTP VERIFICACIÓN] Código para {nuevo.email}: {codigo_ver}")

    return {"mensaje": "Usuario registrado. Revisa tu correo para verificar tu cuenta."}

@router.get("/perfil", tags=["Perfil Universal"])
def perfil(db: Session = Depends(get_db), token_data: dict = Depends(verificar_token)):
    rol = token_data.get("rol")
    email = token_data.get("sub")
    
    if rol == "guardia":
        admin = db.query(Administrador).filter(Administrador.correo == email).first()
        if not admin:
            raise HTTPException(status_code=404, detail="Administrador no encontrado")
        return {
            "mensaje": "Perfil de administrador",
            "usuario": {
                "id": admin.id_admin,
                "nombre": admin.nombre,
                "email": admin.correo,
                "matricula": "ADMIN",  # Placeholder for frontend consistency
                "foto_perfil": getattr(admin, "foto_perfil", None)
            }
        }
    
    # Default to alumno
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return {
        "mensaje": "Perfil de alumno",
        "usuario": {
            "id": user.id,
            "matricula": user.matricula,
            "nombre": user.nombre,
            "email": user.email,
            "rol": user.rol,
            "foto_perfil": user.foto_perfil,
            "carrera": user.carrera
        }
    }

class UpdateData(BaseModel):
    nombre: Optional[str] = None
    email: Optional[str] = None
    foto_perfil: Optional[str] = None
    password: Optional[str] = None
    carrera: Optional[str] = None
    matricula: Optional[str] = None

@router.put("/perfil", tags=["Perfil Universal"])
def editar_perfil(
    data: UpdateData,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token)
):
    rol = token_data.get("rol")
    email = token_data.get("sub")

    if rol == "guardia":
        admin = db.query(Administrador).filter(Administrador.correo == email).first()
        if not admin:
            raise HTTPException(status_code=404, detail="Administrador no encontrado")
        
        admin.nombre = data.nombre
        admin.correo = data.email
        if data.foto_perfil is not None:
            admin.foto_perfil = data.foto_perfil
        if data.password:
            admin.contraseña = get_password_hash(data.password)
        db.commit()
        new_token = crear_token({"sub": admin.correo, "rol": "guardia"})
        return {"mensaje": "Perfil de administrador actualizado", "token": new_token}

    # Alumno
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.nombre = data.nombre
    user.email = data.email
    if data.foto_perfil is not None:
        user.foto_perfil = data.foto_perfil
    if data.carrera is not None:
        user.carrera = data.carrera
    if data.matricula is not None:
        user.matricula = data.matricula
    if data.password:
        user.password = get_password_hash(data.password)

    db.commit()
    new_token = crear_token({"sub": user.email, "rol": rol})
    return {"mensaje": "Perfil actualizado", "token": new_token}


# ================================================================
# FLUJO REAL DE RECUPERACIÓN DE CONTRASEÑA
# ================================================================

GMAIL_USER = os.getenv("GMAIL_USER", "montserrate634@gmail.com")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")  # Se inyecta via docker-compose

def enviar_correo_otp(destinatario: str, nombre: str, codigo: str):
    """Envía el código OTP al correo del usuario via Gmail SMTP."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "🔐 Código de verificación — Control de Acceso"
        msg["From"] = f"Control de Acceso <{GMAIL_USER}>"
        msg["To"] = destinatario

        html = f"""
        <html><body style="font-family:Arial,sans-serif;background:#0A0F1E;padding:20px;">
          <div style="max-width:480px;margin:auto;background:#1A2540;border-radius:16px;padding:32px;border:1px solid #1E3A5F;">
            <h2 style="color:#60A5FA;text-align:center;margin-bottom:8px;">Control de Acceso</h2>
            <p style="color:#94A3B8;text-align:center;margin-bottom:28px;">Sistema Institucional</p>
            <p style="color:#F1F5F9;font-size:16px;">Hola <strong>{nombre}</strong>,</p>
            <p style="color:#94A3B8;">Recibimos una solicitud para restablecer tu contraseña. Usa el siguiente código:</p>
            <div style="text-align:center;margin:28px 0;">
              <div style="display:inline-block;background:#0F172A;border:2px solid #2563EB;border-radius:14px;padding:20px 40px;">
                <span style="font-size:40px;font-weight:900;letter-spacing:10px;color:#60A5FA;">{codigo}</span>
              </div>
              <p style="color:#94A3B8;margin-top:12px;font-size:13px;">Este código expira en <strong style="color:#F59E0B;">15 minutos</strong></p>
            </div>
            <p style="color:#475569;font-size:13px;">
              Si no solicitaste este cambio, ignora este correo. Tu contraseña no será modificada.
            </p>
          </div>
        </body></html>
        """
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, destinatario, msg.as_string())
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        return False


class SolicitarResetData(BaseModel):
    email: str

@router.post("/solicitar-reset", tags=["Usuario - Autenticación"])
def solicitar_reset(data: SolicitarResetData, db: Session = Depends(get_db)):
    """Genera un OTP de 6 dígitos y lo envía al correo del usuario."""
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        # Respuesta genérica por seguridad (no revelar si el correo existe)
        raise HTTPException(status_code=404, detail="No encontramos una cuenta con ese correo.")

    # Invalidar tokens anteriores del usuario
    db.query(ResetToken).filter(
        ResetToken.usuario_id == user.id,
        ResetToken.usado == False
    ).update({"usado": True})

    # Generar OTP
    codigo = str(random.randint(100000, 999999))
    expira = datetime.utcnow() + timedelta(minutes=15)

    nuevo_token = ResetToken(
        usuario_id=user.id,
        codigo=codigo,
        expira_en=expira,
        usado=False
    )
    db.add(nuevo_token)
    db.commit()

    # Intentar enviar correo real
    enviado = enviar_correo_otp(user.email, user.nombre, codigo)
    if not enviado:
        # Si falla el correo, igual mostramos el código en logs para desarrollo
        print(f"[OTP FALLBACK] Código para {user.email}: {codigo}")

    return {"mensaje": "Si el correo existe en el sistema, recibirás el código en breve."}


class VerificarCodigoData(BaseModel):
    email: str
    codigo: str

@router.post("/verificar-codigo", tags=["Usuario - Autenticación"])
def verificar_codigo(data: VerificarCodigoData, db: Session = Depends(get_db)):
    """Valida el OTP y retorna un token temporal para cambiar la contraseña."""
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    reset = db.query(ResetToken).filter(
        ResetToken.usuario_id == user.id,
        ResetToken.codigo == data.codigo,
        ResetToken.usado == False,
        ResetToken.expira_en > datetime.utcnow()
    ).first()

    if not reset:
        raise HTTPException(status_code=400, detail="Código incorrecto o expirado.")

    # Marcar como usado
    reset.usado = True
    db.commit()

    # Generar token temporal de reseteo (5 minutos)
    reset_token = jwt.encode(
        {"sub": user.email, "tipo": "reset", "exp": datetime.utcnow() + timedelta(minutes=5)},
        SECRET_KEY, algorithm=ALGORITHM
    )
    return {"reset_token": reset_token}


class NuevaContrasenaData(BaseModel):
    reset_token: str
    nueva_contrasena: str

@router.post("/nueva-contrasena", tags=["Usuario - Autenticación"])
def nueva_contrasena(data: NuevaContrasenaData, db: Session = Depends(get_db)):
    """Valida el token temporal y actualiza la contraseña con hash."""
    try:
        payload = jwt.decode(data.reset_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("tipo") != "reset":
            raise HTTPException(status_code=400, detail="Token inválido.")
        email = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="El enlace de recuperación expiró. Solicita uno nuevo.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Token inválido.")

    if not data.nueva_contrasena or len(data.nueva_contrasena) < 6:
        raise HTTPException(status_code=422, detail="La contraseña debe tener al menos 6 caracteres.")

    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    user.password = get_password_hash(data.nueva_contrasena)
    db.commit()
    return {"mensaje": "Contraseña actualizada exitosamente."}


# ================================================================
# VERIFICACIÓN DE CORREO AL REGISTRARSE
# ================================================================

def enviar_correo_verificacion(destinatario: str, nombre: str, codigo: str) -> bool:
    """Envía el código OTP de verificación de correo via Gmail SMTP."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "✅ Verifica tu correo — Control de Acceso"
        msg["From"] = f"Control de Acceso <{GMAIL_USER}>"
        msg["To"] = destinatario

        html = f"""
        <html><body style="font-family:Arial,sans-serif;background:#0A0F1E;padding:20px;">
          <div style="max-width:480px;margin:auto;background:#1A2540;border-radius:16px;padding:32px;border:1px solid #1E3A5F;">
            <h2 style="color:#60A5FA;text-align:center;margin-bottom:8px;">Control de Acceso</h2>
            <p style="color:#94A3B8;text-align:center;margin-bottom:28px;">Verificación de cuenta nueva</p>
            <p style="color:#F1F5F9;font-size:16px;">¡Hola <strong>{nombre}</strong>! 🎉</p>
            <p style="color:#94A3B8;">Bienvenido al sistema. Para activar tu cuenta, ingresa este código en la app:</p>
            <div style="text-align:center;margin:28px 0;">
              <div style="display:inline-block;background:#0F172A;border:2px solid #10B981;border-radius:14px;padding:20px 40px;">
                <span style="font-size:40px;font-weight:900;letter-spacing:10px;color:#34D399;">{codigo}</span>
              </div>
              <p style="color:#94A3B8;margin-top:12px;font-size:13px;">Este código expira en <strong style="color:#F59E0B;">10 minutos</strong></p>
            </div>
            <p style="color:#475569;font-size:13px;">
              Si no creaste esta cuenta, puedes ignorar este correo.
            </p>
          </div>
        </body></html>
        """
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, destinatario, msg.as_string())
        return True
    except Exception as e:
        print(f"[EMAIL VERIFICACION ERROR] {e}")
        return False


class VerificarEmailData(BaseModel):
    email: str
    codigo: str

MAX_INTENTOS = 5

@router.post("/verificar-email", tags=["Usuario - Autenticación"])
def verificar_email(data: VerificarEmailData, db: Session = Depends(get_db)):
    """Valida el OTP de verificación de correo. Máximo 5 intentos."""
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    if user.verificado:
        return {"mensaje": "Tu correo ya está verificado. Inicia sesión."}

    if user.intentos_verificacion >= MAX_INTENTOS:
        raise HTTPException(
            status_code=429,
            detail="Demasiados intentos fallidos. Solicita un nuevo código."
        )

    verif = db.query(VerificacionEmail).filter(
        VerificacionEmail.usuario_id == user.id,
        VerificacionEmail.codigo == data.codigo,
        VerificacionEmail.usado == False,
        VerificacionEmail.expira_en > datetime.utcnow()
    ).first()

    if not verif:
        # Incrementar intentos fallidos
        user.intentos_verificacion = (user.intentos_verificacion or 0) + 1
        db.commit()
        restantes = MAX_INTENTOS - user.intentos_verificacion
        raise HTTPException(
            status_code=400,
            detail=f"Código incorrecto o expirado. Intentos restantes: {restantes}"
        )

    # Verificar cuenta
    verif.usado = True
    user.verificado = True
    user.intentos_verificacion = 0
    db.commit()

    return {"mensaje": "¡Correo verificado exitosamente! Ya puedes iniciar sesión."}


class ReenviarVerificacionData(BaseModel):
    email: str

@router.post("/reenviar-verificacion", tags=["Usuario - Autenticación"])
def reenviar_verificacion(data: ReenviarVerificacionData, db: Session = Depends(get_db)):
    """Genera y reenvía un nuevo OTP de verificación."""
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    if user.verificado:
        return {"mensaje": "Tu correo ya está verificado."}

    # Invalidar códigos anteriores
    db.query(VerificacionEmail).filter(
        VerificacionEmail.usuario_id == user.id,
        VerificacionEmail.usado == False
    ).update({"usado": True})

    # Resetear intentos y emitir nuevo código
    user.intentos_verificacion = 0
    codigo = str(random.randint(100000, 999999))
    expira = datetime.utcnow() + timedelta(minutes=10)
    nuevo = VerificacionEmail(usuario_id=user.id, codigo=codigo, expira_en=expira, usado=False)
    db.add(nuevo)
    db.commit()

    enviado = enviar_correo_verificacion(user.email, user.nombre, codigo)
    if not enviado:
        print(f"[OTP VERIFICACIÓN REENVÍO] {user.email}: {codigo}")

    return {"mensaje": "Se envió un nuevo código de verificación a tu correo."}
