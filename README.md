# - Mentalyc

- Mentalyc is a tool that helps therapists automatically write their therapy notes using AI.

**Link to project:** https://agba-tracemycodes-e-commerce-product-page.netlify.app/

![Design preview for the E-commerce product page](https://i.ibb.co/bscMYRQ/Screenshot-2024-01-25-at-7-00-10-AM.png)

## How This was developed:

**Tech used:** React, Tailwind, Typescript, Node, Express, Web Sockets, AWS, MongoDB.

This React application, is built using a mobile-first approach, it is designed to meet the product requirements of therapists, providing an optimal user experience during the session upload process. It leverages real-time communication through WebSockets to update the progress of audio files obtained from the browser's Media API to an AWS S3 bucket server. The real-time connection is facilitated by socket.io and an Express server hosted on an EC2 instance. The mobile-first design prioritizes the therapist's journey, enhancing the overall user experience of the application.

users are able to:

- See all past recorded session from their dashboard.
- Click on the record button to open  a modal to fill in a current session detail.
- View if they have their Audio Mic access of their PC enabled.
- Record an audio session and visually see that a record is in place.
- Upload a record and see the progress for large files.
- Delete a past session.
- Carry out all this CRUD operarion with a persisting Database.


## Optimizations

Future optimizations which can be included to this application includes but not limited to.

- Integrating a flow where users are able to choose among the available audio devices for their device to record, this might include headphones or external Mic devices.
- Adding a speech to text transcript for recorded audios.

## Demo.
![image]([https://i.postimg.cc/LXD6tj0K/Screenshot-2023-03-09-at-05-49-18.png](https://i.ibb.co/bscMYRQ/Screenshot-2024-01-25-at-7-00-10-AM.png))

![image](https://i.postimg.cc/C5Wyk1Yp/IMG-8372.png)



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
