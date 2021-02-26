# FANCY TODO APP
Fancy Todo App is an application to manage your daily activities. This app has:
* Endpoint CRUD operation for managing your todos
* JSON formatted response

&nbsp;

## Endpoints

### POST /todos

> Create new todo

Request:

- headers: access_token (string)

_Request Body_
```
{
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due date to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "updatedAt": "2021-02-01T14:54:58.866Z",
    "createdAt": "2021-02-01T14:54:58.866Z"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid date"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos

> GET all todos

Request:

- headers: access_token (string)

_Request Body_
```
not needed
```
_Response (200)_
```
[
    {
        "id": 1,
        "title": "<todo name>",
        "description": "<description name>",
        "status": "<status name>",
        "due_date": "<due_date name>",
        "createdAt": "2021-02-01T10:34:13.796Z",
        "updatedAt": "2021-02-01T10:34:13.796Z"
    },
    {
        "id": 2,
        "title": "<todo name>",
        "description": "<description name>",
        "status": "<status name>",
        "due_date": "<due_date name>",
        "createdAt": "2021-02-01T10:34:13.796Z",
        "updatedAt": "2021-02-01T10:34:13.796Z"
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

> GET todo by ID

Request:

- headers: access_token (string)

_Request Body_
```
not needed
```
_Request Params_
```
id = INTEGER
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T10:34:13.796Z",
    "updatedAt": "2021-02-01T10:34:13.796Z"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid date"
}
```
_Response (404 - Not Found)_
```
{
  "message": "there is no todo with id: 5"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PUT /todos/:id

> PUT update todo

Request:

- headers: access_token (string)

_Request Body_
```
{
    "title": "<name to get update>",
    "description": "<description to get update>",
    "status": "<status to get update>",
    "due_date": "<due date to get update>"
}
```
_Request Params_
```
id = INTEGER
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T10:34:13.796Z",
    "updatedAt": "2021-02-01T10:34:13.796Z"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid date"
}
```
_Response (404 - Not Found)_
```
{
  "message": "there is no todo with id: 5"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
### PATCH /todos/:id

> PATCH update status todo

Request:

- headers: access_token (string)

_Request Body_
```
{
    "status": "<status to get update>"
}
```
_Request Params_
```
id = INTEGER
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T10:34:13.796Z",
    "updatedAt": "2021-02-01T10:34:13.796Z"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (404 - Not Found)_
```
{
  "message": "there is no todo with id: 5"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

> DELETE todo

Request:

- headers: access_token (string)

_Request Body_
```
not needed
```
_Request Params_
```
id = INTEGER
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T10:34:13.796Z",
    "updatedAt": "2021-02-01T10:34:13.796Z"
}
```
_Response (404 - Not Found)_
```
{
  "message": "there is no todo with id: 5"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /signIn

> Sign In Account

_Request Body_
- data:

```json
{
  "email": "string",
  "password": "string"
}
```
_Response (200)_
```json
{   
    "access_token" : "<string>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /signUp

> Create New Account

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201)_ 

-body:

```json
{
  "msg" : "Sign Up success",
  "id" : "<integer>",
  "email": "<string>",
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /googleLogin

> Login with OAuth Google 

_Request Body_

- data: 

```json
{
  "id token": "<your token>"
}
```

_Response (200)_
- data :

```json
{
  "id" : "integer",
  "email" : "string"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```