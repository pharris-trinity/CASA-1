const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require('dotenv').config({path: "../.env"});

//Variables for Mongoose Data Structures
  const User = require('../Database/User.js');
  const {Quiz, Question} = require('../Database/Quiz.js');
//=====================================

app.use(express.static("../Frontend/build"))

let environment = process.env

// Server Setup and Verification Steps
  const uri = "mongodb+srv://" + environment.USER_NAME + ":" + environment.USER_PASSWORD + "@casa-primary.mfffrek.mongodb.net/" + environment.DATABASE + "?retryWrites=true&w=majority"
  try {
    mongoose.connect(uri);
  } catch (error) {
    console.log(error)
  }

  serverConnection = 404
  mongoose.connection.on('connected', () => {
    console.log("Connected to " + environment.DATABASE + " database.");
    serverConnection = 201
  })

  mongoose.connection.on('error', function (err) {
    serverConnection = 501
    //Failed
  })

  app.get('/api/database', async (req, res) => {
    res.end().status(serverConnection);
  })
//===================================

app.get("/api", (request, response) => {
    response.json({message:"Test"});
});

app.get("/api/create_user", (req, res) => {
    response.json({message:"Create User Test"})
})

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
});

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});