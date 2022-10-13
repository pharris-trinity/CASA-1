import './css/App.css';
import Login from "./components/Login";
import About from "./components/About";
import DevPage from "./components/DevPage";
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
        <Route path="*" element={<Login/>} />
        <Route path="about" element={<About/>} />
        <Route path="dev" element={<DevPage/>} />
      </Routes>
    </div>
  );
}

export default App;