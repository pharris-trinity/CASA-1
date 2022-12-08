import React, {useEffect, useState} from "react"
//import "./stylesCoach.css"
import CoachProfileContent from "./CoachProfileContent"

export default function StudentProfilePage() {
   //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc.
    //const studentIDstr = fixeduser._id; 
    const coachusername = fixeduser.username;

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
