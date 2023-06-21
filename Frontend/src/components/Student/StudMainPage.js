import React, {Fragment, useEffect, useState} from  "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesStud.css"
import { DropdownBar, DropdownContent } from "./DropdownBar.js";
import Navbar from './../General/Navbar';
import {loginChecker} from "../General/LoginCheck.js";
import { useNavigate } from 'react-router-dom';
import Quiz from "../Quiz/quiz.js"




/*the page for student main page; what shows up for on the main menu*/
export default function StudentMainPage() {


    const [studentID, setStudentID] = useState()
    const [takenQuizzes, setTakenQuizzes] = useState([])
    const [quizlist, setQuizlist] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [showList, setShowList] = useState(true);

     const [enabledQuiz, setEnabledQuiz] = useState(false)


    const [searchPhrase, setSearchPhrase] = useState("");
    const [allQuizzesCopy, setAllQuizzesCopy] = useState([]);




    
  let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Student")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };




      const pullQuiz = async () => {
        //e.preventDefault();
        try {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            const response = await fetch('/api/quizsearch', requestOptions);
            const jsonData = await response.json();

            setQuizlist(jsonData);
            setAllQuizzesCopy(jsonData);
            console.log("QuizList: ", jsonData)

        } catch (error) {
            
        }
    }


    const pullOneQuiz = async (target) => {
        //e.preventDefault();
        try {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            const response = await fetch('/api/quizsearch/oneq/' + target, requestOptions);
            const jsonData = await response.json();

            setQuiz(jsonData);
            setShowList(false);

        } catch (error) {
            
        }
    }

    const getTakenQuizzes = async(id) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'id': id})
            }
            const response = await fetch('/api/studentTakenQuizzes', requestOptions)
            const jsonData = await response.json()

            //console.log(jsonData)
            setTakenQuizzes(jsonData.takenQuizzes)
        } catch (error) {
            console.log(error)
        }
    }

    const hasTakenQuiz = (id, takenQs) => {
        if(!takenQs){
            return false
        }
        return takenQs.some(item => id === item.originalQuizID)
    }
// not working
    const getScore = (id) => {
        for(var i = 0; i < takenQuizzes.length; i++ ){
            if(takenQuizzes[i]._id == id)
                return takenQuizzes[i].score
        }
        return "N/A"
    }



    // selects the quiz and enables it
    const selectQuiz = (quiz) => {
        console.log("Quiz selected: ", quiz)
        setEnabledQuiz(true);
        setQuiz(quiz)
    }


    useEffect(() => {
        pullQuiz();
        setStudentID(localStorage.getItem("_id"))
    }, []);


    const i = 0;
    useEffect(() => {
        if(studentID){
            console.log(studentID)
            getTakenQuizzes(studentID)
            console.log("takenQuizzes: ", takenQuizzes)
        }
    }, [studentID]);
    
    useEffect(() => {
        if(takenQuizzes){
            console.log("takenQuizzes: ", takenQuizzes)
        }
    }, [takenQuizzes])

    

    const search = async (e) => {

        const matchedQuizzes = quizlist.filter((quizzes) => {
            return quizzes.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value.length == 0) {
            setQuizlist(allQuizzesCopy);
            setSearchPhrase(e.target.value);
        }
        else {
            setQuizlist(matchedQuizzes);
            setSearchPhrase(e.target.value);
        }
    }





    return (
    <>
    <Navbar buttonSet="student"/>
    {/* {enabledQuiz ? 
    (quiz && <Quiz quizData = {quiz} showList = {(e) => setShowList(e)}/>)
    : */}
    <div className="maincontainer">
    {showList
            ?
        <h1>This is the student page. Thanks for trying out the beta! <br/>
            Click the assessments tab to take a quiz.</h1>
            :<h1></h1>

    }
    {showList
        ?
            <div>
            <input 
                type = "text" 
                placeholder="Search Table"
                value={searchPhrase}
                onChange={search}
            />
            <button  className = 'casa-button' onClick={search}>
                
                Search
            </button>
        </div>
    :
        <div></div>
    }
        {showList
            ?
            
            <div className="mainrow">
            <DropdownBar headerText="Assessments">
            <h3>Quizzes </h3>
            <table>
                <thead>
                    <tr>
                        <th className="th-manage-teams">Quiz Name</th>
                        <th className="th-manage-teams">Catagory</th>
                        {/* <th className="th-manage-teams">Latest Score</th> */}
                    </tr>
                </thead>

                <tbody>
                {quizlist && quizlist.map((item, index) => (
                    <tr key={item._id} onClick={() => pullOneQuiz(item._id)}>
                        <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.name}</td>
                        <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.category}</td>
                        {/* <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {getScore(item._id)}</td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            </DropdownBar>
            </div>
            : (quiz && <Quiz quizData = {quiz} showList = {(e) => setShowList(e)}/>)
        }
    </div> 
    </>
    );
}