FROM python:3.4

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt

EXPOSE 80
CMD ["python", "manage.py", "migrate", "--noinput"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
