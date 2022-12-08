import React, {useEffect, useState} from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"

export default function StudentTakeAssessPage() {
    
    const [coachOID, setCoachOID] = useState("")
    const coachquizzes=[];
    const teamsearchurl = '/api/teamsearch/';
    const coachsearchurl= '/api/coachsearch/';
    const quizsearchurl= '/api/quizsearch/';
    
    //get coachobjid, note: replace 1 in the url with a stored student's teamid from login/local storage or what stores it
    useEffect(() => {
        var fieldData = ['national_id'] //payload
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData)
        };
        fetch('/api/teamsearch/1', requestOptions).then(res => res.json()).then(
            data => {
                data.map(item=> setCoachOID(item.coach))
                /*//console.log("data is:" + data)
                //console.log("item is " + item.coach))
                //entire json line info about the team*/
            })
    }, [])

    //console.log("check the coid" + typeof coachOID); //coachOID IS A STRING
    //check if coachobj is not empty
    //CRITICAL: Check why madequizzes is acting up as a field, changing objids with every refresh, prob bc create
    //api for assessments is not in place yet
    /*if(coachOID!="") {
            var fieldData = ['_id'] //payload
            const requestOptions ={
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(fieldData)
            };
            const newurl = coachsearchurl.concat(coachOID);
            fetch(newurl, requestOptions).then(res => res.json()).then(
                data => {
                    console.log("checking obj " + data)
                })
    } */

    const [currquizzes, setQuizzes] = useState([])
    if(coachOID!="") {
        var fieldData1 = ['questions','authorId'] //payload
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData1)
        };
        const newurl1 = quizsearchurl.concat(coachOID);
        fetch(newurl1, requestOptions).then(res => res.json()).then(
            data => {
                console.log(data)
                //setQuizzes(data.collection)
                //console.log("Values in data collection:" + data.collection) // object Object
                if(data.collection == null) {console.log(Error)}
            })
    }
    
    //layout to be replaced, currently testing scoring function
    return(
    <>
    <StudNavbar/>
    <div className="takeassesscontainer">
        <h1>Take Assessments</h1>
        <div className="studquizlist">
            <ul>
                <li>
                    <a href="/stud/takeassess/quiz1">Quiz 1</a>
                </li>
                <li>
                    <a href="/stud/takeassess/quiz2">Quiz 2</a>
                </li>
            </ul>
        </div>
    </div>
    
    </>
    );
}