from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
import requests
# MONITORING_DATA_PATH = "merge copy.csv"
# uvicorn vis:app --reload --port 2345

app = FastAPI()

@app.get("/")
async def get_index():
    return FileResponse("templates/map.html")

@app.get("/wykres")
async def get_map():
     return FileResponse("templates/index.html")   

@app.get("/dane_czujnikow")
async def dane_czujnikow():

    # URL of the server
    url = "http://vps-76e4aba0.vps.ovh.net/samples"

    # Send a GET request to fetch data
    response = requests.get(url, params={'limit':20000, 'offset':443300})
    #response = requests.get(url, params={'limit':30000000})

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()  # Parse the JSON response
        print("Data fetched successfully:")
        #print(data)  # Print the data (you can also process it as needed)
        data = [sample for sample in data if sample['loudness'] < 150 and sample['loudness'] > 20]
  
        # with open("dane_czujnikow_last_backup.csv", "w") as f:
        #     for sample in data:
        #         f.write(f"{sample['id']} {sample['timestamp']} {sample['loudness']}\n")
    else:
        print(f"Failed to fetch data. HTTP Status code: {response.status_code}")

    return JSONResponse(content=data)

@app.get("/dane")
async def get_last_10_data():
    # Fetch data from the /dane_czujnikow endpoint


        # Return the last 10 data points
        return JSONResponse(content={'a':3, 'b': 4})
