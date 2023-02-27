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

    const prev = () => {
        if(i-1 >= 0){
            setI(i-1);
        }
    }

    const next = (arraySize) => {
        if(i+1 < arraySize){
            setI(i+1);
        }
    }

    useEffect(() => {
        pullOutQuestions();
        //setI(3);
    }, [props.quizData]);

    useEffect(() => {
        setI(0);
    }, [questionArray])

    //console.log("questionArray", questionArray);

    return (
        <div>
            {questionArray && questionArray[i]}
            <button onClick={() => prev()}>prev</button>
            <button onClick={() => next(questionArray.length)}>next</button>
            <Navigation/>
        </div>
    );
}

export default Quiz;