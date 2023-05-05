import React, { useState, useEffect } from 'react';

function QuestionForm(props){
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const Question = function(desc, ans, correctAns){
        const description = desc
        const answers = ans
        const correctAnswer = correctAns
        return { description, ans, correctAns }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        props.setQuestion(Question("test description", options, 0))
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
            <div className="form-group">
                <input type="text" placeholder="option" name="option" id="option" onChange={e => setOptions({...options, option: e.target.value})} />
            </div>
        </div>
        <button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
    </form>
    )
}

export default QuestionForm;