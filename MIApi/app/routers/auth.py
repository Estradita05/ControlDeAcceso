from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from app.security.auth import crear_token
from app.security.hashing import verify_password
from pydantic import BaseModel
from app.security.auth import verificar_token
from app.security.hashing import get_password_hash


router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )
            
    token = crear_token({"sub": user.email})

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
def perfil(user_data: dict = Depends(verificar_token)):
    return user_data

class UpdateData(BaseModel):
    nombre: str
    email: str

@router.put("/perfil")
def editar_perfil(
    data: UpdateData,
    db: Session = Depends(get_db),
    user_data: dict = Depends(verificar_token)
):

    user = db.query(Usuario).filter(
        Usuario.email == user_data["sub"]
    ).first()

    user.nombre = data.nombre
    user.email = data.email

    db.commit()

    return {"mensaje": "Perfil actualizado"}