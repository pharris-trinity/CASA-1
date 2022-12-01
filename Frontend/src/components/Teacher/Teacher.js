// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
//import Button from './MentorButton';
import '../Mentor/Button.css'
import '../Mentor/PageLayout.css'
import '../TeacherRedirect/TeacherAssessment';
import '../TeacherRedirect/TeacherQuiz'
import '../TeacherRedirect/TeacherTeam'
import { useNavigate } from "react-router-dom";


function Teacher() {

  let navigate = useNavigate();

  function teamsButton(){
      navigate('/teacherteam', {replace: true})
      
      
  }


  function createQuiz(){
      navigate('/teacherquiz', {replace: true})
      
  }

  function createAssessment(){
    navigate('/teacherassessment', {replace: true})
      
  }

  function editQuiz(){
      navigate('/teacherquiz', {replace: true})
      
  }

  function editAssessment(){
      navigate('/teacherassessment', {replace: true})
      
  }
  


return (
<div>
<div class="body"> 
    <h2> Teacher Page </h2>
    <div></div>
        <button onClick={teamsButton}>
        Team
        </button>

        <div></div>

        <button onClick={createQuiz}>
        Create Quiz
        </button>

        <div></div>

        <button onClick={createAssessment}>
        Create Assessment
        </button>

        <div></div>

        <button onClick={editQuiz}>
        Edit Quiz
        </button>

        <div></div>

        <button onClick={editAssessment}>
        Edit Assessment
        </button>
</div>
  </div> 
  );
}
  
export default Teacher;