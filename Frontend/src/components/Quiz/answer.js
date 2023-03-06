import React, { useState, useEffect } from "react";
import './answer.css'


function Answer(props) {

    const [isSelected, setIsSelected] = useState(false);
    
    //console.log("Current selected answer in answer component", props.currentSelected);

    useEffect(() => {
        setIsSelected(props.currentSelected == props.answerText);
    }, [props.currentSelected])

    useEffect(() => {
        //console.log("checking toggle selection in:", props.answerText, isSelected);
    }, [isSelected])

    useEffect(() => {
        //console.log("checking toggle selection in:", props.answerText, isSelected);
    }, [])

    return (
        <div>
            {isSelected 
                ? <p className="selected-question-box" onClick={() => {
                    props.selection(props.answerText);
                    props.updateAnswer(props.answerText)}}>
                {props.answerText}</p>
            
                : <p className="questionbox" onClick={() => {
                    props.selection(props.answerText);
                    props.updateAnswer(props.answerText)}}>
                {props.answerText}</p>
            }
        </div>
    );
}

export default Answer;