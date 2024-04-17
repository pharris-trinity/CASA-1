import React, { useState, useEffect } from 'react';
import QuizInfo from './QuizInfo';
import './createQuiz.css';

function CreateQuiz(props) {
    const [teamCoachID, setTeamCoachID] = useState('');
    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [category, setCategory] = useState('windows');
    const [level, setLevel] = useState('silver');
    const [error, setError] = useState('');

    const addQuestion = () => {
        if(questions.length < 30)
        setQuestions([...questions, {
            description: '',
            answers: ['', '', '', ''],
            correctAnswer: 0,
            value: 1
        }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmitQuizInfo = (data) => {
        setQuizName(data.quizName);
        setCategory(data.category);
    };

    const handleSubmitQuestion = (index, question) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = question;
        setQuestions(updatedQuestions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quizName') {
            setQuizName(value);
        } else if (name === 'category') {
            setCategory(value);
        } else if (name === 'level') {
            setLevel(value)
        }
    };

    const createQuiz = async () => {
        try {
            // Validate quizName and category before submitting

            if (!quizName.trim()) {
                throw new Error('Quiz name is required.');
            }

            // Ensure there are questions added
            if (questions.length === 0) {
                throw new Error('At least one question is required to create a quiz.');
            }

            const testQuestion = {
                description: "description",
                answers: ["1","2","3","4"],
                correctAnswer: 0,
                value : 1
            }
            var tmpData = {questions: questions, author_id: teamCoachID, name: quizName, cat: category, lvl: level}

            // Send quiz data to server
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tmpData)
            };

            const response = await fetch('/api/assessment/add_assessment', requestOptions);
            const jsonData = await response.json();

            // Reset form and state after successful quiz creation
            setQuizName('');
            setCategory('');
            setLevel('');
            setQuestions([]);
            setError('');

            alert('Quiz has been created successfully!');
        } catch (error) {
            setError(error.message);
        } 
    };

    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 

    if(props.enabled)
    return (
        <div className="main-box">
            <h1 className="page-title">Create Quiz</h1>

            <div className="quizinfo-content-box">
                <h3 className="quizinfo-text-container">Quiz Name</h3>
                <input 
                    type="text" 
                    placeholder="Name..." 
                    name="quizName" 
                    value={quizName} 
                    onChange={handleChange}
                />

                <h3 className="quizinfo-text-container">Category</h3>
                <select name="category" value={category} onChange={handleChange}>
                    <option value="windows">Windows</option>
                    <option value="win_server">Win Server</option>
                    <option value="linux">Linux</option>
                    <option value="networking">Networking</option>
                    <option value="security_concepts">Security Concepts</option>
                </select>

                <h3 className="quizinfo-text-container">Level</h3>
                <select name="level" value={level} onChange={handleChange}>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            {/* Display questions */}
            {questions.map((question, index) => (
                <form key={index} onSubmit={(e) => e.preventDefault()}>
                    <div className="cq-content-box">
                        <label className="cq-text-container">Question {index + 1}</label>
                        <input 
                            type="text" 
                            placeholder="Question..." 
                            value={question.description} 
                            onChange={(e) => handleSubmitQuestion(index, {...question, description: e.target.value})} 
                        />

                        <h3 className="cq-text-container-left">Answers Choices:</h3>
                        {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex} className="form-group">
                                <label className="option-label">{String.fromCharCode(65 + answerIndex)}</label>
                                <input 
                                    type="text" 
                                    placeholder={`Option ${String.fromCharCode(65 + answerIndex)}`}
                                    value={answer}
                                    onChange={(e) => {
                                        const newAnswers = [...question.answers];
                                        newAnswers[answerIndex] = e.target.value;
                                        handleSubmitQuestion(index, {...question, answers: newAnswers});
                                    }}  
                                />
                            </div>
                        ))}
                        <h3 className="cq-text-container-left">Correct Answer:</h3>
                        <select
                            value={question.correctAnswer}
                            onChange={(e) => handleSubmitQuestion(index, {...question, correctAnswer: parseInt(e.target.value)})}
                        >
                            
                            {question.answers.map((_, answerIndex) => (
                                <option key={answerIndex} value={answerIndex}>
                                    {String.fromCharCode(65 + answerIndex)}
                                </option>
                            ))}
                        </select>
                        <button className="casa-button button-rightest" onClick={() => removeQuestion(index)}>Remove Question</button>
                    </div>
                </form>
            ))}

            <div className="button-spacer">
                <button className="casa-button button-left" onClick={addQuestion}>Add Question</button>
                <button className="casa-button button-right" onClick={createQuiz}>Create Quiz</button>
            </div>
        </div>
    );
}

export default CreateQuiz;
