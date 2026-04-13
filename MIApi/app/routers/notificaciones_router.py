from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security.auth import verificar_token
from app.models.notificacion import Notificacion
from app.models.usuario import Usuario

router = APIRouter(prefix="/notificaciones", tags=["Notificaciones"])


@router.get("")
def mis_notificaciones(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    notis = (
        db.query(Notificacion)
        .filter(Notificacion.usuario_id == user.id)
        .order_by(Notificacion.creado_en.desc())
        .limit(50)
        .all()
    )

    return [
        {
            "id": n.id,
            "titulo": n.titulo,
            "mensaje": n.mensaje,
            "tipo": n.tipo,
            "leida": n.leida,
            "creado_en": n.creado_en.isoformat() if n.creado_en else None,
        }
        for n in notis
    ]


@router.put("/{noti_id}/leer")
def marcar_leida(
    noti_id: int,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    noti = db.query(Notificacion).filter(
        Notificacion.id == noti_id,
        Notificacion.usuario_id == user.id
    ).first()
    if not noti:
        raise HTTPException(status_code=404, detail="Notificación no encontrada.")

    noti.leida = True
    db.commit()
    return {"mensaje": "Marcada como leída."}


@router.put("/leer-todas")
def marcar_todas_leidas(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token),
):
    email = token_data.get("sub")
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    db.query(Notificacion).filter(
        Notificacion.usuario_id == user.id,
        Notificacion.leida == False
    ).update({"leida": True})
    db.commit()
    return {"mensaje": "Todas las notificaciones marcadas como leídas."}
