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

    useEffect(() => {
        pullQuiz();
    }, []);

    var tempArray = [];
    //const quizArray = quizlist;
    quizlist.forEach(function(obj) {
        console.log(obj.questions);
        tempArray.push(obj.questions);
    });

    //var testString = JSON.values(quizlist);
    console.log("heres the type of quizlist: ", typeof quizlist);
    //console.log("attempt of quizlist[0]", testString);
    //console.log("This is what quizlist has in it", quizlist);
    //console.log("Here's tempArray!", tempArray[0]);
    //console.log("This is what quizArray has: ", quizArray);
    //console.log(quizArray);

    return(
    <>
        <StudNavbar/>
        <Quiz quizData ={tempArray}/>
    </>
    );
}