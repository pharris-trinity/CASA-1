import React, { useState, useEffect } from "react";
import './FindMentors.css';
import '../General/casa-table.css'
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import {FaArrowUp, FaArrowDown, FaGripLines} from "react-icons/fa";
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";
import { formatTeamIDString } from "../General/formatTeamIDString";
import { validateTeamID } from "../General/validateTeamID";


/* 
    This component shows brief information about the progress of all the students that a coach is assigned to.
*/

function FindMentors(props) {
    const [coachID, setcoachID] = useState()
    const [mentors, setMentors] = useState([])

    //Sort
    const [sorted, setSorted] = useState({sorted: "id", reversed: "false"});
    //search
    const [searchPhrase, setSearchPhrase] = useState("");
    const [allUsersCopy, setAllUsersCopy] = useState([]);

    //runs the login checker to ensure that the user is allowed to access the component
    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };


      const  getMentors = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'usertype': "Mentor"})
            }
            const response = await fetch('/api/coach/get_all_mentors', requestOptions)
            const jsonData = await response.json()
            setMentors(jsonData);
            setAllUsersCopy(jsonData);
        } catch (error) {
        }
    }






    //retrieves the coach's ID from local storage when the component is loaded
    useEffect(() => {
        setcoachID(localStorage.getItem("_id"))
    }, []);

    useEffect(() => {
        getMentors();
        console.log("Here: ", mentors)
    }, []);

      //sorts by team id
      const sortByWindowsRating = () => {
        setSorted({sorted: "windowsRating", reversed: !sorted.reversed});
        const usersCopy = [...mentors];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setMentors(usersCopy); 
    }

    const sortByLinuxRating = () => {
        setSorted({sorted: "linuxRating", reversed: !sorted.reversed});
        const usersCopy = [...mentors];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setMentors(usersCopy); 
    }

    const sortByWindowServerRating = () => {
        setSorted({sorted: "windowsServerRating", reversed: !sorted.reversed});
        const usersCopy = [...mentors];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setMentors(usersCopy); 
    }

    const sortByNetworkRating = () => {
        setSorted({sorted: "networkingRating", reversed: !sorted.reversed});
        const usersCopy = [...mentors];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setMentors(usersCopy); 
    }

    const sortBySecConRating = () => {
        setSorted({sorted: "securityConseptsRating", reversed: !sorted.reversed});
        const usersCopy = [...mentors];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setMentors(usersCopy); 
    }

    //shows the arrow direction of sort
    const renderArrow = () => {
        if (sorted.reversed){
            return <FaArrowDown/>;
        }
            return <FaArrowUp/>;
    }
    //when arrows are not in affect, shows neutral lines to display that you can switch the directions of these arrows
    const renderConst = () => {
        return <FaGripLines/>;
    }
    //const allUsersCopy = [...students];

    const search = async (e) => {

        const matchedUsers = mentors.filter((user) => {
            return user.zipcode.toString().includes(e.target.value.toString());
        });
        if (e.target.value.length == 0) {
            setMentors(allUsersCopy);
            setSearchPhrase(e.target.value);
        }
        else {
            setMentors(matchedUsers);
            setSearchPhrase(e.target.value);
        }
    }

    //parses the mentors info into a table to be used
    if(props.enabled == true) {
        return (
            <div className="stats-container">
                <div>
                        <input 
                            type = "Number" 
                            placeholder="Search Zipcodes"
                            value={searchPhrase}
                            onChange={search}
                        />
                        <button  className = 'casa-button' onClick={search}>
                            
                            Search
                        </button>
                    </div>
                <h3>Student Stats (Based on Quiz Categories)</h3>
                <table>
                        <thead>
                            <tr>
                                <th className="th-manage-teams">Name</th>
                                <th className="th-manage-teams" onClick = {sortByWindowsRating}>
                                    <span style={{marginRight: 10}}>Windows Rating</span>
                                        {sorted.sorted == "windowsRating" ? renderArrow() : renderConst()}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByWindowServerRating}>
                                    <span style={{marginRight: 10}}>Windows Sever Rating</span>
                                        {sorted.sorted == "windowsServerRating" ? renderArrow() : renderConst()}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByLinuxRating}>
                                    <span style={{marginRight: 10}}>Linux Rating </span>
                                        {sorted.sorted == "linuxRating" ? renderArrow() : renderConst()}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByNetworkRating}>
                                    <span style={{marginRight: 10}}>Networking Rating</span>
                                        {sorted.sorted == "networkingRating" ? renderArrow() : renderConst()}
                                </th>
                                <th className="th-manage-teams" onClick = {sortBySecConRating}>
                                    <span style={{marginRight: 10}}>Security Concepts Rating</span>
                                        {sorted.sorted == "securityConseptsRating" ? renderArrow() : renderConst()}
                                </th>
                                <th className="th-manage-teams">Zipcode</th>
                            </tr>
                        </thead>

                        <tbody>
                        {mentors && mentors.map((item, index) => (
                            <tr>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.displayname}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.windowsRating}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.windowsServerRating}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.linuxRating}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.networkingRating}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.securityConseptsRating}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.zipcode}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        );
    }
}

export default FindMentors;