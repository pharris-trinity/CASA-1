import React from "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesStud.css"
import { DropdownBar, DropdownContent } from "./DropdownBar.js";
import Navbar from './../General/Navbar';
import {loginChecker} from "../General/LoginCheck.js";
import { useNavigate } from 'react-router-dom';




/*the page for student main page; what shows up for on the main menu*/
export default function StudentMainPage() {

    //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc.

    
  let navigate = useNavigate();

    window.onload = (event) => {
        var toNavigateTo = loginChecker("Student")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };



    return (
    <>
    <Navbar buttonSet="student"/>
    <div className="maincontainer">
        <h1>Main</h1>
            <div className="mainrow">
                <div className="maincol1">
                    <DropdownBar headerText="Proof of Concept Dropdown Bar">
                        <p>Isn't this neat?</p>
                    </DropdownBar>
                    <DropdownBar headerText="My Statistics (This is proof of concept and is not being pulled from our database)">
                        <DropdownContent>
                            <p>Student Statistics</p>
                        </DropdownContent>
                    </DropdownBar>
                    <DropdownBar headerText="Assessments">
                        <ul>
                            <a href="/stud/takeassess">
                                <button className="casa-button">Take Assessments</button>
                            </a>
                        </ul>  
                        <ul>
                            <a href="/stud/viewassess">
                                <button className="casa-button">View Assessments</button>
                            </a>
                        </ul>  
                    </DropdownBar>
            </div>
        </div>
    </div>
    </>
    );
}