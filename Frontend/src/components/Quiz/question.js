import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Answer from "./answer.js";

function Question(props) {
    
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const answerComponentRef = useRef();

    const chooseAnswer = (option) => {
        setSelectedAnswer(option);
    }

    const checkIfSelected = (option) => {
        console.log("currentAnsweris : ", selectedAnswer);
        console.log("option is : ", option);
        console.log("checkIfSelected is being called", selectedAnswer == option);
        console.log("\n");
        
        return selectedAnswer == option;
    }

    // const makeAnswerComponents = () => {
    //     answerComponentRef;
    //     const tempArray = (props.questionData.answers.map((item) => <Answer answerText = {item} selection = {(e) => chooseAnswer(e)} ref = {answerComponentRef}/>));
    //     setAnswers(tempArray);
    //     //console.log("answers array type", typeof tempArray);
    // }
    //console.log("Answers array:", answers);
    const checkAnswer = () => {

    }


    //console.log("index: ", props.questionData.answers.indexOf("search"));
    useEffect(() => {
        //makeAnswerComponents();
    }, [props.questionData])

    useEffect(() => {
        console.log("you selected: ", selectedAnswer);
        // console.log("selected answer: ", props.questionData.answers.indexOf(selectedAnswer));
        // props.questionData.answers.map((item) => {
        //     //console.log(answerComponentRef.current);
        //     answerComponentRef.current.toggleSelection();
        // })
    }, [selectedAnswer])

    return (
        <div>
            <p>{props.questionData.description}</p>
            {/*answers*/}
            {props.questionData.answers.map((item) => <Answer onClick = {console.log(props.questionData.answers.indexOf(selectedAnswer))} answerText = {item} selection = {(e) => chooseAnswer(e)} ref = {answerComponentRef}/>)}
            {/*answers && console.log("index : ", answers)*/}

        </div>
    );
}

export default Question;