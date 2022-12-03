// A working page for a header for the mentor. 
import React from 'react';
import { NavLink } from "react-router-dom";
import '../Mentor/PageLayout.css'
import logo from './cyberTexasLogo.png';

const Header = () => {
return (
       <nav>
        <NavLink exact activeClassName="active" to="/mentor">
            Home |
        </NavLink>
        <NavLink activeClassName="active" to="/mentorHome">
            Mentor Home |
        </NavLink>
        <NavLink activeClassName="active" to="/mentorTable">
            Table 
        </NavLink>
    </nav>
    );
};
export default Header;

//<img src={logo} alt="CyberTexasLogo" height="70" />