import React from  "react"
import "./Navbar.css"
import logo from "./../../Resources/logo.png"

export default function Navbar({ buttonSet }) {
  
  /*Definitions for sets of buttons that appear on the navbar.
  Make a set of button titles and their links, and give the set a 
  name indicative of what pages it should appear on. Then, whenever you
  define a navbar, just specify which set you want, and the buttons will be displayed*/
  
  const buttonSetData = {
    login: [
      { name: "LOGIN", link: "/login" }
    ],
    logout: [
      { name: "LOG OUT", link: "/login" } // GET BACK TO THIS, it need to logout frfr
    ],
    student: [ 
      { name: "LOG OUT", link: "/login" }
    ],
    coach: [ 
      { name: "LOG OUT", link: "/login" }
    ],
    takeQuiz: [ 
      { name: "LOG OUT", link: "/login" }
    ]
  };

  const buttons = buttonSetData[buttonSet];


  return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <div className="navbar__title">CASA</div>    
          
          {buttons && buttons.map((button) => (
          <a href={button.link} key={button.name}>
            <button className="my-button">{button.name}</button>
          </a>
          ))}
          
      </nav>
    );
  }