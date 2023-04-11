import React, { useState, useEffect } from "react";
import './StudentStats.css'

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function StudentStats(props) {
    const [coachID, setcoachID] = useState()
    const [coach, setCoach] = useState()
    const [studentIDs, setStudentIDs] = useState([])
    const [students, setStudents] = useState([])

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
            <div>
                <h3>Student Stats Component</h3>

                <div className='flex justify-between my-8'>
                    </div>
                        <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Windows</th>
                                        <th>Win_Server</th>
                                        <th>Linux</th>
                                        <th>Networking</th>
                                        <th>Security_Concepts</th>
                                    </tr>
                                </thead>

                                <tbody>
                                        {students && students.map(item => (
                                            <tr>
                                                <td>{item.displayname}</td>
                                                <td>{takenQuizScoreSums("windows", item.takenQuizzes)}</td>
                                                <td>{takenQuizScoreSums("win_server", item.takenQuizzes)}</td>
                                                <td>{takenQuizScoreSums("linux", item.takenQuizzes)}</td>
                                                <td>{takenQuizScoreSums("networking", item.takenQuizzes)}</td>
                                                <td>{takenQuizScoreSums("security_concepts", item.takenQuizzes)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                        </table>
                </div>
        );
    }
}

export default StudentStats;