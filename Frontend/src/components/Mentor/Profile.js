import React from 'react';

const DisplayProfile = ({data}) => {

    return (
            <div style={{margin: '40px'}}>
                
                {(data.national_id)}
            </div>
        )
}


export default  DisplayProfile
/*
data.map(item => (
                       <tr key={item._id}>
                             <td>{item._id}</td>
                             <td>{item.username}</td>
                             <td>{item.displayname}</td>
                             <td>{item.zipcode}</td>
                             <td>{item.email}</td>
                    </tr>
                    ))}*/