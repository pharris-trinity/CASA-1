import React, { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    const[correctAnswersArray, setCorrectAnswersArray] = useState([]);
    const[questionIndex, setQuestionIndex] = useState(0);
    const[questionCount, setQuestionCount] = useState(0);
    const[answersArray, setAnswersArray] = useState([]);


    const pullOutQuestions = () => {
        // const tempArray = (props.quizData.map(item => 
        //     item.questions.map(secondItem => <Question questionData = {secondItem} selectedAnswer = {0}/>)
        // ));
        
        const tempArray = (props.quizData.map(item => 
            item.questions.map(secondItem => secondItem.correctAnswer)))

        setCorrectAnswersArray(...tempArray);
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

    const makeSaveForAnswers = (arraySize) => {
        console.log("array: ", arraySize)
        //const arraySize = array.length
        var tempArray = new Array(arraySize).fill(-1);
        console.log(tempArray);
        setAnswersArray(tempArray);
    }

    const changeAnswer = (newAnswer, originalArray, changeIndex) => {
        //console.log("ran: ", newAnswer);
        var tempArray = [...originalArray];
        tempArray[changeIndex] = newAnswer;
        //console.log("tempArray: ", tempArray)
        setAnswersArray(tempArray);
    }

    const scoring = () => {
        //console.log("in scoring")
        var numCorrect = 0;
        for(let i = 0; i < correctAnswersArray.length; i++){
            if(answersArray[i] == correctAnswersArray[i]){
                numCorrect += 1;
            }
        }
        console.log("Here's your score! ", (numCorrect/answersArray.length)*100)
        return (numCorrect/answersArray.length)*100
    }

    useEffect(() => {
        var count = 0;
        const countVariable = (props.quizData.map(item => 
            item.questions.map(secondItem => count++)
            ));
        setQuestionCount(count);
        pullOutQuestions();
    }, [props.quizData]);
    
    useEffect(() => {
        setQuestionIndex(0);
        console.log("correctAnswersArray: ", correctAnswersArray);
        // if(questionArray){
        //     const input = questionArray
        //     makeSaveForAnswers(input);
        // }
    }, [correctAnswersArray])

    useEffect(() => {
        console.log("Count variable is:", questionCount);
        if(questionCount){
            makeSaveForAnswers(questionCount);
        }
    }, [questionCount]);

    useEffect(() => {
        console.log("answersArray: ", answersArray);
    }, [answersArray]);

    // useEffect(() => {
    //     pullOutQuestions();
    //     //setQuestionIndex(3);
    // }, [props.quizData]);

    // useEffect(() => {
    //     setQuestionIndex(0);
    //     console.log("This is the quiz's question array: ", questionArray);
    // }, [questionArray])

    /*
        {props.quizData.map(item => item.questions.map(
                secondItem => <Question key = {item._id} questionData = {secondItem}/>)[questionIndex])}

            <Navigation questions = {questionCount} 
                nextQuestion = {() => next(questionCount)} prevQuestion = {() => prev()}/>
    */

    return (
        <div>

            {/*questionArray && <Question questionData = {questionArray[questionIndex]} selectedAnswer = {0}/>*/}

            {/*questionArray && <Navigation questionArrayLength = {questionArray.length} 
                nextQuestion = {() => next(questionArray.length)} prevQuestion = {() => prev()}/>*/}

            {/*questionArray && makeSaveForAnswers(questionArray.length)*/}

            {props.quizData.map(item => item.questions.map(
                secondItem => <Question key = {item._id} questionData = {secondItem} questionIndex = {questionIndex} updateAnswer = {(e) => changeAnswer(e, answersArray, questionIndex)}/>)[questionIndex])}

            <Navigation questions = {questionCount} 
                nextQuestion = {() => next(questionCount)} prevQuestion = {() => prev()}/>

            <button onClick={() => scoring()}>submit</button>
        </div>
    );
}

export default Quiz;