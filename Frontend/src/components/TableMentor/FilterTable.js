import React, { useEffect, useState } from "react";
import Table from '../TableMentor/table';
import { useNavigate } from "react-router-dom";



function FilterTable() {

    let navigate = useNavigate();


    const [elements, setElements] = useState([])
    const [query, setQuery] = useState("")

    const keys =  ["displayname","email","zipcode","speciality"]

    useEffect(() => {
        var postData = ['displayname', 'email', 'zipcode', 'speciality']
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


    const visit = (obj, fn) => {
        const values = Object.values(obj)
    
        values.forEach(val => 
            val && typeof val === "object" ? visit(val, fn) : fn(val))
            // This provides the whole array
            console.log("Values in visit: " + values)
    }

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key)=>item[key].toLowerCase().includes(query))
        );
    };

    const teamArr = (val) => {
        const team = []
        // Individual Values
        console.log("Val: " + val)
    }

    return (
        <div className="app">
            <h1> Find Mentors </h1>
            
            <input
                    type="text"
                    placeholder='Search...'
                    className='Search'
                    onChange={(e) => setQuery(e.target.value)}
                />

            {<Table data={(elements)} />}

            <button onClick={() => {
                visit(elements, teamArr)
            }}>click here</button>

        </div>
    );

}

export default FilterTable;
