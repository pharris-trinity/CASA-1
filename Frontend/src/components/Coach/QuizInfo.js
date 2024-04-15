// QuizInfo.js
import React, { useState } from 'react';
import './quizInfo.css';

function QuizInfo(props){
    const [quizName, setQuizName] = useState("");
    const [category, setCategory] = useState("windows");


    const handleSubmit = (e) => {
        e.preventDefault();
        props.setInfo({ quizName, category });

        // Reset quiz name and category after submission
        setQuizName("");
        setCategory("windows");
    };

    
    // Update parent component's state when quiz name changes
    const handleQuizNameChange = (e) => {
        setQuizName(e.target.value);
        props.onChange({ quizName: e.target.value, category });
    };

    // Update parent component's state when category changes
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        props.onChange({ quizName, category: e.target.value });
    };

    return(
        <div className="quizinfo-content-box">
            <h3 className="quizinfo-text-container">Quiz Name</h3>
            <input 
                type="text" 
                placeholder="Name..." 
                name="quizName" 
                value={quizName} 
                onChange={handleQuizNameChange}
            />

            <h3 className="quizinfo-text-container">Category</h3>
            <select value={category} onChange={handleCategoryChange}>
                <option value="windows">Windows</option>
                <option value="win_server">Win Server</option>
                <option value="linux">Linux</option>
                <option value="networking">Networking</option>
                <option value="security_concepts">Security Concepts</option>
            </select>
        </div>
    );
}

export default QuizInfo;
