import React, { useState } from "react"
import "./MentorTeamStyles.css"
import {useLocalStorage} from '../General/useLocalStorage'
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";

export default function ViewTeams(){
  let navigate = useNavigate();
  
  function homeButton(){
    navigate('/coachhome', {replace: true})
  }

    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);
    const coachID = fixeduser._id; 

    var postData;
    const[memberID, teamMembersID] = useState (null);

    const [input, setInput] = useState('');
    const [studInput, setstudInput] = useState('');
    const [studInput1, setstudInput1] = useState('');


    //fetchUserAccount finds the team data to display
    //takes input of teamID and displays that team 
    async function fetchUserAccount (incText) {
        postData = { teamID: incText}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        await fetch('/api/team/get_team', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    if (userVal.coach != coachID){
                      //setErrorMessages ({name: "team", message:error.team})

                    }
                    else {
                        teamMembersID(userVal.members);
                        fetchUserAccount2(userVal.members[0], 0);
                        fetchUserAccount2(userVal.members[1], 1);
                        fetchUserAccount2(userVal.members[2], 2);
                        fetchUserAccount2(userVal.members[3], 3);

                    }
                } catch (error) {

                }
            }
        );

    };

    var postData;
    const [name1, student1Name] = useState(null);
    const [tier1, student1Tier] = useState(null);
    const [grade1, student1GradeLevel] = useState(null);

    const [name2, student2Name] = useState(null);
    const [tier2, student2Tier] = useState(null);
    const [grade2, student2GradeLevel] = useState(null);

    const [name3, student3Name] = useState(null);
    const [tier3, student3Tier] = useState(null);
    const [grade3, student3GradeLevel] = useState(null);


    const [name4, student4Name] = useState(null);
    const [tier4, student4Tier] = useState(null);
    const [grade4, student4GradeLevel] = useState(null);

    const [errorMessages, setErrorMessages] = useState({});
    const error = {
        team: "ERROR: Team Not Found",
        user: "ERROR: Invalid Student, Student Name Does Not Exist", 
        user2: "ERROR: Student Is Already In A Team",
        user3: "ERROR:Student Is Already In This Team",
        addsuccess: "Student Successfully Added To Team",
        removeteam: "ERROR: Team Not Found",
        removeuser: "ERROR: Invalid Student, Student Name Does Not Exist", 
        removeuser2: "ERROR: Student Is Not Registered To Any Team", 
        removeuser3: "ERROR: Student Is Not Registered To This Team",     
        removesuccess: "Student Successfully Removed From Team"
    }
 

    const fetchUserAccount2 = (incText, paramText) => {
      postData = { displayID: incText }
      const requestOptions = {
          method: 'Post',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(postData)
      };
      fetch('/api/coach/get_student_by_id', requestOptions).then(
          res => res.text()).then(text => {
              try {
                  const userVal = JSON.parse(text);
                  const newlist = userVal[0];
                  if (paramText == 0){
                      student1Name(undefined);
                      student1Tier(undefined);
                      student1GradeLevel(undefined);

                      student1Name(newlist.displayname);
                      student1Tier(newlist.tier);
                      student1GradeLevel(newlist.gradelevel);
                  }
                  if (paramText == 1){
                      student2Name(undefined);
                      student2Tier(undefined);
                      student2GradeLevel(undefined);


                      student2Name(newlist.displayname);
                      student2Tier(newlist.tier);
                      student2GradeLevel(newlist.gradelevel);
                  }
                  if (paramText == 2){
                      student3Name(undefined);
                      student3Tier(undefined);
                      student3GradeLevel(undefined);

                      student3Name(newlist.displayname);
                      student3Tier(newlist.tier);
                      student3GradeLevel(newlist.gradelevel);
                  }
                  if (paramText == 3){
                      student4Name(undefined);
                      student4Tier(undefined);
                      student4GradeLevel(undefined);

                      student4Name(newlist.displayname);
                      student4Tier(newlist.tier);
                      student4GradeLevel(newlist.gradelevel);
                  }

              } catch (error) {
                  console.log("Unable to fetch -")
              }
          }
          );

  };

  const addStudentAccount = (inputTeamID, inputStudentID) => {
    var tmpData = {team_id: inputTeamID, student_id: inputStudentID}
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tmpData)
    };
    fetch('/api/team/add_student_to_team', requestOptions).then(
            res => res.text()).then(text => {
            if (text === "No team found that matches that ID"){
              setErrorMessages ({name: "team", message:error.team})
            }
            else if (text === "No user found that matches that ID"){
              setErrorMessages ({name: "user", message:error.user})
            }
            else if (text === "User already has a team registered to them"){
              setErrorMessages ({name: "user2", message:error.user2})
            }
            else if (text === "User is already registered to this team"){
              setErrorMessages ({name: "user3", message:error.user3})
            }
            else{
              setErrorMessages ({name: "addsuccess", message:error.addsuccess})
              fetchUserAccount(inputTeamID)
            }
          }
    );
};  

  //removeStudentAccounts takes in a team and a student username inptut and removes that student from that team or returns an error
  const removeStudentAccount = (incText3, incText4) => {
          var removeData = {team_id: incText3, student_id: incText4}
          const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(removeData)
          };
          
          fetch('/api/team/remove_student_from_team', requestOptions).then(
                  res => res.text()).then(text => {
                    if (text === "No team found that matches that ID"){
                      setErrorMessages ({name: "removeteam", message:error.removeteam})
                    }
                    else if (text === "No user found that matches that ID"){
                      setErrorMessages ({name: "removeuser", message:error.removeuser})
                    }
                    else if (text === "User has no team registered to them"){
                      setErrorMessages ({name: "removeuser2", message:error.removeuser2})
                    }
                    else if (text === "User is not in that team"){
                      setErrorMessages ({name: "removeuser3", message:error.removeuser3})
                    }
                    else{
                      setErrorMessages ({name: "removesuccess", message:error.removesuccess})
                      fetchUserAccount(incText3)
                    }
              }
          );
  }; 
  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    const findStudentID = (inputTeamID, inputStudentDisplayName, addOrRemove) => {
      var tmpData = {studentDisplayName: inputStudentDisplayName}
      const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/team/student_display_to_id', requestOptions).then(
                res => res.text()).then(text => {
                  if (text === "No user found that matches that ID"){
                    setErrorMessages ({name: "removeuser", message:error.removeuser})
                  }
                  else {
                    var ret = text.replace(/"/g,'');
                    if(addOrRemove == "add"){
                      addStudentAccount(inputTeamID, ret); 
                    }
                    else {
                      removeStudentAccount(inputTeamID, ret);
                    }
                  }
                  
              }
        );
    }; 






