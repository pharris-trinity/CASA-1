import React, { useEffect, useState } from "react";
import Table from '../TableMentor/table';
import { useNavigate } from "react-router-dom";
import Navbar from '../Mentor/NavBarMentor';



function FilterTable() {

    let navigate = useNavigate();

    function teamsButton(){
        //navigate('/mentorteams', {replace: true})
        navigate('/mentor', {replace: true})
  
        
        
    }

    const [elements, setElements] = useState([])
    const [query, setQuery] = useState("")

    const keys =  ["school_Name","coach","district","rotc","remote","zipcode"]

    useEffect(() => {
        var postData = ['national_id:', 'name', 'school', 'district', 'rotc' , 'active', 'coach']
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          };
        fetch('/api/get-data', requestOptions).then(res => res.json()).then(
            data => {
                setElements(data.collection)
                console.log("Values in data collection: " + data.collection)
                console.log("Values in setElements: " + setElements)
                if (data.collection == null)
                    console.log(Error)
            })
    },[]);


    const visit = (obj, fn) => {
        const values = Object.values(obj)
    
        values.forEach(val => 
            val && typeof val === "object" ? visit(val, fn) : fn(val))
            // This provides the whole array
            console.log("Values in visit: " + values)
    }

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key)=>item[key].toLowerCase().includes(query))
        );
    };

    const teamArr = (val) => {
        const team = []
        // Individual Values
        console.log("Val: " + val)
    }

    return (
        <div className="app">
            <h1> React Table </h1>
            <Navbar/>
            <button onClick={teamsButton}>
                Home
            </button> 
            
            <input
                    type="text"
                    placeholder='Search...'
                    className='Search'
                    onChange={(e) => setQuery(e.target.value)}
                />

            {<Table data={(elements)} />}

            <button onClick={() => {
                visit(elements, teamArr)
            }}>click here</button>

        </div>
    );

}

export default FilterTable;
/*
[elements={elements}
[1]   {
[1]     _id: new ObjectId("6373c236ad9f0d53e72b5eaa"),
[1]     national_id: 0,
[1]     name: 'Test School',
[1]     school: 'Trinity University',
[1]     district: 'Private University',
[1]     rotc: false,a2q
[1]     members: [ new ObjectId("6373bea2d933d6a203138d12") ],
[1]     coach: new ObjectId("6373bf8650c5263f57ff20ab"),
[1]     active: true,
[1]     __v: 0
[1]   }
[1] ]
<div className="option-list">
                {filteredList.map((element, index) => (
                <Item {...element} key={index} />
                ))}
            </div>

<div>
            <h1> React Table </h1>
            <Container style={{ backgroundColor: 'green'}}>
                <h1 className='text-center mt-4'>Live Search Filter in React.js</h1>
                <Form>
                    <InputGroup className='my-3'>
                        <Form.Control
                        placeholder="Search Contacts"
                        />
                    </InputGroup>
                </Form>
            </Container>
        </div>


        <ul className="list">
                {Users.filter((user) =>
                user.first_name.toLowerCase().includes(search)
                ).map((user) => (
                    <li key={user.id} className="listItem">{user.first_name}</li>
                ))}
                
            </ul>

            <div>Filter by Category:</div>
            <div>
                <select
                    name="option-list"
                    id="option-list"
                    onChange={handleCategoryChange}
                >
                    <option value="">All</option>
                    <option value="ROTC">ROTC</option>
                    <option value="Remote">Avaliable</option>
                </select>
            </div>
            /*
    const getTeamData = async () => {
        var postData = { national_id: details.national_id, name: details.name, school: details.school, district: details.district, rotc: details.rotc, active: details.active}
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        };
        fetch('/api/mentor/get_mentor_teams', requestOptions).then(
            res => res.body).then((rb) => {
                const reader = rb.getReader();
                return new ReadableStream({
                  start(controller) {
                    // The following function handles each data chunk
                    function push() {
                      // "done" is a Boolean and value a "Uint8Array"
                      reader.read().then(({ done, value }) => {
                        // If there is no more data to read
                        if (done) {
                          console.log('done', done);
                          controller.close();
                          return;
                        }
                        // Get the data and send it to the browser via the controller
                        controller.enqueue(value);
                        // Check chunks by logging to the console
                        //console.log(done, value);
                        push();
                      });
                    }
            
                    push();
                  },
                });
              })
              .then((stream) =>
                // Respond with our stream
                new Response(stream, { headers: { 'Content-Type': 'text/html' } }).json()
              )
              .then((result) => {
                // Do things with result
                console.log(result);
              });
        

/*
      return fetch('mentor/mentor_teams')
      .then(
        res => res.text()).then(text => {
        try {
            const data = text //await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
            console.log(data)
            console.log(postData)
            
        } catch(e) {
            throw new Error('Username already used')

    useEffect(() => {
        getTeamData();
    },[])
        }
    })*/
/*
    const teamData = async() => {

        var postData = { national_id: details.national_id, name: details.name, school: details.school, district: details.district, rotc: details.rotc, active: details.active}
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        };
        fetch('/api/get-data', requestOptions).then(
            res => res.json()).then(data => console.log(data))

    }


    function FilterTable() {


    const [details, setDetails] = useState({ national_id: 0, name: "", school: "", district: "", rotc: "", active: ""})


    const [elements, setElements] = useState([])



    useEffect(() => {
        var postData = ['national_id:', 'name', 'school', 'district', 'rotc' , 'active']
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          };
        fetch('/api/get-data', requestOptions).then(res => res.json()).then(
            data => {
                setElements(data)
                console.log("Values in data: " + data)
                console.log("Values in setElements: " + setElements)
            })
    },[]);

 

    const visit = (obj, fn) => {
        const values = Object.values(obj)
        const team = []
    
        values.forEach(val => 
            val && typeof val === "object" ? visit(val, fn) : fn(val))
            // This provides the whole array
            console.log("Values in visit: " + values)
            console.log("It's the value 1..." + values[0]);

        
                setDetails({
                    national_id: values[1],name: values[2],school:values[3],
                    district: values[4], rotc: values[5], active: values[6]
                })
            
            

    }

    const print = (val) => {

        console.log(val)
    }

    const teamArr = (val) => {
        const team = []
        // Individual Values
        console.log("Val: " + val)
    }

    
    const [query, setQuery] = useState("");

    const keys =  ["school_Name","coach","district","rotc","remote","zipcode"]
    

    //console.log(Users[1]["school_Name"]);

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key)=>item[key].toLowerCase().includes(query))
        );
    };

    return (
        <div className="app">
            <h1> React Table </h1>
            
            <input
                    type="text"
                    placeholder='Search...'
                    className='Search'
                    onChange={(e) => setQuery(e.target.value)}
                />

            <Table />

            <button onClick={() => {
                visit(elements, teamArr)
            }}>click here</button>

        </div>
    );

}

export default FilterTable;
*/
