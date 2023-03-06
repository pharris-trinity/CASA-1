// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
//import Button from './MentorButton';
import '../Mentor/Button.css'
import '../Mentor/PageLayout.css'
import '../TeacherRedirect/TeacherAssessment';
import '../TeacherRedirect/TeacherQuiz'
import '../TeacherRedirect/TeacherTeam'
import '../Profile/Profile'

import { useNavigate } from "react-router-dom";


function Teacher() {

  let navigate = useNavigate();

  function teamsButton(){
      navigate('/ViewTeams2', {replace: true})  
  }

  function coachProfile(){
    navigate('/profile', {replace: true})
  }
  
  function homeButton(){
    navigate('/teacher', {replace: true})
  }
  function coachTableButton(){
    navigate('/coachtable', {replace: true})
  }

  


return (
  <div>
    <div class="body"> 
        <h2> CASA for Coaches</h2>
        <div></div>
            <button onClick={homeButton}>
            Home
            </button>
            
            <div></div>

            <button onClick={teamsButton}>
            Team
            </button>

            <div></div>

            <button onClick={coachProfile}>
            Profile
            </button>

            <div></div>

            <button onClick={coachTableButton}>
            Table of Mentors
            </button>


    </div>
  </div> 
  );
}
  
export default Teacher;