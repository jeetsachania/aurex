from sqlalchemy import Column, Integer, String
from app.db.database import Base
from sqlalchemy.orm import validates
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, unique=False, index=True)
    lastname = Column(String, unique=False, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    @validates("hashed_password")
    def hash_password(self, key, password):
        return pwd_context.hash(password)
