import React, {useEffect, useState} from 'react';
//import { Text, View } from "react-native";
//import { Text } from 'react-native';
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import './CoachProfile.css';
import { formatTeamIDString } from '../General/formatTeamIDString';



const ProfileContent = ({data}) => {
    const [madeQuizzes, setMadeQuizzes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [coachUserID, setCoachUserID] = useState();
    const [coach, setCoach] = useState();

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
    
    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        if(coachUserID) {
            getCoach(coachUserID);
        }
    }, [coachUserID]) 

    useEffect(() => {
        console.log("coach in CoachProfileContent", coach);
        if(coach) {
            getTeams(coach.teams);
        }
    }, [coach])

 
    return(
        <div className='coach-main-box coach-overflow-box'>
            <div className='page-title'>Coach Profile</div>
                <div className='coach-content-box'>
                    {data.map(user => (
                        <React.Fragment key={user.id}>
                        <div className='text-container'>
                            <span className="left-text">Coach Name</span>
                            <span className="right-text">{user.displayname}</span>
                        </div>
                        <div className='text-container'>
                            <span className="left-text">Username</span>
                            <span className="right-text">{user.username}</span>
                        </div>
                        <div className='text-container'>
                            <span className="left-text">Email</span>
                            <span className="right-text">{user.email}</span>
                        </div>
                    
                        </React.Fragment>
                    ))}
            </div>
            <div className="content-box">
                <h3 className="text-container coach-center-text">Teams</h3>
                {coach && coach.teams.map(teamID => 
                    <div>
                        <span>{formatTeamIDString(teamID)}</span>
                    </div>
                )}
            </div>
            <div className="content-box">
                <h3 className="text-container coach-center-text">Made Quizzes</h3>
                    {coach && console.log("coach.madeQuizzes", coach.madeQuizzes)}
                    {coach && coach.madeQuizzes.map(quiz => 
                        <div>
                            {console.log("quiz in the thing", quiz)}
                            <span>{quiz.name}</span>
                        </div>
                    
                    )}
            </div>
        </div>



        /*
        <div className="profile-container">
        <h1>Profile</h1>
            <div className="coachAttributes">
                {data.map(user => (
                    <div>
                        <h3>Name: {user.displayname} </h3>
                        <h3>Username: {user.username} </h3>
                        <h3>Email: {user.email}</h3>
                    </div>
                ))}
            </div>
        </div> 

        */

    )
}

export default ProfileContent
