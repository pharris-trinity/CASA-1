import React, { useState, useEffect } from "react";

function Navigation(props) {

    return (
        <div>
            <button onClick={() => props.prevQuestion()}>prev</button>
            <button onClick={() => props.nextQuestion()}>next</button>
        </div>
    );
}

export default Navigation;