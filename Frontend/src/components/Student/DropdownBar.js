import React, { useState } from 'react';
import './stylesStud.css'; // Import CSS stylesheet

function DropdownBar(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="dropdown-bar" style={{ width: '45%', marginLeft: '5%', marginRight: '5%' }}>
      <div className="dropdown-bar-header" onClick={toggleExpanded}>
        <div className="dropdown-bar-header-text" style={{ color: 'white', fontFamily: 'Arial' }}>
          {props.headerText}
        </div>
      </div>
      {isExpanded && (
        <div className="dropdown-bar-content" style={{ backgroundColor: '#3B89E5' }}>
          {props.children}
        </div>
      )}
    </div>
  );
}



function DropdownContent() {
  return (
    <div className="dropdown-content">
      <div className="dropdown-column">
        <h3 className="dropdown-title">Student Stats</h3>
          <li>Windows                 5/5</li>
          <li>Windows Server        4.5/5</li>
          <li>Linux                   5/5</li>
          <li>Networking            4.8/5</li>
          <li>Security Concepts     3.8/5</li>
          <li>Quantitative Skills   3.8/5</li>
      </div>
      <div className="dropdown-column">
        <h3 className="dropdown-title">Past Assessments</h3>
          <li>Assessment A</li>
          <li>Assessment B</li>
          <li>Assessment C</li>
          <li>Assessment D</li>
          <li>Assessment E</li>
          <li>Assessment F</li>
      </div>
    </div>
  );
}



export { DropdownBar, DropdownContent };
