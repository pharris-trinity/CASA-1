import React, { useEffect, useState } from "react";
import Header from '../Mentor/Header';
import DisplayMentor from "../Mentor/Profile";


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
<div>
    <Header/>
    <header>
        Mentor HomePage
    </header>
    
    {<DisplayMentor data={(query)} />}


    
</div>
    );
};
export default MentorHome;