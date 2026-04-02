import time
import random
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

from metrics import http_requests_total, http_errors_total, http_request_duration_seconds
from logger import logger

app = FastAPI(title="Mini Log Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def observe_metrics(request: Request, call_next):
    start_time = time.time()
    method = request.method
    endpoint = request.url.path
    
    status_code = 500
    try:
        response = await call_next(request)
        status_code = response.status_code
        return response
    except Exception as e:
        logger.error(f"Failed handling request: {str(e)}", extra={"endpoint": endpoint})
        raise e
    finally:
        duration = time.time() - start_time
        
        # Do not track latency/errors for the metrics endpoint itself
        if endpoint != "/metrics":
            http_requests_total.labels(method=method, endpoint=endpoint).inc()
            http_request_duration_seconds.labels(method=method, endpoint=endpoint).observe(duration)
            if status_code >= 400:
                http_errors_total.labels(method=method, endpoint=endpoint, status_code=str(status_code)).inc()
                
            logger.info("Request completed", extra={
                "method": method, 
                "endpoint": endpoint, 
                "status_code": status_code, 
                "duration": duration
            })

@app.get("/")
async def root():
    return {"message": "Welcome to Mini Log Analytics API"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "System is healthy"}

@app.get("/error")
async def generate_error():
    # Simulate a 50% chance of a real exception or a 500 error response
    if random.choice([True, False]):
        raise Exception("Simulated unhandled exception!")
    return JSONResponse(status_code=500, content={"error": "Simulated internal server error"})

@app.get("/metrics")
async def get_metrics():
    return PlainTextResponse(generate_latest(), media_type=CONTENT_TYPE_LATEST)
