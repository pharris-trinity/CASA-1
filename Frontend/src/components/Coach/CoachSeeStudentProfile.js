import React, { useState } from "react"
import "./stylesCoach.css"
//import StudProfileContent from "./Student/StudProfileContent"

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function CoachSeeStudentProfile() {
    var postData;
    const [studDisplayName, setStudDisplayName] = useState(null);
    const [studSchool, setStudSchool] = useState(null);
    const [studTier, setStudTier] = useState(null);
    const [studGradLevel, setStudGradLevel] = useState(null);
    const [studTeam, setStudTeam] = useState(null);

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
        fetch('/api/coach/get_student_by_id', requestOptions).then(
            res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    const newlist = userVal[0]
                        setStudDisplayName(newlist.displayname);
                        setStudSchool(newlist.school);
                        setStudTier(newlist.tier);
                        setStudGradLevel(newlist.gradelevel);
                        setStudTeam(newlist.team);

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
                        <p>Display Name: {studDisplayName}</p>
                        <p>School: {studSchool}</p>
                        <p>Tier: {studTier}</p>
                        <p>Gradlevel: {studGradLevel}</p>
                        <p>Team: {studTeam}</p>


                <button onClick={homeButton}>
                    Home
                </button>

            </div>
        );

    
}
