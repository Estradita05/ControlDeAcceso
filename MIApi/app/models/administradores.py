from sqlalchemy import Column, Integer, String
from app.database import Base

class Administrador(Base):
    __tablename__ = "administradores"

    id_admin = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    correo = Column(String(100), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)