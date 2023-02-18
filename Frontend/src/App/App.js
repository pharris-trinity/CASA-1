import './App.css';

import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';

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

import MentorTable from "../components/Mentor/MentorTable";
import TableMentor from "../components/Mentor/TableMentor";
import MentorHome from "../components/Mentor/MentorHomePage";
import MentorProfile from "../components/Mentor/MentorProfile"
// eslint-disable-next-line
import ViewTeams from '../components/Mentor/MentorViewTeams';
import ViewTeams2 from '../components/Mentor/MentorViewTeams2';

import CoachHome from "../components/Coach/CoachHome";
import CoachTable from '../components/Coach/CoachTable';
import CoachProfile from '../components/Coach/CoachProfile';

import Admin from '../components/Admin/Admin';


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
        {/*General Site Routes*/}
          <Route path="*" element={<Login/>} />
          <Route exact path="/" element ={<Login/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="about" element={<About/>} />
          <Route path="createuser" element={<CreateUser/>} />

        {/*Student Routes*/}
          <Route path="stud/main" element={<StudMainPage/>} />
          <Route path="stud/profile" element={<StudProfilePage/>} />
          <Route path="stud/takeassess" element={<StudentTakeAssessPage/>} />
          <Route path="stud/viewassess" element={<StudentViewAssessPage/>} />
          {/*the 2 pages below likely need to be deleted, but will keep around till sure*/}
          <Route path="stud/takeassess/quiz1" element={<Quiz1Test/>} />
          <Route path="stud/takeassess/quizcontent" element={<QuizContent/>} />
        
        {/*Coach Routes*/}
          <Route path="coachhome" element={<CoachHome/>} />
          <Route path="profile" element={<CoachProfile/>} />
          <Route path="coachtable" element={<TableMentor/>} />
          {/*ViewTeams 1 and 2 are functionally the same, they just display info in a different order*/}
          <Route path="ViewTeams" element={<ViewTeams/>} />
          <Route path="ViewTeams2" element={<ViewTeams2/>} />

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