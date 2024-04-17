import './App.css';

import { Routes, Route, Link, Switch } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';

import Navbar from "../components/General/Navbar";
import Login from "../components/General/Login";
import About from "../components/General/About";
import LandingMainPage from "../components/General/LandingMainPage";
import CreateUser from "../components/General/CreateUser";
import NotFound from "../components/General/NotFound";
import CreateCoach from '../components/General/createCoach';
import CreateMentor from '../components/General/createMentor';


import StudMainPage from '../components/Student/StudMainPage';
import StudProfilePage from '../components/Student/StudProfilePage';
import StudentTakeAssessPage from '../components/Student/StudTakeAssessPage';
import StudentViewAssessPage from '../components/Student/StudViewAssessPage';
import Quiz1Test from '../components/Student/Quiz1Test';
import QuizContent from '../components/Student/QuizContent';
import StudentQuizInfo from '../components/Student/StudentQuizInfo';
import TeamInfo from '../components/Student/TeamInfo';
import StudentInfo from '../components/Student/StudentInfo';


import MentorTable from "../components/Mentor/MentorTable";
import TableMentor from "../components/Mentor/TableMentor";
import MentorHome from "../components/Mentor/MentorHomePage";
import MentorProfile from "../components/Mentor/MentorProfile"
// eslint-disable-next-line
import ViewTeams from '../components/Coach/ViewTeams';

import CoachHome from "../components/Coach/CoachHome";
import CoachProfile from '../components/Coach/CoachProfile';

import Admin from '../components/Admin/Admin';

import Sidebar from '../Resources/SideBar1/Sidebar'
import Sidebar_ from '../Resources/SideBar2/SideBar_'


//import Profile from
//Routes, Route, Link
function App() {

  useEffect(() => {
    document.title = "CASA - Cyberware Texas"

    callBackendAPI()
      .then(res => console.log(res))
      .catch(err => console.log(err));

  }, []);

  async function callBackendAPI(){
    const response = await fetch('/api');
    const body = await response.text();

    if (response.status !== 202) {
      throw Error(body.message) 
    }
    return body;
  };
  

  return (
    <div className="App">
        {/* <div className="app-container">
          <Sidebar />
          <Routes>
            <Route path="coachhome" element={<CoachHome/>} />
            <Route path="profile" element={<CoachProfile/>} />
            <Route path="ViewTeams" element={<ViewTeams/>} />
            <Route path="coachtable" element={<TableMentor/>} />
          </Routes>
        </div> */}

      <Routes>
        {/*General Site Routes*/}
          <Route path="*" element={<LandingMainPage/>} />
          <Route exact path="/" element ={<LandingMainPage/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="about" element={<About/>} />
          <Route path="createuser" element={<CreateUser/>} />
          <Route path="createCoach" element={<CreateCoach/>}/>
          <Route path="createMentor" element={<CreateMentor/>}/>
          <Route path="SideBar" element={<Sidebar/>}/>
          <Route path="SideBar_" element={<Sidebar_/>}/>

        {/*Student Routes*/} 
          <Route path="studenthome" element={<StudMainPage/>} />
          <Route path="stud/profile" element={<StudProfilePage/>} />
          <Route path="stud/takeassess" element={<StudentTakeAssessPage/>} />
          <Route path="stud/viewassess" element={<StudentViewAssessPage/>} />
          {/*the 2 pages below likely need to be deleted, but will keep around till sure*/}
          <Route path="stud/takeassess/quiz1" element={<Quiz1Test/>} />
          <Route path="stud/takeassess/quizcontent" element={<QuizContent/>} />
          <Route path="stud/takeassess/quizcontent" element={<QuizContent/>} />
          {/* <Route path="TeamInfo" element={<TeamInfo/>} />
          <Route path="StudentQuizInfo" element={<StudentQuizInfo/>} />
          <Route path="StudentInfo" element={<StudentInfo/>} /> */}







        
        {/*Coach Routes*/}
          <Route path="coachhome" element={<CoachHome/>} />
          <Route path="profile" element={<CoachProfile/>} />
          {/*ViewTeams are functionally the same, they just display info in a different order*/}
          <Route path="ViewTeams" element={<ViewTeams/>} />
          <Route path="coachtable" element={<TableMentor/>} />

        {/*Mentor Routes*/}
          <Route path="mentorHome" element={<MentorHome/>} />
          <Route path="mentorprofile" element={<MentorProfile/>} />
          <Route path="mentortable" element={<MentorTable/>} />

        {/*Admin Routes*/}
          <Route path="admin/homepage" element={<Admin/>} />

      </Routes>
    </div>
  );
}

export default App;