from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permite que la app móvil se conecte sin bloqueos de seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos del Vehículo
class Vehiculo(BaseModel):
    id: int = None
    placas: str
    modelo: str
    color: str

# Base de datos simulada en memoria
db_vehiculos = []
current_id = 1

# READ: Obtener todos los vehículos
@app.get("/vehiculos", response_model=List[Vehiculo])
def get_vehiculos():
    return db_vehiculos

# CREATE: Agregar un vehículo
@app.post("/vehiculos")
def create_vehiculo(vehiculo: Vehiculo):
    global current_id
    vehiculo.id = current_id
    db_vehiculos.append(vehiculo)
    current_id += 1
    return {"mensaje": "Vehículo agregado exitosamente"}

# DELETE: Eliminar un vehículo
@app.delete("/vehiculos/{vehiculo_id}")
def delete_vehiculo(vehiculo_id: int):
    global db_vehiculos
    for v in db_vehiculos:
        if v.id == vehiculo_id:
            db_vehiculos.remove(v)
            return {"mensaje": "Vehículo eliminado"}
    raise HTTPException(status_code=404, detail="Vehículo no encontrado")

# UPDATE: Editar un vehículo (¡NUEVO!)
@app.put("/vehiculos/{vehiculo_id}")
def update_vehiculo(vehiculo_id: int, vehiculo_actualizado: Vehiculo):
    global db_vehiculos
    for index, v in enumerate(db_vehiculos):
        if v.id == vehiculo_id:
            # Mantenemos el mismo ID que ya tenía
            vehiculo_actualizado.id = vehiculo_id
            # Reemplazamos los datos viejos con los nuevos
            db_vehiculos[index] = vehiculo_actualizado
            return {"mensaje": "Vehículo actualizado exitosamente"}
    raise HTTPException(status_code=404, detail="Vehículo no encontrado")