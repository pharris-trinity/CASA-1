import React, { useState, useEffect } from "react";
import './MakeTeam.css'
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";
import { validateTeamID } from "../General/validateTeamID";
import { json } from "body-parser";

/* 
This component is a modal pop-up that contains a React Form. Upon submission of the form, a new team
will be created.
*/

function MakeTeam(props) {
    const[teamNationalID, setTeamNationalID] = useState();
    const[teamName, setTeamName] = useState();
    const[teamSchool, setTeamSchool] = useState();
    const[teamDistrict, setTeamDistrict] = useState();
    const[teamIsROTC, setTeamIsROTC] = useState(false);
    const[teamCoachID, setTeamCoachID] = useState();




/*

app.post('/api/admin/register_team', async(req, res) => {
    const { national_id, name, school, district, rotc, coach } = req.body;


*/


    //Creates a team in DB and adds the teamID to the coach's teams
    const createATeam = async (tID, tName, tSchool, tDistrict, tROTC, tcoachID) => {
        var tmpData = { national_id: tID, name: tName, school: tSchool, district: tDistrict, rotc: tROTC, coach: tcoachID }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/admin/register_team', requestOptions).then((response) => {
             if(response.status == 201) alert('TeamID is already in use. Team was not created.');
        });
    }

    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 
    
    //form submission functionality. Attempts to create a team from input form info and closes the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateTeamID(teamNationalID)) {
            const teamIDNumber = formatTeamIDNumber(teamNationalID);
            await createATeam(teamIDNumber, teamName, teamSchool, teamDistrict, teamIsROTC, teamCoachID);
            //alert('You have submitted');
            props.closeForm();
        } else {
            alert('Invalid TeamID. Team was not created.')
            props.closeForm();
        }
    }

    if(props.enabled === true){
        return (
            <div className="form-popup">
                <h2>Create Team</h2>
                <div>
                    <form className="make-team-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='national_id'>Team's National ID (##-####): </label>
                            <input
                                type='text'
                                id='national_id'
                                name='national_id'
                                value={teamNationalID}
                                onChange={(e) => setTeamNationalID(e.target.value)}
                                required                            
                            />

                            <label htmlFor='teamName'>Team's Name: </label>
                            <input
                                type='text'
                                id='teamName'
                                name='teamName'
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required                            
                            />

                            <label htmlFor='teamSchool'>School Name: </label>
                            <input
                                type='text'
                                id='teamSchool'
                                name='teamSchool'
                                value={teamSchool}
                                onChange={(e) => setTeamSchool(e.target.value)}
                                required                            
                            />

                            <label htmlFor='teamDistrict'>School District: </label>
                            <input
                                type='text'
                                id='teamDistrict'
                                name='teamDistrict'
                                value={teamDistrict}
                                onChange={(e) => setTeamDistrict(e.target.value)}
                                required                                
                            />

                            <button className="casa-button" type="submit">Create Team</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MakeTeam