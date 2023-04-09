import React, {useEffect, useState} from "react"
//import "./stylesCoach.css"
import CoachProfileContent from "./CoachProfileContent"

export default function CoachProfile() {

    const coachusername = localStorage.username;


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
