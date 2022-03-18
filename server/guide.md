# fancy todo app


- POST /register

> Create User

Request body 
{
    "email": budi@gmail.com
    "password": budi4321
}

Response (201 - Created)
{
    "msg": "Register success",
    "id": 2,
    "email": "budi@gmail.com"
}

Response (400 - Bad Request)
{
    "message": [
        "Email is required",
        "Email must be unique",
        "Password is required",
        "Minimum password is 8 characters"
    ]
}

Response (500 - Internal Server Error)
====
{
    "message": "Internal server error"
}

- POST /login
Request Body
{
    "email": "jan@yahoo.com",
    "password": jantol4321
}

Response (200 - Ok)
{
    "access_token": "by sistem"
}

Response (401 - Not Authorized)
{
    "msg": "Invalid email / password"
}

- POST /todos

> Create Todo

Request Headers
{
    "access_token": "user after login"
}

Request body
============
{
    "title": "bulutangkis",
    "description: "gor padjajaran"
    "status": "true",
    "due_date": "03-02-2021"
}

Response (201 - Created)
========
{
    "id": 5,
    "title": "bulutangkis",
    "description": "gor padjajaran",
    "status": true,
    "due_date": "2021-05-02",
    "updatedAt": "2021-02-01T15:40:49.167Z",
    "createdAt": "2021-02-01T15:40:49.167Z"
}

Response (400 - Bad Request)
====
{
    "message": [
        "Title is required",
        "Description is required",
        "Cannot fill date that passed"
    ]
}

Response (500 - Bad Request)
====
{
    "message": "Internal server error"
}


- GET /todos

-Show all todo

Request Headers
{
    "access_token": "user after login"
}

Response (200 - Ok)
[
    {
        "id": 4,
        "title": "nyebor",
        "description": "depan rumah",
        "status": true,
        "due_date": "2021-07-01",
        "createdAt": "2021-02-01T15:39:28.550Z",
        "updatedAt": "2021-02-01T15:39:28.550Z"
    },
    {
        "id": 5,
        "title": "bulutangkis",
        "description": "gor padjajaran",
        "status": true,
        "due_date": "2021-05-02",
        "createdAt": "2021-02-01T15:40:49.167Z",
        "updatedAt": "2021-02-01T16:11:01.448Z"
        "User": {
            "email": "jan@yahoo.com"
        }
    }
]

Response (500 - Bad Request)

{
    "message": "Internal server error"
}


- GET /todos/:id

-Show data by Id

Request Headers
}
    "access_token": "user after login"
}

Request params
id ==> integer

Response (200 - Ok)
{
    "id": 4,
    "title": "nyebor",
    "description": "depan rumah",
    "status": true,
    "due_date": "2021-07-01",
    "createdAt": "2021-02-01T15:39:28.550Z",
    "updatedAt": "2021-02-01T15:39:28.550Z"
}

Response(404 - Not Found)
{
    "message": "Data not found"
}

Response(500 - Bad Request)
{
    "message": "Internal server error"
}

- PUT /todos/:id
- Edit all data

Request Headers
}
    "access_token": "user after login"
}

Request params
id ==> integer

Request Body
{
    "title": "bulutangkis",
    "description: "gor padjajaran"
    "status": "true",
    "due_date": "03-02-2021"
}

Response (200 - Ok)
{
    "id": 5,
    "title": "bulutangkis",
    "description": "gor padjajaran",
    "status": true,
    "due_date": "2021-05-02",
    "updatedAt": "2021-02-01T15:40:49.167Z",
    "createdAt": "2021-02-01T15:40:49.167Z"
}

Response (400 - Bad Request)
{
    "message": [
        "Title is required",
        "Description is required",
        "Cannot fill date that passed"
    ]
}

Response (401 - Not Authorized)
{
    "message": "User not authorized"
}

Response (404 - Not Found)
{
    "message": "Data not found"
}

Response (500 - Internal Server Error)
{
    "message": "Internal server error"
}

- PATCH /todos/:id
- edit by status

Request Headers
}
    "access_token": "user after login"
}

Request params
id ==> integer

Request Body
{
    "status": "false"
}

Response (200 - Ok)
{
    "id": 5,
    "title": "bulutangkis",
    "description": "gor padjajaran",
    "status": false,
    "due_date": "2021-05-02",
    "updatedAt": "2021-02-01T15:40:49.167Z",
    "createdAt": "2021-02-01T15:40:49.167Z"
}

Response (401 - Not Authorized)
{
    "message": "User not authorized"
}

Response (404 - Not Found)
{
    "message": "Data not found"
}

Response (500 - Internal Server Error)
{
    "message": "Internal server error"
}


- DELETE /todos/:id
- Delete by Id

Request Headers
}
    "access_token": "user after login"
}

Request params
id ==> integer

Response(200 - Ok)
{
    "Message": "Todo success to delete"
}

Response (401 - Not Authorized)
{
    "message": "User not authorized"
}

Response (404 - Not Found)
{
    "message": "Data not found"
}

Response (500 - Internal Server Error)
{
    "message": "Internal server error"
}


- GET /todos/weather
- Get weather

Request Headers
}
    "access_token": "user after login"
}

Response (200 - Ok)
{
    "name": "Bandung",
    "icon": "04n",
    "description": "overcast clouds",
    "temp": 294.14
}

Response (404 - Not Found)
{
    "message": "Data not found"
}