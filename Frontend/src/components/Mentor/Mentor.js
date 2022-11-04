// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
import '../MentorRedirect/MentorTeams'
import '../MentorRedirect/MentorQuiz'
import '../MentorRedirect/MentorAssessment'
import { useNavigate } from "react-router-dom";



// The Mentor function stores the function that will navigate to their designed pages.
function Mentor() {

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
  
//<div class="body"> 

return (
<div>


<h2> Mentor Page </h2>
<div></div>
<div className="banner-container">

    <button onClick={teamsButton}>
      Teams
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
  
export default Mentor;
/*
<div>
      <h1>Mentor HomePage</h1>
      <button onCLick={teamsButton}>
          Teams
      </button>
            
      <button onCLick={createQuiz}>
          Create Quiz
      </button>

      <button onCLick={createAssessment}>
          Create Assessment
     </button>

      <button onCLick={editQuiz}>
          Edit Quiz
      </button>

      <button onCLick={editAssessment}>
          Edit Assessment
      </button>
    </div>*/