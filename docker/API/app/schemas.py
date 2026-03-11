from pydantic import BaseModel


class VehiculoBase(BaseModel):
    placa: str
    modelo: str
    tipo_acceso: str


class VehiculoCreate(VehiculoBase):
    pass


class AccesoBase(BaseModel):
    usuario_id: int
    tipo_movimiento: str


class AccesoCreate(AccesoBase):
    pass


class NotificacionBase(BaseModel):
    usuario_id: int
    mensaje: str


class NotificacionCreate(NotificacionBase):
    pass