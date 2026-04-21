from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta

security = HTTPBearer()

SECRET_KEY = "supersecret"  
ALGORITHM = "HS256"

def verificar_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials  

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

def verificar_token_ws(token: str):
    """Versión simplificada para WebSockets que recibe el string directamente."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except:
        return None
        
def verificar_rol_guardia(payload: dict = Depends(verificar_token)):
    if payload.get("rol") != "guardia":
        raise HTTPException(status_code=403, detail="No tienes permisos de administrador/guardia")
    return payload

def verificar_rol_alumno(payload: dict = Depends(verificar_token)):
    if payload.get("rol") != "alumno":
        raise HTTPException(status_code=403, detail="No tienes permisos, esta acción es exclusiva para la app móvil")
    return payload
    
def crear_token(data: dict):
    to_encode = data.copy()
    
    expire = datetime.utcnow() + timedelta(minutes=120)  # extendí el tiempo a dos horas para mayor comodidad
    to_encode.update({"exp": expire})
    
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return token    