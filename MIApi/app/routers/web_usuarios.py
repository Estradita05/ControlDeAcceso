from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.security.auth import verificar_rol_guardia
from app.models.usuario import Usuario
from app.models.administradores import Administrador
from app.security.hashing import get_password_hash
from pydantic import BaseModel, Field

router = APIRouter(prefix="/usuarios/web", tags=["Guardia - Usuarios"])

# Buscar usuario por matrícula
@router.get("/buscar/{matricula}")
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

class UsuarioCreate(BaseModel):
    matricula: str
    nombre: str
    email: str
    password: str

@router.post("/nuevo", status_code=status.HTTP_201_CREATED)
def registrar_usuario(user_data: UsuarioCreate, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
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

class GuardiaCreate(BaseModel):
    nombre: str
    correo: str = Field(..., pattern=r"^100\d{2}@guardia\.edu\.mx$")
    password: str

@router.post("/admin/nuevo", status_code=status.HTTP_201_CREATED)
def registrar_guardia(admin_data: GuardiaCreate, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    existing_admin = db.query(Administrador).filter(Administrador.correo == admin_data.correo).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="El correo de guardia ya está registrado")
    
    nuevo_admin = Administrador(
        nombre=admin_data.nombre,
        correo=admin_data.correo,
        contraseña=get_password_hash(admin_data.password)
    )
    db.add(nuevo_admin)
    db.commit()
    db.refresh(nuevo_admin)
    
    return {"mensaje": "Guardia registrado exitosamente", "id_admin": nuevo_admin.id_admin}
