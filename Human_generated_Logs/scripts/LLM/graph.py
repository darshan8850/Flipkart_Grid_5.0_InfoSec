import asyncio
import websockets
import json
import random
import time

async def data_stream(websocket, path):
    while True:
        data = {"value": random.randint(0, 100)}  # Generate random data
        await websocket.send(json.dumps(data))
        time.sleep(1)  # Simulate data update interval

start_server = websockets.serve(data_stream, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

