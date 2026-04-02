import logging
import sys
from pythonjsonlogger import jsonlogger

def get_logger(name: str = "mini-log-analytics"):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        # Using a structured JSON formatter
        formatter = jsonlogger.JsonFormatter(
            '%(asctime)s %(levelname)s %(name)s %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    return logger

# Global instance for easier imports
logger = get_logger()
