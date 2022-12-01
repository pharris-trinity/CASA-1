import './App.css';
import Login from "../Login/Login";
import About from "../About/About";
import DevPage from "../DevPage/DevPage";
import CreateUser from "../CreateUser/CreateUser";
import NotFound from "../NotFound/NotFound";
import StudMainPage from '../StudentPage/StudMainPage';
import StudProfilePage from '../StudentPage/StudProfilePage';
import StudentTakeAssessPage from '../StudentPage/StudTakeAssessPage';
import StudentViewAssessPage from '../StudentPage/StudViewAssessPage';
import Quiz1Test from '../StudentPage/Quiz1Test';
import Quiz2Test from '../StudentPage/Quiz2Test';
// eslint-disable-next-line
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';


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
        <Route path="*" element={<NotFound/>} />
        <Route path="about" element={<About/>} />
        <Route path="dev" element={<DevPage/>} />
        <Route path="createuser" element={<CreateUser/>} />
        <Route path="login" element={<Login/>} />
        <Route path="stud/main" element={<StudMainPage/>} />
        <Route path="stud/profile" element={<StudProfilePage/>} />
        <Route path="stud/takeassess" element={<StudentTakeAssessPage/>} />
        <Route path="stud/viewassess" element={<StudentViewAssessPage/>} />
        <Route path="stud/takeassess/quiz1" element={<Quiz1Test/>} />
        <Route path="stud/takeassess/quiz2" element={<Quiz2Test/>} />
      </Routes>
    </div>
  );
}

export default App;


/*


  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

*/