import './App.css';
import Login from "../components/General/Login";
import About from "../components/General/About";
import CreateUser from "../components/General/CreateUser";
import NotFound from "../components/General/NotFound";
import StudMainPage from '../components/Student/StudMainPage';
import StudProfilePage from '../components/Student/StudProfilePage';
import StudentTakeAssessPage from '../components/Student/StudTakeAssessPage';
import StudentViewAssessPage from '../components/Student/StudViewAssessPage';
import Quiz1Test from '../components/Student/Quiz1Test';
import QuizContent from '../components/Student/QuizContent';

import Mentorteamdisplay from "../components/TableMentor/MentorTable";
import MentorHome from "../components/Mentor/MentorHomePage";
import MentorProfile from "../components/Mentor/MentorProfile"

import CoachHome from "../components/Coach/CoachHome";

import MentorTable from "../components/TableMentor/MentorTable";
import TableMentor from "../components/TableMentor/TableMentor";

// eslint-disable-next-line
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';
import Profile from '../components/Profile/Profile';
import ViewTeams from '../components/ViewTeams/ViewTeams';
import ViewTeams2 from '../components/ViewTeams/ViewTeams2';

import Dropdown from '../components/Dropdown/Dropdown';
import Admin from '../components/Admin/Admin';
import CoachTable from '../components/Coach/CoachTable';


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
      <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="about" element={<About/>} />
        <Route path="createuser" element={<CreateUser/>} />
        <Route path="login" element={<Login/>} />
        <Route path="stud/main" element={<StudMainPage/>} />
        <Route path="stud/profile" element={<StudProfilePage/>} />
        <Route path="stud/takeassess" element={<StudentTakeAssessPage/>} />
        <Route path="stud/viewassess" element={<StudentViewAssessPage/>} />
        <Route path="stud/takeassess/quiz1" element={<Quiz1Test/>} />
        <Route path="stud/takeassess/quizcontent" element={<QuizContent/>} />
        <Route path="coachhome" element={<CoachHome/>} />
        <Route path="mentortable" element={<MentorTable/>} />
        <Route path="mentorprofile" element={<MentorProfile/>} />
        <Route path="mentortabledisplay" element={<Mentorteamdisplay/>} />
        <Route path="mentorHome" element={<MentorHome/>} />
        <Route exact path="/" element ={<Login/>}/>
        <Route path="profile" element={<Profile/>} />
        <Route path="coachtable" element={<TableMentor/>} />
        <Route path="mentortabledisplay" element={<Mentorteamdisplay/>} />
        <Route path="ViewTeams" element={<ViewTeams/>} />
        <Route path="ViewTeams2" element={<ViewTeams2/>} />
        <Route path="admin/homepage" element={<Admin/>} />

      </Routes>
    </div>
  );
}

export default App;