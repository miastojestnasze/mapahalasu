# sensors.py
from fastapi import APIRouter
import random
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any

router = APIRouter()

# Mock data for sensors
sensors_data: List[Dict[str, Any]] = [
    {"id": 1, "timestamp": "2025-04-15T12:00:00Z", "Lmax": 65},
    {"id": 2, "timestamp": "2025-04-15T12:05:00Z", "Lmax": 70},
    {"id": 3, "timestamp": "2025-04-15T12:10:00Z", "Lmax": 75},
]

# Assign random locations in Warsaw to sensors
for sensor in sensors_data:
    sensor["location"] = {
        "latitude": random.uniform(52.0, 52.3),
        "longitude": random.uniform(20.8, 21.2),
    }

# Generate mock data for the last 24 hours
def generate_last_24_hours_data(sensor_id: int) -> List[Dict[str, Any]]:
    now = datetime.now(timezone.utc)
    data: List[Dict[str, Any]] = []
    for i in range(24):
        timestamp = now - timedelta(hours=i)
        data.append({
            "id": sensor_id,
            "timestamp": timestamp.isoformat(),
            "Lmax": random.randint(50, 100),
        })
    return data

@router.get("/sensors")
async def get_sensors():
    return sensors_data

@router.get("/sensors/{sensor_id}/last_24_hours")
async def get_last_24_hours(sensor_id: int):
    return generate_last_24_hours_data(sensor_id)

@router.get("/sensors/last_24_hours")
async def get_all_sensors_last_24_hours() -> List[Dict[str, Any]]:
    now = datetime.now(timezone.utc)
    last_24_hours = now - timedelta(hours=24)
    all_data: List[Dict[str, Any]] = []

    for sensor in sensors_data:
        sensor_id = sensor["id"]
        all_data.extend(generate_last_24_hours_data(sensor_id))

    # Filter data for the last 24 hours
    filtered_data: List[Dict[str, Any]] = [
        sample for sample in all_data
        if datetime.fromisoformat(sample['timestamp']) > last_24_hours
    ]

    return filtered_data