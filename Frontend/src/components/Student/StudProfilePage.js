import React, {useEffect, useState} from "react"
import "./stylesStud.css"
import StudProfileContent from "./StudProfileContent"

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function StudentProfilePage() {
    const studentusername = localStorage.username;

    const studentsearchurl= '/api/studentsearch/';
    const finishedurl = studentsearchurl+studentusername;

    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Student")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    
    const [currStud, setStud] = useState([])
    useEffect(() => {
        var fieldData = ['username','school','tier','gradelevel','team'] //payload
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData)
        };
        fetch(finishedurl, requestOptions).then(res => res.json()).then(
            data => {
                setStud(data.collection)
                console.log("Values in data collection:" + data.collection) // object Object
                if(data.collection == null) {console.log(Error)}
            })
        },[]);

    return(
    <>
    {<StudProfileContent data={(currStud)}/>}
    </>
    ); 
    
}