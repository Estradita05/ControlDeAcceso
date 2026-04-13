from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.database import get_db
from app.security.auth import verificar_token

router = APIRouter(prefix="/reportes", tags=["Reportes"])

class ReporteData(BaseModel):
    categoria: Optional[str] = "otro"
    asunto: str
    mensaje: str

@router.post("", status_code=201)
def crear_reporte(
    data: ReporteData,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verificar_token)
):
    """Recibe un reporte de problema enviado desde la app móvil."""
    if not data.asunto or len(data.asunto.strip()) < 5:
        raise HTTPException(status_code=422, detail="El asunto debe tener al menos 5 caracteres.")
    if not data.mensaje or len(data.mensaje.strip()) < 10:
        raise HTTPException(status_code=422, detail="El mensaje debe tener al menos 10 caracteres.")

    email = token_data.get("sub", "desconocido")

    # Registrar en logs del servidor (se puede ampliar a BD en el futuro)
    print(f"[REPORTE] Usuario: {email}")
    print(f"[REPORTE] Categoría: {data.categoria}")
    print(f"[REPORTE] Asunto: {data.asunto}")
    print(f"[REPORTE] Mensaje: {data.mensaje}")

    return {"mensaje": "Reporte recibido exitosamente. Gracias por tu retroalimentación."}
