import React, { useEffect, useState } from "react";
import { loginChecker } from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';
import "./StudentProfilePage.css"; // Import CSS file for styling

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
        const response = await fetch('api/studentInfoSearch');
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        setStud(data);
        console.log("Current Student display name")
        console.log(data.displayname)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [finishedurl]);

  if (!currStud || Object.keys(currStud).length === 0) {
    return <div className="noDataMessage">No student data available</div>;
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
            <td><strong>Grade:</strong></td>
            <td>{currStud.gradelevel}</td>
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
