import React , {useState} from 'react';
import {NavLink} from 'react-router-dom';

import './Dropdown.css';
import logo from '../img/logo.png';

const Dropdown = () => {
    const [state, setstate] = useState(false);
    const showDrorpdown = ()=>{
        setstate(true);
    }
    const hideDrorpdown = ()=>{
        setstate(false);

    }

    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
    };

  
    return (
        <div className = "dropdown">
            <div className = "container"> 
                    {/* Add Logo  */}
                    <div className="header__middle__logo">
                    <NavLink exact activeClassName='is-active' to="/">
                        <img src={logo} alt="logo" /> 
                    </NavLink>
                </div> 
                <li  className="menu-item" >
                    <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink> 
                </li>
                <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/Profile`}> Profile </NavLink> </li>
                <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                    Teams
                    {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/ViewTeams`}> ViewTeams </NavLink> </li>
                        {/*<li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/TeamStats`}> TeamStats </NavLink> </li>*/}
                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/FindMentor`}> FindMentor </NavLink> </li>
                    </ul>):
                    null}
                 </div>
                 <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                    AssessTest
                    {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/AssessTest`}> AssessTest </NavLink> </li>
                        <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/ViewScores`}> ViewScores </NavLink> </li>
                    </ul>):
                    null}
                 </div>

            
            
            </div>


        </div>
    )
}

export default Dropdown