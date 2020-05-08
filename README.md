<img src="https://i.imgur.com/KoEzlLt.jpg" alt="GitHub Logo" width="800"/>

# CSE 110 Team :: M^3 and C

This is an interactive video chat application that lets you explore the UCSD Library walk from the comfort of your home.

## Online Demo
[https://tritontalk.com](https://tritontalk.com)

## Preparing the application 

To run the application you will need Node.js and npm installed. 
Docker and docker-compose are only required if building for production.
Start by cloning or downloading the repo to your machine.

```bash
git clone https://github.com/Triton-Talk/tritontalk.git
cd tritontalk
```

#### Note: After install, go to localhost and click on the splash page to login and see buttons

## Installation and running the application (For Development i.e. locally)
### Option 1 (With Node) HOT-RELOADING
You will need two terminal windows open
```bash
cd backend
npm install
npm run start
```
Open another terminal window
```bash
cd client
npm install
npm run start
```
### Option 2 (With Docker) NO HOT-RELOADING

Install the dependencies:

```bash
./setup.sh
./test.sh
```

## Setting up Twilio (Not required -- .ENV should be done for you)
```python
Create a `.env` file in the `backend/` directory.

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

```





## Updating the server (For Production Only)
Automatically DockerHub builds 'master' from the Triton-Talk / tritontalk GitHub Repo.
SSH into the server for TritonTalk.com and run:
```bash
./stopAndPull.sh
```
The server should be up to date
