import React from 'react';
/*pass the data information for the profile content to be displayed in StudProfilePage*/
const ProfileContent = ({data}) => {
    return(
        <div className="profilecontainer">
        <h1>Profile</h1>
        <div className="studentAttributes">
                {data.map(item => (
                        <ul>
                            <li key={item.displayname} className="studentName">
                                <p>Name: {item.displayname}</p>
                            </li>
                            <li key={item.school} className="studentGrade">
                                <p>School: {item.school} </p>
                            </li>
                            <li key={item.grade} className="studentSchool">
                                <p>Grade: {item.gradelevel}</p>
                            </li>
                            <li key={item.tier} className="studentTier">
                                <p>Tier: {item.tier}</p>
                            </li>
                            <li key={item.team} className="studentTeamID">
                                <p>TeamID: {item.team}</p>
                            </li> 
                        </ul> 
                ))}
        </div>
    </div>
    )
}

export default  ProfileContent