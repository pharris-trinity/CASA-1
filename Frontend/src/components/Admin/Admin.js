import React, {useEffect, useState} from 'react';
import "./Admin.css";

function Admin() {

    const [coach_text, setCoachText] = useState("");
    const [mentor_text, setMentorText] = useState("");

    useEffect(() =>{
        document.title = "Admin Homepage"
    })

    function coach_code(e){
        e.preventDefault()
        fetch('/api/admin/generate_coach_validation_code', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(
            res => res.text()).then(text => {
                try{
                    setCoachText(JSON.parse(text).value)
                } catch (error) {

                }
        })
    }


    function mentor_code(e){
        e.preventDefault()
        fetch('/api/admin/generate_mentor_validation_code', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(
            res => res.text()).then(text => {
                try{
                    setMentorText(JSON.parse(text).value)
                } catch (error) {

                }
        })
    }

    return (
        <div class="adminPage">
            <div class="header">To Generate a new code, click these buttons and copy them. Once created, they are added to the database to be used by someone logging in.</div>
            <div class="admin">
                <div id="CodeGeneration">
                    <button id="coachCodeGenerator" onClick={coach_code}>Generate Coach Code</button> 
                    <div class="box" id="field_generator"><p id="text">{coach_text}</p></div>
                </div>
                <br></br>
                <div id="CodeGeneration">
                    <button id="mentorCodeGenerator" onClick={mentor_code}>Generate Mentor Code</button> 
                    <div class="box" id="field_generator"><p id="text">{mentor_text}</p></div>
                </div>
            </div>
        </div>
    )
}

export default Admin;