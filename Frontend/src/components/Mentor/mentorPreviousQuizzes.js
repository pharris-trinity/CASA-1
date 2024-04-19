import React, { useState, useEffect, useRef } from 'react';
import './../Coach/questionForm.css'; // Import CSS file for styling
import './createMentorQuiz.css'; // Import CSS file for styling
import './../Coach/quizInfo.css';
import './../Coach/StudentStats.css';
import './createMentorQuiz.css'
import MentorQuizQuestion from './mentorQuizQuestion';

function MentorPreviousQuizzes({ enabled }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz for editing
  const quizQuestionRef = useRef();

  useEffect(() => {
    // Fetch quizzes from the database
    pullQuizzes();
  }, []);

  const pullQuizzes = async () => {
    try {
      // Fetch quizzes from the database
      const response = await fetch('/api/quizsearch');
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
          <MentorQuizQuestion quiz={selectedQuiz} submitRef={quizQuestionRef}/>
        </div>
      ) : (
        <div className="form-popup">
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

export default MentorPreviousQuizzes;
