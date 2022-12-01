import React, {useEffect, useState}from 'react';


const DisplayTable = ({data}) => {
    const [text, setText] = useState('')
    const [select, setSelect] = useState('')
    const keys =  ["name", "school"]
    const filter = data.filter((item) => keys.some((key)=>item[key].toLowerCase().includes(text.toLowerCase())))
    return (
            <div>
           <div className='flex justify-between my-8'>
                <div>
                    <label htmlFor="">Search By Brand</label>
                    <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <select onChange={e => setSelect(e.target.value)} class="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select Category</option>
                        <option>Region</option>
                        <option>Linux</option>
                        <option>Windows</option>
                        <option>MacOs</option>
                    </select>
                </div>
            </div>
                <table>
                        <thead>
                            <tr>
                                <th>National ID</th>
                                <th>Name</th>
                                <th>School</th>
                                <th>District</th>
                                <th>Coach</th>
                                <th>Region</th>
                            </tr>
                        </thead>

                         <tbody>
                            {filter.map(item => (
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


