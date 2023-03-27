export const loginChecker = (expectedUserType) => {
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);
    //used to check if the usertypes in the console 
    //console.log(fixeduser.usertype + " what we got vs what we expect  " + expectedUserType)


    if(fixeduser.usertype === expectedUserType){
        return true;
    }
    else   {return false;}
}



/*
Code to put in the pages to use this component

Example for student page

import {loginChecker} from "../General/LoginCheck";


    loginChecker("Student");    inside of the parenthesis is the usertype the page expects
    this returns true if the usertype and the pages usertype match


*/