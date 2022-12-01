import React from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"

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