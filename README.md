# Fancy Todo
```
Create Fancy Todo app, using express, jquery, ajax, axios
* RESTful endpoint with CRUD method
* JSON formatted response
* Web Server response
* Create, Edit, and Delete your Todo List
```

# Usage
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
```

# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

# ENDPOINT

## POST /users/signIn

> SignIn User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{ 
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
    "token": <token>
}
```
_Response(400 - Bad Request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR",
    "message": "Invalid Email or Password"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /users/signUp

> SignUp User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{ 
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```
_Response(400 - Bad Request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR",
    "message": "Email required, Password required, Email has been used"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /googleLogin

Request Header

```Not Needed```

Request Body

```javascript
{
    "id_token": "<your id_token>"
}
```

_Response(200)
```javascript
{
    "access_token": "<your access_token>"
}
```
OR

_Response(201)
```javascript
{
    "access_token": "<your access_token>"
}
```

_Response(401)
```javascript
{
    "message":  "<Invalid Email/Password>" ,
}
```

## GET /todos

> Get Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /todos

> Add Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```javascript
{
    "title": "<Todo's title>",
    "description": "<Todo's description>"
    "due_Date": "<Todo's due_date>"
}
```
_Response(201)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(400 - Bad Request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR",
    "message": "title required, description required, due_date required"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /todos/:id

> Get Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PUT /todos/:id

> Update Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```javascript
{
    "title": "<Todo's title>",
    "description": "<Todo's description>"
    "due_Date": "<Todo's due_date>"
}
```

_Response(200)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(400 - Bad Request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR",
    "message": "title required, description required, due_date required"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PATCH /todos/:id

> Update Status Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```javascript
{
    "status": "<Todo's status>"
}
```

_Response(200)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## DELETE /todos/:id

> Delete Todo List

_Request Header_
```javascript
{
    "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
    "id": "<Todo's ID>",
    "title": "<Todo's title>",
    "description": "<Todo's description>",
    "status": "<Todo's status>",
    "due_Date": "<Todo's due_date>"
}
```
_Response(401)
```javascript
{
    "message":  "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```