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
router = APIRouter(prefix="/accesos", tags=["Usuario - Accesos"])

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

    # Validar el último acceso del usuario
    ultimo_acceso = db.query(Acceso).filter(Acceso.usuario_id == user_id).order_by(Acceso.id.desc()).first()
    tipo_solicitado = data.tipo.strip().lower()

    if tipo_solicitado == "entrada":
        # Evitar entrada doble: El último registro no puede ser de tipo 'entrada'
        if ultimo_acceso and ultimo_acceso.tipo.lower() == "entrada":
            raise HTTPException(status_code=400, detail="Inconsistencia: Ya existe una entrada activa. Debes registrar tu salida primero.")
    elif tipo_solicitado == "salida":
        # Evitar salida sin entrada: Debe existir un registro previo y además debe ser de tipo 'entrada'
        if not ultimo_acceso or ultimo_acceso.tipo.lower() == "salida":
            raise HTTPException(status_code=400, detail="Inconsistencia: No puedes registrar la salida sin una entrada previa activa.")
    else:
        raise HTTPException(status_code=400, detail="Tipo de acceso inválido. Debe ser 'Entrada' o 'Salida'.")

    nuevo_acceso = Acceso(
        usuario_id=user_id,
        tipo=data.tipo.capitalize(), # Guarda con mayúscula inicial
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



