//import { useNavigate } from 'react-router-dom';

export const loginChecker = (expectedUserType) => {
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);

    if(fixeduser.usertype != expectedUserType){
    if(fixeduser.usertype === "Student"){
      return('/stud/main')
    }
    else if(fixeduser.usertype === "Mentor"){
      return('/stud/main')
    } 
    else if(fixeduser.usertype === "Coach"){
        console.log("Should move to coachhome")
        return('/coachhome')                   
    } 
    else if(fixeduser.usertype === "Admin"){
      return('admin/homepagetud/main')
    }
    else {
      return('/login')
    }
  }
  else   {return "stay"}
}