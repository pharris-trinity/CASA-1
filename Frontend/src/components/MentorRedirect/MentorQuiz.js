import React, {useState} from 'react';
import '../Mentor/PageLayout.css'

// This is where the mentor can store their input into an array. This will be be a potential for creating quizzes.
var mainArray = [];

function MentorQuiz() {
    const [counter, setCounter] = useState(0);

    const [InputDATA, setInputData] = useState("");

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

    return (
    
      <div className="App">
        <div className="banner-container">
        <button onClick={() => {
          addUserName();
          handleString("");
          handleClick();
        }}> Hello</button>
  
        <input onChange={(e) => setInputData(e.target.value)} />
        <button onClick={addUserName}>User Info Entry</button>

          </div>
      </div>
    );
}

export default MentorQuiz;
//<button onClick={handleClick}>Hello</button>