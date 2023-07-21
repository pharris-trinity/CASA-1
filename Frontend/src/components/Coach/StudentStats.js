import React, { useState, useEffect } from "react";
import './StudentStats.css';
import '../General/casa-table.css'
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import IndividualStudentStats from "./IndividualStudentStats.js"

/* 
    This component shows brief information about the progress of all the students that a coach is assigned to.
*/

function StudentStats(props) {

    //useEffects to store appropriate infromation
    const [coachID, setcoachID] = useState()
    const [coach, setCoach] = useState()
    const [studentIDs, setStudentIDs] = useState([])
    const [students, setStudents] = useState([])

    //useEffect to determine whether this component should be rendered or render the IndividualStudentStats.js component
    const [enabledIndividual, setEnabledIndividual] = useState(false)
    const [individualStudent, setIndividualStudent] = useState([])

    //runs the login checker to ensure that the user is allowed to access the component
    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

    //retrieves a coach's information from the data base
    const getCoach = async(internalCoachID) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'id': internalCoachID})
            }
            const response = await fetch('/api/coachSearch', requestOptions)
            const jsonData = await response.json()

            setCoach(jsonData)
        } catch (error) {
            console.log()
        }
    }

    // const getStudentsInTeams = async(teams) => {
    //     for(let i = 0; i < teams.length; i++){
    //         try {
    //             const requestOptions = {
    //                 method: 'GET',
    //                 headers: {'Content-Type': 'application/json'}
    //             };
    //             const response = await fetch('/api/teamsearch/' + JSON.stringify(teams[i]), requestOptions)
    //             const jsonData = await response.json()

    //             const tempArray = jsonData[0].members.map(item => item)
    //             setStudentIDs([...studentIDs, ...tempArray])
                
                
    //         } catch (error) {
                
    //         }
    //     }
    // }

    //retrieves the object Ids of students that the coach is assigned to
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
        } catch (error) {
            console.log()
        }
    }

    //retrieves the information of the students from the database
    const getStudentsFromServer = async(ids) => {
        var tempArray = []
        for (let i = 0; i < ids.length; i++) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'id': ids[i]})
                }
                const response = await fetch('/api/studentTakenQuizzes', requestOptions)
                const jsonData = await response.json()
                
                tempArray = [...tempArray, jsonData]
            } catch (error) {
                console.log(error)
            }
            
        }

        setStudents([...students, ...tempArray])
    }

    //computes the overview score of a given quiz category.
    const takenQuizScoreSums = (category, takenQuizzes) => {
        if(!takenQuizzes.length == 0){
            var count = 0
            var totalCorrectAnswers = 0
            var totalQuestions = 0
            for(let i = 0; i < takenQuizzes.length; i++){
                if(category == takenQuizzes[i].category){
                    totalCorrectAnswers += takenQuizzes[i].correctQuestions.length
                    totalQuestions += takenQuizzes[i].questions.length
                }
            }
            if(totalQuestions == 0){
                return "No Quizzes Taken"
            }
            else{
                return (totalCorrectAnswers + "/" + totalQuestions)
            }
            
        }

        return "No Quizzes Taken"
    }

    //updates useStates to render IndividualStudentStats.js component instead of the current one
    const selectIndividual = (student) => {
        setEnabledIndividual(true);
        setIndividualStudent(student)
    }

    //retrieves the coach's ID from local storage when the component is loaded
    useEffect(() => {
        setcoachID(localStorage.getItem("_id"))
    }, []);

    //retrieves the coach's information from the data base when coachID is updated
    useEffect(() => {
        if(coachID) {
            getCoach(coachID)
        }
    }, [coachID]);

    //retrieves the Ids of the students that are assigned to the coach when coach is updated
    useEffect(() => {
        if(coach){
            //getStudentsInTeams(coach.teams)
            getStudents(coachID);
        }
    }, [coach]);

    //retrives the Students' information when the informations of the student is updated
    useEffect(() => {
        if(studentIDs){
            getStudentsFromServer(studentIDs)
        }
    }, [studentIDs])
    
    //updates the useState to render the IndividualStudentStats component when switching to a different table
    useEffect(() => {
        if(!props.enabled){
            setEnabledIndividual(false)
        }
    }, [props.enabled])

    //parses the students' information and renders the appropriate information in a tabular format
    if(props.enabled == true) {
        return (
            enabledIndividual ? 
            (individualStudent && <IndividualStudentStats student={individualStudent} setEnable={(e) => setEnabledIndividual(e)}/>)
            :
            <div className="stats-container">
                <h3>Student Stats (Based on Quiz Categories)</h3>
                <table>
                        <thead>
                            <tr>
                                <th className="th-manage-teams">Name</th>
                                <th className="th-manage-teams">Windows</th>
                                <th className="th-manage-teams">Win_Server</th>
                                <th className="th-manage-teams">Linux</th>
                                <th className="th-manage-teams">Networking</th>
                                <th className="th-manage-teams">Security_Concepts</th>
                            </tr>
                        </thead>

                        <tbody>
                        {students && students.map((item, index) => (
                            <tr key={item._id} onClick={() => selectIndividual(item)}>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.displayname}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("windows", item.takenQuizzes)}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("win_server", item.takenQuizzes)}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("linux", item.takenQuizzes)}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("networking", item.takenQuizzes)}</td>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("security_concepts", item.takenQuizzes)}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        );
    }
}

export default StudentStats;