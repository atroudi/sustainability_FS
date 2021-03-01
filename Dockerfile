FROM python:3.6.6

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

#Download sentiment analysis model
RUN cd backend/apps/twitters/resources/ && bash downloadModel.sh

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 80
CMD ["python", "manage.py", "migrate", "--noinput"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
