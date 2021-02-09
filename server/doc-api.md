# Fancy Todo apps Server

&nbsp;

## RESTful endpoints
----

### POST /users/register

> Post new User Data

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password: "<your password>"
}
```

_Response (201)_
```
[
  id: "<your id>"
  email: "<your email>"
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password: "<your password>"
}
```

_Response (200 - OK)_
```
{
  "access_token" = "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /googleLogin

_Request Header_
```
not needed
```

_Request Body_
```
{
  "google token" = "<your id token>
}
```

_Response (200 - OK)_
```
{
  "access_token" = "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /todos

_Request Header_
```
{
  "access_token" = "<your access token>"
}
```

_Request Body_
```
{
  "title" : "<todo title>",
  "description" : "<todo description>",
  "status" : "<todo status>"
  "due_date" : <todo due date>
}
```

_Response (200 - OK)_
```
{
  "id" : 1
  "title" : "Makan",
  "description" : "Makan malam",
  "status" : "not done"
  "due_date" : "2021-02-14"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todos

_Request Header_
```
{
  "access_token" = "<your access token>"
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
    "id" : 1
    "title" : "Makan",
    "description" : "Makan malam",
    "status" : "not done"
    "due_date" : "2021-02-14"
  },
  {
    "id" : 2
    "title" : "Tidur",
    "description" : "Tidur jam 22.00",
    "status" : "not done"
    "due_date" : "2021-02-14"
  },
  ...
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todos/:id

_URL Params_
`id=[integer]`

_Request Header_
```
{
  "access_token" = "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id" : 2
  "title" : "Tidur",
  "description" : "Tidur jam 22.00",
  "status" : "not done"
  "due_date" : "2021-02-14"
}
```

_Response (404 - Not Found)_
```
{
  "message": "error not found"
}
```

### PUT /todos/:id

_URL Params_
`id=[integer]`

_Request Header_
```
{
  "access_token" = "<your access token>"
}
```

_Request Body_
```
{
  "id" : 2
  "title" : "Tidur",
  "description" : "Tidur jam 22.00",
  "status" : "not done"
  "due_date" : "2021-02-14"
}
```

_Response (200 - OK)_
```
{
  "id" : 2
  "title" : "Tidur",
  "description" : "Tidur jam 21.00",
  "status" : "done"
  "due_date" : "2021-02-14"
}
```

_Response (404 - Not Found)_
```
{
  "message": "error not found"
}
```

### PATCH /todos/:id

_URL Params_
`id=[integer]`

_Request Header_
```
{
  "access_token" = "<your access token>"
}
```

_Request Body_
```
{
  "status" : "not done"
}
```

_Response (200 - OK)_
```
{
  "id" : 2
  "title" : "Tidur",
  "description" : "Tidur jam 21.00",
  "status" : "done"
  "due_date" : "2021-02-14"
}
```

_Response (404 - Not Found)_
```
{
  "message": "error not found"
}
```

### DELETE /todos/:id

_URL Params_
`id=[integer]`

_Request Header_
```
{
  "access_token" = "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message" : "todo success to delete"
}
```

_Response (404 - Not Found)_
```
{
  "message": "error not found"
}
```

### GET /holidays

_Request Header_
```
{
  "access_token" = "<your access token>"
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
    "date": 2021-01-01"
    "name": "Tahun Baru Masehi"
  },
  ...
]
```

_Response (404 - Not Found)_
```
{
  "message": "error not found"
}