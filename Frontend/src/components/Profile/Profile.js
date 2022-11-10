import React from "react"
import "./stylesCoach.css"

export default function Profile() {
    
    return(
    <>
    <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="Attributes">
            <ul>
                <li className="Name">
                    <p>Name: </p>
                </li>

                <li className="Year">
                    <p>Year: </p>
                </li>
                <li className="# of Teams">
                    <p>Coach: </p>
                </li>
            </ul>
        </div>
    </div>
    </>
    ); 
}

