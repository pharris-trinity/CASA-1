import React, {useEffect, useState} from  "react"
import "./stylesStud.css";
import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

/*this page gets a specific quiz from the localstorage's currquiz information by its obj id;
 then through local storage maps appropriately to each question display; you can change it so that there
  is only one storage const*/
export default function QuizContent() { 
    const quizsearchurl= '/api/quizsearch/oneq/';

    //set from the link clicked from the take assess page so you know what quiz obj id it is
    const currquizid = localStorage.getItem('currquiz');
    //console.log(currquizid);
    const fquizurl = quizsearchurl + currquizid;
    //console.log(fquizurl);
    const [currentquiz, setCurrentQuiz] = useState([]);

    let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Student")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    
    useEffect(function getquizinfo() {
      if(currquizid != null){
        var fieldData = ['questions','authorID'] //payload
        const requestOptions ={
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(fieldData)
        };
        fetch(fquizurl, requestOptions).then(res => res.json()).then(
        data => {
          var tempquestionlist = [];
          function getquestions(item) {
            for(let i=0; i<item.questions.length; i++){
              tempquestionlist.push(item.questions[i]);
              //console.log(item.questions[i]);
              //console.log("check tq1 "+ tempquestionlist.value);
            }
          }
          
          data.map(getquestions); //console.log(item.questions[0])
          //setCurrentQuiz(tempquestionlist);
          setCurrentQuiz(previousState => {
            return { tempquestionlist }
          });

          /*pushing several arrays into localstorage for later use
          specifically for display in the return */

          var tempdlist = [];
          for(let i=0; i<tempquestionlist.length; i++){
            tempdlist.push(tempquestionlist[i].description);
            //console.log(tempquestionlist[i].description)
          }
          localStorage.setItem("qdlist", JSON.stringify(tempdlist));
                
          var tempvaluelist =[];
          for(let i=0; i<tempquestionlist.length; i++){
            tempvaluelist.push(tempquestionlist[i].value);
            //console.log(tempquestionlist[i].value)
          }
          localStorage.setItem("qvallist", JSON.stringify(tempvaluelist));
          var tempcorrlist =[];
          for(let i=0; i<tempquestionlist.length; i++){
            tempcorrlist.push(tempquestionlist[i].correctAnswer);
            //console.log(tempquestionlist[i].correctAnswer)
          }
          localStorage.setItem("qcorrlist", JSON.stringify(tempcorrlist));
          
          var tempanswerlist = [];
          for(let i=0; i<tempquestionlist.length; i++){
            tempanswerlist.push(tempquestionlist[i].answers);
            //console.log("check answer list" + tempquestionlist[i].answers)
          }
          localStorage.setItem("qanslist", JSON.stringify(tempanswerlist));

          if(data == null) {console.log(Error)}
      
          console.log("test out if else "+ currentquiz);
          //data.map(item=> setCurrQuiz(currentquiz)) 
        })
        }
    },[]);

    const qdeslist = JSON.parse(localStorage.getItem("qdlist")); //access like array qdeslist[0]
    const qvlist = JSON.parse(localStorage.getItem("qvallist"));
    const qclist = JSON.parse(localStorage.getItem("qcorrlist"));
    const qalist = JSON.parse(localStorage.getItem("qanslist")); //[0] to access outer array of answers, [0][0] for individual answers within
    //console.log("check qdes answ " + qalist[0][0]); 
    //console.log("check qdes corr " + qclist[0]);
    //console.log("check qdes val " +qvallist[0]);
    //console.log("check qdes storage " +qdeslist[0]);
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [totalcorrectqs, setTotalCQs] = useState(0);
    
    /*a lot of useStates that will change with the quiz progression*/

    const maxScore = qvlist.reduce((acc, value) => {
        return acc + value;
    }, 0);
    
    /* when you click, increment to go to next question or display finalscore div if run out of questions */
    const optionClicked = (answid) => {
        // Increment the score (of correct questions)
        if (answid == qclist[currentQuestion]) {
          setScore(score + qvlist[currentQuestion]);
          setTotalCQs(totalcorrectqs + 1);
        }
        // if we run out of questions to ask, set state for final results to true & show it, otherwise
        // advance
        if (currentQuestion + 1 < qdeslist.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResults(true);
        }
    };
    
    return(
    <>
    <div className="quizcontainer">
        <div className="quizheader">
            <h1>Quiz</h1>
        </div>
        {/*if show results state is true, then show, else show questions*/}
        {showResults ? (
        <div className="finalScore">
          <h1>Final Score</h1>
          <div className="printscore">
            <p>
                {totalcorrectqs} out of {qdeslist.length} questions correct - {score}/{maxScore} points (
                {(score / maxScore) * 100}%) 
            </p>
          </div>
        </div>
        ) : (
        /* questions list*/
        <div className="questionbox">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {qdeslist.length}
          </h2>
          <h3 className="questionnumber">{qdeslist[currentQuestion]}</h3>

          {/* answers for curr question  */}
          <ul>
            {qalist[currentQuestion].map((option,optindex) => {
              console.log("check index" + optindex);
              console.log("check opt"+ option);
              return (
                <li
                  key={optindex}
                  onClick={() => optionClicked(optindex)}>
                {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
    </>
    );
}