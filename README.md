![GitHub Logo](https://i.imgur.com/KoEzlLt.jpg)
# CSE 110 Team :: M^3 and C

This is an example video chat application built with [Twilio Video](https://www.twilio.com/docs/video) and React, using Hooks.

Learn how to build this entire application in the blog post [Build a Twilio Video Chat with React Hooks](https://www.twilio.com/blog/video-chat-react-hooks).

### Online Demo
online demo @ https://157.245.233.52:3000/

## Preparing the application

To run the application you will need a [Twilio account](https://www.twilio.com/try-twilio) and Node.js and npm installed. Start by cloning or downloading the repo to your machine.

```bash
git clone https://github.com/philnash/twilio-video-react-hooks.git
cd twilio-video-react-hooks
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file by copying the `.env.example`.

```bash
cp .env.example .env
```

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

## Running the application

Once you have completed the above you can run the application with:

```bash
npm run dev
```

This will open in your browser at [localhost:3000](http://localhost:3000).

### To run the app in Docker

This project comes **Docker ready** out of the box. [Docker](https://www.docker.com/)
is a software container platform. A Docker image contains information on everything
required to make an app run. This self-contained system makes it extremely easy to
ensure that your app runs on any OS without worrying about the dependency compatibility.

Regardless of where it’s deployed, _your app will always run the same_ as long as
Docker is installed on the machine.

1. Install Docker: https://docs.docker.com/engine/installation/

2. Clone the repo and move into the directory (see above)

3. Run the app in Docker.
    ```
    $ ./run-app-in-docker.sh
    ```
    
4. Yep, that's it. Visit `http://localhost:3000/` to checkout the app.

