import React, {useEffect, useState} from 'react';
import "./TableStyle.css";


const DisplayTable = ({data}) => {
    const [text, setText] = useState('')
    const [select, setSelect] = useState('')
    const keys =  ["name", "school"]
    const filter = data.filter((item) => keys.some((key)=>item[key].toLowerCase().includes(text.toLowerCase())))
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
                        <option selected>All</option>
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