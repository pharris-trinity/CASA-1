import React from 'react';
import pullOneQuiz from '../Student/StudTakeAssessPage';
import './quizButtons.css';

function QuizButtons(props) {
  return (
    <div className="button-list">
      {props.quizlistInput.map((quiz) => (
        <button className="my-button" key={quiz.id} onClick={() => pullOneQuiz(quiz.id)}>
          {quiz.name}
        </button>
      ))}
    </div>
  );
}


export default QuizButtons;
