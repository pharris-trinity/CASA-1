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
app.use(cors());

let environment = process.env
let database = environment.DATABASE || "devops";
let username = environment.USER_NAME
let password = environment.USER_PASSWORD

// Database Setup and Verification Steps
    const uri = "mongodb+srv://" + username + ":" + password + "@casa-primary.mfffrek.mongodb.net/" + database + "?retryWrites=true&w=majority"
    try {
      mongoose.connect(uri);
    } catch (error) {
      console.log("Found an error")
      console.log(error)
    }

    mongoose.connection.once('open', () => {
      console.log(`Connected to ${database} database`);
      app.emit('ready'); 
    })

    serverConnection = 404
    mongoose.connection.on('connected', () => {
      serverConnection = 200
    })

    mongoose.connection.on('error', function (err) {
      serverConnection = 501
      //Failed
    })

    app.get('/api/database', (req, res) => {
      res.sendStatus(serverConnection);
    })
//===================================

app.get("/api", (req, res) => {
    res.status(202).send("in correct server");
});

saltRounds = 12
//User related functions
  //Deprecated
  app.post('/api/user/create_user', async (req, res) => {

    // const {username, password, email} = req.body;

    // var potentialUsers = await User.find({$or:[{username:username}, {email:email}]}).exec();

    // if(potentialUsers.length != 0){
    //   console.log("Email or username already appears in database");
    //   res.send("Found previously existing user").status(201);
    // } else {
  
    //   //Make new user
    //   //Hash password, then save new account
    //   bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
    //       var user = new User({
    //         username: username,
    //         email: email,
    //         password : hash,
    //       })
    
    //       user.save(function (err, user){
    //         if (err) {
    //           res.end().status(401);
    //           return console.error(err);
    //         }
    //       });
    //       res.send(user._id).status(201)
    //   });
    // }
    return res.status(401).send("Method Deprecated - Please use one of the type-specific user creation methods")
  });

  app.post("/api/user/login", async (req, res) => {

      const {username, password} = req.body;

      await User.findOne(
        {username: username}
      ).exec().then(user => {
        if(!user) {
          return res.status(404).send("Username not found");
        } else {
          bcrypt.compare(req.body.password, user.password, (error, result) => {
            
            if(result) {
              return res.status(201).send(user);
            } else {
              return res.status(401).send("Password mismatch");
            }
          });
        }
      });
  });

  app.post('/api/user/fetch_user', async(req, res) => {
    const {id} = req.body
    var user = await User.findById(id).exec();

    if (user == undefined){
      return res.sendStatus(500);
    } else {
      return res.status(200).send(user);
    }
  });

  app.get('/api/user/modify_user_profile', async(req, res) => {

  })
//====================================

//Coach Functionality

