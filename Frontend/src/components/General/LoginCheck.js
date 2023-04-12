import { useNavigate as navigate} from 'react-router-dom';


//let navigate = useNavigate();

export const loginChecker = (expectedUserType) => {
    //const curruser = JSON.parse(localStorage.getItem("userID"));
    //const curlyuser = "{" + curruser + "}";
    //const fixeduser = JSON.parse(curlyuser);
    //const fixeduser = JSON.parse(localStorage.getItem("userID"));

    if(localStorage.usertype !== expectedUserType){
      if(localStorage.usertype === "Student"){
        //navigate('/stud/main', {replace: true})
        return('/stud/main')
      }
      else if(localStorage.usertype === "Mentor"){
        return('/mentorHome')
      } 
      else if(localStorage.usertype === "Coach"){
          return('/coachhome')                   
      } 
      else if(localStorage.usertype === "Admin"){
        return('/admin/homepage')
      }
      else {
        return('/login')
      }
  }
  else   {return ""}
}



/*
how to implement

import these

import {loginChecker} from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';


inside the body of code put this line and change the "Coach"  to what usertype should be


let navigate = useNavigate();
 window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };


*/


/*
export const loginChecker = (expectedUserType) => {
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);

    console.log("expectedUserType", expectedUserType)
    console.log("fixeduser.usertype", fixeduser.usertype)

    if(localStorage.usertype !== expectedUserType){
      console.log("inside the if statement")
      if(fixeduser.usertype === "Student"){
        console.log("inside the if statement for studnet")
        navigate('/stud/main', {replace: true})
        //return('/stud/main')
      }
      else if(fixeduser.usertype === "Mentor"){
        console.log("inside the if statement for mentor")
        return('/mentorHome')
      } 
      else if(fixeduser.usertype === "Coach"){
        console.log("inside the if statement for coach")
          return('/coachhome')                   
      } 
      else if(fixeduser.usertype === "Admin"){
        console.log("inside the if statement for admin")
        return('/admin/homepage')
      }
      else {
        console.log("inside the if statement for else")
        return('/login')
      }
  }
  else   {return ""}
}



*/