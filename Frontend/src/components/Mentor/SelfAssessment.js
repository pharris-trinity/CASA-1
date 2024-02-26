import React, { useState, useEffect } from "react";
import './SelfAssessment.css'
import { json } from "body-parser";


function SelfAssessment(props) {
    const[pwindowsRating, setWindowsRating] = useState();
    const[pwindowsServerRating, setWindowsServerRating] = useState();
    const[plinuxRating, setLinuxRating] = useState();
    const[pnetworkingRating, setNetworkingRating] = useState();
    const[psecurityConseptsRating, setSecurityConseptsRating] = useState();




    //updates the mentors own self assesment info
    const mentorSelfAssessment = async ( windowsRat, windowsServRat, linuxRat, netwrokingRat, securityConsRat) => {
        var tmpData = { ment_id : localStorage.getItem("_id"), windowsRating : windowsRat, windowsServerRating : windowsServRat, linuxRating:  linuxRat, networkingRating : netwrokingRat, securityConseptsRating: securityConsRat}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/mentor/self_assessment_update', requestOptions).then((response) => {
             
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(pwindowsRating > 0 && pwindowsRating < 6 && pwindowsServerRating > 0 && pwindowsServerRating < 6  && plinuxRating > 0 && plinuxRating < 6 && pnetworkingRating > 0 && pnetworkingRating < 6 && psecurityConseptsRating > 0 && psecurityConseptsRating < 6){
            console.log("psecurityConseptsRating: ", psecurityConseptsRating, "test")
            await mentorSelfAssessment(pwindowsRating, pwindowsServerRating, plinuxRating, pnetworkingRating, psecurityConseptsRating)
            props.closeForm();
        }
        else {
            alert('Invalid number chosen.');
        }
    }



    if(props.enabled === true){
        return (
            <div className="form-popup">
                <h2>Mentor Self Assessment</h2>
                <h3>Please give each subject a rating of 1-5 based on how well you now the subject. 1 being very little, to 5 being an expert</h3>
                <div>
                    <form className="self-assessment-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='windowsRating'>Windows Rating: </label>
                            <input
                                type='Number'
                                id='windowsRating'
                                name='windowsRating'
                                value={pwindowsRating}
                                onChange={(e) => setWindowsRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='windowsSererRating'>Windows Server Rating: </label>
                            <input
                                type='Number'
                                id='windowsSererRating'
                                name='windowsSererRating'
                                value={pwindowsServerRating}
                                onChange={(e) => setWindowsServerRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='linuxRating'>Linux Rating: </label>
                            <input
                                type='Number'
                                id='linuxRating'
                                name='linuxRating'
                                value={plinuxRating}
                                onChange={(e) => setLinuxRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='networkingRating'>Networking Rating: </label>
                            <input
                                type='Number'
                                id='networkingRating'
                                name='networkingRating'
                                value={pnetworkingRating}
                                onChange={(e) => setNetworkingRating(e.target.value)}
                                required                                
                            />

                            <label htmlFor='securityConseptsRating'>Security Concepts Rating: </label>
                            <input
                                type='Number'
                                id='securityConseptsRating'
                                name='securityConseptsRating'
                                value={psecurityConseptsRating}
                                onChange={(e) => setSecurityConseptsRating(e.target.value)}
                                required                                
                            />

                            <button className="casa-button" type="submit" onClick={handleSubmit}>Update Self Assessment Information</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SelfAssessment