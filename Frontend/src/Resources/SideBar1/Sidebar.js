import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">

        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title> SideBar Menu for Admin Dashboard </title>
            <link rel="stylesheet" href="style.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        </head>
        <body>
            <nav class="sidebar">
                <a href="#" class="logo"> CodingLab </a>

                <div class="menu-content">
                    <ul class="menu-items"> 
                        <div class="menu-title"> Your menu title </div>

                        <li class="item">
                            <a href="#"> Your first link </a>
                        </li>

                        <li class="item">
                            <div class="submenu-item">
                                <span> Your First Link (Span) </span>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        </body>

    </div>

  );
}

export default Sidebar;