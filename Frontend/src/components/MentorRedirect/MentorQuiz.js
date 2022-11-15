import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Mentor/Header';
import '../MentorRedirect/MentorTeams.css';
import '../Mentor/PageLayout.css'

// This is where the mentor can store their input into an array. This will be be a potential for creating quizzes.
var mainArray = [];

function MentorQuiz() {
    const [counter, setCounter] = useState(0);

    const [InputDATA, setInputData] = useState("");

    let navigate = useNavigate();

    const handleString = (text) => {
      let InputDATA = text;
      setInputData(InputDATA);
      mainArray.push(InputDATA.toString());
      mainArray.pop();
      console.log(mainArray);
    }
  
    const handleClick = () => {
      setCounter(counter + 1);
      console.log(counter);
    }

    const addUserName = () => {
      if(InputDATA !== ""){
       mainArray.push(InputDATA);
       // or using spread operator
       // mainArray = [...mainArray, inputDATA];
       setInputData("")
       return;
      }
      alert("Empty Field")
     }

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
    
      <div className='app'>
<div className='banner-container'>
  <div className='header'>
      <h1><Header /> </h1></div>
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
     <div className='center'>  
        <button onClick={() => {
          addUserName();
          handleString("");
          handleClick();
        }}> Insert text</button></div>
  
        <div className='center'>
        <input onChange={(e) => setInputData(e.target.value)} />
        <button onClick={addUserName}>User Info Entry</button> </div>

        <output>{mainArray.map(item => {
          return <li>{item[counter]}</li>;
        })}</output>
        
     

</div></div>
    );
}

export default MentorQuiz;
//<button onClick={handleClick}>Hello</button>