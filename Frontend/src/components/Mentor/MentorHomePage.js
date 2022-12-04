import React, { useEffect, useState } from "react";
import MentorNavBar from "../Mentor/NavBarMentor";
import "./stylesMentor.css"

const MentorHome = () => {

    const [query, setQuery] = useState("")

    useEffect(() => {
        var postData = ['national_id:', 'name', 'school', 'district', 'rotc' , 'active', 'coach']
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          };
        fetch('/api/get-MentorData', requestOptions).then(res => res.json()).then(
            data => {
                setQuery(data.collection)
                console.log("Values in data collection: " + data.collection)
                console.log("Values in setElements: " + setQuery)
                if (data.collection == null)
                    console.log(Error)
            })
    },[]);

return (

<>
    <MentorNavBar />
    
    <div className="maincontainer">
        <h1>Mentor Homepage</h1>
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Assessments</h2>
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