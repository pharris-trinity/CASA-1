import React from 'react';
//import { Text, View } from "react-native";
//import { Text } from 'react-native';
import "./stylesCoach.css"
import { useNavigate } from "react-router-dom";


const ProfileContent = ({data}) => {
    let navigate = useNavigate();

    function homeButton(){
        navigate('/coachhome', {replace: true})  
    }
  
    return(
        <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="coachAttributes">
                {data.map(item => (
                        <ul>
                            <li key={item.displayname} className="studentName">
                                <p>Name: {item.displayname} </p>
                            </li>
                            <div className='invisible'>
                                <h2> space</h2>
                            </div>

                            <li key={item.username} className="studentName">
                                <p>Username: {item.username} </p>
                            </li>
                            <div className='invisible'>
                                <h2> space</h2>
                            </div>


                            <li key={item.email} className="studentName">
                                <p>Email: {item.email}</p>
                            </li>
                            <div className='invisible'>
                                <h2> space</h2>
                            </div>


                            <li key={item.school} className="studentName">
                                <p>School: {item.school}</p>
                            </li>
                            <div className='invisible'>
                                <h2> space</h2>
                            </div>

                        </ul> 
                ))}
        </div>
        <button onClick={homeButton}>
            Home
        </button>

    </div> 
    )
}

export default  ProfileContent
