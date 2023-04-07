import React, { useState, useEffect } from "react";
import './ManageTeams.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {
    const [coachUserID, setCoachUserID] = useState();
    const [students, setStudents] = useState([]);


    const  getStudents = async (coachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'userID': coachID})
            }
            const response = await fetch('/api/coach/get_coaches_students', requestOptions)
            const jsonData = await response.json()
            console.log(jsonData);
            setStudents(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getTeamName = async (teamid) => {
        console.log("team is in getTeamName", teamid);
        if(teamid && teamid.length != 0) {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }
                const response = await fetch('/api/teamsearch/' + JSON.stringify(teamid), requestOptions)
                const jsonData = await response.json()
                console.log("full team object", jsonData);
                console.log("team name hopefully", jsonData[0].name);
                return(jsonData[0].name);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        if(coachUserID) {
            getStudents(coachUserID);
        }
    }, [coachUserID]) 

    useEffect(() => {
        console.log("students array: ", students);
    }, [students])

    if(props.enabled == true) {
        return (
            <div>
                <div>
                    {/*Div where selected student info + add student button, etc. goes*/}
                </div>

                <div>
                    {/*Div where student table goes*/}
                    <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Grade Level</th>
                                    <th>Team Name</th>
                                    <th>Team ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {students && students.map(student => (
                                <tr>
                                    <td>{student.displayname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gradelevel}</td>
                                    <td>{getTeamName(student.team)}</td>
                                    <td>{student.team}</td>
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