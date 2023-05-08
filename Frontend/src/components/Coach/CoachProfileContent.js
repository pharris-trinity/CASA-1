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


        <div className='coach-main-box'>
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
