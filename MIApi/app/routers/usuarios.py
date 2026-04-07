from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from typing import Optional
from app.security.auth import verificar_rol_alumno, verificar_rol_guardia
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
    email: Optional[str] = None
    password: Optional[str] = None
    foto_perfil: Optional[str] = None

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
def perfil(user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.email == user["sub"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return {
        "mensaje": "Acceso permitido",
        "usuario": {
            "id": db_user.id,
            "matricula": db_user.matricula,
            "nombre": db_user.nombre,
            "email": db_user.email,
            "foto_perfil": db_user.foto_perfil
        }
    }

@router.put("/perfil")
def actualizar_perfil(data: UsuarioUpdate, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.email == user["sub"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    # Verificar si el nuevo correo electrónico ya existe
    if data.email and data.email != db_user.email:
        existing_user = db.query(Usuario).filter(Usuario.email == data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo ya se encuentra en uso")
        db_user.email = data.email
        
    if data.nombre:
        db_user.nombre = data.nombre
    if data.password:
        db_user.password = get_password_hash(data.password)
    if data.foto_perfil is not None:
        db_user.foto_perfil = data.foto_perfil
        
    db.commit()
    db.refresh(db_user)
    
    return {"mensaje": "Perfil actualizado exitosamente"}

# ==========================================
# RUTAS PARA GUARDIAS / ADMINISTRADORES
# ==========================================

# Buscar usuario por matrícula
@router.get("/web/buscar/{matricula}")
def buscar_usuario_web(matricula: str, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    # Los guardias pueden consultar a cualquier usuario a través de su matrícula
    db_user = db.query(Usuario).filter(Usuario.matricula == matricula).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    return {
        "id": db_user.id,
        "matricula": db_user.matricula,
        "nombre": db_user.nombre,
        "email": db_user.email,
        "foto_perfil": db_user.foto_perfil
    }