# Fancy Todo App Server
Aplikasi ini adalah aplikasi yang dapat membatu anda dalam mengatur waktu dan kegiatan yang akan anda lakukan kedepannya.

&nbsp;

## List of Endpoints

###  >> USER  
```
- POST /user/register
- POST /user/login
```

&nbsp;
###  >> TODO
```
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos/:id
```

&nbsp;

## RESTfull Endpoints

### POST /user/register
> Create a new user

_Request Header_
```
{
    not needed
}
```

_Request Body_
```
{
    "fullname": "<fullname get from insert into>",
    "email": "<email get from insert into>",
    "password": "<password get from insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "fullname": "<posted fullname>",
    "email": "<posted email>",
    "password": "<posted password>"
    "createdAt": "<given createdAt by system>",
    "updatedAt": "<given updatedAt by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "fullname is required"
  "message": "email is required"
  "message": "password be greater or equal than today"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### POST /user/login
> for user login and get access token

_Request Header_
```
{
    not needed
}
```

_Request Body_
```
{
    "email": "<email get from insert into>",
    "password": "<password get from insert into>"
}
```

_Response (200 - Ok)_
```
{
    "access_token": <given access_token by system>,
}
```

_Response (401 - Unautorized)_
```
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /todos
> Create a Todo

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title get from insert into>",
    "description": "<description get from insert into>",
    "status": "<status get from insert into>",
    "due_date": "<due_date get from insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
  "message": "Description is required"
  "message": "must be greater or equal than today"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /todos
> Get all Todos
_Request Header_
```
{
    "access_token": "<your access token>"
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
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>",
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>",
    },
    {
        ...
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /todos/:id
> Get all Todos

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
    not needed
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "id": <id by params>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```
---

### PUT /todos/:id

> Update Todo by Id

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title get from update>",
    "description": "<description get from update>",
    "status": "<status get from update>",
    "due_date": "<due_date get from update>"
}
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "<given createdAt by system>",
    "updatedAt": "<given updatedAt by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
  "message": "Description is required"
  "message": "must be greater or equal than today"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /todos/:id
> Update Status Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "status": "<status to get update>"
}
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "id": <id by params>,
    "status": "<updated status>"
    "updatedAt": "<updatedAt given by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
  "message": "Description is required"
  "message": "must be greater or equal than today"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /todos/:id
> Delete Data Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "message:" "Todo Success to Deleted"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```