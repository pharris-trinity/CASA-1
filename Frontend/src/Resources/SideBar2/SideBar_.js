import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar_.css'; // Import the styles
import logo from "./../../Resources/logo.png"
import LogoutButton from "./LogoutButton";
// import profileImg from "../../Resources/profileimg.png"
import profile_img from '../pngs/download.jpeg'

const Sidebar = (props) => {
    
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

    useEffect(() => {
        // Dynamically add the stylesheet link to the document head
        const link = document.createElement('link');
        link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    
        // Cleanup when the component unmounts
        return () => {
            document.head.removeChild(link);
        };
    }, []); // Empty dependency array ensures this runs once on component mount

    document.addEventListener('DOMContentLoaded', function () {
        let btn = document.querySelector('#btn');
        let sidebar = document.querySelector('.sidebar');
      
        btn.onclick = function () {
          sidebar.classList.toggle('active');
        };
      });


  return (
    <div className="app-container">
        <div class="sidebar">
            <div class="top">
                <div class="logo">
                    <i class="bx bxl-codepen"></i>
                    <span> CodeCommerce </span>
                </div>

                <i class="bx bx-menu" id="btn"></i>

            </div>
            
            <div class="user">
                <img src={profile_img} alt="me" class="user-img" />
                <div>
                    <p class="bold"> Coach Wilson </p>
                    <p> Admin </p>
                </div>
        </div>
        <ul>
            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Dashboard </span>
                </a>
                <span class="tooltip"> Dashboard </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bxs-grid-alt"></i>
                    <span class="nav-item"> Products </span>
                </a>
                <span class="tooltip"> Products </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bx-cog"></i>
                    <span class="nav-item"> Categories </span>
                </a>
                <span class="tooltip"> Categories </span>
            </li>

            <li>
                <a href="#">
                    <i class="bx bx-log-out"></i>
                    <span class="nav-item"> Logout </span>
                </a>
                <span class="tooltip"> Logout </span>
            </li>

        </ul>
        </div>
        
        <div class="main-content">
            <div class="container">
                <h1> Code Commerce </h1>
                <h1> Right Side </h1>
            </div>
        </div>

    </div>
  );
}

export default Sidebar;