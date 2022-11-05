const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const bcrypt = require('bcrypt')
var cors = require('cors')
require('dotenv').config({path: "../.env"});

//Variables for Mongoose Data Structures
  var {User, Coach, Admin, Student, Mentor} = require('../Database/User.js');
  var {Quiz, TakenQuiz, Question} = require('../Database/Quiz.js');
//=====================================

app.use(express.static("../Frontend/build"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

let environment = process.env
let database = environment.DATABASE || "test";
let username = environment.USER_NAME
let password = environment.USER_PASSWORD

// Database Setup and Verification Steps
    const uri = "mongodb+srv://" + username + ":" + password + "@casa-primary.mfffrek.mongodb.net/" + database + "?retryWrites=true&w=majority"
    console.log("Connecting to " + uri)
    try {
      mongoose.connect(uri);
    } catch (error) {
      console.log("Found an error")
      console.log(error)
    }

    serverConnection = 404
    mongoose.connection.on('connected', () => {
      
      console.log("Connected to " + database + " database.");
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
    res.send("ok").status(200);
});

saltRounds = 12
//User related functions
  //Deprecated
  app.post('/api/user/create_user', async (req, res) => {

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
            email: email,
            password : hash,
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

  app.post("/api/user/login", async (req, res) => {

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


  app.get('/api/user/fetch_user', async(req, res) => {
    var user = await User.findById(req.params.id).exec();

    if (user == undefined){
      res.status(500);
    } else {
      res.send(JSON.stringify(user)).status(200);
    }
    
  });

  app.get('/api/user/modify_user_profile', async(req, res) => {

  })
//====================================

//Coach Functionality

app.post('/api/coach/create_coach', async(req, res) => {
  const {username, password, email, madeQuizzes, school, teams} = req.body;

  var potentialUsers = await Coach.find({$or:[{username:username}, {email:email}]}).exec();

  if(potentialUsers.length != 0){
    console.log("Email or username already appears in database");
    res.send("Found previously existing user").status(201);
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      
      var coach = new Coach({
        username: username,
        email: email,
        password : hash,
        madeQuizzes: madeQuizzes,
        teams: teams,
        school: school
      })

      coach.save(function (err, user){
        if (err) {
          res.end().status(401);
          return console.error(err);
        }
      });
      res.send(coach._id).status(201)
    });
  }
});

  app.post('/api/coach/get_coaches_teams', async(req, res) => {
    const { userID } = req.body;

    await User.find(
      {"_id": userID}
    ).exec().then(user => {
      if(!user) {return res.send("ID not found").status(401);}
      else {
        var teamsIDS = user.teams;
        console.log(teamsIDS);
      }
    })

    return res.status(201);

  });

//=================

//Dev Functionality

  app.post('/api/dev/create_user', async(req, res) => {
    
  });

  app.post('/api/dev/create_assessment', async(req, res) => {

  });

  app.get('/api/dev/simpleGet', async(req, res) => {
    res.status(200).send("OK")
  });

//====================

//Admin Functionality
  const Validation = require('../Database/ValidationCode')
  const Team = require('../Database/Team.js')

  function generateValidationCode(){
    var ret = ""
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var specialCharacters = '!@#$%^&*()'
    for(var i = 0; i < 8; i++){
      ret += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    for(var i = 0; i < 4; i++){
      ret += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }

    ret = ret.split('').sort(function(){return 0.5-Math.random()}).join('');

    return ret;
  }

  app.get('/api/admin/generate_coach_validation_code', async(req, res) => {

    
    var ret = generateValidationCode();

    var code = new Validation({
      value: ret,
      validationType: true
    })

    code.save(function (err, user){
      if (err) {
        res.end().status(401);
        return console.error(err)
      }
    });
    
    res.send(ret).status(200)
  })

  app.get('/api/admin/generate_mentor_validation_code', async(req, res) => {
    var ret = generateValidationCode();

    var code = new Validation({
      value: ret,
      validationType: false
    })

    code.save(function (err, user){
      if (err) {
        res.end().status(401);
        return console.error(err)
      }
    });

    res.send(ret).status(200)
  })

  app.get('/api/admin/activate_user_account', async(req, res) => {

  });

  app.get('/api/admin/deactivate_user_account', async(req, res) => {

  });

  app.get('/api/admin/create_notification', async(req, res) => {

  });

  app.post('/api/admin/register_team', async(req, res) => {
    const { national_id, name, coach } = req.body;

      // app.post('/api/dev/update_coach', async(req, res) => {
      //   const { id } = req.body;
      //   const doc = await User.findById(id);
      //   doc.school = "Test"
      //   doc.save()
      //   res.send("Done")
      // })

    var team = new Team({
      national_id: national_id,
      name: name,
      coach: coach
    })

    //See if coach exists
    const c = await User.findById(coach);
    if(!c){
      return res.send("Coach does not exist").status(401)
    }
    var teamsArr = c.teams

    //See if team exists
    const t = await Team.findOne({"national_id": national_id});
    if(t){
      return res.send("Team already exists").status(401)
    }
    team.save()

    if(teamsArr == undefined){
      teamsArr = [national_id]
    } else {
      teamsArr.push(national_id)
    }
    c.teams = teamsArr;
    c.save()

    res.send("Successfully registered team").status(200)
    
  }); 

//===================

//Student Functionality

  app.get('/api/coach/create_student', async(req, res) => {

  });

//===================

//Mentor
  app.post('/api/mentor/create_mentor', async(req, res) => {
    const {username, password, email, madeQuizzes, teams, speciality} = req.body;

    var potentialUsers = await Mentor.find({$or:[{username:username}, {email:email}]}).exec();

    if(potentialUsers.length != 0){
      console.log("Email or username already appears in database");
      res.send("Found previously existing user").status(201);
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        
        var mentor = new Mentor({
          username: username,
          email: email,
          password : hash,
          madeQuizzes: madeQuizzes,
          speciality: speciality,
          teams: teams
        });
  
        mentor.save(function (err, user){
          if (err) {
            res.end().status(401);
            return console.error(err);
          }
        });
        res.send(mentor._id).status(201)
      });
    }
  });

//===================

//Assessment Functionality

app.post('/api/assessment/add_assessment', async(req, res) => {

});

app.get('/api/assessment/get_assessment', async(req, res) => {

});

app.get('/api/assessment/find_assessments_by_author', async(req, res) => {

});

//========================

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
});

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
const PORT = process.env.PORT || 3001;

server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = server;