from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security.auth import verificar_token
from app.models.usuario import Usuario
from app.models.acceso import Acceso
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/accesos", tags=["Accesos"])

class AccesoData(BaseModel):
    tipo: str

def get_current_user_id(db: Session, email: str):
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user.id

# Registrar Entrada Salida
@router.post("/registro")
def registrar(data: AccesoData, user=Depends(verificar_token), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])

    nuevo_acceso = Acceso(
        usuario_id=user_id,
        tipo=data.tipo,
        fecha=datetime.now().strftime("%d/%m/%Y"),
        hora=datetime.now().strftime("%H:%M:%S"),
        estado="Permitido"
    )

    db.add(nuevo_acceso)
    db.commit()
    db.refresh(nuevo_acceso)

    return {
        "mensaje": "Acceso registrado",
        "acceso": nuevo_acceso
    }

# Ver Historial
@router.get("/historial")
def historial(user=Depends(verificar_token), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    accesos = db.query(Acceso).filter(Acceso.usuario_id == user_id).all()
    return accesos

# Estado Actual
@router.get("/estado")
def estado_actual(user=Depends(verificar_token), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    # Obtener el último acceso registrado de este usuario
    ultimo_acceso = db.query(Acceso).filter(Acceso.usuario_id == user_id).order_by(Acceso.id.desc()).first()
    
    if not ultimo_acceso:
        return {"estado": "Afuera", "mensaje": "Sin registros previos"}
        
    # Si el último tipo fue "entrada", está "Adentro", si no, está "Afuera"
    estado_actual = "Adentro" if ultimo_acceso.tipo.lower() == "entrada" else "Afuera"
    
    return {
        "estado": estado_actual,
        "ultimo_registro": ultimo_acceso
    }

from app.models.acceso_provisional import AccesoProvisional

class AccesoProvisionalData(BaseModel):
    matricula: str
    placas: str
    motivo: str
    fechaInicio: str
    fechaFin: str

@router.post("/provisional")
def registrar_provisional(data: AccesoProvisionalData, user=Depends(verificar_token), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])

    nuevo_provisional = AccesoProvisional(
        matricula=data.matricula,
        placas=data.placas,
        motivo=data.motivo,
        fecha_inicio=data.fechaInicio,
        fecha_fin=data.fechaFin,
        estado="Pendiente",
        usuario_id=user_id
    )

    db.add(nuevo_provisional)
    db.commit()
    db.refresh(nuevo_provisional)

    return {
        "mensaje": "Acceso provisional solicitado correctamente",
        "id": nuevo_provisional.id
    }