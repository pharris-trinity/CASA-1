import React, { useState } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    //console.log(props.quizData.questions);
    const[questions,setQuestions] = useState([]);
    //const renderWords = props.quizData;

    return (
        <div>
            <h1 className="quiz">The quiz component is being displayed</h1>
            <h1 className="quiz">Here is what we've got for temp array: </h1>
            {/*the below approach might work, not sure yet*/}
            {/*questions.map((question) => <Question/>)*/}
            <Navigation/>
        </div>
    );
}

export default Quiz;