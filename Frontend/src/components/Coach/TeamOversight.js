import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import '../General/casa-table.css'
//import AddStudent from "./AddStudent";
//import MakeTeam from "./MakeTeam";
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import {FaArrowUp, FaArrowDown, FaGripLines} from "react-icons/fa";
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";
import { formatTeamIDString } from "../General/formatTeamIDString";
import { validateTeamID } from "../General/validateTeamID";

function TeamOversight(props) {
const [enabledShowTeamPerformance, setEnabledShowTeamPerformance] = useState("")
const [teams, setTeams] = useState([]);
const [coachUserID, setCoachUserID] = useState();
const [coach, setCoach] = useState();

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
        //console.log(error)
    }
}
    const getTeams = async (inputTeams) => {
        console.log("typeof inputTeams", inputTeams);
        var tempTeams = [];
        for(let i = 0; i < inputTeams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(inputTeams[i]), requestOptions);
                const jsonData = await response.json();
                tempTeams.push(...jsonData);
            } catch (error) {
                //console.log("error in getTeams: ", error);
            }
        }
        setTeams(tempTeams);
    }

    //gets a team's name based on teamID
    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id == teamID) {
                teamName = team.name;
            }
        })
        return teamName;
    }

    // const search = async (e) => {

    //     const matchedUsers = teams.filter((team) => {
    //         return team.name.toLowerCase().includes(e.target.value.toLowerCase());
    //     });
    //     if (e.target.value.length == 0) {
    //         setTeams(allUsersCopy);
    //         setSearchPhrase(e.target.value);
    //     }
    //     else {
    //         setStudents(matchedUsers);
    //         setSearchPhrase(e.target.value);
    //     }
    // }
    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        if(coachUserID) {
            getCoach(coachUserID);
        }
    }, [coachUserID]) 

    useEffect(() => {
        if(coach) {
            getTeams(coach.teams);
        }
    }, [coach])
    if (props.enabled === true) {
        // Render the table only if teams data is available
        if (coach && coach.teams.length > 0) {
            return (
                <div>
                    <table style={{ color: "#000" }}>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coach.teams.map((teamID, index) => (
                                <tr key={index}>
                                    <td>{getTeamName(teamID)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            // Render a loading message or fallback UI if data is not available yet
            return <div>Loading...</div>;
        }
    }

    // Return null if the component should not be rendered
    return null;
}



export default TeamOversight;