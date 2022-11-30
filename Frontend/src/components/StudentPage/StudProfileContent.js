import React from 'react';

const ProfileContent = ({data}) => {
    return(
        <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="studentAttributes">
            <ul>
                {data.map(item => (
                   <div>
                        <li className="studentName">
                            <p>Name: {item.displayname}</p>
                        </li>
                        <li className="studentGrade">
                            <p>School: {item.school} </p>
                        </li>
                        <li className="studentSchool">
                            <p>Grade: {item.gradelevel}</p>
                        </li>
                        <li className="studentTier">
                            <p>Tier: {item.tier}</p>
                        </li>
                        <li className="studentTeamID">
                            <p>TeamID: {item.team}</p>
                        </li> 
                    </div>
                ))}
                
            </ul>
        </div>
    </div>
    )
}

export default  ProfileContent