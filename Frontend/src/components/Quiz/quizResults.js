import React, { useState, useEffect } from "react";
import './quizResults.css'


//only displays the resuts

//need to get the question data and answers

function QuizResults(props) {
    const questionArray = props.questions.map((question, index) => (
        <div key={index}>
            <br/>
            <p>Question {index + 1}: {question.description}</p>
            <p>Your Answer:      {question.answers[props.studentAnswers[index]]}</p>
            <p>Correct Answer:      {question.answers[props.correctAnswers[index]]}</p>
            <br />
      </div>
      ));


    return (
        <div>
            <h3>Here's your results for {props.quizName}!</h3>
            <p>You got {props.score}% of the test correct.</p>
            <p>displaying a question:</p>
            {questionArray}
        </div>
    );
}


export default QuizResults;