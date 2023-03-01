import React, { useState, useEffect } from "react";
import Answer from "./answer.js";

function Question(props) {
    
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const chooseAnswer = (option) => {
        setSelectedAnswer(option);
        //go through the answers, for the one that matches the new option set isSelected to be true else isSelected = false
        answers.map((item) => {
            if(item.answerText == option) {
                item.isSelected = true;
            }
            else {
                item.isSelected = false;
            }
        })
    }

    const makeAnswerComponents = () => {
        const tempArray = (props.questionData.answers.map((item) => <Answer isSelected = {false} selection = {(e) => chooseAnswer(e)} answerText = {item}/>));
        
        setAnswers(tempArray);
        //console.log("answers array type", typeof tempArray);
    }
    //console.log("Answers array:", answers);
    const checkAnswer = () => {

    }


    //console.log("index: ", props.questionData.answers.indexOf("search"));
    useEffect(() => {
        makeAnswerComponents();
    }, [props.questionData])

    useEffect(() => {
        console.log("you selected: ", selectedAnswer);
        console.log("selected answer: ", props.questionData.answers.indexOf(selectedAnswer));
    }, [selectedAnswer])

    return (
        <div>
            <p>{props.questionData.description}</p>
            {answers}
            {/*answers && console.log("index : ", answers)*/}

        </div>
    );
}

export default Question;