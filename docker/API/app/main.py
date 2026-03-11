from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import psycopg2
import os

app = FastAPI(
    title="API Control de Acceso",
    description="Sistema de control de acceso con FastAPI",
    version="1.0"
)

# conexión a postgres
import time

while True:
    try:
        conn = psycopg2.connect(
            host="db",
            database="control_acceso",
            user="postgres",
            password="postgres"
        )
        print("Conectado a PostgreSQL")
        break
    except psycopg2.OperationalError:
        print("Esperando a PostgreSQL...")
        time.sleep(3)

cursor = conn.cursor()


# -------------------------
# MODELOS
# -------------------------

class Usuario(BaseModel):
    nombre: str
    matricula: str
    correo: str
    password: str


class Vehiculo(BaseModel):
    placa: str
    modelo: str
    tipo_acceso: str


class Reporte(BaseModel):
    asunto: str
    mensaje: str


class Solicitud(BaseModel):
    matricula: str
    placas: str
    motivo: str
    fechaInicio: str
    fechaFin: str


# -------------------------
# ENDPOINTS
# -------------------------

@app.get("/")
def inicio():
    return {"mensaje": "API Control de Acceso funcionando"}


# -------------------------
# USUARIOS
# -------------------------

@app.post("/usuarios")
def crear_usuario(usuario: Usuario):

    query = """
    INSERT INTO usuarios (nombre, matricula, correo, password)
    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(query, (
        usuario.nombre,
        usuario.matricula,
        usuario.correo,
        usuario.password
    ))

    conn.commit()

    return {"mensaje": "Usuario registrado"}


# -------------------------
# VEHICULOS
# -------------------------

@app.get("/vehiculos")
def obtener_vehiculos():

    cursor.execute("SELECT placa, modelo, tipo_acceso FROM vehiculos")

    vehiculos = cursor.fetchall()

    lista = []

    for v in vehiculos:
        lista.append({
            "placa": v[0],
            "modelo": v[1],
            "tipo_acceso": v[2]
        })

    return lista


@app.post("/vehiculos")
def crear_vehiculo(vehiculo: Vehiculo):

    query = """
    INSERT INTO vehiculos (placa, modelo, tipo_acceso)
    VALUES (%s,%s,%s)
    """

    cursor.execute(query, (
        vehiculo.placa,
        vehiculo.modelo,
        vehiculo.tipo_acceso
    ))

    conn.commit()

    return {"mensaje": "Vehiculo registrado"}


@app.put("/vehiculos/{placa}")
def actualizar_vehiculo(placa: str, vehiculo: Vehiculo):

    query = """
    UPDATE vehiculos
    SET modelo=%s, tipo_acceso=%s
    WHERE placa=%s
    """

    cursor.execute(query, (
        vehiculo.modelo,
        vehiculo.tipo_acceso,
        placa
    ))

    conn.commit()

    return {"mensaje": "Vehiculo actualizado"}


@app.delete("/vehiculos/{placa}")
def eliminar_vehiculo(placa: str):

    cursor.execute("DELETE FROM vehiculos WHERE placa=%s", (placa,))
    conn.commit()

    return {"mensaje": "Vehiculo eliminado"}


# -------------------------
# ACCESOS
# -------------------------

@app.get("/accesos")
def obtener_accesos():

    cursor.execute("SELECT tipo_movimiento FROM accesos")

    accesos = cursor.fetchall()

    lista = []

    for a in accesos:
        lista.append({
            "tipo_movimiento": a[0]
        })

    return lista


# -------------------------
# SOLICITUDES
# -------------------------

@app.post("/solicitudes")
def crear_solicitud(solicitud: Solicitud):

    query = """
    INSERT INTO solicitudes
    (matricula, placas, motivo, fecha_inicio, fecha_fin)
    VALUES (%s,%s,%s,%s,%s)
    """

    cursor.execute(query, (
        solicitud.matricula,
        solicitud.placas,
        solicitud.motivo,
        solicitud.fechaInicio,
        solicitud.fechaFin
    ))

    conn.commit()

    return {"mensaje": "Solicitud registrada"}


# -------------------------
# REPORTES
# -------------------------

@app.post("/reportes")
def crear_reporte(reporte: Reporte):

    query = """
    INSERT INTO reportes (asunto, mensaje)
    VALUES (%s,%s)
    """

    cursor.execute(query, (
        reporte.asunto,
        reporte.mensaje
    ))

    conn.commit()

    return {"mensaje": "Reporte recibido"}