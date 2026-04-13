from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timedelta

class ResetToken(Base):
    __tablename__ = "reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    codigo = Column(String(6), nullable=False)
    expira_en = Column(DateTime, nullable=False)
    usado = Column(Boolean, default=False)
    creado_en = Column(DateTime, default=datetime.utcnow)

    usuario = relationship("Usuario")
