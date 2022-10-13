# CASA Project for Cyberware Texas

Originally written by Gabriel Manners, Larry Green, Amanda Choi, Linh Nguyen

<br>

# Initial Installation
1. Download and install the latest version of Node from [here](https://nodejs.org/en/download/).
    - This project was compiled on npm version 8.19.2, but latter versions should also work. 
2. After cloning the repo into a location of your choice, navigate to the root directory of the folder in terminal "\CASA"
3. Run `npm install` to install all the required dependencies
4. Setup a `.env` file as described in the other [information](#information)
5. Use `npm start` to run the application. 
    - Verify that it works by navigating to [localhost:3000](localhost:3000) in your web browser. 

<br>  

# Dev Usage Instructions

## Useful Scripts

`npm start` - launches both frontend and server applications in the same command window

`npm run server` - launches explictly the server in a dynamic window, which enables re-loading automatically on save

`npm run frontend` - launches explicitly the frontend in a dynamic window, which enables re-loading automatically on save

<br>

## All Scripts
1. `test`: Attempts to run tests if they're configured
2. `start`: Concurrently runs both the server and the frontend scripts. Mostly for deployment purposes
3. `server`: Navigates into the server directory and runs the server using 'nodemon'
4. `frontend`: Navigates into the frontne directory and runs the default react run script
5. `build`: Runs the react build for production
6. `install`: Installs all dependencies for both React and Server packages

<br>

# Information

---


<br>

### Copyright 2022 CYBERWARE TEXAS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.