import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Mentor/Header';
import '../MentorRedirect/MentorTeams.css';
import '../Mentor/PageLayout.css'


// This is the basic page where the user will take a mock quiz.
function MentorAssessment() {

	let navigate = useNavigate();

	const questions = [
		{
			questionText: 'What is the name of the database that contains a the master list of usernames and password hashes on a Windows system?',
			answerOptions: [
				{ answerText: 'SAM database/file', isCorrect: true },
				{ answerText: 'passwd database/file', isCorrect: false },
				{ answerText: 'shadow database/file', isCorrect: false },
				{ answerText: 'ntdis.dis', isCorrect: false },
			],
		},
		{
			questionText: 'Where can you enable the setting that will force users to use complex passwords?',
			answerOptions: [
				{ answerText: 'Control Panel --> User Accounts', isCorrect: false },
				{ answerText: 'Control Panel --> System and Security', isCorrect: false },
				{ answerText: 'Local Security Policy', isCorrect: true },
				{ answerText: 'Computer Management', isCorrect: false },
			],
		},
		{
			questionText: 'What is the best method for removing Internet Explorer from a Windows machine?',
			answerOptions: [
				{ answerText: 'Delete the .exe from c: Program Files', isCorrect: false },
				{ answerText: 'Utilize `Add or Remove Programs`', isCorrect: false },
				{ answerText: 'Utilize `Programs and Features` ', isCorrect: true },
				{ answerText: 'Disable Internet Explorer via a GPO', isCorrect: false },
			],
		},
		{
			questionText: 'What cmd sequence allows you to upgrade a FAT32 filesystem?',
			answerOptions: [
				{ answerText: 'convert', isCorrect: true },
				{ answerText: 'chkdsk', isCorrect: false },
				{ answerText: 'format', isCorrect: false },
				{ answerText: 'diskpart', isCorrect: false },
			],
		},
		{
			questionText: 'You see that a user has been using mstsc.exe. What was the user attempting to do?',
			answerOptions: [
				{ answerText: 'run a powershell command', isCorrect: false },
				{ answerText: 'utilize the remote desktop client', isCorrect: true },
				{ answerText: 'execute a terminal command', isCorrect: false },
				{ answerText: 'update a user password', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	function teamsButton(){
		navigate('/mentorteams', {replace: true})   
	}
  
	// To navigate to the mentor quiz page.
	function createQuiz(){
		navigate('/mentorquiz', {replace: true})
		
	}
	// To navigate to the mentor assessment page
	function createAssessment(){
	  navigate('/mentorassessment', {replace: true})
		
	}
  
	// Same thing
	function editQuiz(){
		navigate('/mentorquiz', {replace: true})
		
	}
  
	function editAssessment(){
		navigate('/mentorassessment', {replace: true})
		
	}

	function logOut(){
		navigate('/login', {replace: true})
	  }

    
	return (
        
		<div className='app'> 

<Header />
            <div className='button'>
              <button onClick={teamsButton}>
                  Teams
              </button>

              <button onClick={createQuiz}>
              Create Quiz
              </button>
            
              <button onClick={createAssessment}>
                Create Assessment
              </button>
  
              <button onClick={editQuiz}>
                Edit Quiz
              </button>
  
              <button onClick={editAssessment}>
                Edit Assessment
              </button> 

              <button>
                Profile
              </button>

              <button onClick={logOut}>
                Logout
              </button>
    
            </div>
			
				<div className='text'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
			</div>
		</div>
		
	);
}

export default MentorAssessment;
