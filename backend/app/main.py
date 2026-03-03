import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes import users, wallets, currencies, assets
from backend.app.api.routes.order import router as order_router
from backend.app.api.routes.trading_data import router as trading_data_router
from backend.app.db.database import Base, engine
from backend.app.models import *

load_dotenv()

api_base_url = os.getenv("API_BASE_URL", "http://localhost:8000")
api_route_prefix = os.getenv("API_ROUTE_PREFIX", "")

# DEVELOPMENT ONLY: Create tables automatically
if os.getenv("ENVIRONMENT") == "dev":
    Base.metadata.create_all(bind=engine)

origins = [
    api_base_url,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost",
]

app = FastAPI(title="Trading App API")
app.include_router(users.router, prefix=f"{api_route_prefix}/users", tags=["Users"])
app.include_router(wallets.router, prefix=f"{api_route_prefix}/wallets", tags=["Wallets"])
app.include_router(currencies.router, prefix=f"{api_route_prefix}/currencies", tags=["Currencies"])
app.include_router(order_router, prefix=f"{api_route_prefix}/orders", tags=["Orders"])
app.include_router(assets.router, prefix=f"{api_route_prefix}/assets", tags=["Assets"])
app.include_router(trading_data_router, prefix=f"{api_route_prefix}/tradingdata", tags=["TradingData"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}
