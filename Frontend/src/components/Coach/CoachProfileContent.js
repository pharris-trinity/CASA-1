import React from 'react';
//import { Text, View } from "react-native";
//import { Text } from 'react-native';
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import './CoachProfile.css';



const ProfileContent = ({data}) => {
    let navigate = useNavigate();

    //Get teams to display them
    const [teams, setTeams] = useState([]);
    
    const getTeams = async (inputTeams) => {
        var tempTeams = [];
        for(let i = 0; i < inputTeams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(inputTeams[i]), requestOptions);
                const jsonData = await response.json();
                tempTeams.push(...jsonData);
            } catch (error) {
                console.log("error in getTeams: ", error);
            }
        }
        setTeams(tempTeams);
    }

    useEffect(() => {
        if(coach) {
            getTeams(coach.teams);
        }
    }, [coach])




    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };
 
    







    return(


        <div className='main-box'>
            <div className='page-title'>Coach Profile</div>
                <div className='big-content-box'>
                    {data.map(user => (
                        <React.Fragment key={user.id}>
                        <div className='text-container'>
                            <span className="left-text">Coach Name</span>
                            <span className="right-text">{user.displayname}</span>
                        </div>
                        <div className='text-container'>
                            <span className="left-text">Username</span>
                            <span className="right-text">{user.username}</span>
                        </div>
                        <div className='text-container'>
                            <span className="left-text">Email</span>
                            <span className="right-text">{user.email}</span>
                        </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className='small-content-box' overflow-y='auto'>
                        {console.log(teams)}
                </div>
                <div className='small-content-box'>
                        Test
                </div>
        </div>

    )
}

export default ProfileContent
