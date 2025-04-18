# main.py
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from api.endpoints import sensors
from vis import app as vis_app

app = FastAPI()

# Include the sensors router
app.include_router(sensors.router)

# Include the routes from vis.py
app.mount("/", vis_app)

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("templates/index.html", "r") as file:
        return file.read()