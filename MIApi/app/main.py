from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.jobs import auto_checkout_entradas
from app.routers import auth, usuarios, vehiculos, accesos, web_accesos, web_usuarios, web_vehiculos, reportes, solicitudes, notificaciones_router
from app.security.auth import verificar_token_ws
from app.database import engine, Base
from app.models import usuario, vehiculo, acceso, acceso_provisional, reset_token, verificacion_email, solicitud_acceso, notificacion


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
app.include_router(reportes.router)
app.include_router(solicitudes.router)
app.include_router(notificaciones_router.router)

@app.get("/")
def inicio():
    return {"mensaje": "API Control de Acceso funcionando"}

from app.websockets_manager import manager
from fastapi import WebSocket, WebSocketDisconnect

@app.websocket("/ws/dashboard")
async def websocket_dashboard(websocket: WebSocket, token: str = None):
    # Intentamos conectar primero para poder enviar el mensaje de error si falla
    await manager.connect(websocket)
    
    if not token:
        await websocket.send_json({"event": "error", "message": "Falta token de autenticación"})
        await websocket.close(code=1008)
        manager.disconnect(websocket)
        return

    payload = verificar_token_ws(token)
    if not payload or payload.get("rol") != "guardia":
        await websocket.send_json({"event": "error", "message": "No autorizado. Se requiere perfil de guardia."})
        await websocket.close(code=1008)
        manager.disconnect(websocket)
        return

    try:
        while True:
            # Mantener la conexión abierta
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