app.post('/api/coach/create_coach', async(req, res) => {
  const {username, displayname, password, email, madeQuizzes, school, teams, validationCode} = req.body;

  var potentialUsers = await Coach.find({$or:[{username:username}, {email:email}]}).exec();

  if(potentialUsers.length != 0){
    console.log("Email or username already appears in database");
    return res.status(100).send("Found previously existing user");
  } else {

    const code = await Validation.findOne({"value": validationCode});
    if(!code){
      return res.status(404).send("Validation Code provided does not exist")
    } else {
      if(!code.validationType) {
        return res.status(401).send("Validation Code provided does not authorize a coach's registration")
      } else {
        Validation.deleteOne({"value": validationCode}).then( () => {
          console.log("Code Deleted")
        }).catch((err) => {
          console.log(err)
        })
      }
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      
      var coach = new Coach({
        username: username,
        displayname: displayname,
        email: email,
        password : hash,
        madeQuizzes: madeQuizzes,
        teams: teams,
        school: school
      })

      coach.save(function (err, user){
        if (err) {
          res.status(401).end();
          return console.error(err);
        }
      });
      

      return res.status(201).send(coach)
    });
  }
});

  app.post('/api/coach/get_coaches_teams', async(req, res) => {
    const { userID } = req.body;

    await User.find(
      {"_id": userID}
    ).exec().then(user => {
      if(!user) {return res.status(401).send("ID not found");}
      else {
        var teamsIDS = user.teams;
        return res.send(teamsIDS).status(201);
      }
    })
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
  const Validation = require('../Database/ValidationCode.js')
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
        res.status(401).end();
        return console.error(err)
      }
    });
    
    res.status(201).send(code)
  })

  app.get('/api/admin/generate_mentor_validation_code', async(req, res) => {
    var ret = generateValidationCode();

    var code = new Validation({
      value: ret,
      validationType: false
    })

    code.save(function (err, user){
      if (err) {
        res.status(401).end();
        return console.error(err)
      }
    });

    res.status(201).send(code)
  })

  app.post('/api/admin/check_code_existence', async(req, res) => {
    const { validationCode } = req.body
    const code = await Validation.findOne({"value": validationCode});
    if(!code){
      return res.sendStatus(404)
    } else {
      return res.sendStatus(200)
    }
  })

  app.get('/api/admin/activate_user_account', async(req, res) => {

  });

  app.get('/api/admin/deactivate_user_account', async(req, res) => {

  });

  app.get('/api/admin/create_notification', async(req, res) => {

  });

  app.post('/api/admin/register_team', async(req, res) => {
    const { national_id, name, school, district, rotc, coach } = req.body;

    var team = new Team({
      national_id: national_id,
      name: name,
      school: school,
      district: district,
      rotc: rotc,
      coach: coach
    })

    //See if coach exists
    const c = await User.findById(coach);
    if(!c){
      return res.status(401).send("Coach does not exist")
    }

    var teamsArr = c.teams
    if(teamsArr == undefined){
      teamsArr = [national_id]
    } else if (teamsArr.includes(national_id)){
      return res.status(201).send("Coach already owns this team")
    } else {
      teamsArr.push(national_id)
    }

    //See if team exists
    const t = await Team.findOne({"national_id": national_id});
    if(t){
      return res.status(401).send("Team already exists")
    }
    team.save()

    c.teams = teamsArr;
    c.save()

    return res.status(200).send("Successfully registered team")
    
  }); 

  app.post('/api/mentor/get_mentors_teams', async(req, res) => {
    const { userID } = req.body;

    await User.find(
      {"_id": userID}
    ).exec().then(user => {
      if(!user) {return res.status(401).send("ID not found");}
      else {
        var teamsIDS = user.teams;
        return res.send(teamsIDS).status(201);
      }
    })
  });

  app.get('/api/collections', (req,res,next)=>{
    mongoose.connection.db.listCollections().toArray().then(collection => {
        const dataArr = []; 
        
        collection.forEach(el => dataArr.push(el.name));
          for (let i = 0; i < dataArr.length; i++)
          {
            console.log("Collection: " + dataArr[i]);
            if (dataArr[i] == "teams")
            mongoose.connection.db.listCollections({name : ''})
            
              
          }
        res.status(200).json({ status: 'success', data: { dataArr } })
    });
})

app.post('/api/team/get_team', async(req, res) => {
  const { teamID } = req.body;
  const team = await Team.findOne({"national_id": teamID});
  console.log(team)
  if(!team){
    return res.sendStatus(404)
  } else {
    return res.status(200).send(team);
  }
  
})

app.post('/api/team/add_student_to_team', async(req, res) => {
  //Takes in a team ID and a student ID and updates the team and the student
  const {team_id, student_id} = req.body

  const team = await Team.findOne({"national_id": team_id})
  const user = await User.findOne({"_id": student_id})

  if(!team){
    return res.status(501).send("No team found that matches that ID")
  }

  if(!user){
    return res.status(502).send("No user found that matches that ID")
  }

  if(user.team != -1){
    return res.status(503).send("User already has a team registered to them")
  }

  if(user.team == team_id){
    return res.status(201).send("User is already registered to this team")
  }

  var members = team.members
  if(members != undefined){
    members.push(student_id)
  }
  team.members = members
  team.save()

  user.team = team_id
  user.save()
  //Save the updated user and team

  return res.status(200).send("Updated user and team successfully")
})

app.post('/api/team/remove_student_from_team', async(req, res) => {
  //Takes in a team ID and a student ID and if the student is in the team then it removes the student from the team
  const {team_id, student_id} = req.body

  const team = await Team.findOne({"national_id": team_id})
  const user = await User.findOne({"_id": student_id})

  if(!team){
    return res.status(501).send("No team found that matches that ID")
  }

  if(!user){
    return res.status(502).send("No user found that matches that ID")
  }

  if(user.team == -1){
    return res.status(503).send("User has no team registered to them")
  }

  if(user.team != team_id){
    return res.status(201).send("User is not in that team")
  }

  var members = team.members
  if(members != undefined){
    members.remove(student_id)
  }
  team.members = members
  team.save()

  user.team = -1
  user.save()

  return res.status(200).send("Removed user from team")

})

app.get('/api/stored', async (req, res) => {
  try {
    const ads = await Teams.find({"national_id": teamID});

    return res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
      });
    } catch(err) {
      console.log(err);
    res.status(500).json({ error: 'server error' });
    }


  /*console.log(req.body);
  mongoose.connection.db.collection('quotes').then(req.body, (err, data) => {
      if(err) return console.log(err);
      res.send(('saved to db: ' + data));
      res.status(200).json({ status: 'success', data: { data } })
  })*/
});

