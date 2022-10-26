# Server API Calls
Below all of the currently available api calls are detailed below. The URL stem will be listed at the top of each section for the navigate. 

<br>

## General

1. API check - `value: /api`
    * Used to see if the server is awake and responding. 
2. Other - `value: *`
    * Any undefined api call gets directed here - displays the Page Not Found page. 

<br>

## All Users
URL Stem: `/api/user/<value>`

1. Create User - `value: create_user`
    * Currently Not Working. Used to create a new user. Requires a username, password, email, and user-type in the post request. Will return the id of the object if successful, and `401` if not. 
2. Login - `value: login`
    * Currently Not Working. Used to login a user. Requires a username and password in the post request. Will return `201` and the user ID if successful, and `401` if the username or password is incorrect with an error message. 
3. Fetch User - `value: fetch_user`
    * Currently Not Working. Used to retrive a user. Requires an ObjectID in the post request. Will return `200` and the stringifyed JSON object of the user if found, `500` otherwise. 
4. Modify User Profile - `value: modify_user_profile`
    * Currently Not Working. Used to update a users profile. 

<br>

## Coach
URL Stem: `/api/coach/<value>`

1. Retreive Coaches Teams - `value: get_coaches_teams`
    * Currently Not Working. Used to retrieve a list of teams a coach is assigned to. 

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
    * Currently Not Working. Used to generate a validation code for registering an account as a coach. Returns the validation code and `200`. 
2. Mentor Validation Codes - `value: generate_mentor_validation_code`
    * Currently Not Working. Used to generate a validation code for registering an account as a mentor. Returns the validation code and `200`. 
3. User Activation - `value: activate_user_account`
    * Currently Not Working. Used to activate a deactivated user account. 
4. User Deactivation - `value: deactivate_user_account`
    * Currently Not Working. 
5. Create and Distribute Notification - `value: create_notification`
    * Currently Not Working. 
6. Register a new Team - `value: register_team`
    * Currently Not Working. 

<br>

## Student
URL Stem: `/api/student/<value>`

No server-side currently implemented

<br>

## Mentor
URL Stem: `/api/mentor/<value>`

No server-side currently implemented

<br>

## Assessments
URL Stem: `/api/assessments/<value>`

1. Add Assessment - `value: add_assessment`
    * Currently Not Working. 
2. Get Assessment - `value: get_assessment`
    * Currently Not Working. 
3. Find Assessments - `value: find_assessment_by_author`
    * Currently Not Working. 
