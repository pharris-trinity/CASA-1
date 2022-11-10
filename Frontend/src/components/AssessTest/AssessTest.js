import React , {useState} from 'react';
import {NavLink} from 'react-router-dom';


// This is the basic page where the user will take a mock quiz.
function AssessTest() {
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
            <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                Students
                {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                    <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/MentorAssessment`}> Student A </NavLink> </li>
                </ul>):
                null}
             </div>
        
        
        </div>


    </div>

	);
}

export default AssessTest;
