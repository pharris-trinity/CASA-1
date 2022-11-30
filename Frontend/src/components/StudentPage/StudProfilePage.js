import React, {useEffect, useState} from "react"
import StudNavbar from "./StudNavbar"
import "./stylesStud.css"

export default function StudentProfilePage() {
    /* modify later if this is a submitable form for opt
    in email notifications from cybertexas
    
    <form onSubmit={this.handleSubmit}>
    </form>
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
  
        
    }; */

    const [currStud, setStud] = useState([{
        username: '',
        displayname: 'testing',
        password:'',
        email:'',
        takenQuizzes:[''],
        school: 'testschool',
        tier: 0,
        tiername: 'none',
        gradelevel: 0,
        team: -1
    }])
    /*
    useEffect(() => {
        fetch("/fleech").then(res => {
            if(res.ok) {
                return res.json();
            }
        }).then(jsonRes=> setStud(jsonRes));
    }) */

    /*
    if(currStud.tier == 1) {
        setStud(prevstate => {
            return {...prevstate, tiername: "silver"}
        });
    } else if(currStud.tier == 2) {
        setStud(prevstate => {
            return {...prevstate, tiername: "gold"}
        });
    } else if(currStud.tier == 3) {
        setStud(prevstate => {
            return {...prevstate, tiername: "platinum"}
        });
    } else {
        setStud(prevstate => {
            return {...prevstate, tiername: "none"}
        });
    } 
    */

    
    
    return(
    <>
    <StudNavbar />
    <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="studentAttributes">
            <ul>
                {currStud.map(stud =>
                <div>
                    <li className="studentName">
                        <p>Name: {stud.displayname}</p>
                    </li>
                    <li className="studentGrade">
                        <p>School: {stud.school} </p>
                    </li>
                    <li className="studentSchool">
                        <p>Grade: {stud.gradelevel}</p>
                    </li>
                    <li className="studentTier">
                        <p>Tier: {stud.tier}</p>
                    </li>
                    <li className="studentTeamID">
                        <p>TeamID: {stud.team}</p>
                    </li>
                </div>
                )}
            </ul>
        </div>
    </div>
    </>
    ); 
    
    //<h1>Profile</h1>;
}