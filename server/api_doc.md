# FANCY-TODO SERVER
This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints :
___
### POST /todos

> Create new todo

_Request Header_
```json
{
  "Content-Type": "application/json",
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
  
}
```

_Response (201 - Created)_
```json
{
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": [
        "<error.message>",
        "<error.message>",
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
---
### GET /todos

> Get all todos

_Request Header_
```json
{
  "Content-Type": "application/json",
  "access_token": "<access_token>"
}

_Request Body_
```
```

_Response (200 - OK)_
```json
[
    {
        "id": "<todo id>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>"
    },
    {
        "id": "<todo id>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>"
    }
]
```

_Response (400 - Bad Request)_
```json
{
    "message": [
        "<error.message>",
        "<error.message>",
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
```
___
### PUT /todos/:id

> Update a todo

_Request Header_
```json
{
  "Content-Type": "application/json",
  "access_token": "<access_token>"
}

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
  
}
```

_Response (200 - OK)_
```json
{
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": [
        "<error.message>",
        "<error.message>",
        "<error.message>"
    ]
}
```

_Response (404 - Not Found)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
---
### PATCH /todos/:id

> Update a todo status

_Request Header_
```json
{
  "Content-Type": "application/json",
  "access_token": "<access_token>"
}

_Request Body_
```json
{
  "status": "<todo status>",
}
```

_Response (200 - OK)_
```json
{
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": [
        "<error.message>",
        "<error.message>",
        "<error.message>"
    ]
}
```

_Response (404 - Not Found)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
---
### Delete /todos/:id

> Delete a todo

_Request Header_
```json
{
  "Content-Type": "application/json",
  "access_token": "<access_token>"
}

_Request Body_
```

```

_Response (200 - OK)_
```json
{
  "message": "todo success to delete"
}
```

_Response (500 - Internal Server Error)_
```
"Internal Server Error"
```
---

### Register /register

> Register new User

_Request Header_
```json
{
  "Content-Type": "application/json"
}

_Request Body_
```json
{
  "email": "<user email>",
  "password": "<user password>"
}
```

_Response (201 - Create)_
```json
{
  "id": "<user id>",
  "email": "<user email>"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": [
        "<error.message>",
        "<error.message>",
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
---

### Login /login

> Login a User

_Request Header_
```json
{
  "Content-Type": "application/json"
```

_Request Body_
```json
{
  "email": "<user email>",
  "password": "<user password>"
}
```

_Response (200 - OK)_
```json
{
   "access_token": "<access_token>"
}
```

_Response (401 - Unauthorize)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": [
        "<error.message>"
    ]
}
```
---