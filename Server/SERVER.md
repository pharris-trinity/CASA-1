# Server API Calls
Below all of the currently available api calls are detailed below. The URL stem will be listed at the top of each section for the navigate. 

<br>

## General

1. API check - `value: /api`
    * Used to see if the server is awake and responding. 
2. Other - `value: /`
    * Any undefined api call gets directed here - displays the Page Not Found page. 

<br>

## All Users
URL Stem: `/api/user/<value>`

1. Create User - `value: create_user`
    * Deprecated - DO NOT USE
2. Login - `value: login`
    * Used to login a user. Requires a username and password in the post request. Will return `201` and the user ID if successful, and `401` if the username or password is incorrect with an error message. 
3. Fetch User - `value: fetch_user`
    * Used to retrive a user. Requires an ObjectID in the post request. Will return `200` and the stringifyed JSON object of the user if found, `500` otherwise. 
4. Modify User Profile - `value: modify_user_profile`
    * Currently Not Working. Used to update a users profile. 

<br>

## Coach
URL Stem: `/api/coach/<value>`

1. Create Coach - `value: create_coach`
    * Used to create a new coach. Requires username, displayname, password, email, madeQuizzes, school, teams, and a validationCode in the request body. Will add the user to the database if successful and return `201`, otherwise returns `401` or `404` and an error code. 
2. Retreive Coaches Teams - `value: get_coaches_teams`
    * Used to retrieve a list of teams a coach is assigned to. Requires an ObjectID of a coach to search the teams list for. Will retrn `201` and the list of team id's or `401` if the coach is not found

<br>

## Dev
URL Stem: `/api/dev/<value>`

1. Create User - `value: create_user`
    * Do not use. Exclusively for Dev-ops to manually create users. 
2. Create Assessment - `value: create_assessment`
    * Do not use. Exclusively for Dev-ops to manually create an assessment. 
3. Create Admin - `value: create_admin`
    * Do not use. Exclusively for Dev-ops to manually create an assessment. 

<br>

## Admin
URL Stem: `/api/admin/<value>`

1. Coach Validation Codes - `value: generate_coach_validation_code`
    * Used to generate a validation code for registering an account as a coach. Returns the validation code and `200`. 
2. Mentor Validation Codes - `value: generate_mentor_validation_code`
    * Used to generate a validation code for registering an account as a mentor. Returns the validation code and `200`. 
3. Check Code Existence - `value: check_code_existence`
    * Used for dev purposes only. Checks to see that a code exists in the database. Returns `404` if found, and `200` if not. 
4. User Activation - `value: activate_user_account`
    * Currently Not Working. Used to activate a deactivated user account. 
5. User Deactivation - `value: deactivate_user_account`
    * Currently Not Working. 
6. Create and Distribute Notification - `value: create_notification`
    * Currently Not Working. 
7. Register a New Team - `value: register_team`
    * Takes in a national_id, name, school, district, rotc status and coach_id in the json object, and creates a new team that gets assigned to the coach defined by the coach_id. Returns `401` if unsucessful, and `200` if successful. 

<br>

## Student
URL Stem: `/api/student/<value>`

1. Create Student - `value: create_student`
    * Creates a new student. Requires a username, displayname, password, and email in the request body. Returns `201` and the student if successful, `302` if the student already exists, and `401` if unsuccessful. 

<br>

## Mentor
URL Stem: `/api/mentor/<value>`

1. Create Mentor - `value: create_mentor`
    * Creates a new mentor. Requires a username, displayname, remote status, zupcode, password, email, madeQuizzes, teams, speciality, and validationCode in the request body. Returns `201` and the mentor if successful, `302` if the mentor already exists, and `401` if unsuccessful. 

<br>

## Assessments
URL Stem: `/api/assessments/<value>`

1. Add Assessment - `value: add_assessment`
    * Currently Not Working. 
2. Get Assessment - `value: get_assessment`
    * Currently Not Working. 
3. Find Assessments - `value: find_assessment_by_author`
    * Currently Not Working. 
