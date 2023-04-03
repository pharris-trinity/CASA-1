import React from  "react"
import "./stylesLanding.css"
/*the navbar for all the student accounts*/
export default function LandingNavbar() {
    return (
    <nav className="studnav">
        <div className="CASAhome">
            <a href="/" className="CASA-hometitle">CASA</a>
        </div>
        <ul>
            <p>
                <a href="https://cybertexas.org/" target="_blank">
                CyberTexas
                </a>
            </p>
            <p>
                <a href="https://www.uscyberpatriot.org/" target="_blank">
                CyberPatriot
                </a>
            </p>
            <p>
                <a href="https://www.uscyberpatriot.org/competition/rules-book" target="_blank">
                CyberPatriot Rulebook
                </a>
            </p>

            <li>
                <a href="/login">Login</a>
            </li>
        </ul>
        
    </nav>);
}