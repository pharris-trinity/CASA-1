import React, { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    // const[questionArray, setQuestionArray] = useState([]);
    const[questionIndex, setQuestionIndex] = useState(0);
    const[questionCount, setQuestionCount] = useState(0);


    // const pullOutQuestions = () => {
    //     const tempArray = (props.quizData.map(item => 
    //         item.questions.map(secondItem => <Question questionData = {secondItem} selectedAnswer = {0}/>)
    //     ));
        
    //     setQuestionArray(...tempArray);
    // }

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
        var count = 0;
        const countVariable = (props.quizData.map(item => 
            item.questions.map(secondItem => count++)
            ));
        setQuestionCount(count);
    }, [props.quizData]);

    useEffect(() => {
        console.log("Count variable is:", questionCount);
    }, [questionCount]);

    // useEffect(() => {
    //     pullOutQuestions();
    //     //setQuestionIndex(3);
    // }, [props.quizData]);

    // useEffect(() => {
    //     setQuestionIndex(0);
    //     console.log("This is the quiz's question array: ", questionArray);
    // }, [questionArray])

    return (
        <div>
            {props.quizData.map(item => item.questions.map(
                secondItem => <Question key = {item._id} questionData = {secondItem}/>)[questionIndex])}

            <Navigation questions = {questionCount} 
                nextQuestion = {() => next(questionCount)} prevQuestion = {() => prev()}/>
        </div>
    );
}

export default Quiz;