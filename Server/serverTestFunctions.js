const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "http://localhost:3001/api/"
const mongoose = require("mongoose")

// var testMentor = {
//     username: "test mentor",
//     displayname: "Test Mentor",
//     email: "test_mentor@email.com",
//     password: "test_mentor_password",
//     remote: false,
//     zipcode: 78212,
//     madeQuizzes: [],
//     teams: [],
//     speciality: "Windows Systems",
//     validationCode: "b#NIO(E*(7Pq"
// }

// var testCoach = {
//     username: "test coach",
//     displayname: "Test Coach",
//     email: "test_coach@email.com",
//     password: "test_coach_password",
//     madeQuizzes: [],
//     school: "Test School",
//     teams: [],
//     validationCode: "(H9qPA&T$k#R"
// }

var testStudent = {
    username: "test student",
    displayname: "Test Student",
    email: "test_student@email.com",
    password: "test_student_password"
}

var testTeam = {
    national_id: 0,
    name: "Test School",
    school: "Trinity University",
    district: "Private University",
    rotc: false,
    coach: mongoose.Types.ObjectId("6373bf8650c5263f57ff20ab")
}

var testMentor = {
     username: "test mentor",
     displayname: "Test Mentor",
     email: "test_mentor@email.com",
     password: "test_mentor_password",
     remote: false,
     zipcode: 78212,
     madeQuizzes: [],
     teams: [],
     speciality: "Windows Systems",
     validationCode: "b#NIO(E*(7Pq"
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

async function fetch_student() {
    const response = await fetch(url + 'user/fetch_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:"6373bea2d933d6a203138d12"})
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function test_login() {
    const response = await fetch(url + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({username: "test student", password: "test_student_password"})
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

//simpleGET()
//coach_validation()
//coach_creation()
mentor_validation()
//create_student()
//mentor_creation()
//create_team()
//fetch_student()
test_login()
//test_update_model()