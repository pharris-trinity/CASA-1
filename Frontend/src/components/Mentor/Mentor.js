// Here will be the mentor page with a decent layout and buttons to future pages.
import React from 'react';
import '../MentorRedirect/MentorTeams'
import '../MentorRedirect/MentorQuiz'
import '../MentorRedirect/MentorAssessment'
import { useNavigate } from "react-router-dom";
import Header from './Header';
import '../Mentor/PageLayout.css';
//import Navbar from '../Mentor/NavBarMentor';



// The Mentor function stores the function that will navigate to their designed pages.
function Mentor() {

  let navigate = useNavigate();


  // To the Mentor team page
  function teamsButton(){
      //navigate('/mentorteams', {replace: true})
      navigate('/mentortabledisplay', {replace: true})   
  }

  function HomeButton(){
    navigate('/mentorHome', {replace: true})  
  }


return (
<div>
       <Header/>
   
      <button onClick={teamsButton}>
        To Teams Page
      </button> 

      <button onClick={HomeButton}>
        Home Page
      </button> 

</div>  

  );
}
  
export default Mentor;
