import json
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker

from backend.app.models.currency import Currency
from backend.app.models.asset import Asset
from backend.app.models.trading_data import TradingData


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://dev:test@localhost/aurex")

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

script_dir = os.path.dirname(os.path.abspath(__file__))


def reset_id_sequence(table_name, pk_column):
    sequence_name = f"{table_name}_{pk_column}_seq"
    with engine.connect() as conn:
        conn.execute(text(f"ALTER SEQUENCE {sequence_name} RESTART WITH 1"))
        conn.commit()
    print(f"'{sequence_name}' Reset To 1")


def create_objects(data: list, cls, keys: dict):
    records = []

    for d in data:
        kwargs = {key: d[key] for key in keys}
        records.append(cls(**kwargs))

    return records


def read(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        # Load in JSON data
        json_data = json.load(f)
        # Get keys as a dict
        keys = json_data[0].keys()

    return keys, json_data


if __name__ == "__main__":
    data = [
        {
            "class": Currency,
            "table_name": "currencies",
            "pk_column": "id",
            "file_path": "../data/currencies.json"
        },
        {
            "class": Asset,
            "table_name": "assets",
            "pk_column": "id",
            "file_path": "../data/assets.json"
        },
        {
            "class": TradingData,
            "table_name": "trading_data",
            "pk_column": "id",
            "file_path": "../data/trading_data.json"
        },
    ]

    for d in data:
        file_path = os.path.join(script_dir, d.get("file_path"))
        keys, json_data = read(file_path)
        objects = create_objects(json_data, d.get("class"), keys)
        reset_id_sequence(d.get("table_name"), d.get("pk_column"))

        try:
            session.add_all(objects)
            session.commit()
            session.close()
            print(f"Populated '{d.get("table_name")}'")
        except IntegrityError:
            print(f"Could not populate '{d.get("table_name")}'")
