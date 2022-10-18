import React from "react";
import {useEffect} from "react";
import { Link } from "react-router-dom";

function About() {

    useEffect(() => {
        document.title = "CASA - Cyberware Texas"
      }, []);

    return (
      <>
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you think?
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
}

export default About;