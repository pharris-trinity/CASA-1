import React from 'react';
import '../Mentor/PageLayout.css'
import '../MentorRedirect/MentorTeams.css';
import { useNavigate } from "react-router-dom";
import Header from '../Mentor/Header';
import Mentor from '../Mentor/Mentor';

const data = [

    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"},
    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"},
    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"},
    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"},
    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"},
    {School: "Trial", District: "Trial", Coach: "Coach", ROTC: "No", Weakness: "Google", Strength: "Windows", Remote: "Yes"}
  ]

function MentorTeams()
{
    let navigate = useNavigate();


  // To the Mentor team page
  function teamsButton(){
      navigate('/mentorteams', {replace: true})   
  }

  // To navigate to the mentor quiz page.
  function createQuiz(){
      navigate('/mentorquiz', {replace: true})
      
  }
  // To navigate to the mentor assessment page
  function createAssessment(){
    navigate('/mentorassessment', {replace: true})
      
  }

  // Same thing
  function editQuiz(){
      navigate('/mentorquiz', {replace: true})
      
  }

  function editAssessment(){
      navigate('/mentorassessment', {replace: true})
      
  }

  function logOut(){
    navigate('/login', {replace: true})
  }
    return (
        <div className="App">
            <Header />
            <div className='button'>
              <button onClick={teamsButton}>
                  Teams
              </button>

              <button onClick={createQuiz}>
              Create Quiz
              </button>
            
              <button onClick={createAssessment}>
                Create Assessment
              </button>
  
              <button onClick={editQuiz}>
                Edit Quiz
              </button>
  
              <button onClick={editAssessment}>
                Edit Assessment
              </button> 

              <button>
                Profile
              </button>

              <button onClick={logOut}>
                Logout
              </button>
    
            </div>
            
            
            <h1> Welcome to Teamspage 
            </h1>
            <table>
        <tr>
          <th>School</th>
          <th>District</th>
          <th>Coach</th>
          <th>ROTC</th>
          <th>Weakness</th>
          <th>Strength</th>
          <th>Remote</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.School}</td>
              <td>{val.District}</td>
              <td>{val.Coach}</td>
              <td>{val.ROTC}</td>
              <td>{val.Weakness}</td>
              <td>{val.Strength}</td>
              <td>{val.Remote}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
    

}

export default MentorTeams;