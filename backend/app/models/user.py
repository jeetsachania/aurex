from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    """
    User Model

    Attributes:
        id (`int`): Auto-incremented unique ID
        firstname (`str`): User's firstname
        lastname (`str`): User's lastname
        email (`str`): User's email address
        username (`str`): User's username
        hashed_password (`str`): User's password

    Methods:
        `verify_password(password: str) -> bool`:
            Verifies the provided password matches the stored hash password
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    firstname = Column(String, unique=False, index=True)
    lastname = Column(String, unique=False, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    roles = relationship("Role", secondary="user_roles")

    # Delete user wallets if the user does not exist
    wallets = relationship(
        "Wallet",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    # Delete user orders if the user does not exist
    orders = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    
    def verify_password(self, password: str) -> bool:
        """
        Verifies if the provided password matches the stored hash password

        Args:
            password (`str`): The plain-text password to verify

        Returns:
            bool: True if the password matches the stored hash password, False otherwise
        """
        return pwd_context.verify(password, self.hashed_password)


    def has_role(self, role_name: str) -> bool:
        """
        Check if a user has the given role

        Args:
            role_name (`str`): Role

        Returns:
            bool: True if the user has the given role, False otherwise
        """
        return any(role.name == role_name for role in self.roles)
