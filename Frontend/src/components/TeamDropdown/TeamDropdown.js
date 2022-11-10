import './TeamDropdown.css'
import React , {useState} from 'react';

const Teamdropdown = () => {
    const [state, setstate] = useState(false);
    const showDrorpdown = ()=>{
        setstate(true);
    }
    const hideDrorpdown = ()=>{
        setstate(false);

    }

    return (
       
        <div className = "teamdropdown">
            <div className = "teamcontainer"> 

                <div className = "teamdropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                    Teams
                    {state ?(<ul className = "teamdropdown-list" onMouseEnter={showDrorpdown}>
                        <li>team 1</li>
                        <li>team 2</li>
                    </ul>):
                    null}
                 </div>
            </div>


        </div>
    )
}

export default Teamdropdown



