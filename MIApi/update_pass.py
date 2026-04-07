from app.database import SessionLocal
from app.models.administradores import Administrador
db = SessionLocal()
admin = db.query(Administrador).filter(Administrador.correo == "admin@isay.edu").first()
if admin:
    admin.contraseña = "$2y$12$zPS80rn6rCGxrwo0BcTtEO1WAIzbUwRfp2akC.ACz9vvkFyNSM9ptC"
    db.commit()
    print("Password updated successfully!")
else:
    print("Admin not found.")
db.close()
