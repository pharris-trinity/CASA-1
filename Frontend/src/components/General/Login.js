import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Resources/cyberTexasLogo.png";
import './stylesLogin.css';
import {useLocalStorage} from './useLocalStorage';
import Navbar from './Navbar';

function Login() {

  let navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", password: "", email: ""})

  // eslint-disable-next-line
  const [userID, setUserID] = useLocalStorage("userID", "");
  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();

      const error = {
        user: "Username not found",
        pass: "Invalid password"
      }
  
      var postData = { username: details.name, password: details.password, email: details.email}
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
      };
      
      fetch('/api/user/login', requestOptions).then(
        res => res.text()).then(text => {
            if(text === "Username not found"){
                setErrorMessages({name: "user", message:error.user})
            } else if(text === "Password mismatch") {
                setErrorMessages({name: "pass", message:error.pass})
            } else {
                setUserID(text.substring(1, text.length-1))
                fetchUserAccount(event, text)
            }
        })

  };

  const fetchUserAccount = (e, incText) => {
    e.preventDefault()

    if(incText == "Password mismatch"){
        setErrorMessages({name: "pass", message:e.pass})
        throw new Error("Exception message");
    }
    
    if(incText == "Username not found"){
        setErrorMessages({name: "user", message:e.user})
        throw new Error("Exception message");
    }


    var postData = { id: JSON.parse(incText)._id}
	
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    };

    fetch('/api/user/fetch_user', requestOptions).then(
        res => res.text()).then(text => {
            try {
                const userVal = JSON.parse(text)
                //console.log(userVal.displayname);
                if(userVal.usertype === "Student"){
                    navigate('/studenthome', {replace: true, state:userVal})
                } 
                if(userVal.usertype === "Mentor"){
                    navigate('/mentorHome', {replace: true, state:userVal})
                } 
                if(userVal.usertype === "Coach"){
                    navigate('/coachhome', {replace: true, state:userVal})                    
                } 
                if(userVal.usertype == "Admin"){
                    navigate('/admin/homepage', {replace: true, state:userVal})
                }
                //navigate('/about', {replace: true, state:{userVal}})
                //Figure out what to do with this information from userVal
            } catch (error) {

            }
        }
    )
    
  }

  const accountCreation = (e) => {
    e.preventDefault()
      navigate('/createuser', {replace: true})
  }

  const mentorAccountCreation = (e) => {
    e.preventDefault()
      navigate('/createMentor', {replace: true})
  }

  const coachAccountCreation = (e) => {
    e.preventDefault()
     navigate('/createCoach', {replace: true})
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
  );
  
  return(
    <>
    <Navbar/>
    <div className='form' style= {{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <form onSubmit={handleSubmit}>
            <div className="form-inner">
                <h2> Login </h2>
                <div className="form-group">
                    <input type="text" placeholder="Username" name="name" id="name"  onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                    {renderErrorMessage("user")}
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    {renderErrorMessage("pass")}
                </div>


                <div className="submit-button">
                    <input type="submit" value="LOGIN"/>
                </div>
                <div className="button-container">
                <button className="casa-button2" onClick={accountCreation}>CREATE STUDENT ACCOUNT</button>
                <div>
                    <button className="casa-button2" onClick={coachAccountCreation}>CREATE COACH ACCOUNT          </button>
                <div>
                      <button className="casa-button2" onClick={mentorAccountCreation}>CREATE MENTOR ACCOUNT</button>
                        </div>
                    </div>
                </div> 
    
                
            </div> 
        </form>
    </div>

    </>

  );

}

export default Login;
