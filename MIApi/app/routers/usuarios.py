from fastapi import APIRouter, Depends
from app.security.auth import verificar_token

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/perfil")
def perfil(user=Depends(verificar_token)):
    return {
        "mensaje": "Acceso permitido",
        "usuario": user
    }