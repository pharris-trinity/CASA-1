import React, { useState, useEffect } from "react";
import './answer.css'

/* 
The component responsible for rendering 1 answer in a question. When clicked, triggers functions 
in the question component to keep track of which answer is selected. 
*/

function Answer(props) {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(props.currentSelected == props.answerText);
    }, [props.currentSelected])

    return (
        <div>
            {/* Conditional rendering exclusively for CSS changes based on whether this answer is selected */}
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