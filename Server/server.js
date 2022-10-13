const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bcrypt = require('bcrypt')
require('dotenv').config({path: "../.env"});

//Variables for Mongoose Data Structures
  const User = require('../Database/User.js');
  const {Quiz, Question} = require('../Database/Quiz.js');
//=====================================

app.use(express.static("../Frontend/build"))

let environment = process.env

// Database Setup and Verification Steps
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

app.get("/api", (req, res) => {
    res.json({message:"Test"});
});

saltRounds = 12
//User related functions
  app.post('/api/create_user', async (req, res) => {
    const {username, password, email} = req.body;

    var potentialUsers = await User.find({$or:[{username:username}, {email:email}]}).exec();

    if(potentialUsers.length != 0){
      console.log("Email or username already appears in database");
      res.send("Found previously existing user").status(201);
    } else {
  
      //Make new user
      //Hash password, then save new account
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
          var user = new User({
            username: username,
            password : hash,
            email: email
          })
    
          user.save(function (err, user){
            if (err) {
              res.end().status(401);
              return console.error(err);
            }
          });
          res.send(user._id).status(201)
      });
    }

  });

  app.post("/api/login", async (req, res) => {

      const {username, password} = req.body;

      await User.findOne(
        {username: username}
      ).exec().then(user => {
        if(!user) {
          return res.send("Username not found").status(401);
        } else {
          bcrypt.compare(req.body.password, user.password, (error, result) => {
            
            if(result) {
              res.send(user._id).status(201);
            } else {
              res.send("Password mismatch").status(401);
            }
          });
        }
      });
  });


  app.get('/api/display_user/:id', async(req, res) => {
  
    var user =  await User.findById(req.params.id).populate('friends reviews wishlist library suggested').exec();
    res.send(JSON.stringify(user));
  });
//====================================

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
});

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});