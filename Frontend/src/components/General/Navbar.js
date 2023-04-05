import React from  "react"
import "./Navbar.css"
import logo from "./../../Resources/logo.png"

export default function Navbar(props) {
  
  /*Definitions for sets of buttons that appear on the navbar.
  Make a set of button titles and their links, and give the set a 
  name indicative of what pages it should appear on. Then, whenever you
  define a navbar, just specify which set you want, and the buttons will be displayed*/
  
/*<p>
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
            </p>*/

  const buttonSetData = {
    landing: [
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOTS", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOGIN", link: "/login" }
    ],
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
      { name: "CYBERTEXAS", link: "https://cybertexas.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOTS", link: "https://www.uscyberpatriot.org/", target: "_blank", rel: "noopener noreferrer"},
      { name: "CYBERPATRIOT RULEBOOK", link: "https://www.uscyberpatriot.org/competition/rules-book", target: "_blank", rel: "noopener noreferrer"},
      { name: "LOG OUT", link: "/login" }
    ],
    takeQuiz: [ 
      { name: "LOG OUT", link: "/login" }
    ]
  };

  const buttons = buttonSetData[props.buttonSet];


  return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <div className="navbar__title">CASA</div>    
          
          {buttons && buttons.map((button) => (
          <a href={button.link} key={button.name} target={button.target} rel={button.rel}>
            <button className="my-button">{button.name}</button>
          </a>
          ))}
          
      </nav>
    );
  }