import React from "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"

/*the page for student main page; what shows up for on the main menu*/
export default function StudentMainPage() {
    //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc.
    console.log(fixeduser.username)
    console.log(fixeduser._id)
    console.log(typeof fixeduser._id)
    console.log(typeof fixeduser.username)
    console.log(fixeduser)


    return (
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