from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.usuario import Usuario
from typing import Optional
from app.security.auth import verificar_rol_alumno, verificar_rol_guardia
from app.security.hashing import get_password_hash
from pydantic import BaseModel

router = APIRouter(prefix="/usuarios", tags=["Usuario - Usuarios"])




# Los endpoints de perfil han sido unificados en auth.py (/auth/perfil)

