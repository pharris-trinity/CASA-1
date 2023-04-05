// Here will be the mentor page with a decent layout and buttons to future pages.
import React, { useState } from 'react';
//import Button from './MentorButton';
import '../Mentor/Button.css'
import '../Mentor/PageLayout.css'
import '../Coach/CoachProfile'
import './coachHome.css'

import { useNavigate } from "react-router-dom";
import ManageTeams from './ManageTeams';
import StudentStats from './StudentStats';


function CoachHome() {
  const [enabledManageTeam, setEnabledManageTeam] = useState(false);
  const [enabledStudentStats, setEnabledStudentStats] = useState(false);

  let navigate = useNavigate();

  function teamsButton(){
    //navigate('/ViewTeams2', {replace: true}) 
    setEnabledManageTeam(!enabledManageTeam); 
    setEnabledStudentStats(false);
  }

  function showStudentStats() {
    setEnabledStudentStats(!enabledStudentStats);
    setEnabledManageTeam(false); 
  }

  function coachProfile(){
    navigate('/profile', {replace: true})
  }
  function coachTableButton(){
    navigate('/coachtable', {replace: true})
  }

  


return (
  <div className="coach-page-main">

      <button className={enabledManageTeam ? "selected-tab" : "unselected-tab"} onClick={teamsButton}>
      Manage Teams
      </button>

      <button className={enabledStudentStats ? "selected-tab" : "unselected-tab"} onClick={showStudentStats}>
      Student Stats
      </button>

      <button className="unselected-tab">
      Create Quizzes
      </button>

      <button className="unselected-tab" onClick={coachTableButton}>
      Find Mentors
      </button>

      <button className="unselected-tab" onClick={coachProfile}>
      My Account
      </button>

      <div className="content-area">
        {!enabledManageTeam && !enabledStudentStats 
          ? <h1 className="descriptor-text">Click on a tab to view its contents</h1> 
          : null
        }
        <ManageTeams enabled={enabledManageTeam}/>
        <StudentStats enabled={enabledStudentStats}/>
      </div>
  </div> 
  );
}
  
export default CoachHome;