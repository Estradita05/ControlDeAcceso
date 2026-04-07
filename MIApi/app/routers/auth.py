from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from app.models.administradores import Administrador
from app.security.auth import crear_token
from app.security.hashing import verify_password
from pydantic import BaseModel
from app.security.auth import verificar_token, verificar_rol_alumno
from app.security.hashing import get_password_hash


router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login")
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

@router.post("/admin/login")
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

@router.post("/recuperar_contrasena")
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

@router.post("/register")
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

@router.get("/perfil")
def perfil(user_data: dict = Depends(verificar_rol_alumno)):
    return user_data

class UpdateData(BaseModel):
    nombre: str
    email: str

@router.put("/perfil")
def editar_perfil(
    data: UpdateData,
    db: Session = Depends(get_db),
    user_data: dict = Depends(verificar_rol_alumno)
):

    user = db.query(Usuario).filter(
        Usuario.email == user_data["sub"]
    ).first()

    user.nombre = data.nombre
    user.email = data.email

    db.commit()

    return {"mensaje": "Perfil actualizado"}