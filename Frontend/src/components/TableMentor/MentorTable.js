import React, {useEffect, useState} from 'react';
import TableMentor from './TableMentor'
import MentorNavBar from "../Mentor/NavBarMentor";
import "./stylesMentor.css"

function MentorTable() {


  const [elements, setElements] = useState([])


    useEffect(() => {
        var postData = ['national_id:', 'name', 'school', 'district', 'rotc' , 'coach contact', 'specialty']
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
    <>

  <MentorNavBar />
            {<TableMentor data={(elements)} />}
 </>
  );
}

export default MentorTable;