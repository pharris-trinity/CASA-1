import React, { useState, useEffect } from 'react';

function QuestionForm(props){
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([{0: ""}, {1: ""}, {2: ""}, {3: ""}]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const Question = function(desc, ans, correctAns){
        const description = desc
        const answers = ans
        const correctAnswer = correctAns
        return { description, answers, correctAnswer }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        props.setQuestion(...props.questions, Question(description, options, correctAnswer))
    }

    const handleChange = (index, event) =>{
        //console.log(event)
        event.preventDefault()
        let data = [...options]
        data[index][index] = event.target.value
        setOptions(data)
    }

    useEffect(() => {
        if(options){
            console.log(options)
        }
    }, [options])

    return(
    <form onSubmit={handleSubmit}>
        <div className="form-field">
            <label>Question</label>
            <h1>Description</h1>
            <input type="text" placeholder="description..." name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            <h1>Possible Answers:</h1>
            {options.map((input, index) => {
                    return(
                        <div key={index} className="form-group">
                            <input type="text" placeholder="option" name="option" onChange={e => handleChange(index, e)} value={input.option} />
                        </div>
                    )
                })
            }
            <h1>Correct Answer:</h1>
            <input type="number" pattern="[0-9]*" placeholder="0" value={correctAnswer} onChange={e => setCorrectAnswer(v => e.target.validity.valid ? e.target.value : v)} />
        </div>
        <button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
    </form>
    )
}

export default QuestionForm;