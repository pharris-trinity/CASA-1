import Container from "react-bootstrap/Container"
import React from  "react"
import ReactDOM from "react-dom/client"
import "./stylesStud.css"

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