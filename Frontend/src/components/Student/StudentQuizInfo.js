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
    pullQuiz();
    setStudentID(localStorage.getItem("_id"));
  }, []);

  useEffect(() => {
    if (studentID) {
      getTakenQuizzes(studentID);
    }
  }, [studentID]);

  const pullQuiz = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch("/api/quizsearch", requestOptions);
      const jsonData = await response.json();

      setQuizlist(jsonData);
      setAllQuizzesCopy(jsonData);
      console.log("QuizList: ", jsonData);
    } catch (error) {
      console.error("Error pulling quiz:", error);
    }
  };

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

  
  return (
    <>
        <div className="content-area">
          {showList ? (
            <div>
              <input
                type="text"
                placeholder="Search Table"
                value={searchPhrase}
                onChange={search}
              />
              <div className="mainrow">
                <DropdownBar headerText="Assessments">
                  <h3>Quizzes </h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="th-manage-teams">Quiz Name</th>
                        <th className="th-manage-teams">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizlist &&
                        quizlist.map((item, index) => (
                          <tr key={item._id} onClick={() => pullOneQuiz(item._id)}>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{item.name}</td>
                            <td className={index % 2 === 0 ? "td-even" : "td-odd"}>{item.category}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </DropdownBar>
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
