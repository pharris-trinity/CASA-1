import React, {useEffect, useState} from  "react"
/* where the list of quiz links are made to choose from based on the data sent from authorid (coach) */
var quizobjid=""; 
const QuizzesList = ({data}) => {
    //data.map(item=> console.log(item));
    //data.map(item=> console.log(typeof item)) //item is a string
    const setQuizID = (qid) => {
        if(quizobjid==""){
            quizobjid=qid;
            localStorage.setItem('currquiz', qid);
        } else {
            localStorage.removeItem('currquiz');
            quizobjid=qid;
            localStorage.setItem('currquiz', qid);
        }
        
        //console.log(quizobjid); 
    }
    //console.log(localStorage.getItem('currquiz'))
    //console.log(quizid); 
    return(
        <div className="takeassesscontainer">
        <h1>Take Assessments</h1>
        <div className="studquizlist">
            <ul> 
            {data.map(item => (
                        <li>
                            <a href="/stud/takeassess/quizcontent" onClick={() => setQuizID(item)}>Quiz: {item}</a>
                        </li>
            ))}
            </ul>
        </div>
    </div>
    )
}

export default  QuizzesList;