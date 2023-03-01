import React, { useState, useEffect } from "react";


function Answer(props) {
    useEffect(() => {
        console.log("answer text: ", props.answerText);
        console.log("isSelected: ", props.isSelected);
    }, [props.isSelected]);
    console.log("answer text: ", props.answerText);
    console.log("isSelected: ", props.isSelected);
    return (
        <div>
            <p onClick={() => props.selection(props.answerText)}>{props.answerText}</p>
        </div>
    );
}

export default Answer;