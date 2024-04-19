import React, { useState, useEffect, useRef } from 'react';
import './questionForm.css'; // Import CSS file for styling
import './quizInfo.css';
import './createQuiz.css'; // Import CSS file for styling

function QuizQuestion({ quiz }) { 
    const [teamCoachID, setTeamCoachID] = useState("")
    const [category, setCategory] = useState(quiz.category); // Initialize category with the quiz's category
    const [level, setLevel] = useState(quiz.level); // Initialize category with the quiz's level
    const [questions, setQuestions] = useState(quiz.questions); // Initialize questions with the quiz's questions
    const [correctAnswers, setCorrectAnswers] = useState(() => quiz.questions.map(question => question.correctAnswer)); // Initialize correctAnswers with the quiz's correct answers
    const [quizName, setQuizName] = useState(quiz.name); // Initialize quizName with the quiz's name
    const choices = ["A", "B", "C", "D"];

    // Compiles info and makes a question object
    const Question = function (desc, ans, correctAns) {
        const description = desc;
        const answers = ans;
        const correctAnswer = correctAns;
        const value = 1;
        return { description, answers, correctAnswer, value };
    };

    // Submit functionality for React Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedQuiz = {
            ...quiz,
            name: quizName, // Update quiz name
            category: category,
            level: level,
            questions: questions.map((question, index) => ({
                ...question,
                correctAnswer: correctAnswers[index]
            }))
        };

        try {
            const response = await fetch(`/api/editQuiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedQuiz),
            });

            if (response.ok) {
                alert('Quiz updated successfully!');
                // Optionally, you can update local state or perform other actions upon successful update
            } else {
                console.error('Failed to update quiz:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
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
        for (var i = 0; i < quests.current.length; i++) {
            tempArray.push(quests.current[i]);
        }
        if(questions.length < 30){
        setQuestions(tempArray);
        }
    }

    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 

    const removeQuiz = async () => {
        var tmpData = { author_id: teamCoachID, quiz_info: quiz}
        console.log("Remove quiz")
        console.log(JSON.stringify(quiz))
        console.log(teamCoachID)
        try {
            const response = await fetch(`/api/assessment/remove_assessment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tmpData),
            });

            if(response.ok){
            alert('Quiz removed successfully');

            setQuizName('');
            setCategory('');
            setLevel('');
            setQuestions([]);
            }

        } catch (error) {
            //console.log(error);
        }
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
        <div>
        <div className="button-spacer">
                    <button className="casa-button button-rightest" onClick={() => removeQuiz()}>Delete Quiz</button>
                </div>
        <div className="main-box">
            <h1 className="page-title">Edit Quiz</h1>
            <div className="quiz-boxes">
                <div className="quizinfo-content-box">
                    <h3 className="quizinfo-text-container">Quiz: {quiz.name}</h3>
                    <h3 className="quizinfo-text-container">Category</h3>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="windows">Windows</option>
                        <option value="win_server">Win Server</option>
                        <option value="linux">Linux</option>
                        <option value="networking">Networking</option>
                        <option value="security_concepts">Security Concepts</option>
                    </select>
                    <h3 className="quizinfo-text-container">Level</h3>
                    <select value={level} onChange={e => setLevel(e.target.value)}>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
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
                    <button className="casa-button button-right" type="submit" onClick={handleSubmit}>Submit Changes</button>
                </div>
        </div>
        </div>
        </div>
    );
    
}

export default QuizQuestion;
