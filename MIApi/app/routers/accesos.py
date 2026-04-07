from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security.auth import verificar_rol_alumno, verificar_rol_guardia
from app.models.usuario import Usuario
from app.models.acceso import Acceso
from app.models.vehiculo import Vehiculo
from pydantic import BaseModel
from datetime import datetime
from app.websockets_manager import manager
router = APIRouter(prefix="/accesos", tags=["Accesos"])

class AccesoData(BaseModel):
    tipo: str

def get_current_user_id(db: Session, email: str):
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user.id

# Registrar Entrada Salida (Mobile App)
@router.post("/registro")
async def registrar(data: AccesoData, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
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
    
    await manager.broadcast({
        "event": "nuevo_acceso",
        "data": {
            "id": nuevo_acceso.id,
            "usuario_id": user_id,
            "tipo": nuevo_acceso.tipo,
            "fecha": nuevo_acceso.fecha,
            "hora": nuevo_acceso.hora,
            "estado": nuevo_acceso.estado
        }
    })

    return {
        "mensaje": "Acceso registrado",
        "acceso": nuevo_acceso
    }

# Ver Historial
@router.get("/historial")
def historial(user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    accesos = db.query(Acceso).filter(Acceso.usuario_id == user_id).all()
    return accesos

# Estado Actual
@router.get("/estado")
def estado_actual(user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
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
def registrar_provisional(data: AccesoProvisionalData, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
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

# ==========================================
# RUTAS PARA GUARDIAS / ADMINISTRADORES
# ==========================================

# Historial global de todos los usuarios
@router.get("/web/historial")
def historial_global(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    # Devuelve los accesos más recientes
    accesos = db.query(Acceso).order_by(Acceso.id.desc()).limit(100).all()
    return accesos

# Ver accesos provisionales pendientes
@router.get("/web/provisionales/pendientes")
def provisionales_pendientes(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    pendientes = db.query(AccesoProvisional).filter(AccesoProvisional.estado == "Pendiente").all()
    return pendientes

class AprobarProvisionalData(BaseModel):
    estado: str # "Aprobado" o "Rechazado"

@router.put("/web/provisionales/{id}")
def actualizar_provisional(id: int, data: AprobarProvisionalData, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    prov = db.query(AccesoProvisional).filter(AccesoProvisional.id == id).first()
    if not prov:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    
    prov.estado = data.estado
    db.commit()
    db.refresh(prov)
    return {"mensaje": f"Acceso {data.estado.lower()}"}

@router.get("/web/dashboard/estadisticas")
def dashboard_estadisticas(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    total_personas = db.query(Usuario).count()
    total_vehiculos = db.query(Vehiculo).count()
    accesos_permitidos = db.query(Acceso).filter(Acceso.estado == "Permitido").count()
    accesos_denegados = db.query(Acceso).filter(Acceso.estado == "Denegado").count()

    return {
        "total_personas": total_personas,
        "total_vehiculos": total_vehiculos,
        "accesos_permitidos": accesos_permitidos,
        "accesos_denegados": accesos_denegados
    }