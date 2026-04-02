# Mini Log Analytics Platform 🚀

This is a production-ready template for a minimal Log and Metrics Analytics Platform. It uses React for the UI to generate application transactions, FastAPI to process and instrument requests with Prometheus metrics, and Grafana to visualize them interactively. 

## 🔷 Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend API**: Python FastAPI + Uvicorn
- **Metrics**: Prometheus Client
- **Orchestration**: Docker Compose + Kubernetes YAML manifests

## 🔷 System Architecture
`User UI` → `FastAPI` (Logs & Latency) → `Prometheus` (Scrapes Metrics using Pull Model) → `Grafana` (Visualize Datasource)

## 🔷 Quick Start (Docker Compose)
1. In `mini-log-analytics/`, run the orchestration command:
   ```bash
   docker-compose up --build -d
   ```
2. Navigate to URLs:
   - **Frontend UI**: [http://localhost:3000](http://localhost:3000)
   - **FastAPI API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)
   - **Grafana**: [http://localhost:3001](http://localhost:3001)

## 🔷 Testing Integration Endpoints (cURL)

**Trigger standard request**:
```bash
curl -X GET http://localhost:8000/
```
**Trigger an error request**:
```bash
curl -v -X GET http://localhost:8000/error
```
**View scraped raw metrics**:
```bash
curl -X GET http://localhost:8000/metrics
```

## 🔷 Kubernetes Deployment (Minikube)
To deploy this architecture to a cluster, first build your images or use a local registry, then apply configurations:
```bash
kubectl apply -f kubernetes/configmaps/
kubectl apply -f kubernetes/deployments/
kubectl apply -f kubernetes/services/

# View Status
kubectl get pods
kubectl get svc
```

## 🔷 Setting up Grafana
1. Login to Grafana at `http://localhost:3001` with `admin` / `admin`.
2. Add a Data Source selecting *Prometheus*.
3. Set URL to `http://prometheus:9090`.
4. Import the `grafana/dashboard.json` included in this repository.

## 🔷 Future Enhancements
- **Logging Aggregation**: Implementing ELK (ElasticSearch, Logstash, Kibana) stack alongside time-series Prometheus data.
- **Alerting**: Implementing `Alertmanager` if `http_errors_total` surges above a specific threshold per minute.
