
import React, { useState } from "react"
import "./stylesStud.css"


export default function ViewTeams(){


    /*
        import React  from 'react';

        export default function TableMentor (){
            const products = [
                {id: 1, name: "laptop", price: 500},
                {id: 2, name: "phone", price: 200},
                {id: 3, name: "modem", price: 40},
                {id: 4, name: "tv", price: 90},
            ];

            const productList = products.map((product) => (
                <div key={product.id}>
                    {product.name}: ${product.price}
                </div>
            ));
            return <div>{productList}</div>;
        }
    */
    //var userVal; 
    var postData;
    const[data, setData] = useState (null);
    const[data1, setData1] = useState (null);
    const[data2, setData2] = useState (null);
    const[data3, setData3] = useState (null);

    const fetchUserAccount = (e) => {
    //useEffect (() => {
        //e.preventDefault()

        postData = { id: '6373bf8650c5263f57ff20ab'}

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        fetch('/api/coach/get_coaches_teams', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    console.log("working");
                    
                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        );

    }; 
    return(
        <div className="App">
            <h1>Teams</h1>
            <button onClick={fetchUserAccount}>
            Display
            </button>
            <p>Display Name: {data}</p>
            <p>Username: {data1}</p>
            <p>Email: {data2}</p>
            <p>School: {data3}</p>

        </div>
    );
}

/*
    //var userVal; 
    var postData;

    const fetchUserAccount = (e) => {
    //useEffect (() => {
        //e.preventDefault()

        postData = { id: '6373bf8650c5263f57ff20ab'}

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };
        fetch('/api/user/fetch_user', requestOptions).then(
                res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    console.log(userVal.displayname);
                    //navigate('/about', {replace: true, state:{userVal}})
                    //Figure out what to do with this information from userVal
                } catch (error) {

                }
            }
        );

    };
    return(
        <>
        <div className="profilecontainer">
            <h1>Profile</h1>
            <div className="Attributes">
                <button onClick={fetchUserAccount}> Button </button>
            </div>
        </div>
        </>
    ); 
    
*/