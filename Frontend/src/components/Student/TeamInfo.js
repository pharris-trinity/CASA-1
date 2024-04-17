import React, { useEffect, useState } from 'react';
import { loginChecker } from "../General/LoginCheck";
import { useNavigate } from 'react-router-dom';

function TeamInfo() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const toNavigateTo = loginChecker("Student");
    if (toNavigateTo !== "") navigate(toNavigateTo, { replace: true });
  }, []);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/coach/get_coaches_students"); // Adjust the API endpoint accordingly
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const data = await response.json();
      const teamsWithCoaches = await Promise.all(data.teams.map(async (team) => {
        const coachInfo = await fetchCoach(team.coach);
        return { ...team, coachName: coachInfo.name };
      }));
      setTeams(teamsWithCoaches);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchCoach = async (coachID) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id': coachID })
      };
      const response = await fetch('/api/coachSearch', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch coach');
      }
      const coachData = await response.json();
      return coachData;
    } catch (error) {
      console.error("Error fetching coach:", error);
      return null;
    }
  };

  return (
    <div className="team-info-container">
      <h2>Team Information</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Coach</th>
            <th>Mentor</th>
            <th>Students</th>
            <th>Alternate</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.coachName}</td>
              <td>{team.mentor}</td>
              <td>
                <ul>
                  {team.students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {team.alternates.map((alternate) => (
                    <li key={alternate.id}>{alternate.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamInfo;
