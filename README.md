# - Mentalyc

- Mentalyc is a tool that helps therapists automatically write their therapy notes using AI.

**Link to project:** https://mentalyc.vercel.app/
**Link to video presentation:** https://www.loom.com/share/ef9b32a643334690a27efb9afafcd9b4?sid=b54bdf0c-efa2-4c48-9171-9d1a5895695d

![Design preview for the E-commerce product page](https://i.ibb.co/ZRjGVH2/Screenshot-2024-01-25-at-7-09-29-AM.png)

## How This was developed:

**Tech used:** React, Tailwind, Typescript, Node, Express, Web Sockets, AWS, MongoDB.

This React application, is built using a mobile-first approach, it is designed to meet the product requirements of therapists, providing an optimal user experience during the session upload process. It leverages real-time communication through WebSockets to update the progress of audio files obtained from the browser's Media API to an AWS S3 bucket server. The real-time connection is facilitated by socket.io and an Express server hosted on an EC2 instance. The mobile-first design prioritizes the therapist's journey, enhancing the overall user experience of the application.

## users are able to:

- Navigate to the dashboard to view all previously recorded sessions.
Record New Session.
- Initiate a new session by clicking on the record button, which opens a modal to input current session details.
- Verify if the audio microphone access on the PC is enabled before starting a recording.
- Perform an audio recording and visually confirm that the recording is in progress.
- Upload a recorded session and monitor the progress, especially for larger files.
- Delete a past session from the dashboard, demonstrating the ability to perform CRUD operations.
- Ensure that all CRUD operations, including session creation, retrieval, update, and deletion, are reflected in a persisting database.


## Optimizations

Future optimizations which can be included to this application includes but not limited to.

- Implement a feature allowing users to choose from available audio devices, including options such as headphones or external microphones, to provide more flexibility in recording sessions.
- Integrate a speech-to-text transcription capability for recorded audio sessions, enabling users to access written transcripts of their recordings for improved accessibility and usability.
- Include form validation to the session form to prevent null/empty field submission.

## Demo.
![image](https://i.ibb.co/bscMYRQ/Screenshot-2024-01-25-at-7-00-10-AM.png)

![image](https://i.ibb.co/fQy1xcP/Screenshot-2024-01-25-at-7-04-47-AM.png)

![image](https://i.ibb.co/Q9qX3cy/Screenshot-2024-01-25-at-7-06-33-AM.png)

![image](https://i.ibb.co/ZRjGVH2/Screenshot-2024-01-25-at-7-09-29-AM.png)



# Getting Started In Your Local Environment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using TS template.

* git clone the repository.

```
  $ git clone https://github.com/tracemycodes/mentalyc.git
```

- open `mentalyc`.

```
  $ cd mentalyc
```

- install dependencies.
```
 $ npm install
```

- install dependencies for both server & client cd client/cd server then run.
```
 $ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode and runs both server/client. client on port 3000, server on the defined port of your env\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## The following env values are required for the client floder
- REACT_APP_API_URL: "the value of your server port - http://localhost:8080
"
## The following env values are required for the server & root folder
- NODE_ENV=development
- PORT=8080
- MONGO_URI='mongodb access key'
- AWS_ACCESS_KEY_ID=''
- AWS_SECRET_ACCESS_KEY=''
- AWS_REGION=''
- S3_BUCKET_NAME=''

