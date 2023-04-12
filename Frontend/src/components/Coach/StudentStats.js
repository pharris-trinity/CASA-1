import React, { useState, useEffect } from "react";
import './StudentStats.css';
import '../General/casa-table.css'
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function StudentStats(props) {
    const [coachID, setcoachID] = useState()
    const [coach, setCoach] = useState()
    const [studentIDs, setStudentIDs] = useState([])
    const [students, setStudents] = useState([])

    let navigate = useNavigate();
    window.onload = (event) => {
        var toNavigateTo = loginChecker("Coach")
        if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
      };

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
            console.log(error)
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
            console.log(error)
        }
    }

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

    useEffect(() => {
        setcoachID(localStorage.getItem("_id"))
    }, []);

    useEffect(() => {
        if(coachID) {
            getCoach(coachID)
        }
    }, [coachID]);

    useEffect(() => {
        if(coach){
            //getStudentsInTeams(coach.teams)
            getStudents(coachID);
        }
    }, [coach]);

    useEffect(() => {
        if(studentIDs){
            getStudentsFromServer(studentIDs)
        }
    }, [studentIDs])

    if(props.enabled == true) {
        return (
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
                            <tr>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.displayname}</td>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("windows", item.takenQuizzes)}</td>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("win_server", item.takenQuizzes)}</td>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("linux", item.takenQuizzes)}</td>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("networking", item.takenQuizzes)}</td>
                                <td key={index} className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {takenQuizScoreSums("security_concepts", item.takenQuizzes)}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        );
    }
}

export default StudentStats;