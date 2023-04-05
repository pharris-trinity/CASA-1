import React from 'react';
import pullOneQuiz from './../Student/StudTakeAssessPage';

function ButtonList({ quizlistInput}) {
  return (
    <div className='button-list-container'>
      {quizlistInput.map((quiz) => (
        <button className='my-button' key={quiz.id} onClick={() => pullOneQuiz(quiz.id)}>
          {quiz.name}
        </button>
      ))}
    </div>
  );
}


export default ButtonList;
