from fastapi import APIRouter, HTTPException
from app.data.db import usuarios
from app.security.auth import crear_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(data: dict):

    for user in usuarios:
        if user["email"] == data["email"] and user["password"] == data["password"]:
            
            token = crear_token({"sub": user["email"]})

            return {
                "access_token": token,
                "token_type": "bearer"
            }

    raise HTTPException(
        status_code=401,
        detail="Credenciales incorrectas"
    )