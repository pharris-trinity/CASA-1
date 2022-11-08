// A working page for a header for the mentor. 
import React from 'react';
import logo from './cyberTexasLogo.png';

const Header = () => {
return (
    <header>
        <img src={logo} alt="CyberTexasLogo" height="70" />
    </header>
    );
};
export default Header;