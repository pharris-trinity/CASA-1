import React from 'react';
//import { Text, View } from "react-native";
//import { Text } from 'react-native';
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import './CoachProfile.css';



const ProfileContent = ({data}) => {
    let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };
 
    return(
        <div className="profile-container">
        <h1>Profile (Mostly Unimplemented)</h1>
            <div className="coachAttributes">
                {data.map(user => (
                    <div>
                        <h3>Name: {user.displayname} </h3>
                        <h3>Username: {user.username} </h3>
                        <h3>Email: {user.email}</h3>
                        <h3>School: {user.school}</h3>
                    </div>
                ))}
            </div>
    </div> 
    )
}

export default  ProfileContent
