import React, { useState, useEffect, useRef } from 'react';
import QuestionForm from './QuestionForm';
import QuizInfo from './QuizInfo';

function CreateQuiz(props){

    const [teamCoachID, setTeamCoachID] = useState();
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionForms, setQuestionForms] = useState([]);
    const [quizName, setQuizName] = useState();
    const [category, setCategory] = useState();
    const [toDelete, setToDelete] = useState();
    const refs = useRef([]);
    const quizInfoRef = useRef();


    const createQuiz = async () => {
        console.log("createQuiz: quizName", quizName);
        console.log("createQuiz: category", category);
        const testQuestion = {
            description: "description",
            answers: ["0","1","2","3"],
            correctAnswer: 0,
            value : 1
        }
        var tmpData = {questions: questions, author_id: teamCoachID, name: quizName, cat: category }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/assessment/add_assessment', requestOptions).then(

        )
    }

    const addQuestions = (quests) => {
        var tempArray = [];
        for(var i = 0; i < quests.current.length; i++) {
            tempArray.push(quests.current[i]);
        }
        setQuestions(tempArray);
    }

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

    
    const removeQuestion = (num) => {
        var filterArray = [];
        console.log("empty?? filterArray + length", filterArray, filterArray.length)
        console.log("removeQuestion: num", num);
        console.log("removeQuestion: pre-filter questionForms", questionForms);
        for(var i = 0; i < questionForms.length; i++) {
            console.log("logging i: ", i, "logging num: ", num);
            if(i != num) {
                filterArray.push(questionForms[i]);
                console.log("filterArray after something pushed: ", filterArray);
            }
        }
        // var filterArray = questionForms.filter((item) => {
        //     console.log("item: ", item, " and number in lambda function", num);
        //     return item != num ? item : null})
        console.log("removeQuestion: post-filter filterArray", filterArray);
        // for(var i = 0; i < filterArray.length; i++) {
        //     filterArray[i] = i;
        // }
        // console.log("removeQuestion: post-sort questionForms", filterArray);
        setQuestionForms(filterArray);
        setToDelete();
    }

    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 

    useEffect(() => {
        if(questions){
            console.log(questions)
        }
    }, [questions])

    useEffect(() => {
        if(questionIndex){
            //console.log("QuestinIndex in use effect: ", questionIndex)
        }
    }, [questionIndex])

    useEffect(() => {
        if(questionForms) {
            console.log("Question Forms: ", questionForms)
        }
    }, [questionForms])

    useEffect(() => {
        if(category) {
            //createQuiz();
        }
    }, [category]) 

    useEffect(() => {
        console.log("toDelete in useEffect", toDelete);
        if(toDelete || toDelete == 0) {
            removeQuestion(toDelete);
        }
    }, [toDelete]) 

    if(props.enabled){
        return(
            <div>
                <h3>Create Quiz</h3>

                <QuizInfo submitRef={quizInfoRef} setInfo={(e) => quizInfoRef.current = e}/>
                {console.log("quizInfoRef.current: ", quizInfoRef.current)}

                {questionForms && questionForms.map((index) =>
                    <div>
                        {console.log("index in the QuestionForm map", index)}
                        {/* <QuestionForm num={index} submitRef={ref => {refs.current[index] = ref}} setQuestion={(e) => refs.current[index] = e} deleteQuestion={(e) => removeQuestion(e)}/> */}
                        <QuestionForm num={index} submitRef={ref => {refs.current[index] = ref}} setQuestion={(e) => refs.current[index] = e} deleteQuestion={(e) => setToDelete(e)}/>
                        {console.log("refs in the map", refs)}
                    </div>
                )}
                
                <button onClick={createEmptyQuestion}>Add Question</button>

                <button onClick={() => {

                refs.current.map(ref => {ref.click()})
                addQuestions(refs);

                quizInfoRef.current.click();
                console.log("quizInfoRef.current[0]", quizInfoRef.current[0]);
                console.log("quizInfoRef.current[1]", quizInfoRef.current[1]);
                setQuizName(quizInfoRef.current[0]);
                setCategory(quizInfoRef.current[1]);

                }}>Create Quiz</button>
            </div> 
            
        )
    }
}

export default CreateQuiz;