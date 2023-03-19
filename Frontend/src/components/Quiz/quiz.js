import React, { useState, useEffect } from "react";
import QuizNavigation from "./quizNavigation.js";
import Question from "./question.js";
import "./quiz.css"

/*
This component is main controller for taking a quiz. It is passed a quiz that's been pulled from the database,
and renders a question component for each question in the quiz.
*/

function Quiz(props) {
    const[correctAnswersArray, setCorrectAnswersArray] = useState([]);
    const[questionIndex, setQuestionIndex] = useState(0);
    const[questionCount, setQuestionCount] = useState(0);
    const[answersArray, setAnswersArray] = useState([]);

    //pulls out the correct answer for each quesiton and constructs an array to hold them
    const extractCorrectAnswers = () => {
        const tempArray = (props.quizData.map(quiz => 
            quiz.questions.map(question => question.correctAnswer)))
        setCorrectAnswersArray(...tempArray);
    }

    //changes which question is being rendered -> passed to the Navigation component
    const prevQuestion = () => {
        if(questionIndex-1 >= 0){
            setQuestionIndex(questionIndex-1);
        }
    }
    const nextQuestion = (arraySize) => {
        if(questionIndex+1 < arraySize){
            setQuestionIndex(questionIndex+1);
        }
        
    }

    //constructs an array to hold the user's selected answer for each question
    const constructAnswerArray = (arraySize) => {
        var tempArray = new Array(arraySize).fill(-1);
        setAnswersArray(tempArray);
    }

    //updates the answersArray based on a user's selected answer for a question
    const changeAnswer = (newAnswer, originalArray, changeIndex) => {
        var tempArray = [...originalArray];
        tempArray[changeIndex] = newAnswer;
        setAnswersArray(tempArray);
    }

    //provides a score for the quiz based on how many answers in the answersArray match the correctAnswersArray
    const gradeQuiz = () => {
        var numCorrect = 0;
        for(let i = 0; i < correctAnswersArray.length; i++){
            if(answersArray[i] == correctAnswersArray[i]){
                numCorrect += 1;
            }
        }
        console.log("Here's your score! ", (numCorrect/answersArray.length)*100)
        return (numCorrect/answersArray.length)*100
    }

    const makeTakenQuiz = async () => {
        try {
            const quizQuestions = props.quizData.map(quiz => quiz.questions);
            //{score, questions, answers, correctQuestions, incorrectQuestions, testTakerID, timeStarted, timeFinished}
            var postData = {score: gradeQuiz(), questions: quizQuestions, answers: answersArray, correctQuestions, incorrectQuestions, testTakerID, timeStarted, timeFinished}
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            };
            const response = await fetch('/api/quizsearch', requestOptions);
            const jsonData = await response.json();

            setQuizlist(jsonData);

        } catch (error) {
            
        }
    }

    //checks to make sure an answer has been selected for each quiz question
    const checkIfQuizCompleted = () => {
        if(answersArray){
            if(answersArray.includes(-1)){
                return true
            }
            else{
                return false
            }
        }
    }

    /*code that runs when the quiz is initially passed to this component (mostly stores information in useStates)*/
    useEffect(() => {
        var count = 0;
        props.quizData.map(quiz => 
            quiz.questions.map((question) => count++));
        setQuestionCount(count);
        extractCorrectAnswers();
    }, [props.quizData]);

    //additional setup once we calculate how many questions are in the quiz 
    useEffect(() => {
        console.log("Count variable is:", questionCount);
        if(questionCount){
            constructAnswerArray(questionCount);
        }
    }, [questionCount]);

    return (
        <div>
            {/* Makes a Question component for each question in the quiz, and passes necessary information to the question components */}
            {props.quizData.map(quiz => quiz.questions.map(
                question => <Question key = {quiz._id} questionData = {question} questionIndex = {questionIndex} updateAnswer = {(e) => changeAnswer(e, answersArray, questionIndex)} selected = {answersArray[questionIndex]}/>)[questionIndex])}

            <QuizNavigation questions = {questionCount} next = {() => nextQuestion(questionCount)} prev = {() => prevQuestion()} index = {questionIndex}/>

            {checkIfQuizCompleted() ? null : <button onClick={() => gradeQuiz()}>submit</button>}
        </div>
    );
}

export default Quiz;