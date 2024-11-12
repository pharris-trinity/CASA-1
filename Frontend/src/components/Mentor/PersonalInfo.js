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
                            <div class="zip-help">?
                              <span class="zip-help-text">You have the option to input your home or work zip code. Please choose the one that works for you.</span>
                            </div>
                            <input
                                type='String'
                                id='zipcode'
                                name='zipcode'
                                pattern="[0-9]{5}"
                                title="Five-digit ZIP code"
                                placeholder="00000"
                                value={pzipcode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required                            
                            />

                            <label htmlFor='phonenumber'>Phone Number: </label>
                            <input
                                type='String'
                                id='phonenumber'
                                name='phonenumber'
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="000-000-000"
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

                            <button className="casa-button" type="submit" onClick={handleSubmit}>Save</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default PersonalInfo