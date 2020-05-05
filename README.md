<img src="https://i.imgur.com/KoEzlLt.jpg" alt="GitHub Logo" width="800"/>

# CSE 110 Team :: M^3 and C

This is an interactive video chat application that lets you explore the UCSD Library walk from the comfort of your home.

## Online Demo
[https://tritontalk.com](https://tritontalk.com)

## Preparing the application

To run the application you will need a [Twilio account](https://www.twilio.com/try-twilio) and Node.js and npm installed. 
This app uses docker and docker-compose to run.
Start by cloning or downloading the repo to your machine.

```bash
git clone https://github.com/Triton-Talk/tritontalk.git
cd tritontalk
```

Install the dependencies:

```bash
./setup.sh
```

```python
Create a `.env` file in the `backend/` directory.

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

```

## Running the application

Once you have completed the above you can build the application with:

```bash
./test.sh
```

Navigate to [localhost] (localhost). 

To close the app, use <Ctrl-C> to close the docker-compose process in the shell.
