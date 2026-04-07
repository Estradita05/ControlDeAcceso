from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, usuarios, vehiculos, accesos
from app.database import engine, Base
from app.models import usuario, vehiculo, acceso, acceso_provisional


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(vehiculos.router)
app.include_router(accesos.router)

@app.get("/")
def inicio():
    return {"mensaje": "API Control de Acceso funcionando"}

from app.websockets_manager import manager
from fastapi import WebSocket, WebSocketDisconnect

@app.websocket("/ws/dashboard")
async def websocket_dashboard(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Mantener la conexión abierta
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
