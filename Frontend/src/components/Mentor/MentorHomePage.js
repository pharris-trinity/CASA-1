import React, { useEffect, useState } from "react";
import "./stylesMentor.css"
import Navbar from './../General/Navbar';
import SelfAssessment from './SelfAssessment.js';
import PersonalInfo from "./PersonalInfo.js";
import CreateMentorQuiz from "./createMentorQuiz.js";
import MentorPreviousQuizzes from "./mentorPreviousQuizzes.js";
//import CreateQuiz from './../Coach/CreateQuiz.js'; superfluos 


const MentorHome = () => { //Home page for mentor
    const[enableSelfAssessment, setEnableSelfAssessment] = useState(false); //creates function for toggling self assesment window
    const[enableInfoUpdate, setInfoUpdate] = useState(false);               //creates function for toggling info update window
    const [enabledCreateQuiz, setEnabledCreateQuiz] = useState(false);
    const [enabledPreviousQuizzes, setEnabledPreviousQuizzes] = useState(false);

    //const [resetKey, setResetKey] = useState("key"); // creates funtion  for reset quiz key not needed

    //opens self assesment window
    const SelfAssessmentButton = () => {
        setEnableSelfAssessment(true);
    }

    //opens update info window
    const InfoUpdateButton = () => {
        setInfoUpdate(true);
    }    
    
    const createQuizButton = async () =>
    {
        setEnabledCreateQuiz(true);
    }

    const previousQuizzesButton = async () =>
    {
        setEnabledPreviousQuizzes(true);
        document.getElementById("prevQuizPopup").style.display = 'block';
    }

    //closes self assesment window
    const closeSelfAssessment = async () => {
        setEnableSelfAssessment(false);
    }

    //closes update info window
    const closeInfoUpdate = async () => {
        setInfoUpdate(false);
    }

    const closeCreateQuiz = async () => {
        setEnabledCreateQuiz(false);
    }

    const closePreviousQuizzes = async () => {
        setEnabledPreviousQuizzes(false);
    }

    // function showCreateQuiz() {
    //     setEnabledCreateQuiz(true);
    //   }

    //   const resetCreateQuiz = () => {
    //     setResetKey("reset");
    //   }

return (

//sets up layout and components of mentor home page
<>    
<Navbar buttonSet="mentor"/>
    <div className="maincontainer">
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Mentor Homepage</h2>
                    <ul>
                    <button className="casa-button" type="button" onClick={SelfAssessmentButton}>Mentor Self Assessment</button> 
                    <SelfAssessment enabled={enableSelfAssessment} closeForm={closeSelfAssessment}/>
                    <button className="casa-button" type="button" onClick={InfoUpdateButton}>Add/Change Personal Info</button>
                    <PersonalInfo enabled={enableInfoUpdate} closeForm={closeInfoUpdate}/>
                    <button className="casa-button" type="button" onClick={createQuizButton}>Create Quiz</button>
                    <CreateMentorQuiz enabled={enabledCreateQuiz} closeForm={closeCreateQuiz}/>
                    <button className="casa-button" type="button" onClick={previousQuizzesButton}>Previous Quizzes</button>
                    <MentorPreviousQuizzes enabled={enabledPreviousQuizzes} closeForm={closePreviousQuizzes}/>
                    </ul>
                </div>

            </div>
        </div>
    </div>

    </>

    );
};
export default MentorHome;

/*
<button className="casa-button" type="button" onClick={showCreateQuiz}>Create Quiz</button>
                    <CreateQuiz key={resetKey} reset={resetCreateQuiz} enabled={enabledCreateQuiz}/>
                        <li className="takeAssess">
                            <a href="/mentorTable">Table</a>
                        </li>
                        <li className="viewAssess">
                            <a href="/login">Logout</a>
                        </li>
                        */