import React, {useEffect, useState} from "react"
import StudNavbar from "./StudNavbar"
import "./stylesStud.css"
import StudProfileContent from "./StudProfileContent"

export default function StudentProfilePage() {
    /* 
    
    <form onSubmit={this.handleSubmit}>
    </form>
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
  
        
    }; 
    
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
    */
    const [currStud, setStud] = useState([])
    useEffect(() => {
        var fieldData = ['username','school','tier','gradelevel','team']
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData)
        };
        fetch('/api/getfleech', requestOptions).then(res => res.json()).then(
            data => {
                setStud(data.collection)
                //console.log("Values in data collection:" + data.collection) -> object Object
                if(data.collection == null) {console.log(Error)}
            })
        },[]);

    /*const [currStud, setStud] = useState([{
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
    }])*/
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
    {<StudProfileContent data={(currStud)}/>}
    </>
    ); 
    
    //<h1>Profile</h1>;
}