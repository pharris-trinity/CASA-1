import React, {useState} from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"

export default function TestQuiz1Page() {

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    
    //temp questions
    const questions = [
    {
        description: "Which tab under File Explorer Options will allow you to define a system-wide setting which will always display hidden files?",
        options: [
        { id: 0, text: "general", isCorrect: false },
        { id: 1, text: "view", isCorrect: true },
        { id: 2, text: "search", isCorrect: false },
        { id: 3, text: "security", isCorrect: false },
        ],
    },
    {
        description: "What is the name of the program most often used to extract credentials from the LSASS.EXE process?",
        options: [
        { id: 0, text: "hashcat", isCorrect: false },
        { id: 1, text: "john the ripper", isCorrect: false },
        { id: 2, text: "hydra", isCorrect: false },
        { id: 3, text: "mimikatz", isCorrect: true },
        ],
    },
    {
        description: "What is the name of the database that contains a the master list of usernames and password hashes on a Windows system?",
        options: [
        { id: 0, text: "SAM database/file", isCorrect: true },
        { id: 1, text: "passwd database/file", isCorrect: false },
        { id: 2, text: "shadow database/file", isCorrect: false },
        { id: 3, text: "ntdis.dis", isCorrect: false },
        ],
        },
        {
        description: "Where can you enable the setting that will force users to use complex passwords?",
        options: [
        { id: 0, text: "Control Panel --> User Accounts", isCorrect: false },
        { id: 1, text: "Control Panel --> System and Security", isCorrect: false },
        { id: 2, text: "Local Security Policy", isCorrect: true },
        { id: 3, text: "Computer Management", isCorrect: false },
        ],
        },
        {
        description: "What is the best method for removing Internet Explorer from a Windows machine?",
        options: [
        { id: 0, text: "Delete the .exe from c:/Program Files", isCorrect: false },
        { id: 1, text: "Utilize 'Add or Remove Programs'", isCorrect: true },
        { id: 2, text: "Utilize 'Programs and Features'", isCorrect: true },
        { id: 3, text: "Disable Internet Explorer via a GPO", isCorrect: false },
        ],
        },
      ];

    const correctAnswers = [1,3,0,2,2];

    const optionClicked = (isCorrect) => {
        // Increment the score (of correct questions)
        if (isCorrect) {
          setScore(score + 1);
        }
        // if we run out of questions to ask, set state for final results to true & show it, otherwise
        // advance
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResults(true);
        }
    };

    //to be replaced, just a guide
    return(
    <>
    <StudNavbar />
    <div className="quizcontainer">
        <div className="quizheader">
            <h1>Quiz 1</h1>
        </div>
        {/*if show results state is true, then show, else show questions*/}
        {/*score currently is being calculated as an average of all questions, change later*/}
        {showResults ? (
        <div className="finalScore">
          <h1>Final Score</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%) 
          </h2>
        </div>
        ) : (
        /* questions list*/
        <div className="questionbox">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="questionnumber">{questions[currentQuestion].description}</h3>

          {/* answers for curr question  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
    
    </>
    );
}