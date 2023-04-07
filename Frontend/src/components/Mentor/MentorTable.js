import React, {useEffect, useState} from 'react';
import TableMentor from './DisplayTableMentor'
import MentorNavBar from "./NavBarMentor";
import "./stylesMentor2.css"
import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

function MentorTable() {

  let navigate = useNavigate();
  window.onload = (event) => {
      var toNavigateTo = loginChecker("Mentor")
      if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
    };


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
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
            {<TableMentor data={(elements)} />}
 </>
  );
}

export default MentorTable;