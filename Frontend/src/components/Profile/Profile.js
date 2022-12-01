import React, { useState } from "react"
import "./stylesCoach.css"


export default function Profile(){

    //var userVal; 
    var postData;
    const[data, setData] = useState (null);
    const[data1, setData1] = useState (null);
    const[data2, setData2] = useState (null);
    const[data3, setData3] = useState (null);

    const fetchUserAccount = (e) => {
    //useEffect (() => {
        //e.preventDefault()

        postData = { id: '6373bf8650c5263f57ff20ab'}

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        fetch('/api/user/fetch_user', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    console.log(userVal.displayname);
                    setData(userVal.displayname);
                    setData1(userVal.username);
                    setData2(userVal.email);
                    setData3(userVal.school);

                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        );

    }; 
    return(
        <div className="App">
            <h1>Profile</h1>
            <button onClick={fetchUserAccount}>
            Display
            </button>
            <p>Display Name: {data}</p>
            <p>Username: {data1}</p>
            <p>Email: {data2}</p>
            <p>School: {data3}</p>

        </div>
    );
}


/*
    //var userVal; 
    var postData;

    const fetchUserAccount = (e) => {
    //useEffect (() => {
        //e.preventDefault()

        postData = { id: '6373bf8650c5263f57ff20ab'}

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        fetch('/api/user/fetch_user', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    console.log(userVal.displayname);
                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        );

    };
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
    
*/