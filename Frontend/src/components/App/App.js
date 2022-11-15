import './App.css';
import Login from "../Login/Login";
import About from "../About/About";
import DevPage from "../DevPage/DevPage";
import CreateUser from "../CreateUser/CreateUser";
import NotFound from "../NotFound/NotFound";

import Mentor from "../Mentor/Mentor";
import MentorTeams from "../MentorRedirect/MentorTeams";
import MentorQuiz from "../MentorRedirect/MentorQuiz";
import MentorAssessment from "../MentorRedirect/MentorAssessment";

import Teacher from "../Teacher/Teacher";
import TeacherTeams from "../TeacherRedirect/TeacherTeam";
import TeacherQuiz from "../TeacherRedirect/TeacherQuiz";
import TeacherAssessment from "../TeacherRedirect/TeacherAssessment";

import MentorTable from "../TableMentor/MentorTable";


// eslint-disable-next-line
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';


function App() {

  useEffect(() => {
    document.title = "CASA - Cyberware Texas"
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route path="about" element={<About/>} />
        <Route path="dev" element={<DevPage/>} />
        <Route path="createuser" element={<CreateUser/>} />
        <Route path="login" element={<Login/>} />
        <Route path="mentor" element={<Mentor/>} />
        <Route path="mentorteams" element={<MentorTeams/>} />
        <Route path="mentorquiz" element={<MentorQuiz/>} />
        <Route path="mentorassessment" element={<MentorAssessment/>} />
        <Route path="teacher" element={<Teacher/>} />
        <Route path="teacherteam" element={<TeacherTeams/>} />
        <Route path="teacherquiz" element={<TeacherQuiz/>} />
        <Route path="teacherassessment" element={<TeacherAssessment/>} />
        <Route path="mentortable" element={<MentorTable/>} />
      </Routes>
    </div>
  );
}

export default App;