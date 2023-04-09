import React, { useState, useEffect } from "react";
import './ManageTeams.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {
    const [coachUserID, setCoachUserID] = useState();
    const [coach, setCoach] = useState();
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState();
    //teams = [(nat number, name)]

    
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
            console.log(jsonData);
            setStudents(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async (teams) => {
        for(let i = 0; i < teams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(teams[i]), requestOptions);
                const jsonData = await response.json();
                console.log("jsonData in getTeams", jsonData);
                setTeams(jsonData);
            } catch (error) {
                console.log("error in getTeams: ", error);
            }
        }
    }

    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id === teamID);
            teamName = team.name;
        })
        return teamName;
    }


    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
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
            console.log("coach: ", coach);
            console.log("coach's teams before getTeams", coach.teams);
            getTeams(coach.teams);
        }
    }, [coach])

    useEffect(() => {
        console.log("teams has been updated", teams);
    }, [teams])

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
                                    <td>{student.team != -1 ? getTeamName(student.team) : "N/A"}</td>
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