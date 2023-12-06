# CASA Project for Cyberware Texas

<br>

# Initial Installation
1. Download and install the latest version of Node from [here](https://nodejs.org/en/download/).
    - This project was compiled on npm version 8.19.2, make sure you are using this version.
2. After cloning the repo into a location of your choice, navigate to the root directory of the folder in terminal "./CASA"
3. Run `npm install npm@8.19.2` to install all the required dependencies
4. Setup a `.env` file as described in the other [information](#information)
5. Use `npm start` to run the application. 
    - Verify that it works by navigating to [localhost:3000](localhost:3000) in your web browser. Note, this should automatically open

<br>  

# Dev Usage Instructions

## Useful Scripts

`npm start` - launches both frontend and server applications in the same command window

`npm run server` - launches explictly the server in a dynamic window, which enables re-loading automatically on save

`npm run frontend` - launches explicitly the frontend in a dynamic window, which enables re-loading automatically on save

<br>

## All Scripts
1. `test`: Runs server-side tests
2. `frontendTest`: Runs React.js tests for frontend
3. `start`: Concurrently runs both the server and the frontend scripts. Mostly for deployment purposes
4. `server`: Navigates into the server directory and runs the server using 'nodemon'
5. `frontend`: Navigates into the frontne directory and runs the default react run script
6. `build`: Runs the react build for production
7. `install`: Installs all dependencies for both React and Server packages

<br>

# Specific Documentation
1. Server-side documentation is located in SERVER.md inside of the Server Folder
2.  Frontend documentation is located in the FRONTEND.md inside of the Frontend Folder
3. Database documentation is located in the DATABASE.md inside of the Database Folder

<br>

# Information

### Env File Setup
An environment file (.env) is useful for setting up credientials and secrets without having to push them to the remote where they could be seen by others. This repository is configured to ignore .env files.
1. Create file within the root directory named `.env`
2. Inside this file, there are two required fields, the username and password. This information will be given to you by the Database administrator. (NOTE if you are not given a username and password, or you were given the MongoDB login, create an admin login in the data base and use the Username and Password from that in the .env file)
4. Firstly, create the `USER_NAME` field. (`USER_NAME=<username>`)
5. Secondly, on a new line, create the `USER_PASSWORD` field. (`USER_PASSWORD=<password>`)
6. Finally, add optional vars using the syntax `VAR_NAME=<var_value>`
    1. `DATABASE`: The database the server will use. Default is `test`
    2. `PORT`: The port the server will run on. Default is `3001`

### Useful Links
1. Server Testing Tutorial: [Testing Node.js API with Mocha and Chai](https://medium.com/@ebenwoodward/testing-a-node-js-with-mocha-and-chai-11288460eaf8)
2. Useful Markdown Formatting: [Basic Syntax | Markdown Guide](https://www.markdownguide.org/basic-syntax/)
3. Color Palette: In an effort to be an accessible website, our color palette uses a variety of hues that are designed to still be visible to people with all forms of colorblindness. In order of bluest to redest: 
    1. <span style="color: #648FFF">#648FFF</span>
    2. <span style="color: #785EF0">#785EF0</span>
    3. <span style="color: #DC267F">#DC267F</span>
    4. <span style="color: #FE6100">#FE6100</span>
    5. <span style="color: #FFB000">#FFB000</span>

<br>

### To Dos
1. Implement Quiz Names
    * Key files: Quiz.js, server.js, StudentTakeAssessmentContent.js
2. Implement Login Persistence
    * Key files: All Frontend files requiring a full refresh instead of an overlay. (Login.js is the beginning)
3. Implement Semi-automatic pulling of data from National Database to enable Cybertexas to setup teams for new seasons easier
    * Key files: server.js, Admin.js
4. Mentor Home Table should moved to the Admin Page. It should not be inside the Mentor Page

<br>

---


**Originally written by Gabriel Manners, Larry Green, Amanda Choi, Linh Nguyen as part of Trinity University's Senior Software Project - Fall 2022**

### Copyright 2022 CYBERWARE TEXAS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
