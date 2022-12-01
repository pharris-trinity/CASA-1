import React from 'react';

const ProfileContent = ({data}) => {
    return(
        <div className="profilecontainer">
        <h1>Teams</h1>
        <div className="studentAttributes">
            <ul>
                {/*
                {data.map(item => (
                   <div>
                        <li className="studentName">
                            <p>Name: {item.displayname}</p>
                        </li>
                    </div>
                ))}*/}
                
            </ul>
        </div>
    </div>
    )
}

export default  ProfileContent
