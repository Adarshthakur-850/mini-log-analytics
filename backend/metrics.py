from prometheus_client import Counter, Histogram

# HTTP Requests Total Counter
http_requests_total = Counter(
    "http_requests_total",
    "Total number of HTTP requests",
    ["method", "endpoint"]
)

# HTTP Errors Total Counter
http_errors_total = Counter(
    "http_errors_total",
    "Total number of HTTP requests that resulted in an error",
    ["method", "endpoint", "status_code"]
)

# HTTP Request Duration Histogram
# Buckets from 10ms to 5s
http_request_duration_seconds = Histogram(
    "http_request_duration_seconds",
    "Duration of HTTP requests in seconds",
    ["method", "endpoint"],
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.0, 5.0]
)
