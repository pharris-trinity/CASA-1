import React from 'react';

const Table = ({data}) => {
    return(
        <table> 
            <tbody>
                <tr>
                    <th>School Name</th>
                    <th>Coach</th>
                    <th>District</th>
                    <th>ROTC</th>
                    <th>Remote</th>
                    <th>Zipcode</th>
                </tr>
                {data.map((item)=> (
                <tr key={item.national_id}>
                    <td>{item.school_Name}</td>
                    <td>{item.coach}</td>
                    <td>{item.district}</td>
                    <td>{item.rotc}</td>
                    <td>{item.remote}</td>
                    <td>{item.zipcode}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;