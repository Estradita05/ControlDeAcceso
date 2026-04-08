from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db
from app.security.auth import verificar_rol_alumno, verificar_rol_guardia
from app.models.usuario import Usuario
from app.models.vehiculo import Vehiculo
from pydantic import BaseModel
from app.websockets_manager import manager
router = APIRouter(prefix="/vehiculos", tags=["Vehículos"])

class VehiculoData(BaseModel):
    placa: str
    modelo: str
    color: str

def get_current_user_id(db: Session, email: str):
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user.id

# Ver Vehículos Del Usuario
@router.get("")
def listar(user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    vehiculos = db.query(Vehiculo).filter(Vehiculo.usuario_id == user_id).all()
    return vehiculos

# Agregar Vehículo
@router.post("")
async def agregar(data: VehiculoData, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    
    try:
        nuevo_vehiculo = Vehiculo(
            placa=data.placa,
            modelo=data.modelo,
            color=data.color,
            usuario_id=user_id
        )
        db.add(nuevo_vehiculo)
        db.commit()
        db.refresh(nuevo_vehiculo)
        
        await manager.broadcast({
            "event": "nuevo_vehiculo",
            "data": {
                "id": nuevo_vehiculo.id,
                "placa": nuevo_vehiculo.placa,
                "modelo": nuevo_vehiculo.modelo,
                "color": nuevo_vehiculo.color
            }
        })
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="El vehículo con esta placa ya está registrado")

    return {
        "mensaje": "Vehículo agregado",
        "vehiculo": nuevo_vehiculo
    }

# Editar Vehículo
@router.put("/{id}")
def editar(id: int, data: VehiculoData, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    vehiculo = db.query(Vehiculo).filter(Vehiculo.id == id, Vehiculo.usuario_id == user_id).first()
    
    if not vehiculo:
        return {"error": "Vehículo no encontrado"}
        
    vehiculo.placa = data.placa if data.placa else vehiculo.placa
    vehiculo.modelo = data.modelo if data.modelo else vehiculo.modelo
    vehiculo.color = data.color if data.color else vehiculo.color
    
    db.commit()
    db.refresh(vehiculo)
    
    return {"mensaje": "Vehículo actualizado", "vehiculo": vehiculo}

# Eliminar Vehículo
@router.delete("/{id}")
def eliminar(id: int, user=Depends(verificar_rol_alumno), db: Session = Depends(get_db)):
    user_id = get_current_user_id(db, user["sub"])
    vehiculo = db.query(Vehiculo).filter(Vehiculo.id == id, Vehiculo.usuario_id == user_id).first()
    
    if not vehiculo:
        return {"error": "Vehículo no encontrado"}
        
    db.delete(vehiculo)
    db.commit()
    
    return {"mensaje": "Vehículo eliminado"}

# ==========================================
# RUTAS PARA GUARDIAS / ADMINISTRADORES
# ==========================================

class VehiculoAdminCreate(BaseModel):
    usuario_id: str  # En el frontend web, esto es la matrícula del alumno
    placa: str
    modelo: str
    color: str

# Registrar vehículo por administrador
@router.post("/web/nuevo")
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
@router.get("/web/todos")
def ver_todos_vehiculos(user=Depends(verificar_rol_guardia), db: Session = Depends(get_db)):
    vehiculos = db.query(Vehiculo).all()
    # Podríamos mapear para incluir nombre del alumno si el modelo tiene relationship
    return vehiculos

