import React, { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';

function CreateQuiz(props){
    const submitRef = useRef();

    const [questions, setQuestions] = useState([]);

    const addQuestion = (newQ) => {
        if(questions){
            setQuestions(...questions, newQ)
        }
        else{
            setQuestions(newQ)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        setQuestions(questions)
    }

    useEffect(() => {
        if(questions){
            console.log(questions)
        }
    }, [questions])

    if(props.enabled){
        return(
            <div>
                Create Quiz
                <QuestionForm submitRef={submitRef} setQuestion={(e) => addQuestion(e)} questions={questions}/>
                <button onClick={() => submitRef.current.click()}>Submit</button>
            </div> 
            
        )
    }
}

export default CreateQuiz;