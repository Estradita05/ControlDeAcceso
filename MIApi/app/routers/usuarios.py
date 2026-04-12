from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from typing import Optional
from app.security.auth import verificar_rol_alumno, verificar_rol_guardia
from app.security.hashing import get_password_hash
from pydantic import BaseModel

router = APIRouter(prefix="/usuarios", tags=["Alumno - Usuarios"])



class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    foto_perfil: Optional[str] = None


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

