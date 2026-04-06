import sys
import os

# Esto permite que el script se importe desde el directorio MIApi sin problemas
sys.path.append(os.path.dirname(os.path.abspath(__line__ if '__line__' in locals() else __file__)))

from app.database import SessionLocal
from app.models.administradores import Administrador
from app.security.hashing import get_password_hash

def crear_admin():
    db = SessionLocal()
    
    correo = "admin@isay.edu"
    
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
        
    db.close()

if __name__ == "__main__":
    crear_admin()
