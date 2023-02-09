import React from  "react"
import "./stylesStud.css"
/*the navbar for all the student accounts*/
export default function StudNavbar() {
    return (
    <nav className="studnav">
        <div className="CASAhome">
            <a href="/" className="CASA-hometitle">CASA</a>
        </div>
        <ul>
            <li className="active">
                <a href="/stud/main">Main</a>
            </li>
            <li>
                <a href="/stud/profile">Profile</a>
            </li>
            <li>
                <a href="/login">Logout</a>
            </li>
        </ul>
        
    </nav>);
}