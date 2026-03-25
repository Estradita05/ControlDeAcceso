from fastapi import APIRouter, Depends
from app.security.auth import verificar_token
from app.data.db import vehiculos

router = APIRouter(prefix="/vehiculos", tags=["Vehículos"])


#VerVehículosDelUsuario
@router.get("")
def listar(user=Depends(verificar_token)):
    return [
        v for v in vehiculos if v["usuario"] == user["sub"]
    ]


#AgregarVehículo
@router.post("")
def agregar(data: dict, user=Depends(verificar_token)):
    
    nuevo = {
        "id": len(vehiculos) + 1,
        "placa": data["placa"],
        "modelo": data["modelo"],
        "color": data["color"],
        "usuario": user["sub"]  
    }

    vehiculos.append(nuevo)

    return {
        "mensaje": "Vehículo agregado",
        "vehiculo": nuevo
    }

#EditarVehículo
@router.put("/{id}")
def editar(id: int, data: dict, user=Depends(verificar_token)):
    for v in vehiculos:
        if v["id"] == id and v["usuario"] == user["sub"]:
            v["placa"] = data.get("placa", v["placa"])
            v["modelo"] = data.get("modelo", v["modelo"])
            v["color"] = data.get("color", v["color"])
            return {"mensaje": "Vehículo actualizado", "vehiculo": v}
    return {"error": "Vehículo no encontrado"}

#EliminarVehículo
@router.delete("/{id}")
def eliminar(id: int, user=Depends(verificar_token)):
    for i, v in enumerate(vehiculos):
        if v["id"] == id and v["usuario"] == user["sub"]:
            vehiculos.pop(i)
            return {"mensaje": "Vehículo eliminado"}
    return {"error": "Vehículo no encontrado"}

