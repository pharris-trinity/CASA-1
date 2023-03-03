import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";


const Answer = forwardRef((props, ref) => {

    const[selected,setSelected] = useState(false);

    useImperativeHandle(ref, () => ({
        toggleSelection(bool) {
            //this.setState(state => ({ isDisplayed: !state.isDisplayed }));
            console.log("Bool and AnswerText", bool, props.answerText)
            setSelected(bool);
        },
    }))

    useEffect(() => {
        console.log("selected of _ is _ :", props.answerText, selected);
    }, [selected])

    return (
        <div>
            <p onClick={() => {
                props.selection(props.answerText);
                //toggleSelection();
                }}>
            {props.answerText}</p>
        </div>
    );
})

export default Answer;