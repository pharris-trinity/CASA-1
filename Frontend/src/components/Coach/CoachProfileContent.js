import React from 'react';
//import { Text, View } from "react-native";
//import { Text } from 'react-native';
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";



const ProfileContent = ({data}) => {
    let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    function homeButton(){
        navigate('/coachhome', {replace: true})  
    }

  
    return(
        <div className="profilecontainer">
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
        <button onClick={homeButton}>
            Home
        </button>

    </div> 
    )
}

export default  ProfileContent
