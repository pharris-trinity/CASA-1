// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
import '../MentorRedirect/MentorTeams'
import '../MentorRedirect/MentorQuiz'
import '../MentorRedirect/MentorAssessment'
import { useNavigate } from "react-router-dom";
import Header from './Header';
import '../Mentor/PageLayout.css';



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

  function logOut(){
    navigate('/login', {replace: true})
  }

  
//<div class="body"> 

return (
<div>


<h2> Mentor Page </h2>
<div></div>


<div className='banner-container'>
<div className='header'>
<Header /></div>

    <div className="button ">
      <button onClick={teamsButton}>
        Teams
      </button> 
    </div> 

    <div></div>

    <div className="button ">
      <button onClick={createQuiz}>
        Create Quiz
      </button> 
    </div> 

    <div></div>

    <div className="button ">
    <button onClick={createAssessment}>
      Create Assessment
    </button>
    </div>

    <div></div>
    <div className="button ">
    <button onClick={editQuiz}>
      Edit Quiz
    </button>
    </div>

    <div></div>

    <div className="button ">
    <button onClick={editAssessment}>
      Edit Assessment
    </button> 
    </div>

    <div className="button ">
    <button onClick={logOut}>
      Logout
    </button> 
    </div>
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