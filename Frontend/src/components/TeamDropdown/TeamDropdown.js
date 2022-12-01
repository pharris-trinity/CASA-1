import React , {useState} from 'react';
import {NavLink} from 'react-router-dom';

import './TeamDropdown.css';


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

                {/* Drop down for Team page: includes links to View Teams & Find Mentor pages */}
                <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                    Teams
                    {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/ViewTeams`}> National_ID: 0 </NavLink> </li>
                        <li> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/ViewTeams2`}> National_ID: 1 </NavLink> </li>
                    </ul>):
                    null}
                 </div>

            
            
            </div>


        </div>
    )
}

export default Dropdown