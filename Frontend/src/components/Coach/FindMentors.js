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

      const sortByName = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }  
    }

      const sortByWindowsRating = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            }
            }
            if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
            } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
            }
        }
    }

    const sortByWindowServerRating = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }  
    }

    const sortByLinuxRating = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[3];
                y = rows[i + 1].getElementsByTagName("TD")[3];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        } 
    }

    const sortByNetworkRating = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[4];
                y = rows[i + 1].getElementsByTagName("TD")[4];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        } 
    }

    const sortBySecConRating = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }  
    }

    const sortByZip = () => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("mentorTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                    }
                }
            }

            if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }  
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
            if(user.zipcode !== undefined) return user.zipcode.toString().startsWith(e.target.value.toString());
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
                <h3>Mentors</h3>
                <table id="mentorTable">
                        <thead>
                            <tr>
                                <th className="th-manage-teams" onClick={sortByName}>Name</th>
                                <th className="th-manage-teams" onClick = {sortByWindowsRating}>
                                    <span style={{marginRight: 10}}>Windows Rating</span>
                                    <div></div>
                                        {/* {sorted.sorted == "windowsRating" ? renderArrow() : renderConst()} */}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByWindowServerRating}>
                                    <span style={{marginRight: 10}}>Windows Server Rating</span>
                                    <div></div>
                                        {/* {sorted.sorted == "windowsServerRating" ? renderArrow() : renderConst()} */}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByLinuxRating}>
                                    <span style={{marginRight: 10}}>Linux Rating </span>
                                    <div></div>
                                        {/* {sorted.sorted == "linuxRating" ? renderArrow() : renderConst()} */}
                                </th>
                                <th className="th-manage-teams" onClick = {sortByNetworkRating}>
                                    <span style={{marginRight: 10}}>Networking Rating</span>
                                    <div></div>
                                        {/* {sorted.sorted == "networkingRating" ? renderArrow() : renderConst()} */}
                                </th>
                                <th className="th-manage-teams" onClick = {sortBySecConRating}>
                                    <span style={{marginRight: 10}}>Security Concepts Rating</span>
                                    <div></div>
                                        {/* {sorted.sorted == "securityConseptsRating" ? renderArrow() : renderConst()} */}
                                </th>
                                <th className="th-manage-teams" onClick={sortByZip}>Zipcode</th>
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