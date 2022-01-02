import json
import os
from typing import List, Optional, Dict, Tuple
from fastapi import FastAPI, File, UploadFile, Response, status
from dotenv import load_dotenv
import asyncio
from fastapi.params import Depends
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import aiohttp #type:ignore
import nest_asyncio
from sqlalchemy.orm.session import Session #type:ignore
nest_asyncio.apply()

DB_URL = 'sqlite:///./transcription.db'
engine = create_engine(DB_URL, connect_args={'check_same_thread': False})

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

class Transcription(Base):
	__tablename__ = 'transcription'
	id = Column(Integer, primary_key=True, nullable=False)
	transciption = Column(String)

app = FastAPI()

Base.metadata.create_all(bind=engine)

def getdb():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

class RequestTranscription(BaseModel):
	transcription: str

TOKEN_URL = "https://api.symbl.ai/oauth2/token:generate"
VID_REQUEST_URL = "https://api.symbl.ai/v1/process/video"
AUDIO_REQUEST_URL = "https://api.symbl.ai/v1/process/audio"
HEADERS = {
    'Content-Type': 'application/json'
}
def makeAuthHeader(token: str, fileExtension: str) -> Dict[str, str]:
    """
    Authentication header for Symbl.ai
    """  
    isAudOrVid = isAudioOrVideo(fileExtension)
    if isAudOrVid == 'video' or isAudOrVid == 'audio':
        return {
            'Authorization': f'Bearer {token}',
            'Content-Type': f'{isAudOrVid}/{fileExtension}'
        }
    else:
        print(f"File extension {fileExtension} is not supported")
        return {'Authorization': 'error'}

@app.get('/',  status_code=status.HTTP_200_OK)
async def home():
    return {'response': 'success'}

@app.post('/transcription', status_code=status.HTTP_201_CREATED)
async def transcribe(request: RequestTranscription, db: Session = Depends(getdb)):
    transcription = Transcription(transciption=request.transcription)
    db.add(transcription)
    db.commit()
    db.refresh(transcription)
    return {'response': 'success', 'page': db.query(Transcription).filter(request.transcription == Transcription.transciption).first().id}

@app.get('/transcription/{page}', status_code=status.HTTP_200_OK)
async def getTranscription(response: Response, page: int, db: Session = Depends(getdb)):
    query = db.query(Transcription).filter(page == Transcription.id).first()
    if query:
        return {'response': query.transciption}
    response.status_code = status.HTTP_404_NOT_FOUND
    return {'response': 'No transcription found'}

# Receive video file from client and get the file extension using fastapi
@app.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(response: Response, file: UploadFile = File(...)):
    filename = file.filename
    # Get the extension of the file
    ####
    _ , fileExtension = filename.rsplit('.', maxsplit=1)
    #File in bytes
    fileDataInBytes = file.file.read()

    #Get Token from Symbl.ai
    token = await getToken()

    #Get the AUTHENTICATION Header for the file
    fileHeader = makeAuthHeader(token, fileExtension)

    if fileHeader['Authorization'] == 'error':
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'message': 'File Extension not supported'}

    #Upload the file to Symbl.ai
    jobId, conversationId = await uploadFile(fileDataInBytes, fileHeader, fileExtension)
    print("Uploaded file to Symbl.ai")

    index = 0
    #Check if the file has been processed, If not sleep for 1 seconds and check again
    while await IsFileProcessedCompleted(jobId, fileHeader) is False:
        print(f"File {jobId} is not processed yet: {index} seconds", end='\r')
        index += 1
        await asyncio.sleep(1)
    print(f"File {jobId} is processed NOW")

    #Get the transcription result
    transcriptionResult = await getTranscriptionResult(conversationId, fileHeader)
    print("Got the transcription result: Sending to client")
    return {"message": transcriptionResult}

async def getToken() -> str:
    """
    Returns the access token from Symbl.ai
    """

    API_ID: Optional[str] = None
    API_SECRET: Optional[str] = None

    try:
        load_dotenv()
        API_ID = os.getenv('API_ID')
        API_SECRET = os.getenv('API_KEY')
    except Exception as e:
        print(f"Fetching KEY from .env file failed: {e}\n Please add Symbl.AI API_ID and API_KEY(API_SECRET) to .env file")
        load_dotenv()
        API_ID = os.getenv('API_ID')
        API_SECRET = os.getenv('API_KEY')

    PAYLOAD: Dict[str, Optional[str]] = {
    "type": "application",
    "appId": API_ID,
    "appSecret": API_SECRET
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(TOKEN_URL, data=json.dumps(PAYLOAD), headers=HEADERS) as response:
            resp = await response.json()
            return resp['accessToken']

async def uploadFile(fileSrc: bytes, fileHeader: Dict[str, str], fileExtension: str) -> Tuple[str, str]:
    """
    Uploads the file to Symbl.ai
    1st param returns jobId (for text processing status)
    2nd param returns conversationId (for text transcription result)
    """
    reqUrl = VID_REQUEST_URL if isAudioOrVideo(fileExtension) == 'video' else AUDIO_REQUEST_URL
    async with aiohttp.ClientSession() as session:
        async with session.post(reqUrl, headers=fileHeader, data=fileSrc) as response:
            resp = await response.json()
            return resp['jobId'], resp['conversationId']

async def IsFileProcessedCompleted(jobId: str, fileHeader: Dict[str, str]) -> bool:
    """
    Checks if the file has been processed
    1st param returns whether the file has been processed in boolean
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.symbl.ai/v1/job/{jobId}", headers=fileHeader) as response:
            resp = await response.json()
            return resp['status'] == 'completed'

async def getTranscriptionResult(conversationId: str, fileHeader: Dict[str, str]) -> List[str]:
    """
    Returns the transcription result
    1st param returns the transcription result in string
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.symbl.ai/v1/conversations/{conversationId}/messages", headers=fileHeader) as response:
            resp = await response.json()
            jsonMessageList = resp['messages']
            return ''.join(list(map(lambda jsonMessage: jsonMessage['text'] + " ", jsonMessageList)))

def isAudioOrVideo(fileExtension: str) -> str:
    if fileExtension in ['mp4', 'mov', 'avi']:
        return 'video'
    elif fileExtension in ['mp3', 'wav']:
        return 'audio'
    else:
        return 'unknown'