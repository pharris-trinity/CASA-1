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

var testQuiz = {
    questions: [{
        answers: [
          "general",
          "view",
          "search",
          "security"
        ],
        description: "Which tab under File Explorer Options will allow you to define a system-wide setting which will always display hidden files?",
        correctAnswer: 1,
        value: 5
      },{
        answers: [
          "hashcat",
          "john the ripper",
          "hydra",
          "mimikatz"
        ],
        description: "What is the name of the program most often used to extract credentials from the LSASS.EXE process?",
        correctAnswer: 3,
        value: 10
      },{
        answers: [
          "SAM database/file",
          "passwd database/file",
          "shadow database/file",
          "ntdis.dis"
        ],
        description: "What is the name of the database that contains a the master list of usernames and password hashes on a Windows system?",
        correctAnswer: 0,
        value: 5
      },{
        answers: [
          "Control Panel --> User Accounts",
          "Control Panel --> System and Security",
          "Local Security Policy",
          "Computer Management"
        ],
        description: "Where can you enable the setting that will force users to use complex passwords?",
        correctAnswer: 2,
        value: 5
      },{
        answers: [
          "Delete the .exe from c:/Program Files",
          "Utilize 'Add or Remove Programs'",
          "Utilize 'Programs and Features'",
          "Disable Internet Explorer via a GPO"
        ],
        description: "What is the best method for removing Internet Explorer from a Windows machine?",
        correctAnswer: 2,
        value: 5
      },{
        answers: [
          "convert",
          "chkdsk",
          "format",
          "diskpart"
        ],
        description: "What cmd sequence allows you to upgrade a FAT32 filesystem?",
        correctAnswer: 0,
        value: 5
      },{
        answers: [
          "run a powershell command",
          "utilize the remote desktop client",
          "execute a terminal command",
          "update a user password"
        ],
        description: "You see that a user has been using mstsc.exe. What was the user attempting to do?",
        correctAnswer: 1,
        value: 5
      }],
    author_id: "6373bf8650c5263f57ff20ab"
}

var testCoach = {
    username: "test coach",
    displayname: "Test Coach",
    email: "test_coach@email.com",
    password: "test_coach_password",
    madeQuizzes: [],
    school: "Test School",
    teams: [],
    validationCode: "A^*zIh#^ZuOI"
}

var admin = {
    username: "admin",
    displayname: "admin",
    email: "admin@admin.com",
    password: "admin"
}

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
    coach: mongoose.Types.ObjectId("6388cb2de5b7cfa8787bf80f")
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
    validationCode: "nA$rEm(&*XoY"
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

async function test_add_student_to_team() {
    const response = await fetch(url + 'team/add_student_to_team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            team_id: 0,
            student_id: "6388debea135c8a0c52a3458"
        })
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function test_student_remove_from_team() {
    const response = await fetch(url + 'team/remove_student_from_team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            team_id:0,
            student_id:"6388debea135c8a0c52a3458"
        })
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function add_assessment(){
    const response = await fetch(url + 'assessment/add_assessment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(testQuiz)
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function find_assessment(){
    const response = await fetch(url + 'assessment/find_assessment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({id: "6389022d45594b220566e893"})
    })

    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function find_assessments_by_author(){
    const response = await fetch(url + 'assessment/find_assessments_by_author', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({author_id: "6373bf8650c5263f57ff20ab"})
    })
    console.log(response.status)
    response.text().then(text => console.log(text))
}

async function create_admin(){
    const response = await fetch(url + 'admin/create_admin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(admin)
    })
    console.log(response.status)
    response.text().then(text => console.log(text))
}


//simpleGET()
//coach_validation()
//coach_creation()
//mentor_validation()
//create_student()
//mentor_creation()
//create_team()
//fetch_student()
//test_login()
//test_update_model()
//test_add_student_to_team()
//test_student_remove_from_team()
//add_assessment()
//find_assessment()
//find_assessments_by_author()
create_admin()