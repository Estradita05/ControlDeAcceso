from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Acceso(Base):
    __tablename__ = "accesos"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(20), nullable=False) # entrada o salida
    fecha = Column(String(20), nullable=False)
    hora = Column(String(20), nullable=False)
    estado = Column(String(20), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="accesos")
