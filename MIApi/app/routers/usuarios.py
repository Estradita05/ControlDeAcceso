from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from typing import Optional
from app.security.auth import verificar_token
from app.security.hashing import get_password_hash
from pydantic import BaseModel

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

class UsuarioCreate(BaseModel):
    matricula: str
    nombre: str
    email: str
    password: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    password: Optional[str] = None

@router.post("/registro", status_code=status.HTTP_201_CREATED)
def registrar_usuario(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(Usuario).filter(Usuario.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    hashed_password = get_password_hash(user_data.password)
    nuevo_usuario = Usuario(
        matricula=user_data.matricula,
        nombre=user_data.nombre,
        email=user_data.email,
        password=hashed_password
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    
    return {"mensaje": "Usuario registrado exitosamente", "id": nuevo_usuario.id}

@router.get("/perfil")
def perfil(user=Depends(verificar_token), db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.email == user["sub"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return {
        "mensaje": "Acceso permitido",
        "usuario": {
            "id": db_user.id,
            "matricula": db_user.matricula,
            "nombre": db_user.nombre,
            "email": db_user.email
        }
    }

@router.put("/perfil")
def actualizar_perfil(data: UsuarioUpdate, user=Depends(verificar_token), db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.email == user["sub"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    if data.nombre:
        db_user.nombre = data.nombre
    if data.password:
        db_user.password = get_password_hash(data.password)
        
    db.commit()
    db.refresh(db_user)
    
    return {"mensaje": "Perfil actualizado exitosamente"}