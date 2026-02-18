from app import app, db

def initialize():
    print("Initializing database...")
    with app.app_context():
        
        db.create_all()
    print(" Database created successfully! You should see 'sentinel.db' now.")

if __name__ == "__main__":
    initialize()