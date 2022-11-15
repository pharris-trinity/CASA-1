import React, { useEffect, useMemo, useState } from "react";
import { Users } from '../TableMentor/teams';
import Table from '../TableMentor/table';

function FilterTable() {


    const [query, setQuery] = useState("");

    const keys =  ["school_Name","coach","district","rotc","remote","zipcode"]

    console.log(Users[1]["school_Name"]);

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key)=>item[key].toLowerCase().includes(query))
        );
    };


    return (
        <div className="app">
            <h1> React Table </h1>
            <input type="text" placeholder="Search..." 
            className="search" 
            onChange={e=> setQuery(e.target.value)} 
            />

            <Table data={search(Users)}/>

        </div>
    );

}

export default FilterTable;
/*

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

*/