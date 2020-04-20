![GitHub Logo](https://i.imgur.com/KoEzlLt.jpg)

# CSE 110 Team :: M^3 and C

This is an example video chat application built with [Twilio Video](https://www.twilio.com/docs/video) and React, using Hooks.

## Online Demo
[https://tritontalk.com](https://tritontalk.com)

## Preparing the application

To run the application you will need a [Twilio account](https://www.twilio.com/try-twilio) and Node.js and npm installed. Start by cloning or downloading the repo to your machine.

```bash
git clone https://github.com/philnash/twilio-video-react-hooks.git
cd twilio-video-react-hooks
```

Install the dependencies:

```bash
npm --prefix client/ install
npm --prefix backend/ install
```

Create a `.env` file in the `backend/` directory.

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

## Running the application

Once you have completed the above you can build the application with:

```bash
./build.sh
```

Press enter at the prompt to start the system immediately and navigate to [localhost] (localhost)

Please note that this project requires Docker to be run in its current state.

Docker is a software container platform. A Docker image contains information on everything
required to make an app run. This self-contained system makes it extremely easy to
ensure that your app runs on any OS without worrying about the dependency compatibility.

Regardless of where it’s deployed, _your app will always run the same_ as long as
Docker is installed on the machine.
