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
              return res.status(201).send({_id: user._id, school: user.school, username: user.username, displayname: user.displayname, usertype: user.usertype});
            } else {
              return res.status(401).send("Password mismatch");
            }
          });
        }
      });
  });

  app.post("/api/user/fetchUsername", async (req, res) => {

    const {username} = req.body;

    await User.findOne(
      {username: username}
    ).exec().then(user => {
      if(!user) {
        return res.status(404).send("Username not found");
      } else {
        return res.status(200).send(username);
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

    await Coach.find(
      {"_id": userID}
    ).exec().then(user => {
      if(!user) {return res.status(401).send("ID not found");}
      else {
        //var teamsIDS = user.teams;
        return res.send({teams: user.teams}).status(201);
      }
    })
  });

  app.post('/api/coach/get_coaches_students', async(req, res) => {
    const { userID } = req.body;
  
    const students = await Student.find(
      {"coachID": userID} 
    )
      if(!students) {return res.status(401).send("No students found");}
      else {
        console.log(students);
        return res.send(students).status(201);
      }
  })

  app.post('/api/coach/get_all_mentors', async(req, res) => {
    const { usertypeInput } = req.body;

    const mentors = await Mentor.find(
      {"usertype": usertypeInput} 
    )
    console.log("mentors: ",  mentors, "End of mentors", mentors.typeof)
    if(!mentors) {
      console.log("Empty Mentors List")
      return res.status(401).send("No mentors found");
  }
    else {
      console.log(mentors);
      return res.send(mentors).status(201);
    }
  })

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

  app.post('/api/admin/create_admin', async(req, res) => {
    const {username, displayname, password, email} = req.body;

    var potentialUsers = await Admin.find({$or:[{username:username}, {email:email}]}).exec();

    if(potentialUsers.length != 0){
      console.log("Email or username already appears in database");
      res.status(302).send("Found previously existing user");
    } else {
  
      //Make new user
      //Hash password, then save new account
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        
          var admin = new Admin({
            username: username,
            displayname: displayname,
            email: email,
            password : hash
          })

          admin.save(function (err, user){
            if (err) {
              return res.status(401).end();
            }
          });
          res.status(201).send(admin)
      });
    }
  })

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
      coach: coach,
      //alternates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
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
    console.log("server console log in register_team: ", team)

    c.teams = teamsArr;
    c.save()

    return res.status(200).send("Successfully registered team")
    
  }); 


  app.post('/api/mentor/self_assessment_update', async(req, res) => {
    const { ment_id, windowsRating, windowsServerRating, linuxRating, networkingRating, securityConseptsRating } = req.body;
    console.log("ment_id: ", ment_id)
    const user = await User.findOne({"_id": ment_id})
    console.log(user);
    
      user.windowsRating = windowsRating
      user.windowsServerRating = windowsServerRating
      user.linuxRating = linuxRating
      user.networkingRating = networkingRating
      user.securityConseptsRating = securityConseptsRating

    user.save()
    return res.status(200).send("Successfully updated self assessment")
    
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

  //get specifically the coach from coches's username, put into collection for displaying profile
  app.post('/api/coachsearch/:coachusername', function(req, res, next) {
    //const studentobjid = Number(req.params.studid) //convert string from url to a number
    mongoose.connection.db.collection('users').find({username: req.params.coachusername}).toArray().then(collection => {  
      //console.log("check student: " + collection);
      res.status(200).json({ collection})
    });
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

//takes a _id and returns a username
app.post('/api/getusername', async(req, res)=> {
  const {studid} = req.body;
  const stud = await User.findOne({"_id": studid});
  if (!stud){
    return res.sendStatus(504);
  }
  else{
    return res.status(200).send(stud.displayname);
  }
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

app.get('/api/filter_students', async(req, res) => {
  let users = await Student.find({});
  return res.status(200).send(users);
})

app.get('/api/filter_mentors', async(req, res) => {
  let users = await Mentor.find({});
  return res.status(200).send(users);
})

app.post('/api/coach/get_student_by_id', async(req, res) => {
  const { displayID } = req.body;
  const user = await User.find({"_id": displayID})     
  if(!user){
    return res.sendStatus(404)
  } else {
    return res.status(200).send(user); 
  }      
}) 

app.post('/api/team/student_display_to_id', async(req, res) => {
  const { studentDisplayName } = req.body;
  const user = await User.find({"displayname": studentDisplayName}) 
  var ret = user[0]._id
  if(!user){
    return res.status(502).send("No user found that matches that ID")
  }
  else {
    return res.status(200).send(ret); 
  } 
})

app.post('/api/coach/get_studentid_by_email', async(req, res) => {
  const { student_email } = req.body;  
  console.log(student_email)
  const user = await User.find({"email": student_email})  
  console.log("THE USER IS ____________________________________________________________________________________", user[0]._id, typeof user)
  if(!user || user[0]._id == undefined){
    console.log("INSIDE THE IF STATEMENT------------------------------------")
    return res.sendStatus(404)
  } else {
    //console.log("USER SENT BACK", user)
    return res.status(200).send(user[0]._id); 
  }      
}) 



app.post('/api/team/add_student_to_team', async(req, res) => {
  //Takes in a team ID and a student ID and updates the team and the student
  const {team_id, student_id} = req.body

  console.log(team_id)

  const team = await Team.findOne({"national_id": team_id})
  const user = await User.findOne({"_id": student_id})

  if(!team && team_id!==-1){
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

  if(team.members.length > 10){
    return res.status(202).send("Team is full")
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


app.post('/api/team/add_alternate', async(req, res) => {
  //Takes in a team ID and a student ID and updates the team and the student
  const {team_id, student_id} = req.body

  const team = await Team.findOne({"national_id": team_id})
  const user = await User.findOne({"_id": student_id})

  //console.log(user.alternate)
  if(!team){
    return res.status(501).json({ message: "No team found that matches that ID"})
  }

  if(!user){
    return res.status(502).json({ message: "No user found that matches that ID"})
  }

  if (team.alternates && team.alternates.includes(student_id)) {
    return res.status(400).json({ message: "Student is already an alternate of the team"});
  }

  console.log("memebers not alternate")
  console.log(team.members.length - team.alternates.length)

  if(team.members.length - team.alternates.length < 4){
    return res.status(401).json({ message: "Need minimum of 2 non-alternates"});
  }

  var alternates = team.alternates
  if(alternates != undefined){
    alternates.push(student_id)
  }
  team.alternates = alternates
  team.save()

  user.alternate = true
  user.save()
  //console.log(user.alternate)

  //Save the updated alternate to team
  const success = true;

  return res.status(200).json({ success: success, message: "Updated the team (alternates) successfully" });
})

app.post('/api/team/remove_alternate', async (req, res) => {
  // Takes in a team ID and a student ID and removes the student from the alternates list of the team
  const { team_id, student_id } = req.body;
  console.log("try to remove")
  try {
      const team = await Team.findOne({ "national_id": team_id });
      const user = await User.findOne({ "_id": student_id });

      if (!team) {
          return res.status(404).json({ message: "No team found that matches the provided ID"});
      }

      if (!user) {
        return res.status(403).json({ message: "No user found that matches the provided ID"});
    }

      // Check if the alternates array exists and if the student is in the array
      if (!team.alternates || !team.alternates.includes(student_id)) {
          return res.status(400).json({ message: "Student is not an alternate of the team"});
      }

      // Remove the student from the alternates array
      // team.alternates = team.alternates.filter(id => id !== student_id);
      // team.save();

    var alternates = team.alternates
    if (alternates != undefined) {
      alternates.remove(student_id)
    }
    team.alternates = alternates
    team.save()

    user.alternate = false
    user.save()

    const success = true;

      console.log("alternate removed")
      return res.status(200).json({ success: success, message: "Removed the student from the alternates list of the team"});
  } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).json({ message: "Internal server error"});
  }
});



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
  user.alternate = false;
  user.save()

  return res.status(200).send("Removed user from team")

})

app.post('/api/coach/add_coachid_to_student', async (req, res) => {
  const {coachID, student_email} = req.body;

  const student = await Student.findOne({email: student_email});

  if(!student) {
    return res.status(501).send("No student found with that email");
  }

  student.coachID = coachID;
  student.save()

  return res.status(200).send("CoachID was successfully added to student");
})

app.post('/api/coach/remove_coachid_from_student', async (req, res) => {
  const {coachID, student_id} = req.body;

  const student = await Student.findOne({_id: student_id});

  if(!student) {
    return res.status(501).send("No student found with that email");
  }

  if(student.team != -1) {
    const team = await Team.findOne({national_id: student.team})
    if(!team) {
      return res.status(502).send("No team found with this team ID");
    }
    var members = team.members
    if(members != undefined){
      members.remove(student_id)
    }
    team.members = members
    team.save()
  }

  student.team = -1;
  student.coachID = undefined;
  student.save()

  return res.status(200).send("CoachID was successfully removed from student");
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
});

// This API is able to pull json data from MongoDB
app.post('/api/get-data', function(req, res, next) {
    
  mongoose.connection.db.collection('teams').find({}).toArray().then(collection => {
    
    res.status(200).json({collection})
});
  
});
// This API is able to pull a certian mentor information
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

  //get specifically the student from student's username, put into collection for displaying profile
  app.post('/api/studentsearch/:studusername', function(req, res, next) {
    //const studentobjid = Number(req.params.studid) //convert string from url to a number
    mongoose.connection.db.collection('users').find({username: req.params.studusername}).toArray().then(collection => {  
      //console.log("check student: " + collection);
      res.status(200).json({ collection})
    });
  });

  app.post('/api/studentTakenQuizzes', async(req, res) => {
    const {id} = req.body
    const student = await Student.findOne({_id: id})

    if(!student){
      console.log("no ")
      return res.sendStatus(404)
    }
    else{
      //return res.status(200).send([student.username, student.takenQuizzes])
      return res.status(200).send({username: student.username, displayname: student.displayname, takenQuizzes: student.takenQuizzes})
    }
  })

  //search for team based on national id
  app.get('/api/teamsearch/:teamid', async(req,res)=>{
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

  //updates the information in the database
  app.post('/api/team/update_student_info', async(req, res) => {
    //Takes in a team ID and a student ID and updates the team and the student
    const {coachID, studentID, studentDispName, studentGradLevel, studentTeamID} = req.body

    const user = await User.findOne({"_id": studentID})
    if(!user){
      return res.status(501).send("No user found that matches that ID")
    }

    const coach = await Coach.findOne({"_id": coachID});
    if(!coach) {
      return res.status(502).send("No coach was found that matches this ID")
    }

    if(studentTeamID != "" && studentTeamID != "N/A") {
      const newTeam = await Team.findOne({"national_id": studentTeamID})
      const oldTeam = await Team.findOne({"national_id": user.team})
      if(!newTeam) {
        if(studentTeamID === -1){
            user.team = -1;
            var oldMembers = oldTeam.members
            if(oldMembers != undefined){
              oldMembers.remove(studentID)
            }
            oldTeam.members = oldMembers
            oldTeam.save()
        } else { return res.status(503).send("No team matches this National Team Number")}
      } else {
        if(oldTeam) {
          if(newTeam.national_id != user.team) {
            if(newTeam.coach.equals(coach._id)) {
              user.team = newTeam.national_id;
              var members = newTeam.members;
              if(members != undefined && !members.includes(user._id)){
                members.push(user._id);
              }
              newTeam.members = members;
              newTeam.save();

              var oldMembers = oldTeam.members
              if(oldMembers != undefined){
                oldMembers.remove(studentID)
              }
              oldTeam.members = oldMembers
              oldTeam.save()
            } else return res.status(505).send("Coach does not have access to this team")
          }
        } else {
          console.log("oldteam didn't exist");
          if(newTeam.coach.equals(coach._id)) {
            user.team = newTeam.national_id;
            var members = newTeam.members;
            if(members != undefined && !members.includes(user._id)){
              members.push(user._id);
            }
            newTeam.members = members;
            newTeam.save();
          }
        }
      }
    }

    if(studentDispName != '' && studentDispName != 'N/A' && studentDispName != null)user.displayname = studentDispName

    if(studentGradLevel != '' && studentGradLevel != 'N/A' && studentGradLevel != null)user.gradelevel = studentGradLevel 

    user.save();
  
    return res.status(200).send(user);
  })
  
  


  //search for coach based on coach's object id to get madequizzes field: WIP status, may delete
  //currently objid for assessment field is janky, needs to have a create api
  app.get('/api/coachsearch/:oid', async(req,res)=>{
    const coach = await User.findById(req.params.oid); //findById(id)
    //console.log(coach)
    if(!coach){
      console.log("no coach was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(coach);
    }
  })

  app.post('/api/coachSearch', async(req, res) => {
    const {id} = req.body
    const coach = await Coach.findById(id)

    if(!coach){
      console.log("no coach found")
      return res.sendStatus(404)
    }
    else{
      return res.status(200).send(coach)
    }
  })

  app.get('/api/quizsearch',async(req,res)=>{
    const quizzes = await Quiz.find({});
    //console.log(quizzes)
    if(!quizzes){
      console.log("no quiz was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(quizzes);
    }
  })

  //get all quizzes by authorid (will work once createquiz api is made?)
  app.get('/api/quizsearch/:aoid',async(req,res)=>{
    const quizzes = await Quiz.find({authorID: req.params.aoid}); //findById(id)
    //console.log(quizzes)
    if(!quizzes){
      console.log("no quiz was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(quizzes);
    }
    /*mongoose.connection.db.collection('quizzes').find({authorID: req.params.aoid}).toArray().then(collection => {  
      //console.log("check quiz: " + collection);
      res.status(200).json({collection})
    }); */
  })

  //get the one quiz by object id and send it
  app.get('/api/quizsearch/oneq/:oid', async(req,res)=>{
    const quiz = await Quiz.find({_id: req.params.oid}); //findById(id)
    //console.log(onequiz);
    if(!quiz){
      console.log("no quiz was found")
      return res.sendStatus(404)
    } else {
      return res.status(200).send(quiz);
    }
    /*mongoose.connection.db.collection('quizzes').find({authorID: req.params.aoid}).toArray().then(collection => {  
      //console.log("check quiz: " + collection);
      res.status(200).json({collection})
    }); */
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
    const {questions, author_id, name, cat} = req.body;
    var final_questions = []

    var author = await User.findOne({"_id": author_id})
    if(!author){
      //console.log(author_id)
      return res.status(404).send("Author not found")
    }
    if(author.usertype == "Student"){
      return res.status(500).send("Students cannot make quizzes")
    }

    for(question in questions){
      const {value, description, answers, correctAnswer} = questions[question]  
    
      
      var new_question = new Question({
        value: value,
        description: description,
        answers: answers,
        correctAnswer: correctAnswer
      })

      new_question.save(function (err, user){
        if (err) {
          res.status(401).end();
          return console.error(err)
        }
      });
      final_questions.push(new_question)
    }

    var new_quiz = new Quiz({
      questions: final_questions,
      authorID: author_id,
      name: name,
      category: cat
    });
    let tmp = await new_quiz.save()
    author.madeQuizzes.push(tmp)
    author.save() 
    return res.status(200).send(new_quiz);
});

app.post('/api/assessment/find_assessment', async(req, res) => {
  const { id } = req.body;
  var quiz = await Quiz.findOne({"_id": id})
  if(!quiz){
    return res.status(404).send("No quiz found matching that ID")
  }

  return res.status(200).send(quiz)
});

app.post('/api/assessment/find_assessments_by_author', async(req, res) => {
  const { author_id } = req.body;
  var author = await User.findOne({"_id": author_id})
  if(!author){
    return res.status(404).send("No author found matching that ID")
  }

  if(author.usertype == "Student"){
    return res.status(500).send("Students cannot author quizzes")
  }

  var quizzes = author.madeQuizzes

  return res.status(200).send(quizzes)

});

app.post('/api/assessment/find_taken_quizzes', async(req, res) => {
  const {taker_id} = req.body;

  var taker = await User.findOne({"_id": taker_id})
  if(!taker){
    return res.status(404).send("User does not exist")
  }
  if(taker.usertype != "Student"){
    return res.status(500).send("Only students can take quizzes")
  }

  var quizzes = taker.takenQuizzes
  return res.status(200).send(quizzes)
})

app.post('/api/assessment/take_quiz', async(req, res) => {
  const {name, category, score, questions, answers, correctQuestions, incorrectQuestions, testTakerID, timeStarted, timeFinished, originalQuizID } = req.body;

  var user = await User.findOne({"_id": testTakerID})
  if(!user){
    return res.status(404).send("User not found")
  }
  if(user.usertype != "Student"){
    return res.status(500).send("User is not a student")
  }

  var takenQuiz = new TakenQuiz({
    name: name,
    category: category,
    score: score,
    questions: questions,
    answers: answers,
    correctQuestions: correctQuestions,
    incorrectQuestions: incorrectQuestions,
    testTakerID: testTakerID,
    timeStarted: timeStarted,
    timeFinished: timeFinished, 
    originalQuizID: originalQuizID 
    
  })

  var id;
  // let tmp = await takenQuiz.save();    Commented out to get ride of saving to takenquiz

  var quizzes = []
  quizzes = user.takenQuizzes;
  //quizzes.push(tmp)
  quizzes.push(takenQuiz) //alternative to push(tmp)

  user.save()

  return res.status(200).send(takenQuiz)
})

//========================

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
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
