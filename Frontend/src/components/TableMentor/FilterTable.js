/*import React, { useEffect, useState } from "react";
import Table from '../TableMentor/table';
import { useNavigate } from "react-router-dom";
import Navbar from '../Mentor/NavBarMentor';



function FilterTable() {

    let navigate = useNavigate();


    const [elements, setElements] = useState([])


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


    return (
        <div className="app">
            <h1> React Table </h1>
            <Navbar/>
            
            {<Table data={(elements)} />}


        </div>
    );

}

export default FilterTable;*/