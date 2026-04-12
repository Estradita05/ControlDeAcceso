from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security.auth import verificar_rol_guardia
from app.models.usuario import Usuario
from app.models.acceso import Acceso
from app.models.vehiculo import Vehiculo
from app.models.acceso_provisional import AccesoProvisional
from pydantic import BaseModel

router = APIRouter(prefix="/accesos/web", tags=["Guardia - Accesos"])

class AprobarProvisionalData(BaseModel):
    estado: str # "Aprobado" o "Rechazado"

# Historial global de todos los usuarios
@router.get("/historial")
def historial_global(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    # Devuelve los accesos más recientes
    accesos = db.query(Acceso).order_by(Acceso.id.desc()).limit(100).all()
    return accesos

# Ver accesos provisionales pendientes
@router.get("/provisionales/pendientes")
def provisionales_pendientes(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    pendientes = db.query(AccesoProvisional).filter(AccesoProvisional.estado == "Pendiente").all()
    return pendientes

@router.put("/provisionales/{id}")
def actualizar_provisional(id: int, data: AprobarProvisionalData, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    prov = db.query(AccesoProvisional).filter(AccesoProvisional.id == id).first()
    if not prov:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    
    prov.estado = data.estado
    db.commit()
    db.refresh(prov)
    return {"mensaje": f"Acceso {data.estado.lower()}"}

@router.get("/dashboard/estadisticas")
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

class MotivoData(BaseModel):
    motivo: str

@router.delete("/{id}")
def eliminar_acceso(id: int, data: MotivoData, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    acceso = db.query(Acceso).filter(Acceso.id == id).first()
    if not acceso:
        raise HTTPException(status_code=404, detail="Acceso no encontrado")
    
    if not data.motivo or not data.motivo.strip():
        raise HTTPException(status_code=400, detail="El motivo de anulación es obligatorio")
        
    print(f"[AUDITORÍA] El guardia {user.get('sub')} anuló el acceso ID {id}. Motivo: {data.motivo}")
    
    # Soft Delete
    acceso.estado = "Anulado"
    db.commit()
    db.refresh(acceso)
    
    return {"mensaje": "Acceso anulado correctamente", "acceso_id": id}
