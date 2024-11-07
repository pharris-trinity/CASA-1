import React, { useEffect, useState } from 'react';
import { loginChecker } from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';
import './TeamInfo.css'; // Import coachHome.css for styling


function TeamInfo() {
  const [team, setTeam] = useState(null);
  const [currStud, setStud] = useState([]);
  const navigate = useNavigate();
  const studentusername = localStorage.username;
  const studentsearchurl = '/api/studentsearch/';
  const finishedurl = studentsearchurl + studentusername;
  const coachsearchurl= '/api/coachsearch';
  const [ CoachID, setCoachID] = useState();
  const [ finishedurlCoach, setFinishedUrlCoach] = useState();

    const [currCoach, setCoach] = useState([])

  var coachName = "";

  useEffect(() => {
    const toNavigateTo = loginChecker("Student");
    if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
  }, []);

  useEffect(() => {
    // Simulated data for a single team
    const dummyTeam = {
      id: 1,
      name: "Team AAAAAAAA",
      coachName: "John Doe",
      mentor: "Jane Smith",
      students: [
        { id: 1, name: "Example Student 1", alternate: "Alternate Student 1" },
        { id: 2, name: "Example Student 2", alternate: "n/a" },
        { id: 3, name: "Example Student 3", alternate: "n/a" },
        { id: 4, name: "Example Student 4", alternate: "n/a" },
        { id: 5, name: "Example Student 5", alternate: "n/a" }
      ]
    };
    setTeam(dummyTeam);
  }, []);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/studentInfoSearch');
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        setStud(data);
        console.log("Current Student display name")
        console.log(data.displayname)
        setCoachID(currStud.coachID)
        setFinishedUrlCoach(coachsearchurl+CoachID);
        console.log(data.coachID)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [finishedurl]);
  */

  const fetchCoachAccount = (incText) => {
    const postData = { displayID: incText }
    const requestOptions = {
        method: 'Post',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(postData)
    };
    fetch('/api/team/get_coach_by_id', requestOptions).then(
        res => res.text()).then(text => {
            try {
              const data2 = JSON.parse(text)[0].displayname;
              console.log('Fetched Coach Data:', data2);
              coachName = data2;
              console.log(coachName)
            } catch (error) {
                console.log("Unable to fetch -", error)
            }
        }
        );
    }; 

  useEffect(() => {
    var fieldData = ['username', 'gradelevel', 'team'] //payload
    const requestOptions ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(fieldData)
    };
    fetch(finishedurl, requestOptions).then(res => res.json()).then(
        data => {
          console.log(`/api/coach/displayName/${data.collection[0].coachID}`)
          // const response = fetch(`/api/team/get_coach_by_id/${data.collection[0].coachID}`);       

          const response = fetchCoachAccount(data.collection[0].coachID);
            console.log(data.collection[0].coachID)
            console.log(response)
            console.log(fieldData)
            console.log(data.collection[0])
            setStud(data.collection[0])
            console.log(data.collection[0].team)
            console.log(data.collection[0].username)
            console.log(currStud.team)
            console.log(currStud.username)
            if(data.collection == null) {console.log(Error)}
        })
    },[]);

/*
  useEffect(() => {
    console.log("Get coach from coachid")
    console.log(coachID)
    console.log(`/api/coach/displayName/${coachID}`)
    if (coachID) { // Check if CoachID exists
      const requestOptions ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: CoachID }) // Pass CoachID directly
      };
      fetch(coachsearchurl, requestOptions)
        .then(res => res.json())
        .then(data => {
          setCoach(data.collection)
          if(data.collection == null) {console.log(Error)}
        })
        .catch(error => {
          console.error("Error fetching coach:", error);
        });
    }
    console.log(coachsearchurl+CoachID)
    setFinishedUrlCoach(coachsearchurl+CoachID);
  }, [CoachID]); // Depend directly on CoachID
*/

  if (!team) {
    return <div className="team-info-container">Loading...</div>;
  }

  

  return (
    <div className="team-info-container">
      <h2 className="team-name">Team {currStud.team}</h2>
      <div className="team-info">
        <div>
          <strong className="coach-label">Coach:</strong> <span className="coach-name">{coachName}</span>
        </div>
        <div>
          <strong className="mentor-label">Mentor:</strong> <span className="mentor-name">{team.mentor}</span>
        </div>
        <div className="students">
          <strong>Students:</strong>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Alternate</th>
              </tr>
            </thead>
            <tbody>
              {team.students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.alternate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;


// import React, { useEffect, useState } from 'react';
// import { loginChecker } from "../General/LoginCheck";
// import { useNavigate } from 'react-router-dom';

// function TeamInfo() {
//   const [teams, setTeams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const toNavigateTo = loginChecker("Student");
//     if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
//   }, []);

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const fetchTeams = async () => {
//     try {
//       const response = await fetch("/api/coach/get_coaches_students"); // Adjust the API endpoint accordingly
//       if (!response.ok) {
//         throw new Error('Failed to fetch teams');
//       }
//       const data = await response.json();
//       const teamsWithCoaches = await Promise.all(data.teams.map(async (team) => {
//         const coachInfo = await fetchCoach(team.coach);
//         return { ...team, coachName: coachInfo.name };
//       }));
//       setTeams(teamsWithCoaches);
//     } catch (error) {
//       console.error("Error fetching teams:", error);
//     }
//   };

//   const fetchCoach = async (coachID) => {
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 'id': coachID })
//       };
//       const response = await fetch('/api/coachSearch', requestOptions);
//       if (!response.ok) {
//         throw new Error('Failed to fetch coach');
//       }
//       const coachData = await response.json();
//       return coachData;
//     } catch (error) {
//       console.error("Error fetching coach:", error);
//       return null;
//     }
//   };

//   return (
//     <div className="team-info-container">
//       <h2>Team Information</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Team Name</th>
//             <th>Coach</th>
//             <th>Mentor</th>
//             <th>Students</th>
//             <th>Alternate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teams.map((team) => (
//             <tr key={team.id}>
//               <td>{team.name}</td>
//               <td>{team.coachName}</td>
//               <td>{team.mentor}</td>
//               <td>
//                 <ul>
//                   {team.students.map((student) => (
//                     <li key={student.id}>{student.name}</li>
//                   ))}
//                 </ul>
//               </td>
//               <td>
//                 <ul>
//                   {team.alternates.map((alternate) => (
//                     <li key={alternate.id}>{alternate.name}</li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TeamInfo;


