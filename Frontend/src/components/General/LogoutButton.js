import React from  "react"
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function LogoutButton(props) {
  let navigate = useNavigate();
  
  const logout = () => {
    console.log("logout function called");
    localStorage.removeItem("_id");
    localStorage.removeItem("username");
    localStorage.removeItem("school");
    localStorage.removeItem("displayname");
    localStorage.removeItem("usertype");
    navigate('/login');
    console.log("should be logged out now");
  }

  return (
    <button className="casa-button" onClick={logout}>Logout</button>
  );
}

export default LogoutButton;
