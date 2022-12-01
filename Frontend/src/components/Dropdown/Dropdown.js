import React , {useState} from 'react';
import {NavLink} from 'react-router-dom';

import './Dropdown.css';
import logo from '../img/logo.png';
import profileimg from '../img/profileimg.png';


const Dropdown = () => {
    const [state, setstate] = useState(false);
    const showDrorpdown = ()=>{
        setstate(true);
    }
    const hideDrorpdown = ()=>{
        setstate(false);

    }
    const [state1, setstate1] = useState(false);
    const showDrorpdown1 = ()=>{
        setstate1(true);
    }
    const hideDrorpdown1 = ()=>{
        setstate1(false);
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
                {/*Cyber Texas Logo: links back to home page*/}
                <div className="header__middle__logo">
                    <NavLink exact activeClassName='is-active' to="/">
                        <img src={logo} alt="logo" /> 
                    </NavLink>
                </div> 

                {/* Drop down for Team page: includes links to View Teams & Find Mentor pages */}
                <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                    Teams
                    {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/TeamDropdown`}> View Teams </NavLink> </li>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/MentorTable`}> MentorTable </NavLink> </li>
                    </ul>):
                    null}
                 </div>

                {/* Drop down for Assess/Test page: includes links to Assess/Test & View Scores pages */}
                <div className = "dropdown-menu1" onMouseEnter={showDrorpdown1} onMouseLeave = {hideDrorpdown1}>
                    AssessTest
                    {state1 ?(<ul className = "dropdown-list1" onMouseEnter={showDrorpdown1}>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/MentorAssessment`}> Assessment/Test </NavLink> </li>
                    </ul>):
                    null}
                 </div>

                {/*Profile Logo: links back to profile page*/}
                <div className="profile___header__middle__logo">
                    <NavLink exact activeClassName='is-active' to="Profile">
                        <img src={profileimg} alt="profileimg" /> 
                    </NavLink>
                </div> 


            
            
            </div>


        </div>
    )
}

export default Dropdown