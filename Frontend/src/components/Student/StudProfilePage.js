// import React, { useEffect, useState } from "react";
// import { loginChecker } from "../General/LoginCheck";
// import { useNavigate } from 'react-router-dom';
// import StudentInfo from './StudentInfo';

// export default function StudentProfilePage() {
//   const studentusername = localStorage.username;
//   const studentsearchurl = '/api/studentsearch/';
//   const finishedurl = studentsearchurl + studentusername;
//   let navigate = useNavigate();

//   useEffect(() => {
//     const toNavigateTo = loginChecker("Student");
//     if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
//   }, [navigate]);

//   const [currStud, setStud] = useState([]);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fieldData = ['username', 'school', 'tier', 'gradelevel', 'team'];
//         const requestOptions = {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(fieldData)
//         };
//         const response = await fetch(finishedurl, requestOptions);
//         if (!response.ok) {
//           throw new Error('Failed to fetch student data');
//         }
//         const data = await response.json();
//         console.log("Current Student Data")
//         setStud(data.collection);
//         console.log(currStud)
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [finishedurl]);

//   return (
//     <div>
//       <StudentInfo student={currStud} />
//       <h3>Student Profile Page</h3>
//     </div>
//   );
// }
