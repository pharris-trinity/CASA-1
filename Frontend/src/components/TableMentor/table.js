import React from 'react';

const DisplayTable = ({data}) => {
    return (
            <div>
                <table>
                        <thead>
                            <tr>
                                <th>National ID</th>
                                <th>Name</th>
                                <th>School</th>
                                <th>District</th>
                                <th>Coach</th>
                            </tr>
                        </thead>

                         <tbody>
                            {data.map(item => (
                                <tr key={item.national_id}>
                                    <td>{item.national_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.school}</td>
                                    <td>{item.district}</td>
                                    <td>{item.coach}</td>
                                </tr>
                            ))}
                        </tbody>`
                </table>
            </div>
        )
}


export default  DisplayTable


/*    const teamArr = (val) => {
        // Individual Values
        console.log("Val: " + val)
    }
<button onClick={() => {
                                visit(elements, teamArr)
                            }}>click here</button>
let tb_data = this.state.list.map((item)=>{
            return (
              <tr key={item.national_id}>
                <td>{item.national_id}</td>
                <td>{item.name}</td>
                <td>{item.school}</td>
                <td>{item.district}</td>
                <td>{item.rotc}</td>
                <td>{item.active}</td>
              </tr>
            )
            })
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
            </tbody>
        </table>
    );
};

export default Table;*/

/*

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
*//*
                {data.map((item)=> (
                <tr key={item.national_id}>
                    <td>{item.school_Name}</td>
                    <td>{item.coach}</td>
                    <td>{item.district}</td>
                    <td>{item.rotc}</td>
                    <td>{item.remote}</td>
                    <td>{item.zipcode}</td>
                </tr>
                ))}*/