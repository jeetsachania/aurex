from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class Role(Base):
    """
    Role Model

    Attributes:
        id (`int`): Auto-incremented unique ID
        name (`str`): Role name
    """
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    users = relationship("User", secondary="user_roles")
    permissions = relationship("Permission", secondary="role_permissions")


class UserRole(Base):
    """
    UserRole Model

    Attributes:
        id (`int`): Auto-incremented unique ID
        user_id (`int`): User ID
        role_id (`int`): Role ID
    """
    __tablename__ = "user_roles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)


class Permission(Base):
    """
    Permission Model

    Attributes:
        id (`int`): Auto-incremented unique ID
        name (`str`): Permission name
    """
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    roles = relationship("Role", secondary="role_permissions")


class RolePermission(Base):
    """
    RolePermission Model

    Attributes:
        role_id (`int`): Role ID
        permission_id (`int`): Permission ID
    """
    __tablename__ = "role_permissions"

    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True)
    permission_id = Column(Integer, ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True)
