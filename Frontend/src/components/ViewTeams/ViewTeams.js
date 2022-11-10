import './ViewTeams.css'
import TeamDropdown from '../TeamDropdown/TeamDropdown';
import React from 'react';

const ViewTeams = () => {
    return(
        <>
        <div className="profilecontainer">
         <h1>View Teams</h1>

            <TeamDropdown/>
            <div className="Attributes">
                <ul>
                    <li className="Name">
                        <p>Members: </p>
                    </li>
                </ul>
            </div>
        </div>
        </>
        ); 
    }

export default ViewTeams



