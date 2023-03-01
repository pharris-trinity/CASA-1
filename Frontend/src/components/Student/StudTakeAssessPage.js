import React, {Fragment, useEffect, useState} from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"
import QuizzesList from "./StudTakeAssessContent";
import Quiz from "../Quiz/quiz.js";
/* the page where the takeassess lives for students; you get the specific coachid & find all the
quizzes under their authorid and pass it to StudTakeAssessContent to render the quizlist
the links all lead to quizcontent but the id is passed into localstorage to get the specific quiz*/
/*note that the teamnumber is needed to render the page, so you can change it to specifically coach*/


export default function StudentTakeAssessPage() {
    
    //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc. 
    const teamnumstr = fixeduser.team.toString();
    
    const [coachOID, setCoachOID] = useState("");
    const coachquizzes=[];
    const teamsearchurl = '/api/teamsearch/';
    const finishedteamurl = teamsearchurl + teamnumstr;
    const coachsearchurl= '/api/coachsearch/';
    const quizsearchurl= '/api/quizsearch/';
    const [quizlist, setQuizlist] = useState([]);
    const [quiz, setQuiz] = useState([]);

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

        } catch (error) {
            
        }
    }

    useEffect(() => {
        pullQuiz();
    }, []);


    const i = 0;
    useEffect(() => {
        pullOneQuiz('63ea96646b905a49c50b2693');
    }, []);


    return(
        <div>
            <Quiz quizData = {quiz}/>
            {/*quiz.map(item => (
                <ul key="Items List">
                    {console.log("Here is item.questions[0]", item.questions[i].description)}
                    <li>{item.questions[i].answers[0]}</li>
                </ul>
            ))*/}
        </div>
    );
}