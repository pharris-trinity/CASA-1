import React from "react"
import "./stylesCoach.css"

export default function Profile(){
    var userVal; 
    const fetchUserAccount = (e) => {
        e.preventDefault()

        var postData = { id: '6373bf8650c5263f57ff20ab'};


        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        }
        
            
        fetch('user/display_user/', requestOptions).then(
            res => res.text()).then(text => {
                try {
                    userVal = JSON.parse(text)
                    console.log(userVal.displayname);
                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        )
    
    }
    
    return(
    <>
    <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="Attributes">
            <button onClick={fetchUserAccount}> Button </button>
        </div>
    </div>
    </>
    ); 
}
