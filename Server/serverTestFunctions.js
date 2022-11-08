const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "http://localhost:3001/api/"
const mongoose = require("mongoose")

var testMentor = {
    username: "test mentor 2",
    email: "test_mentor2@email.com",
    password: "test_mentor_password",
    madeQuizzes: [],
    teams: [],
    speciality: "Windows Systems",
    validationCode: "Y#^fNWG!&W5K"
}

var testCoach = {
    username: "test coach",
    email: "test_coach@email.com",
    password: "test_coach_password",
    madeQuizzes: [],
    school: "Test School",
    teams: [],
    validationCode: "C#BW@(PFMGT)"
}

var testStudent = {
    username: "test student",
    email: "test_student@email.com",
    password: "test_student_password"
}

var testTeam = {
    national_id: 0,
    name: "Test School",
    coach: mongoose.Types.ObjectId("636687111b78a1a27eaf49d5")
}

async function simpleGET() {

    const response = await fetch(url + 'dev/simpleGET');
    console.log(response.status)
    console.log(response.statusText)
    
}

async function coach_validation() {
    const response = await fetch(url + 'admin/generate_coach_validation_code');
    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function mentor_validation() {
    const response = await fetch(url + 'admin/generate_mentor_validation_code');
    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function mentor_creation(){

    const response = await fetch(url + 'mentor/create_mentor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(testMentor)
    });

    console.log(response.status)
    response.text().then(text => console.log(text));
}

async function coach_creation() {

    const response = await fetch(url + 'coach/create_coach', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(testCoach)
    });

    console.log(response.status)
    response.text().then(text => console.log(text));
}

async function create_team(){
    const response = await fetch(url + 'admin/register_team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testTeam)
    });

    console.log(response.status)
    response.text().then(text => console.log(text));
}

async function create_student() {
    const response = await fetch(url + 'student/create_student', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testStudent)
    });

    console.log(response.status)
    response.text().then(text=>console.log(text));
}

//simpleGET()
//coach_creation()
create_student()
//mentor_creation()
//create_team()
//test_update_model()