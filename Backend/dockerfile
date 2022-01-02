FROM ubuntu

RUN apt-get update
RUN apt-get install -y python python3-pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY /app /app

ENTRYPOINT uvicorn --host 0.0.0.0 --port 5000 app.main:app