return(
        <div className="App">
          
            <button onClick={homeButton}>
            Home
            </button>
            <h1>Teams</h1>
            <input value={input} placeholder="enter team id" onChange={ev => setInput(ev.target.value)}/> 
            <button onClick={()=>{fetchUserAccount(input);}}>Get Team</button>

            <p>Display Name: {name1}</p>
            <p>Tier: {tier1}</p>
            <p>Gradlevel: {grade1}</p>

            <p>Display Name: {name2}</p>
            <p>Tier: {tier2}</p>
            <p>Gradlevel: {grade2}</p>

            <p>Display Name: {name3}</p>
            <p>Tier: {tier3}</p>
            <p>Gradlevel: {grade3}</p>

            <p>Display Name: {name4}</p>
            <p>Tier: {tier4}</p>
            <p>Gradlevel: {grade4}</p>


            <div className="form-group">
              <input value={studInput} placeholder="enter student display name" onChange={ev1 => setstudInput(ev1.target.value)}/>
              <button onClick={()=>{findStudentID(input, studInput, "add")}}>Add Student to Team</button> 
              {renderErrorMessage("team")}
              {renderErrorMessage("user")}
              {renderErrorMessage("user2")}
              {renderErrorMessage("user3")}
              {renderErrorMessage("addsuccess")}

            </div>
            <div className="form-group">
              <input value={studInput1} placeholder="enter student display name" onChange={ev1 => setstudInput1(ev1.target.value)}/> 
              <button onClick={()=>{findStudentID(input, studInput1, "remove")}}>Remove Student to Team</button>
              {renderErrorMessage("removeteam")}
              {renderErrorMessage("removeuser")}
              {renderErrorMessage("removeuser2")}
              {renderErrorMessage("removeuser3")}
              {renderErrorMessage("removesuccess")}


            </div>
            </div>
    );
    
}