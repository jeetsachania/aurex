from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.currency import get_all_currencies, exists, get_additional_currencies
from app.crud.utils import commit
from app.db.database import get_db
from app.models.user import User
from app.models.asset import Asset
from app.schemas.asset import AssetCreate, AssetResponse


router = APIRouter()


@router.post("/", response_model=AssetResponse, status_code=status.HTTP_200_OK)
def create(asset: AssetCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    
    """
    new_asset = Asset(
        symbol=asset.symbol,
        name=asset.name,
        asset_type=asset.asset_type,
        exchange=asset.exchange,
        currency=asset.currency
    )

    return commit(db, new_asset)
