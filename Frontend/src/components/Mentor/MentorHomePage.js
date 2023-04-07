import React, { useEffect, useState } from "react";
import MentorNavBar from "../Mentor/NavBarMentor";
import "./stylesMentor.css"
import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

const MentorHome = () => {
    console.log("MENTOR HOME---------------------------------")
    let navigate = useNavigate();

    window.onload = async (event) => {
        loginChecker("Mentor")
       /* console.log("onload__________________")
        var toNavigateTo = loginChecker("Mentor")
        console.log("inside of MentorHomePage.js", toNavigateTo)
        if(toNavigateTo != ""){
            console.log("inside of the tonavigagto if statement", toNavigateTo)
            await navigate(toNavigateTo, {replace: true})
        }*/
      };

return (

<>
    <MentorNavBar />
    
    <div className="maincontainer">
        <h1>Mentor Homepage</h1>
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Mentor Homepage</h2>
                    <ul>
                        <li className="takeAssess">
                            <a href="/mentorTable">Table</a>
                        </li>
                        <li className="viewAssess">
                            <a href="/login">Logout</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>

    </>

    );
};
export default MentorHome;