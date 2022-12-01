import {Route, Routes } from "react-router-dom";
import React from "react";
import Dashboard from "./Pages/Dashboard";

const Views = () => {
    return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element = {<div> 404 Not Found </div>} />
    </Routes>
    );
};

export default Views;

//<Route path='/' component={Login} />
//<Route path='/sign-up' component={Signup} />
//element = {<div> Dashboard, is here! </div>}