import React, {useEffect, useState} from "react"
import "./stylesStud.css"
import StudProfileContent from "./StudProfileContent"

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function StudentProfilePage() {
    
   //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc.
    //const studentIDstr = fixeduser._id;
    const studentusername = fixeduser.username;

    const studentsearchurl= '/api/studentsearch/';
    const finishedurl = studentsearchurl+studentusername;

    
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