import React from "react";
import './quizNavigation.css'


/* 
Renders the buttons responsible for going between quiz questions 
*/

function QuizNavigation(props) {

    return (
        <div>
            {props.index > 0 ? <button onClick={() => props.prev()}>prev</button> : null}
            {props.index == props.questions - 1 ? null : <button onClick={() => props.next()}>next</button>}
        </div>
    );
}

export default QuizNavigation;