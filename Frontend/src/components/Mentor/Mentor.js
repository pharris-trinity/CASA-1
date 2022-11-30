// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
import '../MentorRedirect/MentorTeams'
import '../MentorRedirect/MentorQuiz'
import '../MentorRedirect/MentorAssessment'
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import '../Mentor/PageLayout.css';
import Navbar from '../Mentor/NavBarMentor';



// The Mentor function stores the function that will navigate to their designed pages.
function Mentor() {

  let navigate = useNavigate();


  // To the Mentor team page
  function teamsButton(){
      //navigate('/mentorteams', {replace: true})
      navigate('/mentortabledisplay', {replace: true})

      
      
  }

  function HomeButton(){
    //navigate('/mentorteams', {replace: true})
    navigate('/mentorHome', {replace: true})

    
    
}
/*
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

  */
//<div class="body"> 

return (
<div>


      
      
      
  
       <Navbar/>
   
      <button onClick={teamsButton}>
        Teams
      </button> 

      <button onClick={HomeButton}>
        Home Page
      </button> 

       
         
    
    
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