from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
print(pwd_context.verify("admin123", "$2y$12$zPS80rn6rCGxrwo0BcTtEO1WAIzbUwRfp2akC.ACz9vvkFyNSM9ptC"))
