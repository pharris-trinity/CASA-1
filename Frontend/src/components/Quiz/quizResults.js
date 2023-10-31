import React, { useState, useEffect } from "react";
import './quizResults.css'


//only displays the resuts

//need to get the question data and answers


function QuizResults(props) {
    return (
        <div>
            <h3>Here's your quiz results!</h3>
            <p>You got {props.score}% of the test correct.</p>
            <p>displaying a question:</p>
            <p>{props.quiz}</p>
            <p>Your answers were: {props.studentAnswers}</p>
            <p>The correct answers were: {props.correctAnswers}</p>
        </div>
    );
}


export default QuizResults;