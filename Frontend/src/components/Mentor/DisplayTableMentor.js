import React, {useEffect, useState} from 'react';
import "./TableStyle.css";


const DisplayTable = ({data}) => {
    const [text, setText] = useState('')
    const [select, setSelect] = useState('')
    const keys =  ["name", "school"]
    const filter = data.filter((item) => keys.some((key)=>item[key].toLowerCase().includes(text.toLowerCase())))


    // This is for the filter box. This const variable filters the data by the chosen category to the varible from the MongoDB
    // For example: Region # in the filterbox will return teams with an assigned region number from the stored data. It is not currently by will 
    // still work. You will have to maka a boolean of filter with the same map scheme below for All (option) or "", but will need
    // to use filterProducts for the second one. 
    // remove "disabled" from select onChange and see if it works. 
    //const filteredProducts = data.filter(d => d.district.toLowerCase() === select.toLowerCase())
    return (
            <div>
           <div className='flex justify-between my-8'>
                <div>
                    <label htmlFor="">Search By School and Team Name</label>
                    <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <select onChange={e => setSelect(e.target.value)} class="select select-bordered w-full max-w-xs">
                        <option disabled selected>All</option>
                        <option>Region</option>
                    </select>
                </div>
            </div>
                <table> <div className="myComponent">
                        <thead>
                            <tr>
                                <th>National ID</th>
                                <th>Team Name</th>
                                <th>School</th>
                                <th>District</th>
                            </tr>
                        </thead>
                        
                         <tbody>
                            {
                                filter.map(item => (
                                    <tr key={item.national_id}>
                                        <td>{item.national_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.school}</td>
                                        <td>{item.district}</td>
                                    </tr>
                            ))}
                        </tbody>
                </div></table>
            </div>
        )
}


export default  DisplayTable