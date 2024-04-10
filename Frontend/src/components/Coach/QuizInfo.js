import React, { useState } from 'react';
import './quizInfo.css';

function QuizInfo(props){
    const [quizName, setQuizName] = useState("");
    const [category, setCategory] = useState("windows");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Categort is:")
        console.lof(category)
        props.setInfo({ quizName, category });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="quizinfo-content-box">
                <h3 className="quizinfo-text-container">Quiz Name</h3>
                <input 
                    type="text" 
                    placeholder="Name..." 
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
            <button type="submit" style={{ display: 'none' }} />
        </form>
    );
}

export default QuizInfo;
