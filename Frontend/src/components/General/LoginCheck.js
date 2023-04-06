import { useNavigate } from 'react-router-dom';

export const loginChecker = (expectedUserType) => {
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);
    //used to check if the usertypes in the console 
    //console.log(fixeduser.usertype + " what we got vs what we expect  " + expectedUserType)

    let navigate = useNavigate();
    if(fixeduser.usertype !== expectedUserType){
        console.log("HEREEEEEEEEEEE")
      if(localStorage.usertype === "Student"){
        
        console.log("Should move to stud/main")
        navigate('/stud/main', {replace: true})
      }
      else if(localStorage.usertype === "Mentor"){
        navigate('/mentorHome', {replace: true})
      } 
      else if(localStorage.usertype === "Coach"){
          console.log("Should move to coachhome")
          navigate('/coachhome', {replace: true})                    
      } 
      else if(localStorage.usertype === "Admin"){
        navigate('/admin/homepage', {replace: true})
      }
      else {
        navigate('/login', {replace: true})
      }
      return true;
    }
    else   {return true;}
}



/*
Code to put in the pages to use this component

Example for student page

import {loginChecker} from "../General/LoginCheck";


    loginChecker("Student");    inside of the parenthesis is the usertype the page expects
    this returns true if the usertype and the pages usertype match


*/