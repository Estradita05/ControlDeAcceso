from sqlalchemy.orm import Session
from . import models, schemas


# ---------------- VEHICULOS ----------------

def crear_vehiculo(db: Session, vehiculo: schemas.VehiculoCreate):
    nuevo = models.Vehiculo(**vehiculo.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def obtener_vehiculos(db: Session):
    return db.query(models.Vehiculo).all()


def obtener_vehiculo(db: Session, placa: str):
    return db.query(models.Vehiculo).filter(models.Vehiculo.placa == placa).first()


def eliminar_vehiculo(db: Session, placa: str):
    vehiculo = db.query(models.Vehiculo).filter(models.Vehiculo.placa == placa).first()

    if vehiculo:
        db.delete(vehiculo)
        db.commit()

    return vehiculo


# ---------------- ACCESOS ----------------

def registrar_acceso(db: Session, acceso: schemas.AccesoCreate):
    nuevo = models.Acceso(**acceso.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def listar_accesos(db: Session):
    return db.query(models.Acceso).all()


# ---------------- NOTIFICACIONES ----------------

def crear_notificacion(db: Session, notificacion: schemas.NotificacionCreate):
    nueva = models.Notificacion(**notificacion.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva


def listar_notificaciones(db: Session):
    return db.query(models.Notificacion).all()