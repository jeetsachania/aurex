from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, role_required
from app.crud.utils import commit, get_all
from app.db.database import get_db
from app.models.user import User
from app.models.asset import Asset
from app.schemas.asset import AssetCreate, AssetResponse


router = APIRouter()


@router.post("/", response_model=AssetResponse, status_code=status.HTTP_200_OK)
def create(asset: AssetCreate, user: User = Depends(role_required("Admin")), db: Session = Depends(get_db)):
    """
    Add a new asset to the database

    Args:
        asset (`AssetCreate`): Asset payload in the AssetCreate schema
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Returns:
        `Asset`: The Asset object
    """
    new_asset = Asset(
        symbol=asset.symbol,
        name=asset.name,
        asset_type=asset.asset_type,
        exchange=asset.exchange,
        currency=asset.currency
    )

    return commit(db, new_asset)


@router.get("/", response_model=List[AssetResponse], status_code=status.HTTP_200_OK)
def get(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get all assets

    Args:
        user (`User`): The current user
        db (`Session`): SQLAlchemy database session

    Raises:
        `HTTPException`:
            - `404`: If no assets exists

    Returns:
        assets (`list[Asset]`): List of all Asset objects
    """
    assets = get_all(db, Asset)

    if not assets:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No assets found"
        )

    return assets
