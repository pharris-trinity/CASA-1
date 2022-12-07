import React from  "react"
import "./stylesMentor.css"

export default function MentorNavbar() {
    return (
    <nav className="mentornav">
        <div className="CASAhome">
            <a href="/" className="CASA-hometitle">CASA</a>
        </div>
        <ul>
            <li className="active">
                <a href="/mentorHome">Main</a>
            </li>
            <li>
                <a href="/mentorTable">Team Tables</a>
            </li>
            <li>
                <a href="mentorprofile">Mentor Profile</a>
            </li>
        </ul>   
    </nav>);
}