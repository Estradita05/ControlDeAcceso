from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.jobs import auto_checkout_entradas
from app.routers import auth, usuarios, vehiculos, accesos, web_accesos, web_usuarios, web_vehiculos
from app.database import engine, Base
from app.models import usuario, vehiculo, acceso, acceso_provisional


Base.metadata.create_all(bind=engine)

app = FastAPI()

# Inicializamos el scheduler de tareas en segundo plano
scheduler = AsyncIOScheduler()

@app.on_event("startup")
def start_scheduler():
    # Ejecuta el auto-checkout de registros huérfanos todos los días a las 3:00 AM
    scheduler.add_job(auto_checkout_entradas, 'cron', hour=3, minute=0)
    scheduler.start()

@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()

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
app.include_router(web_accesos.router)
app.include_router(web_usuarios.router)
app.include_router(web_vehiculos.router)

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
            
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
