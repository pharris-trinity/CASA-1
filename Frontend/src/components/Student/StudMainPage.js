import React from "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"
import DropdownBar from './DropdownBar';

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
                

                <DropdownBar headerText="Proof of Concept Dropdown Bar">
                    <p>Isn't this neat?</p>
                </DropdownBar>

                <DropdownBar headerText="Assessments">
                    <ul>
                        <li className="takeAssess">
                            <a href="/stud/takeassess">Take Assessments</a>
                        </li>
                    </ul>  
                    <ul>
                        <li className="viewAssess">
                            <a href="/stud/viewassess">View Assessments</a>
                        </li>
                    </ul>  

                </DropdownBar>

            </div>
        </div>
    </div>
    
    </>
        
    );
}