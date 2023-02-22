import React, { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import Question from "./question.js";
import "./quiz.css"

function Quiz(props) {
    const[questionArray, setQuestionArray] = useState([]);
    const[questions,setQuestions] = useState([]);
    const[i, setI] = useState(0);


    const pullOutQuestions = (dataOfQuiz) => {
        console.log("quiz data access check: ", dataOfQuiz)
        const tempArray = (dataOfQuiz.map(item => 
            item.questions.map(secondItem => <Question questionData = {secondItem}/>)
        )[0]);

        const tempArray2 = dataOfQuiz.map(item => item.questions);
        const tempArray3 = tempArray2.map(item => item);
        console.log('Temp array 3 print', tempArray3);
        console.log("Temp Array is printing!", tempArray);
        setQuestionArray(tempArray);
    }

    useEffect(() => {
        pullOutQuestions(props.quizData);
        setI(0);
    }, [props.quizData]);

    console.log("questionArray", questionArray);

    const tempArray = [];

    useEffect(() => {
        tempArray = (props.quizData.map(item => 
            item.questions.map(secondItem => <Question questionData = {secondItem}/>)
        )[i]);
    }, [i]);

    console.log("Questions after use effect", questions);

    return (
        <div>
            {/*props.quizData.map(item => 
                <div>
                    {item.questions.map(item2 => 
                        <Question questionData = {item2}/>)[i]}
                    </div>)[0]*/}
            {tempArray}
            

            <Navigation/>
        </div>
    );
}

export default Quiz;