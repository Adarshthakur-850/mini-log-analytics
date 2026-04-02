# Mini Log Analytics Platform

**Repository:**
[Mini Log Analytics Platform](https://github.com/Adarshthakur-850/mini-log-analytics?utm_source=chatgpt.com)

---

## Overview

The Mini Log Analytics Platform is a production-ready system designed to simulate real-world log and metrics monitoring pipelines. It integrates frontend interaction, backend processing, and observability tools to provide a complete end-to-end analytics workflow.

This project demonstrates how application-level events can be transformed into measurable metrics, monitored in real time, and visualized using modern DevOps and MLOps practices.

---

## Problem Statement

Applications generate large volumes of logs and performance metrics. Without centralized systems:

* Monitoring system health becomes difficult
* Debugging production issues is slow
* Detecting anomalies in real time is nearly impossible

This platform addresses these challenges by building a structured pipeline for log generation, processing, monitoring, and visualization.

---

## Objectives

* Build a real-time log and metrics pipeline
* Implement backend instrumentation for observability
* Enable visualization of system behavior
* Demonstrate containerized deployment using Docker and Kubernetes
* Provide a scalable architecture for monitoring

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Python FastAPI
* Uvicorn

### Monitoring & Observability

* Prometheus (metrics collection using pull model)
* Grafana (visualization dashboards)

### DevOps / Deployment

* Docker
* Docker Compose
* Kubernetes (Minikube compatible)

---

## System Architecture

```text
User Interface → FastAPI Backend → Prometheus → Grafana
```

### Flow Explanation

1. User interacts with the frontend
2. Requests are sent to FastAPI
3. Backend processes requests and generates metrics
4. Prometheus scrapes metrics from FastAPI
5. Grafana visualizes the collected metrics

---

## Key Features

### Real-Time Metrics Monitoring

* Tracks request count, latency, and errors
* Enables live system insights

### Backend Instrumentation

* FastAPI endpoints instrumented with Prometheus metrics
* Captures performance and error data

### Interactive Dashboard

* Grafana dashboards for visual analysis
* Time-series monitoring

### Containerized Deployment

* Fully containerized using Docker
* Easy multi-service orchestration

### Kubernetes Support

* Scalable deployment using Kubernetes manifests

---

## Project Structure

```text
mini-log-analytics/
│
├── frontend/              # React UI
├── backend/               # FastAPI application
├── docker-compose.yml     # Multi-service orchestration
├── kubernetes/            # K8s manifests
│   ├── configmaps/
│   ├── deployments/
│   ├── services/
├── grafana/               # Dashboard configs
├── prometheus/            # Prometheus config
├── requirements.txt
└── README.md
```

---

## Quick Start (Docker Compose)

Run the complete system locally:

```bash
docker-compose up --build -d
```

### Access Services

* Frontend UI: [http://localhost:3000](http://localhost:3000)
* FastAPI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
* Prometheus: [http://localhost:9090](http://localhost:9090)
* Grafana: [http://localhost:3001](http://localhost:3001)

---

## API Testing

### Standard Request

```bash
curl -X GET http://localhost:8000/
```

### Error Simulation

```bash
curl -v -X GET http://localhost:8000/error
```

### Metrics Endpoint

```bash
curl -X GET http://localhost:8000/metrics
```

---

## Kubernetes Deployment (Minikube)

```bash
kubectl apply -f kubernetes/configmaps/
kubectl apply -f kubernetes/deployments/
kubectl apply -f kubernetes/services/
```

### Verify Deployment

```bash
kubectl get pods
kubectl get svc
```

---

## Grafana Setup

1. Open Grafana at [http://localhost:3001](http://localhost:3001)

2. Login with:

   * Username: admin
   * Password: admin

3. Add Prometheus as a data source:

   * URL: [http://prometheus:9090](http://prometheus:9090)

4. Import dashboard from:

   * `grafana/dashboard.json`

---

## Workflow

1. User triggers request via frontend
2. FastAPI processes request and logs metrics
3. Prometheus scrapes metrics periodically
4. Grafana visualizes system performance
5. Alerts and insights can be derived

---

## Use Cases

* Application performance monitoring
* Backend API observability
* Debugging and error tracking
* DevOps monitoring pipelines
* Learning real-world monitoring systems

---

## Future Enhancements

* Log aggregation using ELK Stack (Elasticsearch, Logstash, Kibana)
* Alerting system using Prometheus Alertmanager
* Machine learning-based anomaly detection
* Distributed tracing integration
* Cloud deployment (AWS / GCP / Azure)

---

## Learning Outcomes

This project demonstrates:

* Observability fundamentals (metrics, monitoring, visualization)
* Backend instrumentation using Prometheus
* Containerized system design
* Kubernetes-based deployment
* Real-world DevOps and MLOps practices

---

## Contribution

Contributions are welcome:

* Raise issues
* Submit pull requests
* Suggest improvements

---

## License

MIT License

---

## Author

Adarsh Thakur
Machine Learning Engineer | Data Science | MLOps
