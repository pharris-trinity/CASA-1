import React from "react";
import './quizNavigation.css'


/* 
Renders the buttons responsible for going between quiz questions 
*/

function QuizNavigation(props) {

    return (
        <div>
            {/*Definitely a way to make this conditional rendering cleaner, but was under deadline pressure - Josh*/}
            {props.prev !== undefined ? props.index > 0 ? <button onClick={() => props.prev()}>prev</button> : null : null}
            {props.next !== undefined ? props.index == props.questions - 1 ? null : <button onClick={() => props.next()}>next</button> : null}

            {props.showList !== undefined ? <button onClick={() => props.showList(true)}>exit quiz</button> : null}
        </div>
    );
}

export default QuizNavigation;