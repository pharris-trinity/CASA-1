import React, { useState, useEffect } from "react";
import './PersonalInfo.css'
import { json } from "body-parser";


function PersonalInfo(props) {
    const[pemail, setEmail] = useState();
    const[pzipcode, setZipCode] = useState();
    const[pphonenumber, setPhoneNumber] = useState();
    //const[pname, setName] = useState();
    




    //updates the mentors own self assesment info
    const mentorPersonalInfo = async ( email_, zip, phone) => {
        var tmpData = { ment_id : localStorage.getItem("_id"), zipcode : zip, phoneNumber : phone, email:  email_}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/mentor/personal_info_update', requestOptions).then((response) => {
             
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
            console.log("pemail: ", pemail,"pzipcode: ", pzipcode, "pphonenumber: ", pphonenumber)
            await mentorPersonalInfo(pemail, pzipcode, pphonenumber)
            props.closeForm();
        
    }



    if(props.enabled === true){
        return (
            <div className="form-popup">
                <h2>Mentor Personal Info</h2>
                <h3>Please enter your ZIP code, your email address, and your phone number.</h3>
                <div>
                    <form className="personal-information-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='zipcode'>Zip Code: </label>
                            <input
                                type='Number'
                                id='zipcode'
                                name='zipcode'
                                value={pzipcode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required                            
                            />

                            <label htmlFor='phonenumber'>Phone Number: </label>
                            <input
                                type='Number'
                                id='phonenumber'
                                name='phonenumber'
                                value={pphonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required                            
                            />

                            <label htmlFor='email'>Email: </label>
                            <input
                                type='String'
                                id='email'
                                name='email'
                                value={pemail}
                                onChange={(e) => setEmail(e.target.value)}
                                required                            
                            />

                            <button className="casa-button" type="submit" onClick={handleSubmit}>Update Personal Information</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default PersonalInfo