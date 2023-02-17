import React from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"
/*the page that needs to be changed to display TakenQuizzes more; this needs to have more fields
in the database, including name or if you want, type/category eg linux */
export default function StudentViewAssessPage() {
    
    //temp layout
    return (
        <>
        <StudNavbar />
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