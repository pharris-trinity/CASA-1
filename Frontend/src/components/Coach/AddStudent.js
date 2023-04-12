import React, { useState, useEffect } from "react";
import './AddStudent.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function AddStudent(props) {
    const[studentEmail, setStudentEmail] = useState();
    const[team, setTeam] = useState();
    const[studentID, setStudentID] = useState();
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

    const addCoachToStudent = async (coach_id, email) => {
        console.log("info in addCoachToStudent", coach_id, email)
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"coachID": coach_id,"student_email": email})
            }
            const response = await fetch('/api/coach/add_coachid_to_student', requestOptions)
            const jsonData = await response.json()
            console.log(jsonData);
            //return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getStudentID = async (email) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'student_email': email})
            }
            const response = await fetch('/api/coach/get_studentid_by_email', requestOptions)
            const jsonData = await response.json()
            console.log(jsonData);
            return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }
    
    const addStudentToTeam = (inputTeamID, inputStudentID) => {
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
                }
              }
        );
    };
    
    useEffect(() => {
        if(studentID !== undefined) {
            console.log("studentid right before addstudenttoteam", studentID);
            addStudentToTeam(team,studentID);
        }
    }, [studentID])

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Student has been added");
        console.log("given to handleSubmit", e);
        addCoachToStudent(localStorage._id, studentEmail);
        if(team != undefined) {
            const tempStudentID = await getStudentID(studentEmail);
            setStudentID(tempStudentID);
        }
        props.closeForm();
        
    }

    if(props.enabled === true) {
        return (
            <div className="form-popup">
                <h2>Add Student</h2>
                <div>
                    <form className="add-student-container" onSubmit={handleSubmit} on>
                        <div>
                            <label htmlFor='email'>Student's Email </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                required
                            />

                            <label htmlFor='team'>Team National ID (Optional)</label>
                            <input
                                type='number'
                                id='team'
                                name='team'
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                            <button className="casa-button" type="submit">Add</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default AddStudent;