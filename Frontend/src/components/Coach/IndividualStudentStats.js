import React, { useState, useEffect } from "react";
import './IndividualStudentStats.css'
import '../General/casa-table.css'


function IndividualStudentStats (props) {


    useEffect(() => {
        console.log(props)
    }, [])

    return(
        props.student.takenQuizzes.length == 0 ? 
        <div className="stats-container">
            <h3>No Quizzes Available</h3>
            <button className="casa-button"  onClick={() => props.setEnable(false)}>back</button>
        </div>
       
         :
        <div className="stats-container">
            <h3>{props.student.displayname && props.student.displayname}</h3>
            <table>
                <thead>
                    <tr>
                        <th className="th-manage-teams">Quiz Name</th>
                        <th className="th-manage-teams">Quiz Category</th>
                        <th className="th-manage-teams">Correct Answers / # of Questions</th>
                        <th className="th-manage-teams">Score</th>
                        <th className="th-manage-teams">Date and Time Finished</th>
                    </tr>
                </thead>
                <tbody>
                    {props.student.takenQuizzes && props.student.takenQuizzes.map((item, index) => (
                        <tr key={item._id}>
                            <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{item.name}</td>
                            <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{item.category}</td>
                            <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{item.correctQuestions.length + "/" + item.questions.length}</td>
                            <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{item.score}</td>
                            <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}>{item.timeFinished.split('T')[0] + " " + item.timeFinished.split('T')[1].substring(0,5)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="casa-button" onClick={() => props.setEnable(false)}>back</button>
        </div>
    );
}

export default IndividualStudentStats;