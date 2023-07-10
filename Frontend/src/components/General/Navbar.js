import React from  "react"
import "./Navbar.css"
import logo from "./../../Resources/logo.png"
import LogoutButton from "./LogoutButton";

export default function Navbar(props) {
  
  /*Definitions for sets of buttons that appear on the navbar.
  Make a set of button titles and their links, and give the set a 
  name indicative of what pages it should appear on. Then, whenever you
  define a navbar, just specify which set you want, and the buttons will be displayed*/

  const buttonSetData = {
    landing: [
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOGIN", link: "/login" }
    ],
    login: [
      { name: "LOGIN", link: "/login" }
    ],
    logout: [
      { name: "LOG OUT"}
    ],
    student: [ 
      { name: "LOG OUT" }
    ],
    coach: [ 
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOG OUT"}
    ],
    mentor: [ 
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOG OUT"}
    ],
    admin: [ 
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOG OUT"}
    ],
    takeQuiz: [ 
      { name: "STUDENT HOME PAGE", link: "./../stud/main"},
      { name: "LOG OUT"}
    ]
  };

  const buttons = buttonSetData[props.buttonSet];


  return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <div className="navbar__title">CASA</div>    
          
          {buttons && buttons.map((button) => (
          <a href={button.link} key={button.name} target={button.target} rel={button.rel}>
            {button.name === "LOG OUT" ? <LogoutButton/> : <button className="casa-button">{button.name}</button>}
          </a>
          ))}
          
      </nav>
    );
  }