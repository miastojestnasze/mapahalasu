FROM python:3.10-slim

WORKDIR /app

# Copy requirements file first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 2345

# Command to run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "2345"]