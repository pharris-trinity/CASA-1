import React from 'react';
import './FindMentor.css';


const data = [

    {Name: "Temp", Area: "Downtown", Strength: "Windows", Remote: "No", Contact: "tmp@gmail.com"},
    {Name: "Temp2", Area: "Downtown", Strength: "Linux", Remote: "Yes", Contact: "tmp2@gmail.com"}
  ]

function FindMentor()
{
    return (
        <div className="App">
            
            
            
            <h1> Search for Mentor 
            </h1>
            <table>
        <tr>
          <th>Name</th>
          <th>Area</th>
          <th>Strength</th>
          <th>Remote</th>
          <th>Contact</th>

        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Name}</td>
              <td>{val.Area}</td>
              <td>{val.Strength}</td>
              <td>{val.Remote}</td>
              <td>{val.Contact}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
    

}

export default FindMentor;
