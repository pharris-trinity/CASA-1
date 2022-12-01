/*
import React, {useState} from 'react';
//import './AssessTest.css';

const AssessTest = () => {
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[author, setAuthor] = useState('mario');

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author}
        console.log(blog);
    }

    return (
        <div className = "create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}> 
            <label>Blog title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <label>Blog body:</label>
            <textarea
                required
                value= {body}
                onChange={(e)=>setBody(e.target.value)}

            ></textarea>
            <label>Blog author</label>
            <select
                value= {author}
                onChange={(e)=>setAuthor(e.target.value)}

            >
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>

            </select>
            <button>Add Blog</button>
            <p>{title}</p>
            <p>{body}</p>
            <p>{author}</p>
            </form>
        </div>
    )
}
export default AssessTest

*/

import React , {useState} from 'react';
import {NavLink} from 'react-router-dom';


// This is the basic page where the user will take a mock quiz.
function AssessTest() {
    const [state, setstate] = useState(false);
    const showDrorpdown = ()=>{
        setstate(true);
    }
    const hideDrorpdown = ()=>{
        setstate(false);

    }
    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
    };


	return (
        <div className = "dropdown">
        <div className = "container"> 
            <div className = "dropdown-menu" onMouseEnter={showDrorpdown} onMouseLeave = {hideDrorpdown}>
                Students
                {state ?(<ul className = "dropdown-list" onMouseEnter={showDrorpdown}>
                    <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/MentorAssessment`}> Student A </NavLink> </li>
                </ul>):
                null}
             </div>
        
        
        </div>


    </div>

	);
}

export default AssessTest;
