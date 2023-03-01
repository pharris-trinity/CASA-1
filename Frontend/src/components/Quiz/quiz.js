import React, { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    const[questionArray, setQuestionArray] = useState([]);
    const[questionIndex, setQuestionIndex] = useState(0);


    const pullOutQuestions = () => {
        const tempArray = (props.quizData.map(item => 
            item.questions.map(secondItem => <Question questionData = {secondItem} selectedAnswer = {0}/>)
        ));
        
        setQuestionArray(...tempArray);
    }

    const prev = () => {
        //console.log("Previous function!", questionIndex);
        if(questionIndex-1 >= 0){
            setQuestionIndex(questionIndex-1);
        }
        //console.log("After Previous!", questionIndex);
    }

    const next = (arraySize) => {
        //console.log("Next Function!", questionIndex);
        //console.log("array size in next", arraySize);
        if(questionIndex+1 < arraySize){
            setQuestionIndex(questionIndex+1);
            //console.log("After Next!", questionIndex);
        }
        
    }

    useEffect(() => {
        pullOutQuestions();
        //setQuestionIndex(3);
    }, [props.quizData]);
    
    useEffect(() => {
        setQuestionIndex(0);
    }, [questionArray])

    //console.log("questionArray", questionArray);

    return (
        <div>
            {questionArray && questionArray[questionIndex]}

            {questionArray && <Navigation questionArrayLength = {questionArray.length} 
                nextQuestion = {() => next(questionArray.length)} prevQuestion = {() => prev()}/>}
        </div>
    );
}

export default Quiz;