# API DOC Fancy To Do

# **=============== TO DO ===============**

## **Database ToDos**

To Do List that required input :

> title : string <br>
> description : string <br>
> due_date : Date <br>
> userId : integer foreignKey User by Id

## === 1. **CREATE TO DO** ===

-   ### **ROUTE**

    POST /todos

-   ### **REQUEST**

    headers: `{ token : accessToken }`

    body: `{ title: email, description: string, status: boolean, due_date: Date }`

-   ### **RESPOND**

    Status `201 : { `
    `"id": integer,` <br>
    `"title": string,` <br>
    `"status": false,` (type boolean but default value is `false`, first time creating a to do datum) <br>
    `"description": string,` <br>
    `"due_date": Date,` <br>
    `"UserId": UserId,` <br>
    `"updatedAt": Date,` <br>
    `"createdAt": Date `
    `}`

    OR

    Status `400 : { "msg": [ `Array String of Error` ] }`

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

    > Array String of Error : Validation for each key of To Do List => `[...]`

    `... : [ Title must not be empty, Title is required, Description must not be empty, Description is required, Status must be in state of true or false, Status must not be empty, Due date must not be in the past, Due date is required ]`

## === 2. **READ TO DO** ===

-   ### **ROUTE**

    GET /todos

-   ### **REQUEST**

    headers: `{ token : accessToken }`

    body: `{ title: email, description: string, status: boolean, due_date: Date }`

-   ### **RESPOND**

    Status `200 : { [ `Array of Object Data To Do List by UserId` ]] }`

    OR

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

    > Array of Object Data To Do List by UserId : `[ ObjectData1 , ... ]`

    ObjectData1 : `{ id , title, description, status, due_date, createdAt, updatedAt }`

## === 3. **GET TO DO BY ID** ===

-   ### **ROUTE**

    GET /todos/`:id`

-   ### **REQUEST**

    params: `{id}`

    headers: `{ token : accessToken }`

-   ### **RESPOND**

    Status `200 : { [ `Object Data To Do List by Id` ]] }`

    OR

    Status `401 : { [ "msg": "Not authorized" ]] }`

    Status `404 : { "msg": "Error Not Found" }`

    > Object Data To Do List by Id : `{ id , title, description, status, due_date, createdAt, updatedAt }`

## === 4. **UPDATE TO DO BY PUT** ===

-   ### **ROUTE**

    PUT /todos/`:id`

-   ### **REQUEST**

    headers: `{ token : accessToken }`

    body: `{ title: email, description: string, status: boolean, due_date: Date }`

-   ### **RESPOND**

    Status `200` : `{ ` New Data Object To Do By Id ` }`

    OR

    Status `400 : { "msg": [ ` Array String of Errors `] }`

    Status `401 : { "msg": "Not authorized" }`

    Status `404 : { "msg": "Error Not Found" }`

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

    > New Data Object To Do By Id : `{ id , title, description, status, due_date, createdAt, updatedAt }`

    > Array String of Error : Validation for each key of To Do List => `[...]`

    `... : [ Title must not be empty, Title is required, Description must not be empty, Description is required, Status must be in state of true or false, Status must not be empty, Due date must not be in the past, Due date is required ]`

## === 5. **UPDATE TO DO BY PATCH** ===

-   ### **ROUTE**

    PATCH /todos/`:id`

-   ### **REQUEST**

    headers: `{ token : accessToken }`

    body: `{ status: boolean }`

-   ### **RESPOND**

    Status `200` : `{ ` New Data Object To Do By Id ` }`

    OR

    Status `400 : { "msg": [ ` Array String of Errors `] }`

    Status `401 : { "msg": "Not authorized" }`

    Status `404 : { "msg": "Error Not Found" }`

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

    > New Data Object To Do By Id : `{ id , title, description, status, due_date, createdAt, updatedAt }`

    > Array String of Error : Validation for each key of To Do List => `[...]`

    `... : [ Title must not be empty, Title is required, Description must not be empty, Description is required, Status must be in state of true or false, Status must not be empty, Due date must not be in the past, Due date is required ]`

## === 6. **DELETE TO DO** ===

-   ### **ROUTE**

    DELETE /todos`:id`

-   ### **REQUEST**

    headers: `{ token : accessToken }`

-   ### **RESPOND**

    Status `200` : `{ msg: "ToDo success to delete" }`

    OR

    Status `404 : { "msg": "Error Not Found" }`

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

# **=============== REGISTER ===============**

## **Users**

Register User that required input :

> email : email <br>
> password : password

-   ### **ROUTE**

    POST /users/register

-   ### **REQUEST**

    body: `{ email: email, password: string }`

-   ### **RESPOND**

    Status `201` : `{ msg: Register success, "id": integer, "email" : email}`

    OR

    Status `400` : `{ msg: [ `Array string of errors` ] }`

    Status `500 : { "msg" : err.msg || "Internal server error", "cause" : err.message || err }`

    > Array String of Error : Validation email and password => `[...]`

    `... : [ Invalid email format, Email must not be empty, Email is required, Minimum password length is 5 characters, Password must not be empty, Password is required ]`

# **=============== LOGIN ===============**

## **Database Users**

Login User that required input :

> email : email <br>
> password : password

-   ### **ROUTE**

    POST /users/login

-   ### **REQUEST**

    body: `{ email: email, password: string }`

-   ### **RESPOND**

    Status `201` : `{ "accessToken":` <br>
    `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2MTI1MjIyMjN9.JjzLA43_2-R2oUPpjxnTIkYR8erDgmUbnVujup6a93s",` <br>
    `"msg": "Access Token granted"}`

    OR

    Status `400` : `{ msg: [ `Array string of errors` ] }`

    > Array String of Error : Validation email and password => `[...]`

    `... : [ Invalid email or password, Email is required, Password, is required ]`

# **=============== GOOGLE LOGIN ===============**

## **Database Users**

Signing in with google account

> using Google OAuth 2.0

-   ### **ROUTE**

    GET /users/goggleLogin

-   ### **REQUEST**

    headers: `{ accessToken }`

    body: `{ email: email, password: string }`

-   ### **RESPOND**

    Status `200` : `{ "accessToken": token, "msg": "Logining with Google"}`

    OR

    Status `201` : `{ "accessToken": token, "msg": "Access Token granted"}`
