import React, {useEffect, useState} from  "react"
import "./stylesStud.css"
import StudNavbar from "./StudNavbar"
import QuizzesList from "./StudTakeAssessContent";

export default function StudentTakeAssessPage() {
    
    //local storage has current user information; parse it right by adding curly braces and get your json object
    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser); //get fields by using fixeduser.username, etc. 
    const teamnumstr = fixeduser.team.toString();

    /*const [studTeamNum, setStudTeamNum] = useState("");
    setStudTeamNum(teamnumstr);*/
    
    const [coachOID, setCoachOID] = useState("");
    const coachquizzes=[];
    const teamsearchurl = '/api/teamsearch/';
    const finishedteamurl = teamsearchurl + teamnumstr;
    const coachsearchurl= '/api/coachsearch/';
    const quizsearchurl= '/api/quizsearch/';
    const [qlist, setQuizlist] = useState([]);
    
    
    
    useEffect(function getcoachid() {
            if(teamnumstr != null){
                var fieldData = ['national_id'] //payload
                const requestOptions ={
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(fieldData)
                };
                fetch(finishedteamurl, requestOptions).then(res => res.json()).then(
                data => {
                //data.map(item=> setCoachOID(item.coach))
                data.map(item=> setCoachOID(item.coach))
                console.log("data is:" + data)
                //console.log("item is " + item.coach))
                //entire json line info about the team
            })
        }
    }, []);
    //console.log("coachID " + coachOID);

    useEffect(function getqids() {
        if(coachOID!="") {
            var fieldData1 = ['questions','authorID'] //payload
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(fieldData1)
            };
            const newurl1 = quizsearchurl.concat(coachOID); 
            //console.log("the new url is " + newurl1);
            fetch(newurl1, requestOptions).then(res => res.json()).then(
                data => {
                    //console.log(data);
                    var quizlist=[];
                    data.map(item=> quizlist.push(item._id)) //all quiz ids!!
                    setQuizlist(quizlist);
                    //console.log("check qidlist state " + qlist);
                    if(data == null) {console.log(Error)}
                })
        }
    });
    //qlist is an array of quiz object ids by coach
    //console.log(qlist[0]);
    //console.log("check the" + qlist);
    
    //{<QuizzesList data={(currquizzes)}/>}
    return(
    <>
    <StudNavbar/>
    {<QuizzesList data={(qlist)}/>}
    
    </>
    );
}