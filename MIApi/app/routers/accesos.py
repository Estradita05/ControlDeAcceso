from fastapi import APIRouter, Depends
from app.security.auth import verificar_token
from app.data.db import accesos
from datetime import datetime

router = APIRouter(prefix="/accesos", tags=["Accesos"])


#RegistrarEntradaSalida
@router.post("/registro")
def registrar(data: dict, user=Depends(verificar_token)):

    nuevo = {
        "id": len(accesos) + 1,
        "usuario": user["sub"],
        "tipo": data["tipo"],  # entrada o salida
        "fecha": datetime.now().strftime("%d/%m/%Y"),
        "hora": datetime.now().strftime("%H:%M:%S"),
        "estado": "Permitido"
    }

    accesos.append(nuevo)

    return {
        "mensaje": "Acceso registrado",
        "acceso": nuevo
    }


#VerHistorial
@router.get("/historial")
def historial(user=Depends(verificar_token)):
    return [
        a for a in accesos if a["usuario"] == user["sub"]
    ]