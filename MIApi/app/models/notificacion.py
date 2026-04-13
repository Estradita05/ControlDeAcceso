from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Notificacion(Base):
    __tablename__ = "notificaciones"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    titulo = Column(String(100), nullable=False)
    mensaje = Column(Text, nullable=False)
    tipo = Column(String(30), default="info")  # info | success | error
    leida = Column(Boolean, default=False)
    creado_en = Column(DateTime, default=datetime.utcnow)

    usuario = relationship("Usuario")
