# fancy - todo App Server
This fancy - todo is an application to manage your task. This fancy - app has:
* RESTful endpoint for tasks CRUD operation
* JSON formatted response



## RESTful endpoints
### POST/todos
> Create new task

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
{
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "02/11/2021",
}
```

_Response (201 - Created)_
```
{
    "id": 11,
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "2021-02-12T00:00:00.000Z",
    "updatedAt": "2021-02-01T15:22:09.335Z",
    "createdAt": "2021-02-01T15:22:09.335Z"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "Date must be more then today"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### GET/todos
> Get all task created

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 1,
        "title": "challenges",
        "description": "daily challenge",
        "status": "uncompleted",
        "due_date": "2021-02-02T00:00:00.000Z",
        "createdAt": "2021-02-01T10:08:08.770Z",
        "updatedAt": "2021-02-01T10:08:08.770Z"
    },
    {
        "id": 4,
        "title": "challenges",
        "description": "daily challenge",
        "status": "completed",
        "due_date": "2021-02-02T00:00:00.000Z",
        "createdAt": "2021-02-01T10:52:19.670Z",
        "updatedAt": "2021-02-01T14:35:19.655Z"
    }
]
```

_Response (200 - OK)_
```
[]
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### GET/todos/:id
> Get task by id

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "challenges",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T10:08:08.770Z"
}
```

_Response (400 - Not Found)_
```
{
    "error": "Todo is not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### PUT/todos/:id
> Update task by id

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
{
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "02/11/2021",
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:43:18.251Z"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "Date must be more then today"
}
```

_Response (404 - Not Found)_
```
{
    "error": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### PATCH/todos/:id
> Update status of task by id

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
{
    status : "completed"
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:45:53.503Z"
}
```

_Response (404 - Not Found)_
```
{
    "error": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### DELETE/todos/:id
> Delete task by id

_Request Header_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNTk3MTd9.G7ONNL8lFw7_wXoI-ThrDs3sfPalzS68EMY"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:45:53.503Z"
}
```

_Response (404 - Not Found)_
```
{
    "error": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### POST/users/signup
> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email" : "example@mail.com"
    "password" : "password"
}
```

_Response (201 - Created)_
```
{
    "id": 3,
    "email": "example@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "Invalid email format"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```


### POST/users/signin
> Sign in to user created

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email" : "example@mail.com"
    "password" : "password"
}
```

_Response (200 - OK)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWiJ1bmlxdWVAbWFpbC5jb20iLCJpYXQiOjE2MTIyNjExOTB9.eRnxVX8kpJU55Ha_eU2ere-PVPJCLh2WXJvJMZabszU"
}
```

_Response (400 - Bad Request)_
```
{
    "error": "Email or password is wrong"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error" : "Internal server error"    
}
```

postman :
https://www.getpostman.com/collections/688d28cbd5c620ab3527