import React, { useState, useEffect } from "react";
import './AddStudent.css'

/* 
The add student component is a pop-up Modal that has the functionality for adding a new student
to a coach's roster
*/

function AddStudent(props) {
    const[studentEmail, setStudentEmail] = useState("");
    const[team, setTeam] = useState(-1);
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

    //stores a coach's ID to a student's coachID field in the database
    const addCoachToStudent = async (coach_id, email) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"coachID": coach_id,"student_email": email})
            }
            const response = await fetch('/api/coach/add_coachid_to_student', requestOptions)
            const jsonData = await response.json()
            //return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    //gets the student's ID from the DB
    const getStudentID = async (email) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'student_email': email})
            }
            const response = await fetch('/api/coach/get_studentid_by_email', requestOptions)
            const jsonData = await response.json()
            return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }
    
    //adds a student to a team in DB and stores the teamID in the student's team field
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

    /* Submit functionality for the React form.
    updates all necessary info based on form submission and closes the form */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCoachToStudent(localStorage._id, studentEmail);
        if(team != undefined && team != -1) {
            const tempStudentID = await getStudentID(studentEmail);
            setStudentID(tempStudentID);
            await addStudentToTeam(team, tempStudentID);
        }
        props.closeForm();
        
    }

    if(props.enabled === true) {
        return (
            <div className="form-popup">
                <h2>Add Student</h2>
                <div>
                    <form className="add-student-container" onSubmit={handleSubmit}>
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