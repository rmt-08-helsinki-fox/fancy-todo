# Fancy ToDo App

## RESTful endpoints
### POST /todos

> Create list of todos of current logged in profile

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<your title>",
  "description": "<your description>",
  "status": "<your status>",
  "due_date": "<your due date>"
}
```

_Response (200)_
```
[
    {
        "id": 1,
        "title": "sleeping",
        "description": "bed time",
        "status": false,
        "due_date": "2021-03-10T00:00:00.000Z",
        "createdAt": "2021-02-02T18:18:05.545Z",
        "updatedAt": "2021-02-02T18:18:05.545Z",
        "UserId": 1
    }
]
```

_Response (400)_
```
[
    {
        "errors": "invalid due date"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### GET /todos

> Get list of todos of current logged in profile

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
[
    {
        "id": 1,
        "title": "sleeping",
        "description": "bed time",
        "status": false,
        "due_date": "2021-03-10T00:00:00.000Z",
        "createdAt": "2021-02-02T18:18:05.545Z",
        "updatedAt": "2021-02-02T18:18:05.545Z",
        "UserId": 1
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### GET /todos:id
_Request Header_
> Get list of todos of current logged-in profile

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
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
        "title": "sleeping",
        "description": "bed time",
        "status": false,
        "due_date": "2021-03-10T00:00:00.000Z",
        "createdAt": "2021-02-02T18:18:05.545Z",
        "updatedAt": "2021-02-02T18:18:05.545Z",
        "UserId": 1
    }
]
```

_Response (401)_
```
[
    {
        "error": "not authorized"
    }
]
```

_Response (404)_
```
[
    {
        "error": "id not found"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### PUT /todos:id
_Request Header_
> edit list of todos of current logged-in profile

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Request Body_
```
{
  "title": "<your title>",
  "description": "<your description>",
  "status": "<your status>",
  "due_date": "<your due date>"
}
```

_Response (200)_
```
[
  1,
  [
    {
        "id": 1,
        "title": "sleeping",
        "description": "bed time",
        "status": false,
        "due_date": "2021-03-10T00:00:00.000Z",
        "createdAt": "2021-02-02T18:18:05.545Z",
        "updatedAt": "2021-02-02T18:18:05.545Z",
        "UserId": 1
    }
  ]
]
```

_Response (400)_
```
[
    {
        "errors": "invalid due date"
    }
]
```

_Response (401)_
```
[
    {
        "error": "not authorized"
    }
]
```

_Response (404)_
```
[
    {
        "error": "id not found"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### PATCH /todos:id
_Request Header_
> edit status of todo list current logged-in profile

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Request Body_
```
{
  "status": "<your status>",
}
```

_Response (200)_
```
[
  1,
  [
    {
        "id": 1,
        "title": "sleeping",
        "description": "bed time",
        "status": false,
        "due_date": "2021-03-10T00:00:00.000Z",
        "createdAt": "2021-02-02T18:18:05.545Z",
        "updatedAt": "2021-02-02T18:18:05.545Z",
        "UserId": 1
    }
  ]
]
```

_Response (401)_
```
[
    {
        "error": "not authorized"
    }
]
```

_Response (404)_
```
[
    {
        "error": "id not found"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### DELETE /todos:id
_Request Header_
> delete list of todos of current logged-in profile

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "todo success to delete"
}
```

_Response (401)_
```
[
    {
        "error": "not authorized"
    }
]
```

_Response (404)_
```
[
    {
        "error": "id not found"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### GET /quotes

> Get random quotes

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "randomQuote": "If you must tell me your opinions, tell me what you believe in. I have plenty of douts of my own. "
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```
---
### POST /login

> Create access token and login for existing user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
    "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid Token"
}
```

---
### POST /googlelogin

> Create new user and login using google account

_Request Header_
```
{
  "idToken": <your google token>
  "audience": <your client id>
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "access_token": <your access token>
}
```

_Response (201 - Created)_
```
{
  "access_token": <your access token>
}
```

_Response (400 - Bad Request)_
```
{
  "msg": "Invalid requests"
}
```