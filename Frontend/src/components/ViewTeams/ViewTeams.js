import React, { useState } from "react"
import "./teamstyles.css"
import {useLocalStorage} from '../useLocalStorage'
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";

export default function ViewTeams2(){
  let navigate = useNavigate();
  
  function homeButton(){
    navigate('/teacher', {replace: true})
  }

    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);
    const coachID = fixeduser._id; 

    var postData;
    var allStudents;
    const[data, setData] = useState (null);
    const[data1, setData1] = useState (null);
    const[data2, setData2] = useState (null);
    const[data3, setData3] = useState (null);
    const[joinList, setJoinList] = useState([]);

    // error messages for incorrect inputs
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


    //getAllStudents gets all student accounts so addStudentAccount and removeStudentAccount can find a specific student 
    const getAllStudents = (incText5) => {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      fetch ('/api/filter_students', requestOptions).then(res => res.text()).then(text => {
        allStudents = JSON.parse(text);
        var tmp = 0;
        while (tmp < allStudents.length){
          if (allStudents[tmp]._id == incText5){
            addForDisplay(allStudents[tmp].displayname);
          }
          tmp++;
        }
      });
    }

    //fetchUserAccount finds the team data to display
    //takes input of teamID and displays that team 
    const fetchUserAccount = (incText) => {
        postData = { teamID: incText}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        fetch('/api/team/get_team', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    if (userVal.coach != coachID){
                      setErrorMessages ({name: "team", message:error.team})

                    }
                    else {
                      console.log(userVal.coach)
                      setData(userVal.name);
                      setData1(userVal.school);
                      setData2(userVal.national_id);
                      setData3(userVal.members);
                      var tmp = 0;
                      while (tmp < userVal.members.length){
                        getAllStudents(userVal.members[tmp]);
                        tmp++;
                      }
                    }
                    
            
                } catch (error) {

                }
            }
        );

    };


    const addForDisplay = (inputID) => {
      setJoinList(prev => [...prev, inputID]);
    }
    const removeForDisplay = (inputID) => {
      setJoinList(prev => prev.filter(joinList => joinList !== inputID));
    }

    const removeProduct = () => {
      setJoinList([
        ...joinList.slice(0, 0),
      ]);
    }    

    //addStudentAccount takes in a team and a student username input and adds that student to that team or returns an error
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
                    addForDisplay(inputStudentID);
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
                        removeForDisplay(incText4)
                      }
                }
            );
    }; 

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
    );
        
    const [input, setInput] = useState('');
  
    const [studInput, setstudInput] = useState('');
    const [studInput1, setstudInput1] = useState('');

return(
        <div className="App">
          
            <button onClick={homeButton}>
              Home
            </button>
            <h1>Teams</h1>
            <input value={input} placeholder="enter team id" onChange={ev => setInput(ev.target.value)}/> 
            <button onClick={()=>{removeProduct(); fetchUserAccount(input);}}>Get Team</button>
            <p>Team Name: {data}</p>
            <p>School: {data1}</p>
            <p>National Id: {data2}</p>
            <p>Members: <ul>{joinList.map(name => <li key={name}>{name + "||"}</li>)}</ul></p>
            <div>

            </div>

            <div className="form-group">
              <input value={studInput} placeholder="enter student display name" onChange={ev1 => setstudInput(ev1.target.value)}/>
              <button onClick={()=>{addStudentAccount(input, studInput)}}>Add Student to Team</button> 
              {renderErrorMessage("team")}
              {renderErrorMessage("user")}
              {renderErrorMessage("user2")}
              {renderErrorMessage("user3")}
              {renderErrorMessage("addsuccess")}

            </div>
            <div className="form-group">
              <input value={studInput1} placeholder="enter student display name" onChange={ev1 => setstudInput1(ev1.target.value)}/> 
              <button onClick={()=>{removeStudentAccount(input, studInput1)}}>Remove Student to Team</button>
              {renderErrorMessage("removeteam")}
              {renderErrorMessage("removeuser")}
              {renderErrorMessage("removeuser2")}
              {renderErrorMessage("removeuser3")}
              {renderErrorMessage("removesuccess")}


            </div>

        </div>
    );
    
}