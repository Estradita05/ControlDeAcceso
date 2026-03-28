from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class AccesoProvisional(Base):
    __tablename__ = "accesos_provisionales"

    id = Column(Integer, primary_key=True, index=True)
    matricula = Column(String(50), nullable=False)
    placas = Column(String(50), nullable=False)
    motivo = Column(String(200), nullable=False)
    fecha_inicio = Column(String(20), nullable=False)
    fecha_fin = Column(String(20), nullable=False)
    estado = Column(String(20), default="Pendiente")
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario")
