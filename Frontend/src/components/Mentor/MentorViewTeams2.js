import React, { useState } from "react"
import "./MentorTeamStyles.css"
import {useLocalStorage} from '../useLocalStorage'
import { json } from "body-parser";



export default function ViewTeams2(){

    //var userVal; 
    var postData;
    var allStudents;
    const[data, setData] = useState (null);
    const[data1, setData1] = useState (null);
    const[data2, setData2] = useState (null);
    const[data3, setData3] = useState (null);

    const[data4, setData4] = useState(null);

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
    const getAllStudents = (incText5) => {
      //if (e && e.preventDefault) {e.preventDefault();}
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      fetch ('/api/filter_students', requestOptions).then(res => res.text()).then(text => {
        allStudents = JSON.parse(text);
        console.log(allStudents.length);
        var tmp = 0;
        while (tmp < allStudents.length){
          //console.log(allStudents[tmp]._id);
          console.log(allStudents[tmp]);
          if (allStudents[tmp].displayname == incText5){
            addStudentAccount(0, allStudents[tmp]._id);
          }
          tmp++;
        }
      });
    }
//    const[data4, setData4] = useState(null);
//const userVal = JSON.parse(text);
//console.log(userVal.members);
//setData(userVal.name);

    //getAllStudents gets all student accounts so addStudentAccount and removeStudentAccount can find a specific student 
    const getAllStudentsToRemove = (incText5) => {
      //if (e && e.preventDefault) {e.preventDefault();}
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      };
      fetch ('/api/filter_students', requestOptions).then(res => res.text()).then(text => {
        var tmpallStudents = JSON.parse(text);
        console.log(tmpallStudents.length);
        var tmp = 0;
        while (tmp < tmpallStudents.length){
          //console.log(allStudents[tmp]._id);
          console.log(tmpallStudents[tmp]);
          if (tmpallStudents[tmp].displayname == incText5){
            removeStudentAccount(0, tmpallStudents[tmp]._id);
          }
          tmp++;
        }
      });
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
                  console.log(text);
                  //console.log("working")
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
                      console.log(text);

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
            <div className="form-group">
              <input value={studInput} placeholder="enter student" onChange={ev1 => setstudInput(ev1.target.value)}/>
              <button onClick={()=>getAllStudents(studInput)}>Add Student to Team</button> 
            </div>

            <div className="form-group">
              <input value={studInput1} placeholder="enter student" onChange={ev1 => setstudInput1(ev1.target.value)}/>
              <button onClick={()=>getAllStudentsToRemove(studInput1)}>Remove Student From Team</button> 
            </div>

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