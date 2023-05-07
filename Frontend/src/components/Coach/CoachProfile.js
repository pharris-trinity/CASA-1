import React, {useEffect, useState} from "react"
import CoachProfileContent from "./CoachProfileContent"

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

/*
Displays coach's profile with relevant information about the coach's account
*/

export default function CoachProfile(props) {
    const coachusername = localStorage.username;
    
  let navigate = useNavigate();

    //makes sure the current user is a Coach -> otherwise, kicks them off the page
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "stay ")navigate(toNavigateTo, {replace: true})
      };

    const coachsearchurl= '/api/coachsearch/';
    const finishedurl = coachsearchurl+coachusername;

    const [currCoach, setCoach] = useState([])

    //on component load, gets Coach info from DB
    useEffect(() => {
        var fieldData = ['username', 'displayname', 'email', 'school'] //payload
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData)
        };
        fetch(finishedurl, requestOptions).then(res => res.json()).then(
            data => {
                setCoach(data.collection)
                if(data.collection == null) {console.log(Error)}
            })
        },[]);

    if(props.enabled) {
        return(
            <>
                {<CoachProfileContent data={(currCoach)}/>}
            </>
        ); 
    }
    
}
