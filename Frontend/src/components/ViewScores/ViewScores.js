import React from 'react';
import './ViewScores.css';


const data = [

    {Student: "Student A", Score: " ", Assessment: " "},
  ]

function ViewScores()
{
    return (
        <div className="App">
            
            
            
            <h1> Assessment Scores 
            </h1>
            <table>
        <tr>
          <th>Student</th>
          <th>Score</th>
          <th>Assessment</th>

        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Student}</td>
              <td>{val.Score}</td>
              <td>{val.Assessment}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
    

}

export default ViewScores;
