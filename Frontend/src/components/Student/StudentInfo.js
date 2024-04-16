import React, { useEffect, useState } from "react";
import { loginChecker } from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

export default function StudentProfilePage() {
  const studentusername = localStorage.username;
  const studentsearchurl = '/api/studentsearch/';
  const finishedurl = studentsearchurl + studentusername;
  let navigate = useNavigate();

  useEffect(() => {
    const toNavigateTo = loginChecker("Student");
    if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
  }, [navigate]);

  const [currStud, setStud] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldData = ['username', 'school', 'tier', 'gradelevel', 'team'];
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fieldData)
        };
        const response = await fetch(finishedurl, requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStud(data.collection);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [finishedurl]);

  if (!currStud || Object.keys(currStud).length === 0) {
    return <div>No student data available</div>;
  }

  return (
    <div className="studentInfoContainer">
      <h1>Student Information</h1>
      <table>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{currStud.displayname}</td>
          </tr>
          <tr>
            <td><strong>School:</strong></td>
            <td>{currStud.school}</td>
          </tr>
          <tr>
            <td><strong>Grade:</strong></td>
            <td>{currStud.gradelevel}</td>
          </tr>
          <tr>
            <td><strong>Tier:</strong></td>
            <td>{currStud.tier}</td>
          </tr>
          <tr>
            <td><strong>TeamID:</strong></td>
            <td>{currStud.team}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
