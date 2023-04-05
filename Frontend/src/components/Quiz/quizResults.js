import React, { useState, useEffect } from "react";
import './quizResults.css'


function QuizResults(props) {


    return(
        <div>
            <h3>Here's your quiz results!</h3>
            <p>{props.score}</p>
        </div>
    );
}


export default QuizResults;