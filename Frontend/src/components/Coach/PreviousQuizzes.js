import React, { useState, useEffect, useRef } from 'react';
import './questionForm.css'; // Import CSS file for styling
import './createQuiz.css'; // Import CSS file for styling
import './quizInfo.css';
import './StudentStats.css';
import QuizQuestion from './QuizQuestion';

function PreviousQuizzes({ enabled, props }) {
  const [teamCoachID, setTeamCoachID] = useState("")
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz for editing
  const quizQuestionRef = useRef();

  useEffect(() => {
    setTeamCoachID(localStorage.getItem("_id"));
    console.log("Attempt to set team coach id")
    console.log(teamCoachID)
}, []) 

useEffect(() => {
  if (teamCoachID) {
      // Fetch quizzes from the database
      pullQuizzes();
  }
}, [teamCoachID]);

  const pullQuizzes = async () => {
    try {
      // Fetch quizzes from the database
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
      const apiCall = '/api/coachquizsearch/'
      const finalApiCall = apiCall + teamCoachID
      console.log("Team COach ID")
      console.log(teamCoachID)
      const response = await fetch(finalApiCall);
      const jsonData = await response.json();
      setQuizzes(jsonData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const handleQuizClick = (quiz) => {
    // Set the selected quiz for editing
    setSelectedQuiz(quiz);
  }

  const handleBackClick = () => {
    // Clear the selected quiz when going back
    setSelectedQuiz(null);
  }

  return (
    <div style={{ display: enabled ? 'block' : 'none' }}>
      {selectedQuiz ? (
        <div>
          {/* Render the QuizQuestion for editing the selected quiz */}
          <button className="casa-button" onClick={handleBackClick}>Back</button>
          <QuizQuestion quiz={selectedQuiz} submitRef={quizQuestionRef}/>
        </div>
      ) : (
        <div className="stats-container">
        <h3>Quizzes</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Level</th>
            </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz, index) => (
                  <tr key={index} onClick={() => handleQuizClick(quiz)}>
                    <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{quiz.name}</td>
                    <td className={index % 2 === 0 ? 'td-even' : 'td-odd'} >{quiz.category}</td>
                    <td className={index % 2 === 0 ? 'td-even' : 'td-odd'} >{quiz.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                </div>
            )}
        </div>
    );
}

export default PreviousQuizzes;
