import React, { useEffect, useState } from 'react';
import Navbar from './../General/Navbar';
import { useNavigate } from 'react-router-dom';
import { loginChecker } from "../General/LoginCheck";
import StudentTeamInfo from "./TeamInfo.js";
import StudentInfo from "./StudentInfo.js";
import StudentQuizInfo from "./StudentQuizInfo.js";
import '../Coach/ManageTeams.css'; // Import coachHome.css for styling

function StudentMainPage() {
  const [selectedTab, setSelectedTab] = useState('teamInfo');
  const navigate = useNavigate();

  // Check if the user is a student, otherwise navigate to appropriate page
  useEffect(() => {
    const toNavigateTo = loginChecker("Student");
    if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
  }, []);

/*
  window.onload = (event) => {
    var toNavigateTo = loginChecker("Coach")
    if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
  };
*/

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <Navbar buttonSet="student" />
      <div className="coach-page-main">
        <button className={selectedTab === 'teamInfo' ? "selected-tab" : "unselected-tab"} onClick={() => handleTabClick('teamInfo')}>
          Team Information
        </button>
        <button className={selectedTab === 'studentInfo' ? "selected-tab" : "unselected-tab"} onClick={() => handleTabClick('studentInfo')}>
          Profile
        </button>
        <button className={selectedTab === 'studentQuizInfo' ? "selected-tab" : "unselected-tab"} onClick={() => handleTabClick('studentQuizInfo')}>
          Quiz
        </button>
        {/* Add buttons for other sections similarly */}
        <div className="content-area">
          {selectedTab === 'teamInfo' && <StudentTeamInfo />}
          {selectedTab === 'studentInfo' && <StudentInfo />}
          {selectedTab === 'studentQuizInfo' && <StudentQuizInfo />}
          {/* Render appropriate component based on selectedTab */}
        </div>
      </div>
    </>
  );
}

export default StudentMainPage;
