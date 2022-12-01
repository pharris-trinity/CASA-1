import React, { useEffect, useState } from "react";
import Table from '../TableMentor/table';
import { useNavigate } from "react-router-dom";
import Navbar from '../Mentor/NavBarMentor';



function FilterTable() {

    let navigate = useNavigate();

    function teamsButton(){
        //navigate('/mentorteams', {replace: true})
        navigate('/mentor', {replace: true}) 
    }

    const [elements, setElements] = useState([])
    const [query, setQuery] = useState("")

    const keys =  ["school_Name","coach","district","rotc","remote","zipcode"]

    useEffect(() => {
        var postData = ['national_id:', 'name', 'school', 'district', 'rotc' , 'active', 'coach']
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          };
        fetch('/api/get-data', requestOptions).then(res => res.json()).then(
            data => {
                setElements(data.collection)
                console.log("Values in data collection: " + data.collection)
                console.log("Values in setElements: " + setElements)
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
            <h1> React Table </h1>
            <Navbar/>
            <button onClick={teamsButton}>
                Home
            </button> 
            
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