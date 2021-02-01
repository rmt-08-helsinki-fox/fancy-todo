# Fancy Todo
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /todos

> Create Todo

_Request Header_
```
not needed
```

_Request Body_
```
{
    "title" : "<name your todo list>",
    "description" : "<description aobout task>",
    "status" : "<status done or undone>",
    "due_date" : "<date the task finished>"

}
```

_Response (201)_
```

{
  "id": 5,
  "title": "ngoding",
  "description": "mengerjakan kodingan challenge",
  "status": true,
  "due_date": "2021-03-02T00:00:00.000Z",
  "updatedAt": "2021-02-01T13:54:57.410Z",
  "createdAt": "2021-02-01T13:54:57.410Z"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "data can't be empty"
}
```
_Response (500 - internal server error)_
```
{
  "message": "internal server error"
}
```
---
### GET /todos

> Create new asset

_Request Header_
```
not needed
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
        "title": "built server",
        "description": "buat server fancy todo",
        "status": true,
        "due_date": "2021-02-02T00:00:00.000Z",
        "createdAt": "2021-02-01T05:44:47.399Z",
        "updatedAt": "2021-02-01T09:41:23.657Z"
    },
    {
        "id": 5,
        "title": "ngoding",
        "description": "mengerjakan kodingan challenge",
        "status": true,
        "due_date": "2021-03-02T00:00:00.000Z",
        "createdAt": "2021-02-01T13:54:57.410Z",
        "updatedAt": "2021-02-01T13:54:57.410Z"
    }
]
```

_Response (500 - internal server error)_
```
{
  "message": "Internal server error"
}
```
---
## GET /todos/:id
>Creat new asset

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  id : 1
}
```
_Response (200 - OK)_
```
{
    "id": 1,
    "title": "built server",
    "description": "buat server fancy todo",
    "status": true,
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T05:44:47.399Z",
    "updatedAt": "2021-02-01T09:41:23.657Z"
}
```
_Response (404 - not found)_
```
{
  "error" : "data not found"
}
```
_Response (500 - internal server error)_
```
{
  "message" : "internal server error"
}
```
## PUT /todos/:id
>Creat new asset

_Request Header_
```
not needed
```


_Request Body_
```
{
  "title" : "<name your todo list>",
  "description" : "<description aobout task>",
  "status" : "<status done or undone>",
  "due_date" : "<date the task finished>"
}
```
_Respons (200 - OK)_
```
{
  "id": 1,
  "title": "built server",
  "description": "buat server fancy todo",
  "status": true,
  "due_date": "2021-02-02T00:00:00.000Z",
  "createdAt": "2021-02-01T05:44:47.399Z",
  "updatedAt": "2021-02-01T14:26:36.582Z"
}
```
_Respons (400 - Bad Request)_
```
{
  "message" : "data can't be empty"
}
```
_Respons (500 - internal server error)_
```
{
  "message" : "internal server error"
}
```

## PATCH /todos/:id
>Creat new asset

_Request Header_
```
not needed
```
_Request Body_
```
{
  "status" : "<to change status of todo>"
}
```
_Respons (200 - OK)_
```
{
    "id": 1,
    "title": "built server",
    "description": "buat server fancy todo",
    "status": true,
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T05:44:47.399Z",
    "updatedAt": "2021-02-01T14:35:27.159Z"
}
```

_Respons (400 - Bad Reques)_
```
{
  "message" : "SequelizeValidationError"
}
```
_Respons (404 - not found)_
```
{
  "message" : "data not found"
}
```
_Respons (500 - internal server error)_
```
{
  "message" : "internal server error"
}
```

## DELETE /todos/:id
>Creat new asset


_Request Header_
```
not needed
```
_Request Body_
```
not needed
```
_Request Params_
```
{
  id : 1
}
```
_Respons (200 - OK)_
```
{
  "message" : "data deleted succesfully"
}
```
_Respons (404 - not found)_
```
{
  "message" : "data not found"
}
```
_Respons (500 - internal server error)_
```
{
  "message" : "internal server error"
}
```


# User
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for register and login
* JSON formatted response

&nbsp;

## POST  /register
>Creat new asset

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email" : "<insert unique email to register>",
  "username" : "<create username to register>",
  "password" : "<create password to register>"
}
```
_Respons (201 - create)_
```
{
  "msg" : "Register Berhasil",
  "id" : 1,
  "username" : "tester"
}
```
_Respons (500 - internal server error)_
```
{
  "message" : "internal server error"
}
```
## POST  /login
>Creat new asset

_Request Header_
```
"acces_token" : "<your acces token>"
```
_Request Body_
```
{
  "email" : "<your email registered>",
  "password" : "<your password that match with email>"
}
```
_Respons (200 - OK)_
```
{
  "id": 3,
  "email": "testerr@email.com",
  "iat": 1612184659
}
```
_Respons (500 - internal server error)_
```
{
  "message" : "<error message>"
}
```


