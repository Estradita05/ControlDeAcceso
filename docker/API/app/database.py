from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import time

DATABASE_URL = "postgresql://admin:admin123@db:5432/control_acceso"

engine = None

# Esperar a que PostgreSQL esté listo
for i in range(10):
    try:
        engine = create_engine(DATABASE_URL)
        connection = engine.connect()
        connection.close()
        print("Conectado a PostgreSQL")
        break
    except Exception:
        print("Esperando a PostgreSQL...")
        time.sleep(3)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()