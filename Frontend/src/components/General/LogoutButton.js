import React from  "react"
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function LogoutButton(props) {
  let navigate = useNavigate();
  
  const logout = () => {
    console.log("logout function called");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    navigate('/login');
    console.log("should be logged out now");
  }

  return (
    <button className="casa-button" onClick={logout}>Logout</button>
  );
}

export default LogoutButton;
