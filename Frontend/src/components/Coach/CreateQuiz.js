import React, { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';
import QuizInfo from './QuizInfo';
import './createQuiz.css'


/*
The CreateQuiz component is the main component for coaches to be able to create quizzes.
It contains functionality for compilation and submission of user-input info that becomes a quiz
*/

function CreateQuiz(props){


    const [teamCoachID, setTeamCoachID] = useState();
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionForms, setQuestionForms] = useState([]);
    const [quizName, setQuizName] = useState();
    const [category, setCategory] = useState();
    //const [toDelete, setToDelete] = useState();
    const refs = useRef([]);
    const quizInfoRef = useRef();

    /* Final function call of the component that compiles all info and creates the quiz */
    const createQuiz = async () => {
        const testQuestion = {
            description: "description",
            answers: ["1","2","3","4"],
            correctAnswer: 0,
            value : 1
        }
        var tmpData = {questions: questions, author_id: teamCoachID, name: quizName, cat: category }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };

        const response = await fetch('/api/assessment/add_assessment', requestOptions)
        const jsonData = await response.json()
        alert("Quiz has been created!");

        //interacts with CoachHome in order to reset the CreateQuiz component
        props.reset();
    }

    //Given an array of Question objects, puts them into the state object "questions"
    const addQuestions = (quests) => {
        var tempArray = [];
        for(var i = 0; i < quests.current.length; i++) {
            tempArray.push(quests.current[i]);
        }
        setQuestions(tempArray);
    }

    //creates a blank QuestionForm component
    const createEmptyQuestion = () => {
        var tempArray = [];
        //var tempRefs = [];
        if(questionForms.length == 0) {
            tempArray.push(0);
            setQuestionForms(tempArray);
            setQuestionIndex(1);
        } else {
            for(var i = 0; i < questionForms.length; i++) {
                tempArray.push(questionForms[i]);
            }
            tempArray.push(questionIndex);
            setQuestionIndex(questionIndex + 1);
            setQuestionForms(tempArray);
        }
    }

    /* Failed logic for the removeQuestion function. I spent 5 hours trying to get this to work but couldn't.
    Essentially, you need to find a way to remove the correct index from questionForms while not causing 
    all the QuestionForm components to re-render and lose their data.
    Best of luck whoever ends up with this next - Josh Rea (5/8/23, at 4am)
    */
    const removeQuestion = (num) => {
        // var filterArray = [];
        //console.log("empty?? filterArray + length", filterArray, filterArray.length)
        //console.log("removeQuestion: num", num);
        //console.log("removeQuestion: pre-filter questionForms", questionForms);
        // for(var i = 0; i < questionForms.length; i++) {
        //     console.log("logging i: ", i, "logging num: ", num);
        //     if(i != num) {
        //         filterArray.push(questionForms[i]);
        //         //console.log("filterArray after something pushed: ", filterArray);
        //     }
        // }
        var filterArray = questionForms.filter((item) => {
            console.log("item: ", item, " and number in lambda function", num);
            return item != num ? item : null})
        console.log("removeQuestion: post-filter filterArray", filterArray);
        // for(var i = 0; i < filterArray.length; i++) {
        //     filterArray[i] = i;
        // }
        // console.log("removeQuestion: post-sort questionForms", filterArray);
        setQuestionForms(filterArray);
        //setToDelete();
    }

    //Gets the coachID from local storage
    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 

    //calls createQuiz after category has been updated in state
    useEffect(() => {
        if(category) {
            createQuiz();
        }
    }, [category]) 

    {/* Below is a collection of useEffects for testing purposes + removeQuestion functionality */}

    // useEffect(() => {
    //     if(questions){
    //         console.log(questions)
    //     }
    // }, [questions])

    // useEffect(() => {
    //     if(questionIndex){
    //         console.log("QuestionIndex in use effect: ", questionIndex)
    //     }
    // }, [questionIndex])

    // useEffect(() => {
    //     if(questionForms) {
    //         console.log("Question Forms: ", questionForms)
    //     }
    // }, [questionForms])

    // useEffect(() => {
    //     console.log("toDelete in useEffect", toDelete);
    //     if(toDelete || toDelete == 0) {
    //         removeQuestion(toDelete);
    //     }
    // }, [toDelete]) 

    if(props.enabled){
        return(
            <div className="main-box">
                <h1 className="page-title">Create Quiz</h1>

                {/* Renders the QuizInfo component */}
                <QuizInfo submitRef={quizInfoRef} setInfo={(e) => quizInfoRef.current = e}/>

                {/* Dynamically renders QuestionForm components based on the indexes in questionForms
                    I will admit, this is semi janky logic that may need to be reworked for removeQuestion */}
                {questionForms && questionForms.map((index) =>
                    <div>
                        <QuestionForm num={index} submitRef={ref => {refs.current[index] = ref}} setQuestion={(e) => refs.current[index] = e}/>
                    </div>
                )}
                
                <div className="button-spacer">
                    <button className="casa-button button-left" onClick={createEmptyQuestion}>Add Question</button>

                    {/* Submit button for all of the QuestionForms and QuizInfo component */}
                    <button className="casa-button button-right" onClick={() => {

                    refs.current.map(ref => {ref.click()})
                    addQuestions(refs);

                    quizInfoRef.current.click();
                    setQuizName(quizInfoRef.current[0]);
                    setCategory(quizInfoRef.current[1]);

                    }}>Create Quiz</button>
                </div>
            </div> 
            
        )
    }
}

export default CreateQuiz;