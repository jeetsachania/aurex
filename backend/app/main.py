from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes import users, wallets, currencies, order, assets, trading_data

origins = [
    "http://localhost:5173",
    "http://localhost",
]

app = FastAPI(title="Trading App API")
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(wallets.router, prefix="/wallets", tags=["Wallets"])
app.include_router(currencies.router, prefix="/currencies", tags=["Currencies"])
app.include_router(order.router, prefix="/orders", tags=["Orders"])
app.include_router(assets.router, prefix="/assets", tags=["Assets"])
app.include_router(trading_data.router, prefix="/tradingdata", tags=["TradingData"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}
