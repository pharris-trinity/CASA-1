import React, { useState } from "react"
import "./stylesCoach.css"
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";
//import StudProfileContent from "./Student/StudProfileContent"

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function CoachSeeStudentProfile() {
    var postData;
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);

    const [errorMessages, setErrorMessages] = useState({});
    const error = {
        name: "ERROR: student Not Found",
    }

    const fetchUserAccount = (incText) => {
        postData = { displayID: incText }
        const requestOptions = {
            method: 'Post',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(postData)
        };
        fetch('/api/coach/coachseestudentprofile', requestOptions).then(
            res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    const newlist = userVal[0]
                        setData(newlist.displayname);
                        setData1(newlist.school);
                        setData2(newlist.tier);
                        setData3(newlist.gradelevel);
                        setData4(newlist.team);

                } catch (error) {
                    console.log("Unable to fetch -")
                }
            }
            );

    };

        const [input, setInput] = useState('');
        
        return (
            <div className="App">
                
                    <input value={input} placeholder="enter student display name" onChange={ev1 => setInput(ev1.target.value)}/>
                    <button onClick={() => fetchUserAccount(input)}>Get Student Profile</button>
                        <p>Display Name: {data}</p>
                        <p>School: {data1}</p>
                        <p>Tier: {data2}</p>
                        <p>Gradlevel: {data3}</p>
                        <p>Team: {data4}</p>


                <button onClick={homeButton}>
                    Home
                </button>

            </div>
        );

    
}
