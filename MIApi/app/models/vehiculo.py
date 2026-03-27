from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Vehiculo(Base):
    __tablename__ = "vehiculos"

    id = Column(Integer, primary_key=True, index=True)
    placa = Column(String(20), unique=True, index=True, nullable=False)
    modelo = Column(String(50))
    color = Column(String(30))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    propietario = relationship("Usuario", back_populates="vehiculos")
