import React from "react";
import './quizResults.css'
import '../Coach/questionForm.css';
import '../Coach/quizInfo.css';
import '../Coach/createQuiz.css';

function QuizResults(props) {

    const questionArray = props.questions.map((question, index) => (
        <div key={index} className="question-container">
            <p className="question-number">Question {index + 1}:</p>
            <p>Your Answer: <span className={props.studentAnswers[index] === props.correctAnswers[index] ? 'correct-answer' : 'incorrect-answer'}>{question.answers[props.studentAnswers[index]]}</span></p>
            <p>Correct Answer: <span className="correct-answer">{question.answers[props.correctAnswers[index]]}</span></p>
      </div>
    ));

    return (
        <div className="quiz-results-container">
            <h1 className="page-title">Quiz Results: {props.quizName}</h1>
            <div className="solution">
            <p className="solution">Score: {props.score}% </p>
            </div>
            {props.questions.map((question, index) => (
                    <div key={index} className="cq-content-box">
                        <label className="cq-text-container">Question {index + 1}</label>
                        {/* <input
                            type="text"
                            placeholder="Question..."
                            name="description"
                            value={question.description}
                            onChange={e => handleChange(index, 'description', e.target.value)}
                        /> */}
                        <h3 className="cq-text-container-left">Your answer:</h3>
                        <span className={props.studentAnswers[index] === props.correctAnswers[index] ? 'correct-answer' : 'incorrect-answer'}>{question.answers[props.studentAnswers[index]]}</span>
                        <p>Correct Answer: </p> 
                        <span className="correct-answer">{question.answers[props.correctAnswers[index]]}</span>
                    </div>
                ))}
        </div>
    );
}

export default QuizResults;
