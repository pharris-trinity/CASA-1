import React, { useState, useEffect } from 'react';
import './questionForm.css'

/*  
Component that has inputs for all parts of making a Question. For create quiz functionality.
*/

function QuestionForm(props){
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([{0: ""}, {1: ""}, {2: ""}, {3: ""}]);
    //const [options, setOptions] = useState(["","","",""])
    const [correctAnswer, setCorrectAnswer] = useState(0);

    //compiles info and makes a question object
    const Question = function(desc, ans, correctAns){
        const description = desc
        const answers = ans
        const correctAnswer = correctAns
        const value = 1;
        return { description, answers, correctAnswer, value }
    }

    //submit functionality for React Form
    const handleSubmit = (e) => {
        e.preventDefault()
        var formattedOptions = [];
        for(var i = 0; i < options.length; i++) {
            formattedOptions.push(options[i][i]);
        }
        props.setQuestion(Question(description, formattedOptions, correctAnswer))
    }

    //logic to update text box for answer options
    const handleChange = (index, event) =>{
        event.preventDefault()
        let data = [...options]
        data[index][index] = event.target.value
        setOptions(data)
    }

    return(
    <form onSubmit={handleSubmit}>
        <div className="cq-content-box">
            <label className="cq-text-container">Question {props.num + 1}</label>
            <h3 className="cq-text-container-left">Description</h3>
            <input 
                type="text" 
                placeholder="description..." 
                name="description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
            
            />

            <h3 className="cq-text-container-left">Possible Answers:</h3>
            {options.map((input, index) => {
                    return(
                        <div key={index} className="form-group">
                            <input 
                                type="text" 
                                placeholder="option" 
                                name="option" 
                                value={input.option}
                                onChange={e => handleChange(index, e)}  
                            />
                        </div>
                    )
                })
            }
            <h3 className="cq-text-container-left">Correct Answer:</h3>
            <input 
                type="number" 
                pattern="[0-9]*" 
                placeholder="0" 
                value={correctAnswer} 
                onChange={e => setCorrectAnswer(v => e.target.validity.valid ? parseInt(e.target.value, 10) : v)} />
        </div>
        {/* <button type="button" onClick={() => props.deleteQuestion(props.num)}>Delete Question</button> */}
        <button num={props.num} ref={props.submitRef} type="submit" style={{ display: 'none' }} />
    </form>
    )
}

export default QuestionForm;