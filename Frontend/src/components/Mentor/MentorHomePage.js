import React, { useEffect, useState } from "react";
import "./stylesMentor.css"
import Navbar from './../General/Navbar';
import SelfAssessment from './SelfAssessment.js';
import CreateQuiz from './../Coach/CreateQuiz.js';


const MentorHome = () => {
    const[enableSelfAssessment, setEnableSelfAssessment] = useState(false);
    const [enabledCreateQuiz, setEnabledCreateQuiz] = useState(false);
    const [resetKey, setResetKey] = useState("key");

    //opens MakeTeam component
    const SelfAssessmentButton = () => {
        setEnableSelfAssessment(true);
    }

    //closes MakeTeam component and updates coach info from DB
    const closeSelfAssessment = async () => {
        setEnableSelfAssessment(false);
    }

    function showCreateQuiz() {
        setEnabledCreateQuiz(true);
      }

      const resetCreateQuiz = () => {
        setResetKey("reset");
      }

return (

<>    
<Navbar buttonSet="mentor"/>
    <div className="maincontainer">
        <h1>Mentor Homepage</h1>
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Mentor Homepage</h2>
                    <ul>
                    <button className="casa-button" type="button" onClick={SelfAssessmentButton}>Mentor Self Assessment</button>
                    <SelfAssessment enabled={enableSelfAssessment} closeForm={closeSelfAssessment}/>
                    <button className="casa-button" type="button" onClick={SelfAssessmentButton}>Update Contact Info</button>
                    <SelfAssessment enabled={enableSelfAssessment} closeForm={closeSelfAssessment}/>
                        <li className="viewAssess">
                            <a href="/login">Logout</a>
                        </li>

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