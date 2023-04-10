import React, {Fragment, useEffect, useState} from  "react"
import "./stylesStud.css"
import QuizzesList from "./StudTakeAssessContent";
import Quiz from "../Quiz/quiz.js";
import Navbar from './../General/Navbar';

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';
/* the page where the takeassess lives for students; you get the specific coachid & find all the
quizzes under their authorid and pass it to StudTakeAssessContent to render the quizlist
the links all lead to quizcontent but the id is passed into localstorage to get the specific quiz*/
/*note that the teamnumber is needed to render the page, so you can change it to specifically coach*/


export default function StudentTakeAssessPage() {
    
    //local storage has current user information; parse it right by adding curly braces and get your json object
    // const curruser = JSON.parse(localStorage.getItem("userID"));
    // const curlyuser = "{" + curruser + "}";
    // const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc. 
    // const teamnumstr = fixeduser.team.toString();
    
    const [coachOID, setCoachOID] = useState("");
    const coachquizzes=[];
    const teamsearchurl = '/api/teamsearch/';
    //const finishedteamurl = teamsearchurl + teamnumstr;
    const coachsearchurl= '/api/coachsearch/';
    const quizsearchurl= '/api/quizsearch/';
    const [studentID, setStudentID] = useState()
    const [takenQuizzes, setTakenQuizzes] = useState()
    const [quizlist, setQuizlist] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [showList, setShowList] = useState(true);

    
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


    useEffect(() => {
        pullQuiz();
        setStudentID(localStorage.getItem("_id"))
    }, []);


    const i = 0;
    useEffect(() => {
        if(studentID){
            console.log(studentID)
            getTakenQuizzes(studentID)
        }
    }, [studentID]);
    
    useEffect(() => {
        if(takenQuizzes){
            console.log(takenQuizzes)
        }
    }, [takenQuizzes])



    return(
        <>
        {/*<Navbar buttonSet="logout"/>*/}
        <div>
            {showList 
            ? (quizlist && quizlist.map(item => (
                !hasTakenQuiz(item._id, takenQuizzes) ? <button className="casa-button" onClick={() => pullOneQuiz(item._id)}>
                    {item.name}
                </button> : <Fragment></Fragment>
            ))) 
            : (quiz && <Quiz quizData = {quiz} showList = {(e) => setShowList(e)}/>)}
            {/*quiz.map(item => (
                <ul key="Items List">
                    {console.log("Here is item.questions[0]", item.questions[i].description)}
                    <li>{item.questions[i].answers[0]}</li>
                </ul>
            ))*/}
        </div>
        </>
    );
}