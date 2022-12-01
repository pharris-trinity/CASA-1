import React from 'react';
import { useNavigate } from 'react-router-dom';
import TableMentor from './TableMentor'

function MentorTable() {
  let navigate = useNavigate();

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
  }, []);

  return (
    <div className="App">
            <h1> Mentor Table </h1>
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

            {<TableMentor data={(elements)} />}

            <button onClick={() => {
                visit(elements, teamArr)
            }}>click here</button>

      </div>
  );
}

export default MentorTable;