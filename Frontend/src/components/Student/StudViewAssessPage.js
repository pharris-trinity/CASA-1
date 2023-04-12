import React from  "react"
import "./stylesStud.css"

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

/*the page that needs to be changed to display TakenQuizzes more; this needs to have more fields
in the database, including name or if you want, type/category eg linux */
export default function StudentViewAssessPage() {

    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Student")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };
    
    //temp layout
    return (
        <>
        <div className="viewassesscontainer">
            <h1>View Assessments</h1> 
            <div className="takenquizlist">
                <ul>
                    <li>
                        <p>Quiz 1: 60%, 3/5 questions</p>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
}