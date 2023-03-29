import React, { useState } from "react"
import "./MentorTeamStyles.css"
import {useLocalStorage} from '../General/useLocalStorage'
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";

export default function ViewTeams2(){
  let navigate = useNavigate();
  
  function homeButton(){
    navigate('/coachhome', {replace: true})
  }
    //var userVal; 
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
        user2: "ERROR: Student Is Already In Another Team",
        user3: "ERROR:Student Is Already In This Team",
        addsuccess: "Student Successfully Added To Team",
        removeteam: "ERROR: Team Not Found",
        removeuser: "ERROR: Invalid Student, Student Name Does Not Exist", 
        removeuser2: "ERROR: Student Is Not Registered To Any Team", 
        removeuser3: "ERROR: Student Is Not Registered To This Team",     
        removesuccess: "Student Successfully Removed From Team"
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
                    //console.log(userVal.members);
                    setData(userVal.name);
                    setData1(userVal.school);
                    setData2(userVal.national_id);
                    setData3(userVal.members);
                    
                } catch (error) {

                }
            }
        );

    };

    //const[joinList, setJoinList] = useState([]);


    const addForDisplay = (inputID) => {
      //var tmp = {id: inputID}
      setJoinList(prev => [...prev, inputID]);
    }
    const removeForDisplay = (inputID) => {
      //setFruits(prev => prev.filter(fruit => fruit !== elementToRemove ))
      setJoinList(prev => prev.filter(joinList => joinList !== inputID));
    }


    //addStudentAccount takes in a team and a student username input and adds that student to that team or returns an error
    const addStudentAccount = (inputTeamID, inputStudentID) => {
          var tmpData = {team_id: inputTeamID, student_id: inputStudentID}
          const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(tmpData)
          };
          //console.log(tmpData.student_id);

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
                    setJoinList(prev => [...prev, tmpData.student_id])
                    console.log(setJoinList);
                  }
                }
          );
    }; 
    //const[joinList, setJoinList] = useState([]);


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
            <h1>Teams</h1>
            <input value={input} placeholder="enter team id" onChange={ev => setInput(ev.target.value)}/> 
            <button onClick={()=>fetchUserAccount(input)}>Get Team</button>
            <p>Team Name: {data}</p>
            <p>School: {data1}</p>
            <p>National Id: {data2}</p>
            <p>Members: {joinList}</p>
            
            <div className="form-group">
              <input value={studInput} placeholder="enter student display name" onChange={ev1 => setstudInput(ev1.target.value)}/>
              <button onClick={()=>{addStudentAccount(input, studInput); addForDisplay(studInput);}}>Add Student to Team</button> 
              {renderErrorMessage("team")}
              {renderErrorMessage("user")}
              {renderErrorMessage("user2")}
              {renderErrorMessage("user3")}
              {renderErrorMessage("addsuccess")}

            </div>
            <div className="form-group">
              <input value={studInput1} placeholder="enter student display name" onChange={ev1 => setstudInput1(ev1.target.value)}/> 
              <button onClick={()=>{removeStudentAccount(input, studInput1); removeForDisplay(studInput1);}}>Remove Student to Team</button>
              {renderErrorMessage("removeteam")}
              {renderErrorMessage("removeuser")}
              {renderErrorMessage("removeuser2")}
              {renderErrorMessage("removeuser3")}
              {renderErrorMessage("removesuccess")}


            </div>
            <button onClick={homeButton}>
            Home
            </button>

        </div>
    );
    
}