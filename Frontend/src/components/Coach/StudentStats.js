import React, { useState, useEffect } from "react";
import './StudentStats.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function StudentStats(props) {
    
    if(props.enabled == true) {
        return (
            <div>
                <h3>Student Stats Component</h3>
            </div>
        );
    }
}

export default StudentStats;