import React from  "react"
import "./stylesStud.css"
import LogoutButton from './../General/LogoutButton'
import logo from "./../../Resources/logo.png"

/*the navbar for all the student accounts*/
export default function StudNavbar() {
    return (
        <nav className="my-navbar">
          <img src={logo} alt="Logo" className="navbar__logo" />
          <div className="my-navbar__title">CASA</div>
          <div className="my-navbar__buttons">
            <ul>
                <a href="/stud/main">
                    <button className="casa-button">Main</button>
                </a>
                <a href="/stud/profile">
                    <button className="casa-button">Profile</button>
                </a>

                <a href="/login">
                    <button className="casa-button">Logout</button>
                </a>
            </ul>
          </div>
        </nav>
      );
    
    
    
    
    /*return (
    <nav className="studnav">
        <div className="CASAhome">
            <a href="/" className="CASA-hometitle">CASA</a>
        </div>
        <ul>
            <button className="my-button">
                <a href="/stud/main">Main</a>
            </button>
            <button className="my-button">
                <a href="/stud/profile">Profile</a>
            </li>
            <div>
                <LogoutButton/>            
            </div>
        </ul>
        
    </nav>);*/
}