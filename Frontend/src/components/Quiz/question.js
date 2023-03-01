import React, { useState } from "react";

function Question(props) {
    
    return (
        <div>
            <p>{props.questionData.description}</p>
        </div>
    );
}

export default Question;