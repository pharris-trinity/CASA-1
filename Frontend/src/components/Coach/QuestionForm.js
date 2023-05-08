import React, { useState, useEffect } from 'react';

function QuestionForm(props){
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([{0: ""}, {1: ""}, {2: ""}, {3: ""}]);
    //const [options, setOptions] = useState(["","","",""])
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const Question = function(desc, ans, correctAns){
        const description = desc
        const answers = ans
        const correctAnswer = correctAns
        const value = 1;
        return { description, answers, correctAnswer, value }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form ", props.num, "submitted")
        var formattedOptions = [];
        for(var i = 0; i < options.length; i++) {
            console.log("handleSubmit: options[i][i]", options[i][i]);
            formattedOptions.push(options[i][i]);
        }

        console.log("handleSubmit: formatted options", formattedOptions);
        props.setQuestion(Question(description, formattedOptions, correctAnswer))
    }

    const handleChange = (index, event) =>{
        //console.log(event)
        event.preventDefault()
        let data = [...options]
        data[index][index] = event.target.value
        //console.log("handleChange: data[index][index]", data[index][index] )
        //console.log("handleChange: data[index]", data[index] )
        setOptions(data)
    }

    useEffect(() => {
        if(options){
            //console.log(options)
        }
    }, [options])

    return(
    <form onSubmit={handleSubmit}>
        <div className="form-field">
            <label>Question {props.num + 1}</label>
            <h1>Description</h1>
            <input 
                type="text" 
                placeholder="description..." 
                name="description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
            
            />

            <h1>Possible Answers:</h1>
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
            <h1>Correct Answer:</h1>
            <input 
                type="number" 
                pattern="[0-9]*" 
                placeholder="0" 
                value={correctAnswer} 
                onChange={e => setCorrectAnswer(v => e.target.validity.valid ? parseInt(e.target.value, 10) : v)} />
        </div>
        <button type="button" onClick={() => props.deleteQuestion(props.num)}>Delete Question</button>
        <button num={props.num} ref={props.submitRef} type="submit" style={{ display: 'none' }} />
    </form>
    )
}

export default QuestionForm;