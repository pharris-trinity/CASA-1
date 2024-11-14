import React , { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from './useLocalStorage';
import './accCreate.css'
import logo from "../../Resources/cyberTexasLogo.png";
import Navbar from './../General/Navbar';
import { Nav } from 'react-bootstrap';

function CreateAccount() {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [display, setDisplay] = useState("");

    // eslint-disable-next-line
    const [userID, setUserID] = useLocalStorage("userID", "");

    let navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== passwordVerify){
            alert("Passwords do not match");
            setPassword("")
            setPasswordVerify("");
            return;
        }

        var postData = {username: user, displayname: display, email: email, password: password}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };

        try {
            fetch('/api/student/create_student', requestOptions).then(
                res => res.text()).then(text => {
                    if(text.toLowerCase() === "found previously existing user"){
                        alert("Username or email already exists in the database, please login")
                        return;
                    } else {
                        console.log(text)
                        //TODO REDIRECT TO STUDENT PAGE
                        // var modText = text.substring(1, text.length-1)
                        // setUserID(modText)
                        // continueRedirect(e, modText)

                        loginRedirect(e)
                    }
                }
            ) 
        }  catch (error) {
            console.log(error)
        }
    }
/*
    const continueRedirect = (e, text) => {
        e.preventDefault()
        fetch('/api/user/display_user/' + text).then(
            res => res.text()).then(text => {
                try {

                    const userVal = JSON.parse(text)
                    console.log(userVal)
                    navigate('/about', {replace: true, state:{userVal}})
                } catch (error) {
                    alert("Something went wrong")
                }
            }
        )
    }
*/
    const loginRedirect = (e) => {
        e.preventDefault()
        navigate('/login', {replace: true})
    }

    return (                  
        <>
        <Navbar/>
        <img src={logo} id="logo" centerImage="center" align="left" alt=""/>
        <div className='form'>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2> Create Account </h2>
                    <div className="form-group">
                        <input type="text" placeholder="Username" name="name" id="name"  value={user} onChange={evt => {setUser(evt.target.value)}} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={evt => {setEmail(evt.target.value)}} required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Displayname" name="display" id="display"  value={display} onChange={evt => {setDisplay(evt.target.value)}} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" id="password" value={password} onChange={evt => {setPassword(evt.target.value)}} required/>
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder='Verify Password' name='password2' id='password2' value={passwordVerify} onChange={evt => {setPasswordVerify(evt.target.value)}} required/>
                    </div>
                    <input type="submit" value="CREATE ACCOUNT"/>
                    <button id='login' onClick={loginRedirect} className="login_button">Login</button>
                </div>
            </form>
        </div>
        </>  
    )
}

export default CreateAccount