// Here will be the mentor page with a decent layout and buttons to future pages.
import React, { useState } from 'react';
//import Button from './MentorButton';
import '../Mentor/Button.css'
import '../Mentor/PageLayout.css'
import '../Coach/CoachProfile'
import './coachHome.css'
import ManageTeams from './ManageTeams';
import StudentStats from './StudentStats';
import Navbar from './../General/Navbar';
import { useNavigate } from 'react-router-dom';
import {loginChecker} from "../General/LoginCheck";

function CoachHome() {

  const [enabledManageTeam, setEnabledManageTeam] = useState(false);
  const [enabledStudentStats, setEnabledStudentStats] = useState(false);
  const [enabledCreateQuiz, setEnabledCreateQuiz] = useState(false);
  const [enabledFindMentors, setEnabledFindMentors] = useState(false);

  let navigate = useNavigate();

  window.onload = (event) => {
    var toNavigateTo = loginChecker("Coach")
    if(toNavigateTo != "stay ")navigate(toNavigateTo, {replace: true})
  };

  function teamsButton(){
    //navigate('/ViewTeams2', {replace: true}) 
    setEnabledManageTeam(!enabledManageTeam); 
    setEnabledStudentStats(false);
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false); 
  }

  function showStudentStats() {
    setEnabledStudentStats(!enabledStudentStats);
    setEnabledManageTeam(false); 
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false);
  }

  function showCreateQuiz() {
    setEnabledCreateQuiz(!enabledCreateQuiz);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledFindMentors(false);
  }

  function showFindMentors() {
    setEnabledFindMentors(!enabledFindMentors);
    setEnabledCreateQuiz(false);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
  }

  function coachProfile(){
    navigate('/profile', {replace: true})
  }

  function coachTableButton(){
    navigate('/coachtable', {replace: true})
  }

  


return (
  <>
    <Navbar buttonSet="coach"/>

    <div className="coach-page-main">
        <button className={enabledManageTeam ? "selected-tab" : "unselected-tab"} onClick={teamsButton}>
        Manage Teams
        </button>

        <button className={enabledStudentStats ? "selected-tab" : "unselected-tab"} onClick={showStudentStats}>
        Student Stats
        </button>

        <button className={enabledCreateQuiz ? "selected-tab" : "unselected-tab"} onClick={showCreateQuiz}>
        Create Quizzes
        </button>

        <button className={enabledFindMentors ? "selected-tab" : "unselected-tab"} onClick={showFindMentors}>
        Find Mentors
        </button>

        <button className="unselected-tab" onClick={coachProfile}>
        My Account
        </button>

        <div className="content-area">
          {!enabledManageTeam && !enabledStudentStats && !enabledCreateQuiz && !enabledFindMentors
            ? <h1 className="descriptor-text">Click on a tab to view its contents</h1> 
            : null
          }
          <ManageTeams enabled={enabledManageTeam}/>
          <StudentStats enabled={enabledStudentStats}/>
          
          {enabledCreateQuiz 
          ? <h1>This page has not been implemented yet</h1>
          : null}

          {enabledFindMentors 
          ? <h1>This page has not been implemented yet</h1>
          : null}
        </div>
    </div> 
  </>
  );
}
  
export default CoachHome;