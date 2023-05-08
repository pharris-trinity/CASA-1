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
The ManageTeams component has multiple functions.
    - Contains the table of all students assigned to a Coach
    - Has functionality for updating a student's information in DB
    - Contains the buttons for "Add Student, "Delete Student", and "Make Team"
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
    
    //gets coach object from DB based on the user's ID
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
            //console.log(error)
        }
    }

    //gets all students assigned to the coach from DB
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
           // console.log(error)
        }
    }

    //gets all teams objects from DB given a list of teamIDs
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
                //console.log("error in getTeams: ", error);
            }
        }
        setTeams(tempTeams);
    }

    //gets a team's name based on teamID
    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id == teamID) {
                teamName = team.name;
            }
        })
        return teamName;
    }

    //given new student info, updates the student in DB to reflect the new info
    const updateStudentAccount = async (currentStudentID, newDispName, newGradLevel, newTeamID) => {
        if(newGradLevel < 9 || newGradLevel > 12){
            alert("The grade level has been edited to be outside of the highschool range.")
        }
        else {
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
                //console.log(error);
            }
        }
    }

    //removes a coach's ID from student's coachID field
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
            //console.log(error);
        }
    }

    //updates state variables so the form fields contain the current selected student's info
    const fillDisplayInfo = (student) => {
        setCurrentStudentID(student._id);
        setUpdateDisplayName(student.displayname);
        setDisplayEmail(student.email);
        student.gradelevel ? setUpdateGradLevel(student.gradelevel) : setUpdateGradLevel("N/A");
        (student.team != -1) ? setUpdateTeamID(formatTeamIDString(student.team)): setUpdateTeamID("N/A");
    }

    //opens AddStudents component
    const addStudentButton = () => {
        setEnabledAddToTeam(true);
    }

    //closes AddStudents component and updates students from DB
    const closeAddStudent = () => {
        setEnabledAddToTeam(false);
        getStudents(coachUserID);
    }

    //opens MakeTeam component
    const makeTeamButton = () => {
        setEnableMakeTeam(true);
    }

    //closes MakeTeam component and updates coach info from DB
    const closeMakeTeam = async () => {
        setEnableMakeTeam(false);
        await getCoach(coachUserID);
    }

    //button to remove the current selected student from the coach's roster
    const deleteStudentButton = async () => {
        if(currentStudentID != undefined) {
            const confirmText = "Are you sure you want to delete the current selected student? \n(This does not delete their account, but removes them from your roster)";
            if(window.confirm(confirmText) == true) {
                await removeStudent(currentStudentID);
                getStudents(coachUserID);
            } else {
            }
        }
    }

    //gets coachID from local storage on page load
    useEffect(() => {
        setCoachUserID(localStorage.getItem("_id"));
    }, []) 

    //gets coach and all students from DB when coachID is updated
    useEffect(() => {
        if(coachUserID) {
            getCoach(coachUserID);
            getStudents(coachUserID);
        }
    }, [coachUserID]) 

    //when coach is updated, updates the teams from DB
    useEffect(() => {
        if(coach) {
            getTeams(coach.teams);
        }
    }, [coach])

    //submit functionality for React form. Updates student based on information from the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateTeamID(updateTeamID)) {
            const convertedIDNumber = formatTeamIDNumber(updateTeamID);
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
        if (e.target.value.length == 0) {
            setStudents(allUsersCopy);
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
                        {/* React Form Inputs */}
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
                                <button className="casa-button" type="button" onClick={makeTeamButton}>Create Team</button>
                            </div>
                        </div>
                    </form>

                    {/* Delete Button and Misc Components */}
                    <div>
                        <AddStudent enabled={enabledAddToTeam} closeForm={closeAddStudent}/>
                        <MakeTeam enabled={enableMakeTeam} closeForm={closeMakeTeam}/>
                        <button className="casa-button delete-button" type="button" onClick={deleteStudentButton}>Delete Student</button>
                    </div>
                </div>

                {/* Student Table */}
                <div>
                    <div>
                        <input 
                            type = "text" 
                            placeholder="Search Table"
                            value={searchPhrase}
                            onChange={search}
                        />
                        <button  className = 'casa-button' onClick={search}>
                            
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
            </div>
        );
    }
}

export default ManageTeams;