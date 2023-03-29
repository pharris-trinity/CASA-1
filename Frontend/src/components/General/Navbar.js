import React from  "react"
import "./Navbar.css"
import logo from "./../../Resources/logo.png"

export default function Navbar() {
    
  return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <div className="navbar__title">CASA</div>
        <div className="navbar__buttons">
          <ul>
              <a href="/login">
                  <button className="my-button">Logout</button>
              </a>
          </ul>
        </div>
      </nav>
    );
}