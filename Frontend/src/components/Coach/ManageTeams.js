import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {

    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    if(props.enabled == true) {
        return (
            <div>
                <h3>Manage Teams Component</h3>
            </div>
        );
    }
}

export default ManageTeams;