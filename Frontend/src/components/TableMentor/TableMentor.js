import React from 'react';
import "./TableStyle.css";

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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Region</th>
                                <th>Speciality</th>
                            </tr>
                        </thead>

                         <tbody>
                                    <td>mentor test </td>
                                    <td> mentortest@gmail.com</td>
                                    <td>00000</td>
                                    <td>Windows</td>
                        </tbody>
                </table>
            </div>
        )
}


export default  DisplayTable