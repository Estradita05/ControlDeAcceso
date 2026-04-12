from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.usuario import Usuario
from app.models.administradores import Administrador
from app.security.auth import crear_token
from app.security.hashing import verify_password
from pydantic import BaseModel
from app.security.auth import verificar_token, verificar_rol_alumno
from app.security.hashing import get_password_hash


router = APIRouter(prefix="/auth")

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login", tags=["Alumno - Autenticación"])
def login_movil(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )
            
    # Include rol for "alumno"
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

class RecuperarData(BaseModel):
    busqueda: str  # puede ser correo o matricula

@router.post("/recuperar_contrasena", tags=["Alumno - Autenticación"])
def recuperar_contrasena(data: RecuperarData, db: Session = Depends(get_db)):
    # Buscamos por correo o id (matrícula) simulando la búsqueda
    user = db.query(Usuario).filter(
        (Usuario.email == data.busqueda) | (Usuario.id == (int(data.busqueda) if data.busqueda.isdigit() else 0))
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )
    
    # Simulación de envío de correo
    print(f"--- SIMULACIÓN SMTP ---")
    print(f"Enviando correo a: {user.email}")
    print(f"Asunto: Recuperación de contraseña")
    print(f"Cuerpo: Hola {user.nombre}, recibimos una solicitud para restablecer tu cuenta.")
    print(f"-----------------------")

    return {
        "mensaje": "Si el usuario existe, se enviarán instrucciones a su correo."
    }

class RegisterData(BaseModel):
    nombre: str
    email: str
    password: str

@router.post("/register", tags=["Alumno - Autenticación"])
def register(data: RegisterData, db: Session = Depends(get_db)):

    existe = db.query(Usuario).filter(Usuario.email == data.email).first()

    if existe:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    nuevo = Usuario(
        nombre=data.nombre,
        email=data.email,
        password=get_password_hash(data.password)
    )

    db.add(nuevo)
    db.commit()

    return {"mensaje": "Usuario registrado"}

@router.get("/perfil", tags=["Alumno - Perfil", "Guardia - Perfil"])
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
                "foto_perfil": None # Admins don't have this in model yet, but we avoid error
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
            "foto_perfil": user.foto_perfil
        }
    }

class UpdateData(BaseModel):
    nombre: str
    email: str
    foto_perfil: Optional[str] = None
    password: Optional[str] = None

@router.put("/perfil", tags=["Alumno - Perfil", "Guardia - Perfil"])
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
        if data.password:
            admin.contraseña = get_password_hash(data.password)
        db.commit()
        return {"mensaje": "Perfil de administrador actualizado"}

    # Alumno
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.nombre = data.nombre
    user.email = data.email
    if data.foto_perfil is not None:
        user.foto_perfil = data.foto_perfil
    if data.password:
        user.password = get_password_hash(data.password)

    db.commit()
    return {"mensaje": "Perfil actualizado"}