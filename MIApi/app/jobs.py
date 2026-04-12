import logging
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import SessionLocal
from app.models.acceso import Acceso
from app.models.usuario import Usuario

logger = logging.getLogger(__name__)

def auto_checkout_entradas():
    """
    Tarea programada que revisa si hay estudiantes con una 'Entrada' activa y
    les genera una 'Salida' automática. Ideal para ejecutarse en la madrugada (ej. 3:00 AM).
    """
    db: Session = SessionLocal()
    try:
        # Subquery to get the max id (last access) per user
        subquery = db.query(Acceso.usuario_id, func.max(Acceso.id).label('max_id')).group_by(Acceso.usuario_id).subquery()
        
        # Query to get the last accesses that are 'entrada'
        ultimos_accesos = db.query(Acceso).join(subquery, Acceso.id == subquery.c.max_id).filter(Acceso.tipo.lower() == "entrada").all()
        
        entradas_cerradas = 0

        for ultimo_acceso in ultimos_accesos:
            # Crear la Salida Automática con la misma fecha que la entrada
            salida_automatica = Acceso(
                usuario_id=ultimo_acceso.usuario_id,
                tipo="Salida",
                fecha=ultimo_acceso.fecha,  # Usar la misma fecha de la entrada
                hora=datetime.now().strftime("%H:%M:%S"),  # Hora actual
                estado="Sistema (Auto-Checkout)"
            )
            
            db.add(salida_automatica)
            entradas_cerradas += 1

        if entradas_cerradas > 0:
            db.commit()
            logger.info(f"Auto-checkout completado. Se cerraron {entradas_cerradas} accesos pendientes.")
        else:
            logger.info("Auto-checkout completado. Todas las sesiones estaban cerradas.")

    except Exception as e:
        logger.error(f"Error ejecutando auto_checkout_entradas: {e}")
        db.rollback()
    finally:
        db.close()
