## GIPHY Coding Challenge

### [View the app on Heroku](https://radiant-plains-49238.herokuapp.com/)  :eyes:

This project is a full stack web application that allows users to search, save, and categorize GIFs from the GIPHY API. It was built using the following technologies:

- **Material UI** for Design/UX
- **React** as a JS framework
- **Redux** for state management
- **Thunks** as an asynchronous middleware for Redux
- **Passport** for authentication and session management
- **Express** as a web framework
- **NodeJS** for a server-side environment
- **Mongoose** as a MongoDB ODM for Node
- **MongoDB** as a database

This project was also bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Running locally

#### 1. Install local dependencies

This project requires the following be installed on your machine:
- [MongoDB](https://docs.mongodb.com/manual/installation/) ~v4.0.0
- Node ~v8.12.0
- npm (My version is 6.4.1)

#### 2. Run MongoDB

[Run `mongod`](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-os-x/#run-mongodb) locally on your machine. It'll start on a port that's specified in your `mongod.conf` file.

If that port does not match the port specified in the `MONGODB_URI` environment variable within the `.env` file, you'll need to update it so they match.

Leave `mongod` running and do the following in another terminal.

#### 3. Install project dependencies

```
npm install
```
All the project's specified dependencies will be installed.

#### 4. Start the app!

```
npm run app
```
This command will start both the client and server apps. You can also run each app seperately in different terminals if you wish:
```
npm start
node server/index.js
```

### And that's it!

Thank you for giving me the opportunity to participate!
