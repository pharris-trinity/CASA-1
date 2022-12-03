import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TableMentor from './TableMentor'
import Header from '../Mentor/Header'

function MentorTable() {

  let navigate = useNavigate();

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

  function homebutton(){
    navigate('/mentorHome', {replace: true})
  }

  return (
    <div className="App">
            <h1> Mentor Table </h1>
            <Header/>
            <button onClick={homebutton}>
                HomePage
            </button> 

            {<TableMentor data={(elements)} />}


      </div>
  );
}

export default MentorTable;