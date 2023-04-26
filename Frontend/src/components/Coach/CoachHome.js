// Here will be the mentor page with a decent layout and buttons to future pages.
import React, { useState } from 'react';
//import Button from './MentorButton';
import '../Mentor/PageLayout.css'
import '../Coach/CoachProfile'
import './coachHome.css'
import ManageTeams from './ManageTeams';
import StudentStats from './StudentStats';
import Navbar from './../General/Navbar';
import { useNavigate } from 'react-router-dom';
import {loginChecker} from "../General/LoginCheck";
import CoachProfile from '../Coach/CoachProfile';

/* 
CoachHome is the coach's home page. It uses state variables to control which sub-component is being rendered.
*/

function CoachHome() {

  const [enabledManageTeam, setEnabledManageTeam] = useState(false);
  const [enabledStudentStats, setEnabledStudentStats] = useState(false);
  const [enabledCreateQuiz, setEnabledCreateQuiz] = useState(false);
  const [enabledFindMentors, setEnabledFindMentors] = useState(false);
  const [enabledCoachProfile, setEnabledCoachProfile] = useState(false);

  let navigate = useNavigate();

  //makes sure the current user is a Coach -> otherwise, kicks them off the page
  window.onload = (event) => {
    var toNavigateTo = loginChecker("Coach")
    if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
  };

  //the 5 funtions below control which component is being rendered

  function teamsButton(){
    //navigate('/ViewTeams2', {replace: true}) 
    setEnabledManageTeam(!enabledManageTeam); 
    setEnabledStudentStats(false);
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false); 
    setEnabledCoachProfile(false);
  }

  function showStudentStats() {
    setEnabledStudentStats(!enabledStudentStats);
    setEnabledManageTeam(false); 
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false);
    setEnabledCoachProfile(false);
  }

  function showCreateQuiz() {
    setEnabledCreateQuiz(!enabledCreateQuiz);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledFindMentors(false);
    setEnabledCoachProfile(false);
  }

  function showFindMentors() {
    setEnabledFindMentors(!enabledFindMentors);
    setEnabledCreateQuiz(false);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledCoachProfile(false);
  }

  function showCoachProfile(){
    setEnabledCoachProfile(!enabledCoachProfile);
    setEnabledFindMentors(false);
    setEnabledCreateQuiz(false);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
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

        <button className={enabledCoachProfile ? "selected-tab" : "unselected-tab"} onClick={showCoachProfile}>
        My Account
        </button>

        <div className="content-area">
          {!enabledManageTeam && !enabledStudentStats && !enabledCreateQuiz && !enabledFindMentors && !enabledCoachProfile
            ? <h1 className="descriptor-text">Click on a tab to view its contents</h1> 
            : null
          }
          <ManageTeams enabled={enabledManageTeam}/>
          <StudentStats enabled={enabledStudentStats}/>
          <CoachProfile enabled={enabledCoachProfile}/>
          
          {enabledCreateQuiz 
          ? <h1>This page's functionality hasn't been implemented yet.</h1>
          : null}

          {enabledFindMentors 
          ? <h1>This page's functionality hasn't been implemented yet.</h1>
          : null}
        </div>
    </div> 
  </>
  );
}
  
export default CoachHome;