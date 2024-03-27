import React, { useState, useEffect } from 'react';
import './questionForm.css'

/*  
Component that has inputs for all parts of making a Question. For create quiz functionality.
*/

function QuestionForm(props){
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([{0: ""}, {1: ""}, {2: ""}, {3: ""}]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const choices = ["A", "B", "C", "D"];

    // Compiles info and makes a question object
    const Question = function(desc, ans, correctAns){
        const description = desc;
        const answers = ans;
        const correctAnswer = correctAns;
        const value = 1;
        return { description, answers, correctAnswer, value };
    };

    // Submit functionality for React Form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedOptions = options.map(option => Object.values(option)[0]);
        props.setQuestion(Question(description, formattedOptions, correctAnswer));
    };

    // Logic to update text box for answer options
    const handleChange = (index, event) =>{
        event.preventDefault();
        const { value } = event.target;
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = { [index]: value };
            return newOptions;
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="cq-content-box">
                <label className="cq-text-container">Question {props.num + 1}</label>
                <input 
                    type="text" 
                    placeholder="Question..." 
                    name="description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />

                <h3 className="cq-text-container-left">Answers Choices:</h3>
                {options.map((input, index) => {
                    return(
                        <div key={index} className="form-group">
                            <label className="option-label">{choices[index]}</label>
                            <input 
                                type="text" 
                                placeholder={`Option ${choices[index]}`}
                                name="option" 
                                value={Object.values(input)[0]}
                                onChange={e => handleChange(index, e)}  
                            />
                        </div>
                    )
                })}
                <h3 className="cq-text-container-left">Correct Answer:</h3>
                <select
                    value={correctAnswer}
                    onChange={e => setCorrectAnswer(parseInt(e.target.value))}
                >
                    {choices.map((choice, index) => (
                        <option key={index} value={index}>
                            {choice}
                        </option>
                    ))}
                </select>
            </div>
            <button num={props.num} ref={props.submitRef} type="submit" style={{ display: 'none' }} />
        </form>
    )
}

export default QuestionForm;
