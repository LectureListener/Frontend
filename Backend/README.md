Pre-requisite
1. Install docker
2. Get Symbl API ID, API Secret

### .env Configuration
Insert Symbl API key inside `Backend/app/.env` file

### How to deploy
1. Goto PATH `~/DirectoryWhereYouInstalledLectureListener/LectureListener/Backend`
2. Run `docker build -t lectureListener .`
3. Run `docker run -p 5000:5000 lectureListener`

### Routes
- / (GET) should be used to GET the default route. 
- /upload (POST) used to POST audio/video to the Symbl AI server.
- /transcription (POST) used to store transcription result to the database. It will return a json file {'page': index of the page for transcription/{page}}.
    - Example. if it is page 1 -> transcription/1
- /transcription/{page} (GET) used to GET previous transcription result to the database. It will return a json file of stored transcription { 'response' : stored transcription}
