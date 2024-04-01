import React, { useState, useEffect, useRef } from 'react';
import './questionForm.css'; // Import CSS file for styling
import './quizInfo.css';
import './createQuiz.css'; // Import CSS file for styling

function QuizQuestion({ quiz, submitRef, setInfo}) {
    const [category, setCategory] = useState(quiz.category); // Initialize category with the quiz's category
    const [questions, setQuestions] = useState(quiz.questions); // Initialize questions with the quiz's questions
    const [correctAnswers, setCorrectAnswers] = useState(() => quiz.questions.map(question => question.correctAnswer)); // Initialize correctAnswers with the quiz's correct answers
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionForms, setQuestionForms] = useState([]);
    const [quizName, setQuizName] = useState();
    const refs = useRef([]);
    const quizInfoRef = useRef();

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
        const updatedQuiz = {
            ...quiz,
            category: category,
            questions: questions.map((question, index) => ({
                ...question,
                correctAnswer: correctAnswers[index]
            }))
        };
        // Handle submitting the updated quiz to the backend
        console.log("Updated quiz:", updatedQuiz);
        setInfo([updatedQuiz.quiz, updatedQuiz.category]);
        console.log("propped")
        console.log(updatedQuiz.category)
    };

    const handleChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleChoiceChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestions = (quests) => {
        var tempArray = [];
        for(var i = 0; i < quests.current.length; i++) {
            tempArray.push(quests.current[i]);
        }
        setQuestions(tempArray);
    }

    // Update correctAnswers when the number of questions changes
    useEffect(() => {
        setCorrectAnswers(prevCorrectAnswers => {
            const newCorrectAnswers = [...prevCorrectAnswers];
            while (newCorrectAnswers.length < questions.length) {
                newCorrectAnswers.push(0); // Default correct answer index to 0
            }
            return newCorrectAnswers;
        });
    }, [questions]);

    return (
        <div className="main-box">
            <h1 className="page-title">Edit Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div className="quiz-boxes">
                    <div className="quizinfo-content-box">
                        <h3 className="quizinfo-text-container">{quiz.name}</h3>
                        <h3 className="quizinfo-text-container">Category</h3>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="windows">Windows</option>
                            <option value="win_server">Win Server</option>
                            <option value="linux">Linux</option>
                            <option value="networking">Networking</option>
                            <option value="security_concepts">Security Concepts</option>
                        </select>
                    </div>
                    {/* Render a box for each question */}
                    {questions.map((question, index) => (
                        <div key={index} className="cq-content-box">
                            <label className="cq-text-container">Question {index + 1}</label>
                            <input
                                type="text"
                                placeholder="Question..."
                                name="description"
                                value={question.description}
                                onChange={e => handleChange(index, 'description', e.target.value)}
                            />
                            <h3 className="cq-text-container-left">Answers Choices:</h3>
                            {question.answers.map((input, i) => (
                                <div key={i} className="form-group">
                                    <label className="option-label">{choices[i]}</label>
                                    <input
                                        type="text"
                                        placeholder={`Option ${choices[i]}`}
                                        value={input}
                                        onChange={e => handleChoiceChange(index, i, e.target.value)}
                                    />
                                </div>
                            ))}
                            <p>Correct Answer: </p>
                            <select
                                value={correctAnswers[index]}
                                onChange={e => {
                                    const updatedCorrectAnswers = [...correctAnswers];
                                    updatedCorrectAnswers[index] = parseInt(e.target.value);
                                    setCorrectAnswers(updatedCorrectAnswers);
                                }}
                            >
                                {choices.map((choice, i) => (
                                    <option key={i} value={i}>
                                        {choice}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="button-spacer">
                        <button className="casa-button button-left" onClick={() => setQuestions(prevQuestions => [...prevQuestions, { description: "", answers: ["", "", "", ""], correctAnswer: 0 }])}>Add Question</button>
                        <button className="casa-button button-right" onClick={() => {

                            refs.current.map(ref => { ref.click() })
                            addQuestions(refs);

                            quizInfoRef.current.click();
                            setQuizName(quizInfoRef.current[0]);
                            setCategory(quizInfoRef.current[1]);

                        }}>Submit Changes</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default QuizQuestion;
