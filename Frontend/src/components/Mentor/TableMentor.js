import React, {useEffect, useState} from 'react';
import "./TableStyle.css";
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";


const DisplayTable = ({data}) => {

    let navigate = useNavigate(); 
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Mentor")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    
    function homeButton(){
      navigate('/coachhome', {replace: true})
    }
  

    const [text, setText] = useState('')
    const [select, setSelect] = useState('')
    const keys =  ["name", "school"]
    return (
            <div>
           <div className='flex justify-between my-8'>
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
                <button onClick={homeButton}>
            Home
            </button>
            

            </div>
        )
}


export default  DisplayTable