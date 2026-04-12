from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db
from app.security.auth import verificar_rol_guardia
from app.models.usuario import Usuario
from app.models.vehiculo import Vehiculo
from pydantic import BaseModel
from app.websockets_manager import manager

router = APIRouter(prefix="/vehiculos/web", tags=["Guardia - Vehículos"])

class VehiculoAdminCreate(BaseModel):
    usuario_id: str  # En el frontend web, esto es la matrícula del alumno
    placa: str
    modelo: str
    color: str

# Registrar vehículo por administrador
@router.post("/nuevo")
async def registrar_vehiculo_admin(data: VehiculoAdminCreate, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    # Buscar el ID interno del usuario por su matrícula
    alumno = db.query(Usuario).filter(Usuario.matricula == data.usuario_id).first()
    
    if not alumno:
        raise HTTPException(
            status_code=404, 
            detail=f"No se encontró ningún alumno con la matrícula {data.usuario_id}"
        )
    
    try:
        nuevo_vehiculo = Vehiculo(
            placa=data.placa,
            modelo=data.modelo,
            color=data.color,
            usuario_id=alumno.id
        )
        db.add(nuevo_vehiculo)
        db.commit()
        db.refresh(nuevo_vehiculo)
        
        # Notificar vía WebSocket si es necesario
        await manager.broadcast({
            "event": "nuevo_vehiculo",
            "data": {
                "id": nuevo_vehiculo.id,
                "placa": nuevo_vehiculo.placa,
                "usuario_id": data.usuario_id
            }
        })
        
        return {
            "mensaje": "Vehículo registrado exitosamente",
            "vehiculo": {
                "id": nuevo_vehiculo.id,
                "placa": nuevo_vehiculo.placa,
                "propietario": alumno.nombre
            }
        }
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="La placa ya está registrada en el sistema")

# Ver todos los vehículos (Global)
@router.get("/todos")
def ver_todos_vehiculos(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    vehiculos = db.query(Vehiculo).all()
    return vehiculos

class MotivoData(BaseModel):
    motivo: str

@router.delete("/{id}")
def eliminar_vehiculo(id: int, data: MotivoData, user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.id == id).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
        
    if not data.motivo or not data.motivo.strip():
        raise HTTPException(status_code=400, detail="El motivo de eliminación es obligatorio")
        
    print(f"[AUDITORÍA] El guardia {user.get('sub')} eliminó el vehículo con placas {vehiculo.placa}. Motivo: {data.motivo}")
    
    # Delete real
    db.delete(vehiculo)
    db.commit()
    
    return {"mensaje": "Vehículo eliminado correctamente"}
