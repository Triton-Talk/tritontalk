<img src="https://i.imgur.com/KoEzlLt.jpg" alt="GitHub Logo" width="800"/>

# CSE 110 Team :: M^3 and C

This is an interactive video chat application that lets you explore the UCSD Library walk from the comfort of your home.
## Youtube Video
https://www.youtube.com/watch?v=zT_c2fCU5U8&t=243s
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

After cloning, run the following command:  
```bash
./setup.sh
```

This will download all the required dependencies.

#### Note: After install, go to localhost and click on the splash page to login and see buttons

## Installation and running the application (For Development i.e. locally)

### Option 1 Run through Docker (with hot-reloading of backend and frontend changes)

Run 
```bash
./development.sh
```

On first run, this will take some time to start, so be patient as it build the preliminary containers. 
Subsequent runs will be much faster, and the containers can be left running for as long as necessary (cannot do this natively)

To see logs, run 
```bash
./logs.sh
```
It will show the 15 most recent logs and then attach to the containers so you can see live logging. 
To disconnect, press <Ctrl-C> at any time. This will not close the containers.

To bring the containers offline, use Docker's kill command to close the containers. 
```bash
docker kill tttvlw-nginx-development tttvlw-backend-development tttvlw-frontend-development
```

### Option 2 (Running natively) HOT-RELOADING

You will need two terminal windows open, in addition to wherever you are developing. This should only be used if you cannot 
install Docker for some reason.

In the first window, do the following: 
```bash
cd backend
npm install
npm run dev 
```

In the second window, do the following: 
```bash
cd client
npm install
npm run dev 
```

### Testing production-ready builds

Run the following commands:

```bash
./setup.sh
./production.sh
```

This will emulate a production build with NGINX proxying to the node.js backend and serving the front-end statically. 
It does not support hot-reloading. Use this only to test before pushing master.

## Setting up Twilio (Not required -- .ENV should be done for you)
Create a `.env` file in the `backend/` directory.

### Credentials

You will need your Twilio Account SID, API Key and API secret. 
The Account SID is available in your [Twilio console](https://www.twilio.com/console).
Add it to your `.env` file.

The API Key and API Secret can be created under [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). 
Create a key pair and add them to the `.env` file too.

Next, you will need to set up a Mongo database. Put username, password, and host for the database in the `.env` file.

Finally, set up a Firebase project and give it Authentication services. Keys for this will also need to go in the `.env` file.



## Updating the server (For Production Only)
To deploy, you will need to first merge your changes to master and push to the GitHub. Following this, run 

```bash
./build_react.sh
```

Upon prompting, press 'y' to copy your changes to the production server.

DockerHub automatically builds the backend from the 'master' branch of the tritontalk.git GitHub Repo.

SSH into the tritontalk.com server. 
There should be a new folder at the ~/ directory called build_{USERNAME} where USERNAME is your username.
Remove the old build/ folder and rename this folder to build/. 
Then run the following script

```bash
sudo ./stopPullStartCopyBuild.sh
```

It must be run with sudo.

The server should now be up to date.
