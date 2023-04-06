import React, { useState, useEffect } from "react";
import './ManageTeams.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {

    if(props.enabled == true) {
        return (
            <div>
                <div>
                    {/*Div where selected student info + add student button, etc. goes*/}
                </div>

                <div>
                    {/*Div where student table goes*/}
                    <table>
                            <thead>
                                <tr>
                                    <th>

                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                </tr>
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ManageTeams;