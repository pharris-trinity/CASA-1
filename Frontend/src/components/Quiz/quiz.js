import React, { useState, useEffect } from "react";
import QuizNavigation from "./quizNavigation.js";
import Question from "./question.js";
import "./quiz.css"
import QuizResults from "./quizResults.js";
import Navbar from './../General/Navbar';

/*
This component is main controller for taking a quiz. It is passed a quiz that's been pulled from the database,
and renders a question component for each question in the quiz.
*/

function Quiz(props) {
    const[correctAnswersArray, setCorrectAnswersArray] = useState([]);
    const[questionIndex, setQuestionIndex] = useState(0);
    const[questionCount, setQuestionCount] = useState(0);
    const[answersArray, setAnswersArray] = useState([]);
    const[correctGradedAnswers, setCorrectGradedAnswers] = useState([]);
    const[incorrectGradedAnswers, setIncorrectGradedAnswers] = useState([]);
    const[startTime, setStartTime] = useState();
    const[endTime, setEndTime] = useState();
    const[grade, setGrade] = useState(-1);
    const[results, setResults] = useState(false);
    const[originalQuizID, setOriginalQuizID] = useState(0);

    const userID = localStorage._id;

    //pulls out the correct answer for each quesiton and constructs an array to hold them
    const extractCorrectAnswers = () => {
        const tempArray = (props.quizData.map(quiz => 
            quiz.questions.map(question => question.correctAnswer)))
        setCorrectAnswersArray(...tempArray);
    }

    const getDateTime = () => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return(dateTime);
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
        const tempCorrectAnswers = [];
        const tempIncorrectAnswers = [];
        for(let i = 0; i < correctAnswersArray.length; i++){
            if(answersArray[i] == correctAnswersArray[i]){
                numCorrect += 1;
                tempCorrectAnswers.push(i);

            }
            else {
                tempIncorrectAnswers.push(i);
            }
        }
        setCorrectGradedAnswers(tempCorrectAnswers);
        setIncorrectGradedAnswers(tempIncorrectAnswers);
        setEndTime(getDateTime());
        setGrade((numCorrect/answersArray.length)*100);
        setResults(true);
        return;
    }

    const makeTakenQuiz = async () => {
        try {
            const quizQuestions = props.quizData.map(quiz => quiz.questions);
            const quizName = props.quizData[0].name;
            const quizCategory = props.quizData[0].category;

            var postData = {name: quizName, category: quizCategory, score: grade, questions: quizQuestions[0], answers: answersArray, correctQuestions: correctGradedAnswers, incorrectQuestions: incorrectGradedAnswers, 
                testTakerID: userID, timeStarted: startTime, timeFinished: endTime, originalQuizID: originalQuizID}

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            };
            fetch('/api/assessment/take_quiz', requestOptions).then(res => res.json()).then(
                data => {
                    return;
                })

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
        setStartTime(getDateTime());
        extractCorrectAnswers();
        setOriginalQuizID(props.quizData.map(quiz=>quiz._id));
    }, [props.quizData]);

    //additional setup once we calculate how many questions are in the quiz 
    useEffect(() => {
        if(questionCount){
            constructAnswerArray(questionCount);
        }
    }, [questionCount]);

    useEffect(() => {
        if(grade != -1) {makeTakenQuiz()}
    }, [grade]);

    return (
        <>
        {/*<Navbar buttonSet="takeQuiz"/>*/}
        
        <div>
            {/* Displays the quiz content unless the quiz has been submitted */}
            {results == false 
            ? <div className='quiz-main-box'>
                {console.log("Quiz Props: : ", props)}
                {/* <div className='quiz-title'>{props.quizData[0].name}</div> */}
                <div className='quiz-title'>{props.quizData.name}</div>
                    <div className='quiz-content-box'>
                    {/* Makes a Question component for each question in the quiz, and passes necessary information to the question components */}
                    {props.quizData.map(quiz => quiz.questions.map(
                        question => <Question key = {quiz._id} questionData = {question} questionIndex = {questionIndex}
                        updateAnswer = {(e) => changeAnswer(e, answersArray, questionIndex)} 
                        selected = {answersArray[questionIndex]}/>)[questionIndex])}

                    <QuizNavigation questions = {questionCount} next = {() => nextQuestion(questionCount)} prev = {() => prevQuestion()} 
                        index = {questionIndex} showList = {(e) => props.showList(e)} />

                    {checkIfQuizCompleted() ? null : <button className='casa-button'
                        style={{float: "right", marginRight:"10", marginTop: "-44px"}} onClick={() => gradeQuiz()}>SUBMIT</button>}
                </div>
            </div>
            : <div>
                {/* Displays the result screen and exit button if the quiz has been submitted */}
                <QuizResults score={grade} postData={postData} />
                <QuizNavigation showList = {(e) => props.showList(e)} />
            </div>}
        </div>
        </>
    );
}

export default Quiz;
