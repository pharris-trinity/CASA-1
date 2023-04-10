import React, { useState, useEffect } from "react";
import './AddStudent.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function AddStudent(props) {
    const[studentEmail, setStudentEmail] = useState();
    const[team, setTeam] = useState();  
    
    // const addStudentToTeam = (inputTeamID, inputStudentID) => {
    //     var tmpData = {team_id: inputTeamID, student_id: inputStudentID}
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(tmpData)
    //     };
    //     fetch('/api/team/add_student_to_team', requestOptions).then(
    //             res => res.text()).then(text => {
    //             if (text === "No team found that matches that ID"){
    //               setErrorMessages ({name: "team", message:error.team})
    //             }
    //             else if (text === "No user found that matches that ID"){
    //               setErrorMessages ({name: "user", message:error.user})
    //             }
    //             else if (text === "User already has a team registered to them"){
    //               setErrorMessages ({name: "user2", message:error.user2})
    //             }
    //             else if (text === "User is already registered to this team"){
    //               setErrorMessages ({name: "user3", message:error.user3})
    //             }
    //             else{
    //               setErrorMessages ({name: "addsuccess", message:error.addsuccess})
    //               getTeams(coachUserID);
    //             }
    //           }
    //     );
    // };  

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('You have submitted');
        console.log("given to handleSubmit", e);
        //addStudentToTeam();
    }

    if(props.enabled == true) {
        return (
            <div className="form-popup">
                <h2>Add Student</h2>
                <div>
                    <form className="form-container" onSubmit={handleSubmit} on>
                        <div>
                            <label htmlFor='email'>Student's Email </label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                            />

                            <label htmlFor='firstName'>Team (Optional)</label>
                            <input
                                type='text'
                                id='team'
                                name='team'
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                        </div>
                        <button className="casa-button" type="submit">Add person</button>
                        <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default AddStudent;