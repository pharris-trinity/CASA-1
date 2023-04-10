import React, { useState, useEffect } from "react";
import Answer from "./answer.js";
import './question.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function Question(props) {
    
    const [selectedAnswer, setSelectedAnswer] = useState("");

    /*Changes the currently selected answer for the question 
    (is passed to and runs in the Answer component when an answer is selected)*/
    const chooseAnswer = (option) => {
        setSelectedAnswer(option);
    }

    //Checks if an answer has been previously selected in this question and updates the selectedAnswer accordingly
    const checkIfAnswerIsSelected = () => {
        if(props.selected != -1){
            setSelectedAnswer(props.questionData.answers[props.selected])
        }
        else{
            setSelectedAnswer("");
        }
    }

    //Runs code upon component being passed new question data
    useEffect(() => {
        checkIfAnswerIsSelected();
    }, [props.questionData])


    //style={{ marginBottom: "30px"}}
    return (
        <div>
            <p className="question-description">{props.questionData && props.questionData.description}</p>

            {/* Renders an Answer component for each of the question's answers */}
            {props.questionData && props.questionData.answers.map((answer) =>
                <Answer updateAnswer = {(e) => props.updateAnswer(props.questionData.answers.indexOf(e))}
                currentSelected = {selectedAnswer} answerText = {answer} selection = {(e) => chooseAnswer(e)}/>)}
        </div>
    );
}

export default Question;