import React, { useState, useEffect } from "react";
import './SelfAssessment.css'
import { json } from "body-parser";


function SelfAssessment(props) {
    const[pwindowsRating, setWindowsRating] = useState();
    const[pwindowsServerRating, setWindowsServerRating] = useState();
    const[plinuxRating, setLinuxRating] = useState();
    const[pnetworkingRating, setNetworkingRating] = useState();
    const[psecurityConceptsRating, setSecurityConceptsRating] = useState();




    //updates the mentors own self assesment info
    const mentorSelfAssessment = async ( windowsRat, windowsServRat, linuxRat, netwrokingRat, securityConsRat) => {
        var tmpData = { ment_id : localStorage.getItem("_id"), windowsRating : windowsRat, windowsServerRating : windowsServRat, linuxRating:  linuxRat, networkingRating : netwrokingRat, securityConceptsRating: securityConsRat}
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
        if(pwindowsRating > 0 && pwindowsRating < 6 && pwindowsServerRating > 0 && pwindowsServerRating < 6  && plinuxRating > 0 && plinuxRating < 6 && pnetworkingRating > 0 && pnetworkingRating < 6 && psecurityConceptsRating > 0 && psecurityConceptsRating < 6){
            console.log("psecurityConceptsRating: ", psecurityConceptsRating, "test")
            await mentorSelfAssessment(pwindowsRating, pwindowsServerRating, plinuxRating, pnetworkingRating, psecurityConceptsRating)
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
                <h3>Please give each subject a rating of 1-5 based on how well you know the subject (1 being very little, to 5 being an expert).</h3>
                <div>
                    <form className="self-assessment-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='windowsRating'>Windows Rating: </label>
                            <input
                                type='Number'
                                id='windowsRating'
                                min={(1)}
                                max={(5)}
                                name='windowsRating'
                                value={pwindowsRating}
                                onChange={(e) => setWindowsRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='windowsSererRating'>Windows Server Rating: </label>
                            <input
                                type='Number'
                                id='windowsSererRating'
                                min={(1)}
                                max={(5)}
                                name='windowsSererRating'
                                value={pwindowsServerRating}
                                onChange={(e) => setWindowsServerRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='linuxRating'>Linux Rating: </label>
                            <input
                                type='Number'
                                id='linuxRating'
                                min={(1)}
                                max={(5)}
                                name='linuxRating'
                                value={plinuxRating}
                                onChange={(e) => setLinuxRating(e.target.value)}
                                required                            
                            />

                            <label htmlFor='networkingRating'>Networking Rating: </label>
                            <input
                                type='Number'
                                id='networkingRating'
                                min={(1)}
                                max={(5)}
                                name='networkingRating'
                                value={pnetworkingRating}
                                onChange={(e) => setNetworkingRating(e.target.value)}
                                required                                
                            />

                            <label htmlFor='securityConceptsRating'>Security Concepts Rating: </label>
                            <input
                                type='Number'
                                id='securityConceptsRating'
                                min={(1)}
                                max={(5)}
                                name='securityConceptsRating'
                                value={psecurityConceptsRating}
                                onChange={(e) => setSecurityConceptsRating(e.target.value)}
                                required                                
                            />

                            <button className="casa-button" type="submit" onClick={handleSubmit}>Save</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SelfAssessment