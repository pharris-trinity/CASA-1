import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import AddStudent from "./AddStudent";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {
    const [coachUserID, setCoachUserID] = useState();
    const [coach, setCoach] = useState();
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [updateDisplayName, setUpdateDisplayName] = useState("N/A");
    const [displayEmail, setDisplayEmail] = useState("N/A");
    const [updateGradLevel, setUpdateGradLevel] = useState("N/A");
    const [updateTeamID, setUpdateTeamID] = useState("N/A");
    const [currentStudentID, setCurrentStudentID] = useState();

    const[enabledAddToTeam, setEnabledAddToTeam] = useState(false);

    
    const getCoach = async(coachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'id': coachID})
            }
            const response = await fetch('/api/coachSearch', requestOptions)
            const jsonData = await response.json()

            setCoach(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    const  getStudents = async (coachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'userID': coachID})
            }
            const response = await fetch('/api/coach/get_coaches_students', requestOptions)
            const jsonData = await response.json()
            setStudents(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async (inputTeams) => {
        var tempTeams = [];
        console.log("inputTeams length", inputTeams);
        for(let i = 0; i < inputTeams.length; i++){
            try {
                console.log(inputTeams[i])
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(inputTeams[i]), requestOptions);
                const jsonData = await response.json();
                console.log("jsonData in getTeams", jsonData, "index", i);
                tempTeams.push(jsonData);
            } catch (error) {
                console.log("error in getTeams: ", error);
            }
        }
        setTeams(...tempTeams);
    }

    const getTeamName = (teamID) => {
        var teamName = "";
        console.log("teams in getTeamName", teams);
        teams.map(team => {
            console.log("comparing team nationalID and teamID in getTeamName: ", team.national_id, teamID);
            if(team.national_id == teamID) {
                teamName = team.name;
            }
        })
        console.log("teamName in getTeamName: ", teamName);
        return teamName;
    }

    const updateStudentAccount = async (currentStudentID, newDispName, newGradLevel, newTeamID) => {
        var tmpData = {coachID: coachUserID, studentID: currentStudentID, studentDispName: newDispName, studentGradLevel: newGradLevel, studentTeamID: newTeamID}
        try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        
        const response = await fetch('/api/team/update_student_info', requestOptions)
        const jsonData = await response.json()
        getStudents(coachUserID);

        } catch (error) {
            console.log(error);
        }
    }

    const fillDisplayInfo = (student) => {
        setCurrentStudentID(student._id);
        setUpdateDisplayName(student.displayname);
        setDisplayEmail(student.email);
        student.gradelevel ? setUpdateGradLevel(student.gradelevel) : setUpdateGradLevel("");
        (student.team != -1) ? setUpdateTeamID(student.team): setUpdateTeamID("");
    }

    const addStudentButton = () => {
        setEnabledAddToTeam(true);
    }

    const closeAddStudent = () => {
        setEnabledAddToTeam(false);
        getStudents(coachUserID);
    }

    const deleteStudentButton = () => {

    }


    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        console.log(coachUserID);
        if(coachUserID) {
            getCoach(coachUserID);
            getStudents(coachUserID);
        }
    }, [coachUserID]) 

    useEffect(() => {
        console.log("students array: ", students);
    }, [students])

    useEffect(() => {
        if(coach) {
            console.log("heres whats in coach.teams after coach loads in: ",coach.teams);
            getTeams(coach.teams);
        }
    }, [coach])

    useEffect(() => {
        if(teams){
            console.log("teams after teams is updated hypothetically: ", teams);
        }
    }, [teams])

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateStudentAccount(currentStudentID, updateDisplayName,updateGradLevel,updateTeamID);
        alert("Student has been updated");
    }

    if(props.enabled == true) {
        return (
            <div>
                <div className="left form-group">
                <form className="form-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name'>Name </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={updateDisplayName}
                                onChange={(e) => setUpdateDisplayName(e.target.value)}
                            />

                            <p className="label-style">Email (Not Editable)</p>
                            <p className="email-box">{displayEmail}</p>

                            <label htmlFor='grade'>Grade Level</label>
                            <input
                                type='number'
                                id='grade'
                                name='grade'
                                value={updateGradLevel}
                                onChange={(e) => setUpdateGradLevel(e.target.value)}
                            />

                            <label htmlFor='team'>Team National ID</label>
                            <input
                                type='number'
                                id='team'
                                name='team'
                                value={updateTeamID}
                                onChange={(e) => setUpdateTeamID(e.target.value)}
                            />
                            <button className="casa-button button-alignment" type="submit">Save Changes</button>
                            <br/>
                            <button className="casa-button button-alignment" type="button" onClick={addStudentButton}>Add Student</button>
                        </div>
                    </form>

                    {/*Div for add and delete button code*/}
                    <div>
                        <AddStudent enabled={enabledAddToTeam} closeForm={closeAddStudent}/>
                        <button className="casa-button" type="button" onClick={deleteStudentButton}>Delete Student</button>
                    </div>
                </div>

                {/*Div where student table goes*/}
                <div >
                    <table className="right">
                            <thead>
                                <tr >
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Grade Level</th>
                                    <th>Team Name</th>
                                    <th>Team ID</th>
                                </tr>
                            </thead>

                            <tbody >
                                {students && students.map(student => (
                                <tr key={student._id} onClick={() => (fillDisplayInfo(student))}>
                                    <td>{student.displayname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gradelevel != undefined ? student.gradelevel : "N/A"}</td>
                                    <td>{(teams && student.team != -1) ? getTeamName(student.team) : "N/A"}</td>
                                    <td>{student.team != -1 ? student.team : "N/A"}</td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ManageTeams;