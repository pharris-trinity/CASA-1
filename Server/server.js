const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("../Frontend/build"))

app.get("/api", (request, response) => {
    response.json({message:"Test"});
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
});

//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});