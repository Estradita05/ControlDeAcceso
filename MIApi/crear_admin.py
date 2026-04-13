import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models.administradores import Administrador
from app.security.hashing import get_password_hash

def crear_admin():
    # Base.metadata.create_all(bind=engine)  # Comentado para dejar que Laravel maneje las migraciones
    
    db = SessionLocal()
    
    correo = "admin@isay.edu"
    
    try:
        existe = db.query(Administrador).filter(Administrador.correo == correo).first()
        
        if existe:
            print("El administrador de prueba ya existe.")
        else:
            # Importante: según tu auth.py el login evalúa con verify_password así que encriptamos
            contra = "admin123"
            hashed = get_password_hash(contra)
            
            nuevo = Administrador(
                nombre="Guardia de Prueba",
                correo=correo,
                contraseña=hashed
            )
            
            db.add(nuevo)
            db.commit()
            print(f"Administrador creado exitosamente! Correo: {correo} | Contraseña: {contra}")
    except Exception as e:
        print(f"No se pudo verificar o crear el administrador. Las tablas no existen (Asegúrate de correr las migraciones en Laravel): {e}")
        db.rollback()
        
    finally:
        db.close()

if __name__ == "__main__":
    crear_admin()
