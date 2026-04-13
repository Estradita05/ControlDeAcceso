from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.database import get_db
from app.security.auth import verificar_token
from app.models.solicitud_acceso import SolicitudAcceso
from app.models.notificacion import Notificacion
from app.models.usuario import Usuario
from app.models.vehiculo import Vehiculo

router = APIRouter(prefix="/solicitudes", tags=["Solicitudes de Acceso"])


class SolicitudData(BaseModel):
    placa: str
    marca: Optional[str] = None
    modelo: Optional[str] = None
    color: Optional[str] = None
    motivo: str


class RechazarData(BaseModel):
    motivo_rechazo: str


def _crear_notificacion(db, usuario_id: int, titulo: str, mensaje: str, tipo: str = "info"):
    noti = Notificacion(usuario_id=usuario_id, titulo=titulo, mensaje=mensaje, tipo=tipo)
    db.add(noti)


# ── ALUMNO: crear solicitud ──────────────────────────────────────────────────

@router.post("", status_code=201)
def crear_solicitud(
    data: SolicitudData,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    if not data.placa.strip():
        raise HTTPException(status_code=422, detail="La placa es obligatoria.")
    if not data.motivo.strip():
        raise HTTPException(status_code=422, detail="El motivo es obligatorio.")

    solicitud = SolicitudAcceso(
        usuario_id=user.id,
        placa=data.placa.upper().strip(),
        marca=data.marca,
        modelo=data.modelo,
        color=data.color,
        motivo=data.motivo.strip(),
        estado="PENDIENTE",
    )
    db.add(solicitud)
    db.commit()
    db.refresh(solicitud)

    return {
        "mensaje": "Solicitud enviada. El guardia la revisará a la brevedad.",
        "id": solicitud.id,
        "estado": solicitud.estado,
    }


# ── ALUMNO: mis solicitudes ──────────────────────────────────────────────────

@router.get("/mis-solicitudes")
def mis_solicitudes(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    solicitudes = (
        db.query(SolicitudAcceso)
        .filter(SolicitudAcceso.usuario_id == user.id)
        .order_by(SolicitudAcceso.creado_en.desc())
        .all()
    )

    return [
        {
            "id": s.id,
            "placa": s.placa,
            "marca": s.marca,
            "modelo": s.modelo,
            "color": s.color,
            "motivo": s.motivo,
            "estado": s.estado,
            "motivo_rechazo": s.motivo_rechazo,
            "creado_en": s.creado_en.isoformat() if s.creado_en else None,
        }
        for s in solicitudes
    ]


# ── GUARDIA: ver todas las solicitudes ──────────────────────────────────────

@router.get("")
def todas_solicitudes(
    estado: Optional[str] = None,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    if token_data.get("rol") != "guardia":
        raise HTTPException(status_code=403, detail="Solo el guardia puede ver todas las solicitudes.")

    q = db.query(SolicitudAcceso)
    if estado:
        q = q.filter(SolicitudAcceso.estado == estado.upper())
    solicitudes = q.order_by(SolicitudAcceso.creado_en.desc()).all()

    resultado = []
    for s in solicitudes:
        user = db.query(Usuario).filter(Usuario.id == s.usuario_id).first()
        resultado.append({
            "id": s.id,
            "usuario_id": s.usuario_id,
            "nombre_alumno": user.nombre if user else "—",
            "email_alumno": user.email if user else "—",
            "matricula": user.matricula if user else "—",
            "placa": s.placa,
            "marca": s.marca,
            "modelo": s.modelo,
            "color": s.color,
            "motivo": s.motivo,
            "estado": s.estado,
            "motivo_rechazo": s.motivo_rechazo,
            "creado_en": s.creado_en.isoformat() if s.creado_en else None,
        })
    return resultado


# ── GUARDIA: aprobar solicitud ───────────────────────────────────────────────

@router.put("/{solicitud_id}/aprobar")
def aprobar_solicitud(
    solicitud_id: int,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    if token_data.get("rol") != "guardia":
        raise HTTPException(status_code=403, detail="Solo el guardia puede aprobar solicitudes.")

    sol = db.query(SolicitudAcceso).filter(SolicitudAcceso.id == solicitud_id).first()
    if not sol:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada.")
    if sol.estado != "PENDIENTE":
        raise HTTPException(status_code=400, detail=f"La solicitud ya fue procesada ({sol.estado}).")

    # Crear el vehículo para el alumno
    nuevo_vehiculo = Vehiculo(
        usuario_id=sol.usuario_id,
        placa=sol.placa,
        modelo=f"{sol.marca or ''} {sol.modelo or ''}".strip() or sol.placa,
        color=sol.color,
    )
    db.add(nuevo_vehiculo)

    # Actualizar solicitud
    sol.estado = "APROBADA"
    sol.actualizado_en = datetime.utcnow()

    # Notificación al alumno
    _crear_notificacion(
        db, sol.usuario_id,
        titulo="✅ Solicitud aprobada",
        mensaje=f"Tu solicitud para el vehículo con placa {sol.placa} fue aprobada. Ya está registrado en el sistema.",
        tipo="success",
    )

    db.commit()
    return {"mensaje": "Solicitud aprobada. Vehículo creado y alumno notificado."}


# ── GUARDIA: rechazar solicitud ──────────────────────────────────────────────

@router.put("/{solicitud_id}/rechazar")
def rechazar_solicitud(
    solicitud_id: int,
    data: RechazarData,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    if token_data.get("rol") != "guardia":
        raise HTTPException(status_code=403, detail="Solo el guardia puede rechazar solicitudes.")

    if not data.motivo_rechazo or not data.motivo_rechazo.strip():
        raise HTTPException(status_code=422, detail="El motivo de rechazo es obligatorio.")

    sol = db.query(SolicitudAcceso).filter(SolicitudAcceso.id == solicitud_id).first()
    if not sol:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada.")
    if sol.estado != "PENDIENTE":
        raise HTTPException(status_code=400, detail=f"La solicitud ya fue procesada ({sol.estado}).")

    sol.estado = "RECHAZADA"
    sol.motivo_rechazo = data.motivo_rechazo.strip()
    sol.actualizado_en = datetime.utcnow()

    # Notificación al alumno
    _crear_notificacion(
        db, sol.usuario_id,
        titulo="❌ Solicitud rechazada",
        mensaje=f"Tu solicitud para el vehículo con placa {sol.placa} fue rechazada. Motivo: {data.motivo_rechazo}",
        tipo="error",
    )

    db.commit()
    return {"mensaje": "Solicitud rechazada y alumno notificado."}
