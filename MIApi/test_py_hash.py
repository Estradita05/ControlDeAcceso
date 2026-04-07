from app.security.hashing import verify_password
print("Verification result:", verify_password("admin123", "$2y$12$zPS80rn6rCGxrwo0BcTtEO1WAIzbUwRfp2akC.ACz9vvkFyNSM9ptC"))
