import React from "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"


export default function StudentMainPage() {
    return (
    //<Body studnavbar>
    <>
    <StudNavbar />
    
    <div className="maincontainer">
        <h1>Main</h1>
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Assessments</h2>
                    <ul>
                        <li className="takeAssess">
                            <a href="/stud/takeassess">Take Assessments</a>
                        </li>
                        <li className="viewAssess">
                            <a href="/stud/viewassess">View Assessments</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    
    </>
        
    );
}