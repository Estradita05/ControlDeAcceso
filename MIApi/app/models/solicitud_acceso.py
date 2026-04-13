from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class SolicitudAcceso(Base):
    __tablename__ = "solicitudes_acceso"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    placa = Column(String(20), nullable=False)
    marca = Column(String(50), nullable=True)
    modelo = Column(String(50), nullable=True)
    color = Column(String(30), nullable=True)
    motivo = Column(Text, nullable=False)
    estado = Column(String(20), default="PENDIENTE")  # PENDIENTE | APROBADA | RECHAZADA
    motivo_rechazo = Column(Text, nullable=True)
    creado_en = Column(DateTime, default=datetime.utcnow)
    actualizado_en = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    usuario = relationship("Usuario")
