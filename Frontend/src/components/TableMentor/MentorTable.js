import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TableMentor from './TableMentor'
import Navbar from '../Mentor/NavBarMentor';

function MentorTable() {
  let navigate = useNavigate();

  const keys =  ["displayname","email","zipcode","speciality"]
  const [query, setQuery] = useState("")
  const [elements, setElements] = useState([])

  const mentorArr = (val) => {
    const team = []
    // Individual Values
    console.log("Val: " + val)
}

  const visit = (obj, fn) => {
    const values = Object.values(obj)

    values.forEach(val => 
        val && typeof val === "object" ? visit(val, fn) : fn(val))
        // This provides the whole array
        console.log("Values in visit: " + values)
  }

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
  }, []);

  function homebutton(){
    navigate('/mentorHome', {replace: true})
  }

  return (
    <div className="App">
            <h1> Mentor Table </h1>
            <Navbar/>
            <button onClick={homebutton}>
                Home
            </button> 
            <input
                    type="text"
                    placeholder='Search...'
                    className='Search'
                    onChange={(e) => setQuery(e.target.value)}
                />

            {<TableMentor data={(elements)} />}

            <button onClick={() => {
                visit(elements, mentorArr)
            }}>click here</button>

      </div>
  );
}

export default MentorTable;