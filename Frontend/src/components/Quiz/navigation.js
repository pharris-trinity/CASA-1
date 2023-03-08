import React, { useState, useEffect } from "react";

function Navigation(props) {

    return (
        <div>
            {props.index > 0 ? <button onClick={() => props.prevQuestion()}>prev</button> : null}
            {props.index == props.questions - 1 ? null : <button onClick={() => props.nextQuestion()}>next</button>}
        </div>
    );
}

export default Navigation;