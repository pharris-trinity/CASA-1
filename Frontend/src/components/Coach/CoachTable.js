import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ViewTeams2(){
  let navigate = useNavigate();
  
  function homeButton(){
    navigate('/teacher', {replace: true})
  }
  const[joinList, setJoinList] = useState([]);

  const addForDisplay = (inputID) => {
    //var tmp = {id: inputID}
    setJoinList(prev => [...prev, inputID.displayname]);
  }



  const fetchUserAccount = () => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };
    fetch('/api/filter_mentors', requestOptions).then( res => res.text()).then(text => {
            var tmp = JSON.parse(text);
            console.log(tmp);
            setJoinList(prev => [...prev, tmp])
        }
    );

};


    return(
        <div className="App">
            <button onClick={()=>fetchUserAccount()}>Get Mentors</button>
            <p> Mentors: {joinList}</p>
            <div className="form-group">
             
            </div>
            <button onClick={homeButton}>
            Home
            </button>

        </div>
    );
    
}