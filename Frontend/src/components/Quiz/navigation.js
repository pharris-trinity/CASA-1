import React, { useState, useEffect } from "react";

function Navigation(props) {
    const [questionLength, setQuestionLength] = useState(0);

    useEffect(() => {
        setQuestionLength(props.questionArrayLength);
    }, [props.questionArrayLength])

    console.log("question array length in nav", props.questionArrayLength);
    return (
        <div>
            <button onClick={() => props.prevQuestion()}>prev</button>
            <button onClick={() => props.nextQuestion()}>next</button>
        </div>
    );
}

export default Navigation;