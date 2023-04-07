import React, { useEffect, useState } from "react";
import MentorNavBar from "./NavBarMentor";
import "./stylesMentor.css"
import MentorProfileContent from "./MentorProfileContent"
import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

const MentorHome = () => {

    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Mentor")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

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
        {<MentorProfileContent data={(query)}/>}
        
    </div>

    
    
    </>

    );
};
export default MentorHome;