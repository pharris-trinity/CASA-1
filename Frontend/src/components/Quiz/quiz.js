import React, { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    const[questionArray, setQuestionArray] = useState([]);
    const[i, setI] = useState(0);


    const pullOutQuestions = () => {
        const tempArray = (props.quizData.map(item => 
            item.questions.map(secondItem => <Question questionData = {secondItem}/>)
        ));
        
        setQuestionArray(...tempArray);
    }

    useEffect(() => {
        pullOutQuestions();
        setI(0);
    }, [props.quizData]);

    console.log("questionArray", questionArray);

    //console.log("Questions after use effect", questions);

    return (
        <div>
            {questionArray && questionArray[i]}
            <Navigation/>
        </div>
    );
}

export default Quiz;