import React from "react"
//import { ReactDOM } from "react-dom/client"
import "./stylesLanding.css"
import Navbar from "./Navbar";
import NationalID from "./NationalID";

/*the page for student main page; what shows up for on the main menu*/
export default function LandingMainPage() {
    //local storage has current user information; parse it right by adding curly braces and get your json object


    return (
    <>
    <NationalID/>
    <Navbar buttonSet="landing"/>
      
    <div className="maincontainer">
        <div className="mainrow">
            <div className="maincol1">
                
                <div className="assessmentsSection">
                    <h2>Welcome to CASA</h2>
                    <h3>Casa is a tool for students, coaches, and mentors to aid in CyberPatriot competitions. </h3>

                    <ul>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    
    </>
        
    );
}