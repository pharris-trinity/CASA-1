import React from 'react';
import "./stylesMentor.css";

const MentorProfileContent = ({data}) => {
    return(
        <div className="profilecontainer">
        <h1>.</h1>
        <div className="mentorAttributes">
            <ul>
                {Object.values(data).map(item => (
                   <div>
                        <li className="mentorName">
                            <p>Name: {item.username}</p>
                            
                        </li>
                        <div></div>

                        <li className="mentorEmail">
                            <p>Mentor Email: {item.email}</p>
                        </li> 
                        <div></div>

                        <li className="mentorZipcode">
                            <p>Mentor Zipcode: {item.zipcode}</p>
                        </li> 
                        <div></div>

                        <li className="mentorSpeciality">
                            <p>Speciality: {item.speciality}</p>
                        </li> 
                        <div></div>

                    </div>
                ))} 
            </ul>
        </div>
    </div>
    )
}

export default  MentorProfileContent