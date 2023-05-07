import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import '../General/casa-table.css'
import AddStudent from "./AddStudent";
import MakeTeam from "./MakeTeam";
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import {FaArrowUp, FaArrowDown, FaGripLines} from "react-icons/fa";
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";
import { formatTeamIDString } from "../General/formatTeamIDString";
import { validateTeamID } from "../General/validateTeamID";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {
    const [coachUserID, setCoachUserID] = useState();
    const [coach, setCoach] = useState();
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [updateDisplayName, setUpdateDisplayName] = useState("");
    const [displayEmail, setDisplayEmail] = useState("");
    const [updateGradLevel, setUpdateGradLevel] = useState("");
    const [updateTeamID, setUpdateTeamID] = useState("");
    const [currentStudentID, setCurrentStudentID] = useState();

    const[enabledAddToTeam, setEnabledAddToTeam] = useState(false);

    const[enableMakeTeam, setEnableMakeTeam] = useState(false);
    //Sort
    const [sorted, setSorted] = useState({sorted: "id", reversed: "false"});
    //search
    const [searchPhrase, setSearchPhrase] = useState("");
    const [allUsersCopy, setAllUsersCopy] = useState([]);
    
    const getCoach = async(coachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'id': coachID})
            }
            const response = await fetch('/api/coachSearch', requestOptions)
            const jsonData = await response.json()

            setCoach(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    const  getStudents = async (coachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'userID': coachID})
            }
            const response = await fetch('/api/coach/get_coaches_students', requestOptions)
            const jsonData = await response.json()
            setStudents(jsonData);
            setAllUsersCopy(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async (inputTeams) => {
        var tempTeams = [];
        for(let i = 0; i < inputTeams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(inputTeams[i]), requestOptions);
                const jsonData = await response.json();
                tempTeams.push(...jsonData);
            } catch (error) {
                console.log("error in getTeams: ", error);
            }
        }
        setTeams(tempTeams);
    }

    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id == teamID) {
                teamName = team.name;
                console.log(team.name)
            }
        })
        return teamName;
    }

    const updateStudentAccount = async (currentStudentID, newDispName, newGradLevel, newTeamID) => {
        var tmpData = {coachID: coachUserID, studentID: currentStudentID, studentDispName: newDispName, studentGradLevel: newGradLevel, studentTeamID: newTeamID}
        try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        
        const response = await fetch('/api/team/update_student_info', requestOptions)
        const jsonData = await response.json()
        getStudents(coachUserID);

        } catch (error) {
            console.log(error);
        }
    }

    const removeStudent = async (studentID) => {
        var tmpData = {coachID: coachUserID, student_id: studentID}
        try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        
        const response = await fetch('/api/coach/remove_coachid_from_student', requestOptions)
        const jsonData = await response.json()

        } catch (error) {
            console.log(error);
        }
    }

    const fillDisplayInfo = (student) => {
        setCurrentStudentID(student._id);
        setUpdateDisplayName(student.displayname);
        setDisplayEmail(student.email);
        student.gradelevel ? setUpdateGradLevel(student.gradelevel) : setUpdateGradLevel("N/A");
        (student.team != -1) ? setUpdateTeamID(formatTeamIDString(student.team)): setUpdateTeamID("N/A");
    }

    const addStudentButton = () => {
        setEnabledAddToTeam(true);
    }

    const closeAddStudent = () => {
        setEnabledAddToTeam(false);
        getStudents(coachUserID);
    }

    const makeTeamButton = () => {
        setEnableMakeTeam(true);
    }

    const closeMakeTeam = async () => {
        setEnableMakeTeam(false);
        await getCoach(coachUserID);
    }
    const deleteStudentButton = async () => {
        const confirmText = "Are you sure you want to delete the current selected student? \n(This does not delete their account, but removes them from your roster)";
        if(window.confirm(confirmText) == true) {
            await removeStudent(currentStudentID);
            getStudents(coachUserID);
        } else {
        }
    }


    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        if(coachUserID) {
            getCoach(coachUserID);
            getStudents(coachUserID);
        }
    }, [coachUserID]) 

    useEffect(() => {
        if(coach) {
            getTeams(coach.teams);
        }
    }, [coach])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateTeamID(updateTeamID)) {
            const convertedIDNumber = formatTeamIDNumber(updateTeamID);
            console.log("converted teamID in handleSubmit of updateTeam",convertedIDNumber);
            updateStudentAccount(currentStudentID, updateDisplayName,updateGradLevel,convertedIDNumber);
        }
    }
    
    //sorts by student display name
    const sortByName = () => {
        setSorted({sorted: "name", reversed: !sorted.reversed});
        const usersCopy = [...students];
        usersCopy.sort((userA, userB) => {
            const nameA = userA.displayname;
            const nameB = userB.displayname;
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setStudents(usersCopy); 
    }
    
    //sorts by student email
    const sortByEmail = () => {
        setSorted({sorted: "email", reversed: !sorted.reversed});
        const usersCopy = [...students];
        usersCopy.sort((userA, userB) => {
            const nameA = userA.email;
            const nameB = userB.email;
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setStudents(usersCopy); 
    }

    
    //sorts by grade level
    const sortByGrade = () => {
        setSorted({sorted: "grade", reversed: !sorted.reversed});
        const usersCopy = [...students];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.gradelevel);
            const nameB = String(userB.gradelevel);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setStudents(usersCopy); 
    }

    //sorts by team id
    const sortByTeamID = () => {
        setSorted({sorted: "teamID", reversed: !sorted.reversed});
        const usersCopy = [...students];
        usersCopy.sort((userA, userB) => {
            const nameA = String(userA.team);
            const nameB = String(userB.team);
            if (sorted.reversed) {
                return nameB.localeCompare(nameA);
            }
            return nameA.localeCompare(nameB);
        });
        setStudents(usersCopy); 
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

        const matchedUsers = students.filter((user) => {
            return user.displayname.toLowerCase().includes(e.target.value.toLowerCase());
        });
        console.log("matchedUsers: ", matchedUsers)
        console.log("students: ", students)
        console.log("e.target.value.length: ", e.target.value.length)
        console.log("allUsersCopy: ", allUsersCopy)
        if (e.target.value.length == 0) {
            setStudents(allUsersCopy);
            console.log("INSIDE THE e.target.value.length IF STATEMENT")
            console.log("allUsersCopy: ", allUsersCopy)
            setSearchPhrase(e.target.value);
        }
        else {
            setStudents(matchedUsers);
            setSearchPhrase(e.target.value);
        }
    }


    if(props.enabled == true) {
        return (
            <div>
                <div className="left form-group">
                <form className="form-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name'>Name </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={updateDisplayName}
                                onChange={(e) => setUpdateDisplayName(e.target.value)}
                            />

                            <p className="label-style">Email (Not Editable)</p>
                            <p className="email-box">{displayEmail}</p>

                            <label htmlFor='grade'>Grade Level</label>
                            <input
                                type='number'
                                id='grade'
                                name='grade'
                                value={updateGradLevel}
                                onChange={(e) => setUpdateGradLevel(e.target.value)}
                            />

                            <label htmlFor='team'>Team National ID</label>
                            <input
                                type='text'
                                id='team'
                                name='team'
                                value={updateTeamID}
                                onChange={(e) => setUpdateTeamID(e.target.value)}
                            />
                            <div className="button-alignment">
                                <button className="casa-button" type="submit">Save Changes</button>
                                <button className="casa-button" type="button" onClick={addStudentButton}>Add Student</button>
                                <button className="casa-button" type="button" onClick={makeTeamButton}>Make A Team</button>
                            </div>
                        </div>
                    </form>

                    {/*Div for Delete button code*/}
                    <div>
                        <AddStudent enabled={enabledAddToTeam} closeForm={closeAddStudent}/>
                        <MakeTeam enabled={enableMakeTeam} closeForm={closeMakeTeam}/>
                        <button className="casa-button delete-button" type="button" onClick={deleteStudentButton}>Delete Student</button>
                    </div>
                </div>

                {/*Div where student table goes*/}
                <div>
                    <div>
                        <input 
                            type = "text" 
                            placeholder="Search Table"
                            value={searchPhrase}
                            onChange={search}
                        />
                        <button onClick={search}>
                            
                            Search
                        </button>
                    </div>
                    <table className="right">
                            <thead>
                                <tr>
                                    <th className="th-manage-teams" onClick = {sortByName}>
                                    <span style={{marginRight: 10}}>Student Name</span>
                                        {sorted.sorted == "name" ? renderArrow() : renderConst()}
                                    </th>
                                    <th className="th-manage-teams" onClick = {sortByEmail}>
                                    <span style={{marginRight: 10}}>Email</span>
                                        {sorted.sorted == "email" ? renderArrow() : renderConst()}

                                    </th>
                                    <th className="th-manage-teams" onClick={sortByGrade}>
                                        <span style={{marginRight: 10}}>Grade Level</span>
                                        {sorted.sorted == "grade" ? renderArrow() : renderConst()}
                                    </th>
                                    <th className="th-manage-teams" >
                                        Team Name
                                    </th>
                                    <th className="th-manage-teams" onClick = {sortByTeamID}>
                                    <span style={{marginRight: 10}}>Team ID</span>
                                        {sorted.sorted == "teamID" ? renderArrow() : renderConst()}

                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {students && students.map((student, index) => (
                                <tr key={student._id} onClick={() => (fillDisplayInfo(student))}>
                                    <td className={student._id == currentStudentID ? "td-selected" : index % 2 === 0 ? 'td-even' : 'td-odd'}>{student.displayname}</td>
                                    <td className={student._id == currentStudentID ? "td-selected" : index % 2 === 0 ? 'td-even' : 'td-odd'}>{student.email}</td>
                                    <td className={student._id == currentStudentID ? "td-selected" : index % 2 === 0 ? 'td-even' : 'td-odd'}>{student.gradelevel != undefined ? student.gradelevel : "N/A"}</td>
                                    <td className={student._id == currentStudentID ? "td-selected" : index % 2 === 0 ? 'td-even' : 'td-odd'}>{(teams && student.team != -1) ? getTeamName(student.team) : "N/A"}</td>
                                    <td className={student._id == currentStudentID ? "td-selected" : index % 2 === 0 ? 'td-even' : 'td-odd'}>{student.team != -1 ? formatTeamIDString(student.team) : "N/A"}</td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                </div>

                 {/*Div for make team button code*/}
                 {/* <div>
                    <button className="casa-button" type="button" onClick={makeTeamButton}>Make A Team</button>
                    <MakeTeam enabled={enableMakeTeam} closeForm={closeMakeTeam}/>
                </div> */}


            </div>
        );
    }
}

export default ManageTeams;