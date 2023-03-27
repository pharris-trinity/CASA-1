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

export default DropdownBar;
