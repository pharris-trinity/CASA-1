import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PreviousQuizzes({ enabled }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    pullQuiz();
}, []);

    const pullQuiz = async () => {
        //e.preventDefault();
        try {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            const response = await fetch('/api/quizsearch', requestOptions);
            const jsonData = await response.json();

            setQuizzes(jsonData);

        } catch (error) {
            
        }
    }

  return (
    <div style={{ display: enabled ? 'block' : 'none' }}>
      <h2>Previous Quizzes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.name}</td>
              <td>{quiz.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviousQuizzes;
