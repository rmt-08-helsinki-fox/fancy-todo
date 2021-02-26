# fancy-todo# fancy-todo
##Restful endpoints

# URL
```
Server URL : http://localhost:3000
```

### GET/todos
>get all todos list that user owns

_Request Header_
```
{
  access_token: access_token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```

[
    {
        "id": 1,
        "title": "kerjain challenge",
        "description": "ngantuk",
        "status": false,
        "due_date": "2020-02-02T00:00:00.000Z",
        "createdAt": "2021-02-02T13:23:56.455Z",
        "updatedAt": "2021-02-02T13:23:56.455Z",
        "UserId": 1
    },
    {
        "id": 2,
        "title": "kerjain challenge session 2",
        "description": "ngantuk tak tertahankan",
        "status": false,
        "due_date": "2020-02-02T00:00:00.000Z",
        "createdAt": "2021-02-02T13:25:04.942Z",
        "updatedAt": "2021-02-02T13:25:04.942Z",
        "UserId": 1
    }
]

```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid Token"
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### POST/todos
>post a todo list

_Request Header_
```
{
  access_token: access_token
}
```
_Request Body_
```
{
  title: <string>,
  description: <string>,
  due_date: <date>
}

```
_Response (201)_
```

{
    "id": 9,
    "title": "kerjain challenge session 2",
    "description": "ngantuk tak tertahankan",
    "due_date": "2020-02-02T00:00:00.000Z",
    "UserId": 5,
    "updatedAt": "2021-02-26T02:52:38.043Z",
    "createdAt": "2021-02-26T02:52:38.043Z",
    "status": false
}

```

_Response(401- Unauthorized)_
```
{
    "message": "Invalid Token"
}
```

_Response(400- Bad Request)_
```
{
    "errors": [
        "Date must be at least today"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### GET/search
>post a todo list

_Request Header_
```
{
  access_token: access_token
}
```
_Request Body_
```
not needed
```
_Response (200)_OK
```

[
    {
        "title": "Senior Front End Engineer",
        "company": "10up Inc.",
        "url": null
    },
    {
        "title": "Senior Front End Engineer",
        "company": "10up Inc.",
        "url": null
    },
    {
        "title": "Senior Front End Engineer",
        "company": "10up Inc.",
        "url": null
    }
]
```

_Response(401- Unauthorized)_
```
{
    "message": "Invalid Token"
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### POST/login
>post a todo list

_Request Header_
```
not needed
```
_Request Body_
```
{
  email: <string>,
  password: <string>
}
```
_Response (200)_OK
```

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVubzJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjo1LCJpYXQiOjE2MTQzMDc3NDd9.Q4evaqrhwYATD5u0aUWmGxTwQFNiDWaElQexUwIn8yQ"
}
```

_Response(404- Not Found)_
```
{
    "errors": [
        "Data Not Found"
    ]
}
```

_Response(400- Bad Request)_
```
{
    "errors": [
        "Invalid email or password"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### POST/Register
>post a register account

_Request Header_
```
not needed
```
_Request Body_
```
{
  name: <string>,
  email: <string>,
  password: <string>
}
```
_Response (201)_Created
```

{
    "msg": "Register success",
    "id": 5,
    "email": "arjuno2@mail.com"
}
```

_Response(400- Bad Request)_
```
{
    "errors": [
        "Name is required",
        "Invalid email format",
        "Password is required"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### GET/todos/:id
>post a register account

_Request Header_
```
{
  access_token: access_token,
  id: req.params.id
}
```
_Request Body_
```

```
_Response (200)_OK
```

{
    "id": 3,
    "title": "kerjain challenge 3",
    "description": "ngantuk",
    "status": false,
    "due_date": "2020-02-02T00:00:00.000Z",
    "createdAt": "2021-02-06T06:34:25.568Z",
    "updatedAt": "2021-02-06T06:34:25.568Z",
    "UserId": 1
}
```

_Response (401 - UnauthorizedUser)_
```
{
    "errors": [
        "Unauthorized User"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### PUT/todos/:id
>post a register account

_Request Header_
```
{
  access_token: access_token,
  id: req.params.id
}
```
_Request Body_
```
{
  title: <string>, 
  description: <string>, 
  due_date: <date>
}
```
_Response (200)_OK
```

[
  1
]
```

_Response (401 - UnauthorizedUser)_
```
{
    "errors": [
        "Unauthorized User"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### PATCH/todos/:id
>post a register account

_Request Header_
```
{
  access_token: access_token,
  id: req.params.id
}
```
_Request Body_
```
not needed
```
_Response (200)_OK
```

[
  1
]
```

_Response (401 - UnauthorizedUser)_
```
{
    "errors": [
        "Unauthorized User"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

### DELETE/todos/:id
>post a register account

_Request Header_
```
{
  access_token: access_token,
  id: req.params.id
}
```
_Request Body_
```
not needed
```
_Response (200)_OK
```

[
  1
]
```

_Response (401 - UnauthorizedUser)_
```
{
    "errors": [
        "Unauthorized User"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```

