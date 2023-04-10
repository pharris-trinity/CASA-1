import React from "react";
import './quizNavigation.css'


/* 
Renders the buttons responsible for going between quiz questions 
*/

function QuizNavigation(props) {

    return (
        <>
        <div style={{ marginTop: 20 }}>
            {/*Definitely a way to make this conditional rendering cleaner, but was under deadline pressure - Josh*/}
            {props.prev !== undefined ? props.index > 0 ?
                <button className='casa-button' style={{ float: 'left' }} onClick={() => props.prev()}>PREV</button> : null : null}
            
            {props.next !== undefined ? props.index == props.questions - 1 ? null :
             <button className='casa-button' style={{ float: 'right' }} onClick={() => props.next()}>NEXT</button> : null}

            <div style={{clear: 'both'}}></div>
            {props.showList !== undefined ? <button className='casa-button' style={{ marginTop: 50 }} onClick={() => props.showList(true)}>EXIT QUIZ</button> : null}
        </div>
        </>  
    );
}

export default QuizNavigation;