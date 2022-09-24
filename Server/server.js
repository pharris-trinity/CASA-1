const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(8080, () => {
    console.log("Listen on the port 8080...");
});