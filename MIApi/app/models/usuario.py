from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    matricula = Column(String(50), unique=True, index=True, nullable=True)
    nombre = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

    vehiculos = relationship("Vehiculo", back_populates="propietario")
    accesos = relationship("Acceso", back_populates="usuario")
