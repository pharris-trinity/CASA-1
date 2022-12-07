import React, { useState } from "react"
import "./teamstyles.css"
import {useLocalStorage} from '../useLocalStorage'
import { json } from "body-parser";



export default function ViewTeams2(){

    //var userVal; 
    var postData;
    const[data, setData] = useState (null);
    const[data1, setData1] = useState (null);
    const[data2, setData2] = useState (null);
    const[data3, setData3] = useState (null);

    const [userID, setUserID] = useLocalStorage("userID", "");


    // error messages for incorrect inputs
    const [errorMessages, setErrorMessages] = useState({});
    const error = {
        team: "Team not found",
        user: "Invalid student", 
        user2: "student already in another team",
        user3: "student already in team",
        removeuser2: "student not registered in a team", 
        removeuser3: "student not registered in this team",
        
        addError: "error",
        removeError: "error"
        
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
                    console.log(userVal.members);
                    setData(userVal.name);
                    setData1(userVal.school);
                    setData2(userVal.national_id);
                    setData3(userVal.members);

                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        );

    }; 


    //getAllStudents gets all student accounts so addStudentAccount and removeStudentAccount can find a specific student 
    const getAllStudents = (e) => {
      e.preventDefault();
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      fetch ('/api/filter_students', requestOptions).then(res => res.text()).then(text => {
        const userVals = JSON.parse(text);
      });
    }

    //addStudentAccount takes in a team and a student username input and adds that student to that team or returns an error
    const addStudentAccount = (inputTeamID, inputStudentID) => {
          var teamData = { team_id: inputTeamID}
          var studData = { student_id: inputStudentID}

          const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(postData)
          };
          //const userVal = JSON.parse(postData);
          //console.log(userVal);
          fetch('/api/team/add_student_to_team', requestOptions).then(
                  res => res.text()).then(text => {
                    console.log("add student is fetched")
                  /*if (text == "No team found that matches that ID") {
                    setErrorMessages({name: "team", messgae:error.team})
                  }
                  else if (text == "No user found that matches that ID"){
                    setErrorMessages({name: "user", messgae:error.user})
                  }
                  else if (text == "User already has a team registered to them"){
                    setErrorMessages({name: "user2", messgae:error.user2})
                  }
                  else if (text == "User is already registered to this team"){
                    setErrorMessages({name: "user3", messgae:error.user3})
                  }*/
                  if (text == "No team found that matches that ID" || text == "No user found that matches that ID" || text == "User already has a team registered to them" ||text == "User is already registered to this team") {
                    setErrorMessages({name: "addError", message:error.addError})
                  }
                  else {
                    console.log("success");
                  }
              }
          );
          console.log("is the error here");
      }; 


    //removeStudentAccounts takes in a team and a student username inptut and removes that student from that team or returns an error
    const removeStudentAccount = (incText3, incText4) => {
            var teamData = { team_id: incText3}
            var studData = { student_id: incText4}
  
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            };
            
            fetch('/api/team/remove_student_from_team', requestOptions).then(
                    res => res.text()).then(text => {
                    /*if (text == "No team found that matches that ID") {
                      setErrorMessages({name: "team", messgae:error.team})
                    }
                    else if (text == "No user found that matches that ID"){
                      setErrorMessages({name: "user", messgae:error.user})
                    }
                    else if (text == "User has no team registered to them"){
                      setErrorMessages({name: "removeuser2", messgae:error.user2})
                    }
                    else if (text == "User is not in that team"){
                      setErrorMessages({name: "removeuser3", messgae:error.user3})
                    }*/
                    if (text == "No team found that matches that ID" || text == "No user found that matches that ID" || text == "User has no team registered to them"||text == "User is not in that team" ){
                      setErrorMessages({name: "removeError", messgae:error.removeError})
                    }
                    else {
                      console.log("success");
                    }
                }
            );
    }; 


     

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
    );
    
    const [title, setTitle] = useState('');
    
    const [input, setInput] = useState('');
  
    const [studInput, setstudInput] = useState('');
    const [studInput1, setstudInput1] = useState('');


    return(
        <div className="App">
            <h1>Profile</h1>
            <button onClick={()=>getAllStudents()}>Test Get All Students</button>

            <input value={input} placeholder="enter team id" onChange={ev => setInput(ev.target.value)}/> 
            <button onClick={()=>fetchUserAccount(input)}>Get Team</button>
            <p>Team Name: {data}</p>
            <p>School: {data1}</p>
            <p>National Id: {data2}</p>
            <p>Members: {data3}</p>
            {/*
            <div className="form-group">
              <input value={studInput} placeholder="enter student" onChange={ev1 => setstudInput(ev1.target.value)}/>
              <button onClick={()=>addStudentAccount(input, studInput)}>Add Student to Team</button> 
              {renderErrorMessage("addError")}
            </div>
            <div className="form-group">
              <input value={studInput1} placeholder="enter student" onChange={ev1 => setstudInput1(ev1.target.value)}/> 
              <button onClick={()=>removeStudentAccount(input, studInput1)}>Remove Student to Team</button>
              {renderErrorMessage("removeError")}
            </div>
          */}
        </div>
    );
    
}