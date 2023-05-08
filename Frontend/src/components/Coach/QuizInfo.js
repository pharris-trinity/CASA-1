import React, { useState, useEffect } from 'react';
import './quizInfo.css'

/*
Component that has input fields for Quiz Name and Quiz Category. Part of create quiz funcionality.
*/

function QuizInfo(props){
    const [quizName, setQuizName] = useState("");
    const [category, setCategory] = useState("windows");


    //submit functionality for React Form. 
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setInfo([quizName, category]);
    }

    return(
    <form onSubmit={handleSubmit}>
        <div className="quizinfo-content-box">
            {/* <label>Question {props.num + 1}</label> */}
            <h3 className="quizinfo-text-container">Quiz Name</h3>
            <input 
                type="text" 
                placeholder="name..." 
                name="quizName" 
                value={quizName} 
                onChange={e => setQuizName(e.target.value)}
            
            />

            <h3 className="quizinfo-text-container">Category</h3>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="windows">Windows</option>
                <option value="win_server">Win Server</option>
                <option value="linux">Linux</option>
                <option value="networking">Networking</option>
                <option value="security_concepts">Security Concepts</option>
            </select>



        </div>
        <button num={props.num} ref={props.submitRef} type="submit" style={{ display: 'none' }} />
    </form>
    )
}

export default QuizInfo;