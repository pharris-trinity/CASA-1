import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import AddStudent from "./AddStudent";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function ManageTeams(props) {
    const [coachUserID, setCoachUserID] = useState();
    const [coach, setCoach] = useState();
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState();


    var studentToDisplay = ["N/A", "N/A", "N/A", "N/A"];
    const [inputDispName, setInputDispName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputGradLevel, setInputGradLevel] = useState('');
    const [inputTeamName, setInputTeamName] = useState('');
    var studID = '';
    var rowNumber = 1;
    const [displayDsipalyName, setDisplayDsipalyName] = useState("N/A");
    const [displayEmail, setDisplayEmail] = useState("N/A");
    const [displayGradLevel, setDisplayGradLevel] = useState("N/A");
    const [displayTeamName, setDisplayTeamName] = useState("N/A");

    const[enabledAddToTeam, setEnabledAddToTeam] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const error = {
        team: "ERROR: Team Not Found",
        user: "ERROR: Invalid Student, Student Name Does Not Exist", 
        user2: "ERROR: Student Is Already In A Team",
        user3: "ERROR:Student Is Already In This Team",
        addsuccess: "Student Successfully Added To Team",
        removeteam: "ERROR: Team Not Found",
        removeuser: "ERROR: Invalid Student, Student Name Does Not Exist", 
        removeuser2: "ERROR: Student Is Not Registered To Any Team", 
        removeuser3: "ERROR: Student Is Not Registered To This Team",     
        removesuccess: "Student Successfully Removed From Team"
    }

    
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
            console.log(jsonData);
            setStudents(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async (teams) => {
        for(let i = 0; i < teams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(teams[i]), requestOptions);
                const jsonData = await response.json();
                console.log("jsonData in getTeams", jsonData);
                setTeams(jsonData);
            } catch (error) {
                console.log("error in getTeams: ", error);
            }
        }
    }

    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id === teamID);
            teamName = team.name;
        })
        return teamName;
    }


    //function fillInEditingBoxes(arrayNumber){
    const fillInEditingBoxes = async(changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo, arrayNumber) => {
        if(students != [] && rowNumber != -1 && rowNumber != undefined ){
           // console.log("students[arrayNumber]._id: ", rowNumber, students[rowNumber])
            if(studID == '') { 
                //console.log("studID: ", studID)
                studID = students[arrayNumber]._id;
                //console.log("studID: ", studID)
            }
            if(students[arrayNumber].displayname == null) studentToDisplay.push("N/A")
            else studentToDisplay[0] = (students[arrayNumber].displayname)
            if(students[arrayNumber].email == null) studentToDisplay.push("N/A")
            else studentToDisplay[1] = (students[arrayNumber].email)
            if(students[arrayNumber].gradelevel == null) studentToDisplay.push("N/A")
            else studentToDisplay[2] = (students[arrayNumber].gradelevel)
            if(students[arrayNumber].team == null) studentToDisplay.push("N/A")
            else studentToDisplay[3] = (students[arrayNumber].team)

            if(changeDispNameTo != '') studentToDisplay[0] = changeDispNameTo;
            if(changeEmailTo != '') studentToDisplay[1] = changeEmailTo;
            if(ChangeGrafLevelTo != '') studentToDisplay[2] = ChangeGrafLevelTo;
            if(ChangeTeamNameTo != '') studentToDisplay[3] = ChangeTeamNameTo;


            console.log("studentToDisplay: ", studentToDisplay)

            setDisplayDsipalyName(studentToDisplay[0] );
            setDisplayEmail(studentToDisplay[1] )
            setDisplayGradLevel(studentToDisplay[2] )
            setDisplayTeamName(studentToDisplay[3] )
        }
    }

    function saver(changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo, arrayNumber){
        rowNumber = arrayNumber;
        console.log("changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo, arrayNumber", changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo, arrayNumber)
        if(studentToDisplay[0] == "N/A" || studentToDisplay[0] == '') {
            console.log("Called fillInEditingBoxes")
            fillInEditingBoxes(changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo, rowNumber);
        }
        updateStudentAccount(changeDispNameTo, changeEmailTo, ChangeGrafLevelTo, ChangeTeamNameTo)
    }
    const updateStudentAccount = ( newDispName, newEmail, newGradLevel, newTeamName) => {
        console.log("studentToDisplay in updateStudent: ", studentToDisplay)
        if(studentToDisplay[0] != '' && studentToDisplay[0] != "N/A" && studID != ''){
            if(newDispName == '' || newDispName == undefined) newDispName = studentToDisplay[0];
            if(newEmail == '' || newEmail == undefined) newEmail = studentToDisplay[1];
            if(newGradLevel == '' || newGradLevel == undefined) newGradLevel = studentToDisplay[2];
            if(newTeamName == '' || newTeamName == undefined) newTeamName = studentToDisplay[3];
            console.log("studID----------------------------------------------------------------------", studID)
            var tmpData = {StudentID: studID, studentDispName: newDispName, studentEmail: newEmail, studentGradLevel: newGradLevel, studentTeamName: newTeamName}
            console.log("tmpData======================================: ", tmpData)
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(tmpData)
            };
            fetch('/api/team/update_student_info', requestOptions).then(
                fillInEditingBoxes(newDispName, newEmail, newGradLevel, newTeamName, rowNumber)
                //getStudents(coachUserID),
                
            )
        }
    }

    const addStudentButton = () => {
        setEnabledAddToTeam(true);
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
        console.log("students array: ", students);
    }, [students])

    useEffect(() => {
        if(coach) {
            console.log("coach: ", coach);
            console.log("coach's teams before getTeams", coach.teams);
            getTeams(coach.teams);
        }
    }, [coach])

    useEffect(() => {
        console.log("teams has been updated", teams);
    }, [teams])

    if(props.enabled == true) {
        return (
            <div>
                <div className="form-group">
                    {/*Div where selected student info + add student button, etc. goes*/}
                        {/*<button onClick={fillInEditingBoxes(1)}></button>*/}
                        <p >{displayDsipalyName}</p>{/*contentEditable="true" */}
                        <input value={inputDispName} placeholder="Change Display Name To"  onChange={ev => setInputDispName(ev.target.value)}/>
                        
                        <p >{displayEmail}</p> {/*contentEditable="true" */}
                        <input value={inputEmail} placeholder="Change Email  To"  onChange={ev => setInputEmail(ev.target.value)}/>
                        <p >{displayGradLevel}</p>{/*contentEditable="true" */}
                        <input value={inputGradLevel} placeholder="Change grad level  To"  onChange={ev => setInputGradLevel(ev.target.value)}/>
                        {/*<td>{getTeamName(student.team)}</td>
                        <input value={inputDispName} placeholder="Change Display Name To"  onChange={ev => setInputDispName(ev.target.value)}/>*/}
                        <p >{displayTeamName}</p>{/*contentEditable="true" */}
                        <input value={inputTeamName} placeholder="Change Team Name To"  onChange={ev => setInputTeamName(ev.target.value)}/>

                        <button onClick={()=>{saver(inputDispName,inputEmail,inputGradLevel, inputTeamName, 1);}}>Save Edits</button> 
                </div>

                {/*Div for add and delete button code*/}
                <div>
                    <button className="casa-button" onClick={addStudentButton}>Add Student</button>
                    <AddStudent enabled={enabledAddToTeam}/>
                </div>

                {/*Div where student table goes*/}
                <div>
                    <table >
                            <thead>
                                <tr >
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Grade Level</th>
                                    <th>Team Name</th>
                                    <th>Team ID</th>
                                </tr>
                            </thead>

                            <tbody >
                                {students && students.map(student => (
                                <tr>
                                    <td >{student.displayname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gradelevel != undefined ? student.gradelevel : "N/A"}</td>
                                    <td>{student.team != -1 ? getTeamName(student.team) : "N/A"}</td>
                                    <td>{student.team != -1 ? student.team : "N/A"}</td>
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