import React, {useEffect, useState} from "react"
//import "./stylesCoach.css"
import CoachProfileContent from "./CoachProfileContent"

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

export default function CoachProfile() {
    const coachusername = localStorage.username;
    
  let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "stay ")navigate(toNavigateTo, {replace: true})
      };

    const coachsearchurl= '/api/coachsearch/';
    const finishedurl = coachsearchurl+coachusername;

    const [currCoach, setCoach] = useState([])
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
                console.log("Values in data collection:" + data.collection) // object Object
                if(data.collection == null) {console.log(Error)}
            })
        },[]);

    return(
    <>
    {<CoachProfileContent data={(currCoach)}/>}
    </>
    ); 
    
}
