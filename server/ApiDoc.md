# Fancy Todo App Server
Fancy Todo App is an application to manage your Todo. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

&nbsp;

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
{
    "message": "Success",
    "data": [
        {
            "id": 13,
            "title": "doing rest api",
            "description": "ngerjain server todo app",
            "status": false,
            "due_date": "2021-02-01",
            "createdAt": "2021-02-01T12:12:49.124Z",
            "updatedAt": "2021-02-01T12:12:49.124Z"
        },
        {
            "id": 14,
            "title": "doing rest api",
            "description": "ngerjain server todo app",
            "status": false,
            "due_date": "2021-02-01",
            "createdAt": "2021-02-01T12:12:50.197Z",
            "updatedAt": "2021-02-01T12:12:50.197Z"
        }
    ],
    "response": true
}
```
_Response (404 - Not Found)_
```
{
    "message": "Data not found",
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```

&nbsp;

---
### GET /todos/:id

> Get todo by id

&nbsp;

_Request Params_
```
id todo from Todos table
```

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

_Response (200)_
```
{
    "message": "Success",
    "data": {
        "id": 14,
        "title": "doing rest api",
        "description": "ngerjain server todo app",
        "status": false,
        "due_date": "2021-02-01",
        "createdAt": "2021-02-01T12:12:50.197Z",
        "updatedAt": "2021-02-01T12:12:50.197Z"
    },
    "response": true
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found",
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```

&nbsp;


---
### POST /todos

> Create new todo

&nbsp;

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title todo to get insert into>",
  "description": "<description to get insert into>",
  "status": <Boolean to get insert into>,
  "due_date": <Date(yyyy-mm-dd) to get insert into>,
}
```

_Response (201 - Created)_
```
{
    "message": "Success",
    "data": {
        "todo": {
            "id": 27,
            "title": "auth",
            "description": "ngerjain auth",
            "status": false,
            "due_date": "2021-02-03",
            "user_id": 7,
            "updatedAt": "2021-02-02T09:28:23.013Z",
            "createdAt": "2021-02-02T09:28:23.013Z"
        },
        "quotes": "Try to learn something about everything and everything about something. --Thomas Henry Huxley"
    },
    "response": true
}
```

_Response (400 - Bad Request)_
* Error validate
```
{
    "message": [
        "Title can't be empty",
        "Status can't be empty"
    ],
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```

&nbsp;

### PUT /todos/:id

> Update todo by id

&nbsp;

_Request Params_
```
id todo from Todos table
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title todo to get insert into>",
  "description": "<description to get insert into>",
  "status": <Boolean to get insert into>,
  "due_date": <Date(yyyy-mm-dd) to get insert into>,
}
```

_Response (200 - Ok)_
```
{
    "message": "Success",
    "data": {
        "id": 13,
        "title": "fancy todo",
        "description": "server todo app",
        "status": true,
        "due_date": "2021-02-01",
        "createdAt": "2021-02-01T12:12:49.124Z",
        "updatedAt": "2021-02-01T12:30:15.120Z"
    },
    "response": true
}
```

_Response (400 - Bad Request)_
* Error validate
```
{
    "message": [
        "Title can't be empty",
        "Status can't be empty"
    ],
    "response": false
}
```
_Response (404 - Not Found)_
* Error not found
```
{
    "message": "Data not found",
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```

&nbsp;

### PATCH /todos/:id

> Update status by id

&nbsp;

_Request Params_
```
id todo from Todos table
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": <Boolean to get insert into>
}
```

_Response (200 - Ok)_
```
{
    "message": "Success",
    "data": {
        "id": 13,
        "title": "fancy todo",
        "description": "server todo app",
        "status": false,
        "due_date": "2021-02-01",
        "createdAt": "2021-02-01T12:12:49.124Z",
        "updatedAt": "2021-02-01T12:33:58.819Z"
    },
    "response": true
}
```

_Response (400 - Bad Request)_
* Error validate
```
{
    "message": "Status can't be empty",
    "response": false
}
```
_Response (404 - Not Found)_
* Error not found
```
{
    "message": "Data not found",
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```

&nbsp;

### DELETE /todos/:id

> Delete todo by id

&nbsp;

_Request Params_
```
id todo from Todos table
```

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

_Response (200 - Ok)_
```
{
    "message": "Success",
    "data": {
        "id": 13,
        "title": "fancy todo",
        "description": "server todo app",
        "status": false,
        "due_date": "2021-02-01",
        "createdAt": "2021-02-01T12:12:49.124Z",
        "updatedAt": "2021-02-01T12:33:58.819Z"
    },
    "response": true
}
```


_Response (404 - Not Found)_
* Error not found
```
{
    "message": "Data not found",
    "response": false
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token",
    "response": false
}
```