import React, { useState, useEffect } from "react";
import './ManageTeams.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {

    if(props.enabled == true) {
        return (
            <div>
                <h3>Manage Teams Component</h3>
            </div>
        );
    }
}

export default ManageTeams;