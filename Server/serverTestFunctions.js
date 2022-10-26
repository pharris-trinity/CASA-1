const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = "http://localhost:3001/api/"


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

//simpleGET()
coach_validation()