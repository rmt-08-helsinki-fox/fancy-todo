# fancy todo app

- POST http://localhost:3000/todos

> Create Todo

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

- GET http://localhost:3000/todos

-Show all todo

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
    }
]

Response (500 - Bad Request)

{
    "message": "Internal server error"
}


- GET http://localhost:3000/todos/:id

-Show data by Id

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

Response(500 - Bad Request)
{
    "message": "Internal server error"
}

- DELETE http://localhost:3000/todos/:id

- Delete by Id

Request params
id ==> integer

Response(200 - Ok)
{
    "Message": "Todo success to delete"
}