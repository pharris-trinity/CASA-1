import React, { useEffect, useState } from 'react';
import Navbar from './../General/Navbar';
import { useNavigate } from 'react-router-dom';
import { loginChecker } from "../General/LoginCheck";
import { DropdownBar } from "./DropdownBar.js";
import Quiz from "../Quiz/quiz.js";
import './stylesStud.css'; 
import { TeamInfo as StudentTeamInfo } from "./TeamInfo.js"; // Rename import
import StudentInfo from "./StudentInfo.js";
//import StudentQuizInfo from "./StudentQuizInfo.js";

function StudentQuizInfo() {
  const [studentID, setStudentID] = useState();
  const [student, setStudent] = useState();
  const [teamCoachID, setTeamCoachID] = useState("")
  const [takenQuizzes, setTakenQuizzes] = useState([]);
  const [quizlist, setQuizlist] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [allQuizzesCopy, setAllQuizzesCopy] = useState([]);
  const [enabledTeamInfo, setTeamInfo] = useState(true);
  const [enabledStudentQuizInfo, setStudentQuizInfo] = useState(false);
  const [enabledStudentInfo, setStudentInfo] = useState(false);
  const [resetKey, setResetKey] = useState("key");
  
  const navigate = useNavigate();

  window.onload = (event) => {
    var toNavigateTo = loginChecker("Student")
    if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
  };

  //the 5 funtions below control which component is being rendered

  useEffect(() => {
    const toNavigateTo = loginChecker("Student");
    if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
  }, []);

  useEffect(() => {
    if (studentID) {
        // Fetch quizzes from the database
        getStudentInfo();
    }
  }, [studentID]);

  const getStudentInfo = async () => {
    try {
      // Fetch quizzes from the database
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
      const response = await fetch('/api/studentInfoSearch/');
      const jsonData = await response.json();
      setStudent(jsonData)
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }


  useEffect(() => {
    setStudentID(localStorage.getItem("_id"));
    if(student){
    pullQuiz();
    }
  }, [student]);

  useEffect(() => {
    if (studentID) {
      getTakenQuizzes(studentID);
    }
  }, [studentID]);

  const pullQuiz = async () => {
    try {
      // Fetch quizzes from the database
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
      const apiCall = '/api/coachquizsearch/'
      const finalApiCall = apiCall + student.coachID
      console.log("Team COach ID")
      console.log(student.coachID)
      const response = await fetch(finalApiCall);
      const jsonData = await response.json();
      setQuizlist(jsonData);
      setAllQuizzesCopy(jsonData);
      console.log("QuizList: ", jsonData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const pullOneQuiz = async (target) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch("/api/quizsearch/oneq/" + target, requestOptions);
      const jsonData = await response.json();

      setQuiz(jsonData);
      setShowList(false);
    } catch (error) {
      console.error("Error pulling one quiz:", error);
    }
  };

  const getTakenQuizzes = async (id) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      const response = await fetch("/api/studentTakenQuizzes", requestOptions);
      const jsonData = await response.json();

      setTakenQuizzes(jsonData.takenQuizzes);
    } catch (error) {
      console.error("Error getting taken quizzes:", error);
    }
  };

  const search = async (e) => {
    const matchedQuizzes = quizlist.filter((quizzes) => {
      return quizzes.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value.length === 0) {
      setQuizlist(allQuizzesCopy);
      setSearchPhrase(e.target.value);
    } else {
      setQuizlist(matchedQuizzes);
      setSearchPhrase(e.target.value);
    }
  };

  const computeQuizScore = (quizId) => {
    const takenQuiz = takenQuizzes.find((quiz) => quiz.quizId === quizId);
    return takenQuiz ? takenQuiz.score : "-";
  };
  
  return (
    <>
        <div className="content-area">
          {showList ? (
            <div>
              <h2>Quizzes </h2>
              <input
                type="text"
                placeholder="Search Table"
                value={searchPhrase}
                onChange={search}
              />
              <div className="mainrow">
                  <table>
                    <thead>
                      <tr>
                        <th className="th-manage-teams">Quiz Name</th>
                        <th className="th-manage-teams">Category</th>
                        <th className='th-manage-teams'>Level</th>
                        <th className='th-manage-teams'>Score</th>

                      </tr>
                    </thead>
                    <tbody>
                      {quizlist &&
                        quizlist.map((item, index) => (
                          <tr key={item._id} onClick={() => pullOneQuiz(item._id)}>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{item.name}</td>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{item.category}</td>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{item.level}</td>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{computeQuizScore(item._id)}</td>

                          </tr>
                          
                        ))}
                    </tbody>
                  </table>
                
              </div>
            </div>
          ) : (
              quiz && <Quiz quizData={quiz} showList={(e) => setShowList(e)} />
            )}
        </div>
    </>
  );
}

export default StudentQuizInfo;
