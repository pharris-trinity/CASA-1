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
    
    */
    const [currStud, setStud] = useState([])
    useEffect(() => {
        var fieldData = ['username','school','tier','gradelevel','team'] //payload
        const requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldData)
        };
        fetch('/api/getfleech', requestOptions).then(res => res.json()).then(
            data => {
                setStud(data.collection)
                console.log("Values in data collection:" + data.collection) // object Object
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
    
}