app.post('/api/get-data', function(req, res, next) {
    
  
  mongoose.connection.db.collection('teams').find({active: true}).toArray().then(collection => {
    
    
    res.status(200).json({ collection})
});
  
});

app.post('/api/get-MentorData', function(req, res, next) {
    
  
  mongoose.connection.db.collection('users').find({username: "test mentor"}).toArray().then(collection => {
    
    console.log("Here's mentors: " + collection);
    res.status(200).json({ collection})
});
  
});

//===================

//Student Functionality

  app.post('/api/student/create_student', async(req, res) => {
    const {username, displayname, password, email} = req.body;

    const team = -1;

    var potentialUsers = await Student.find({$or:[{username:username}, {email:email}]}).exec();

    if(potentialUsers.length != 0){
      console.log("Email or username already appears in database");
      res.status(302).send("Found previously existing user");
    } else {
  
      //Make new user
      //Hash password, then save new account
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
          var student = new Student({
            username: username,
            displayname: displayname,
            email: email,
            password : hash,
            team: team
          })

          student.save(function (err, user){
            if (err) {
              return res.status(401).end();
            }
          });
          res.status(201).send(student)
      });
    }
  });

  //get specifically floyd leech's information //testing, replace later with actual user
  app.post('/api/getfleech', function(req, res, next) {
    
    mongoose.connection.db.collection('users').find({username: "fleech"}).toArray().then(collection => {  
      //console.log("check student: " + collection);
      res.status(200).json({ collection})
    });
  });

  //search for team based on national id
  app.post('/api/teamsearch/:teamid', async(req,res)=>{
    const teamnum = Number(req.params.teamid); //convert string from url into a number
    const team = await Team.find({national_id: teamnum})
    //console.log(team)
    if(!team){
      console.log("no team was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(team);
    }
  })

  //search for coach based on coach's object id to get madequizzes field: WIP status, may delete
  //currently objid for assessment field is janky, needs to have a create api
  app.post('/api/coachsearch/:oid', async(req,res)=>{
    const coach = await User.findById(req.params.oid); //findById(id)
    //console.log(coach)
    if(!coach){
      console.log("no coach was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(coach);
    }
  })

  //get all quizzes by authorid (will work once createquiz api is made?)
  app.post('/api/quizsearch/:aoid',async(req,res)=>{
    //const quizzes = await Quiz.find(req.params.aoid); //findById(id)
    //console.log(quizzes)
    mongoose.connection.db.collection('quizzes').find({authorId: req.params.aoid}).toArray().then(collection => {  
      //console.log("check student: " + collection);
      res.status(200).json({ collection})
    });
  })


//===================

//Mentor
  app.post('/api/mentor/create_mentor', async(req, res) => {
    const {username, displayname, remote, zipcode, password, email, madeQuizzes, teams, speciality, validationCode} = req.body;

    var potentialUsers = await Mentor.find({$or:[{username:username}, {email:email}]}).exec();

    if(potentialUsers.length != 0){
      console.log("Email or username already appears in database");
      res.status(301).send("Found previously existing user");
    } else {

      const code = await Validation.findOne({"value": validationCode});
      if(!code){
        return res.status(401).send("Validation Code provided does not exist")
      } else {
        if(code.validationType) {
          return res.send("Validation Code provided does not authorize a coach's registration").status(401)
        } else {
          await Validation.deleteOne({"value": validationCode})
        }
      }

      bcrypt.hash(password, saltRounds, (err, hash) => {
        
        var mentor = new Mentor({
          username: username,
          displayname: displayname,
          email: email,
          remote: remote,
          zipcode: zipcode,
          password : hash,
          madeQuizzes: madeQuizzes,
          speciality: speciality,
          teams: teams
        });
  
        mentor.save(function (err, user){
          if (err) {
            return res.status(401).end();
          }
        });
        res.status(201).send(JSON.stringify(mentor))
      });
    }
  });

//===================

//Assessment Functionality

app.post('/api/assessment/add_assessment', async (req, res) => {

});

app.get('/api/assessment/get_assessment', async(req, res) => {

});

app.get('/api/assessment/find_assessments_by_author', async(req, res) => {

});

//========================

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html')).status(404);
});

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
const PORT = process.env.PORT || 3001;

app.on('ready', function() { 
  app.listen(PORT, function(){ 
      console.log(`Server listing on ${PORT}`); 
      app.emit("appStarted");
  }); 
});

module.exports = app;
