from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
import requests


# uvicorn app:app --reload --port 2345

app = FastAPI()


@app.get("/")
async def get_index():
    return FileResponse("templates/map.html")

@app.get("/wykres")
async def get_map():
     return FileResponse("templates/wykres.html")   


@app.get("/hex")
async def get_test():
    return FileResponse("templates/s3site.html")


@app.get("/dane_czujnikow")
async def dane_czujnikow():

    # URL of the server
    url = "http://vps-76e4aba0.vps.ovh.net/samples"

    # Send a GET request to fetch data

    response = requests.get(url, params={'offset':453300, 'limit':30000000})


    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()  # Parse the JSON response
        print("Data fetched successfully:")
        #print(data)  # Print the data (you can also process it as needed)
        #data = [sample for sample in data if sample['loudness'] < 150 and sample['loudness'] > 20]
  
        # with open("dane_czujnikow_last_backup.csv", "w") as f:
        #     for sample in data:
        #         f.write(f"{sample['id']} {sample['timestamp']} {sample['loudness']}\n")
    else:
        print(f"Failed to fetch data. HTTP Status code: {response.status_code}")

    return JSONResponse(content=data)


