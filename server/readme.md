# My Fancy Todo App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

##  Endpoints
### POST /todos

> Create new todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date""<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": 12,
    "title": "diving",
    "description": "diving in ancol",
    "status": false,
    "due_date": "2021-02-01T17:00:00.000Z",
    "UserId": 8,
    "updatedAt": "2021-02-02T11:57:10.486Z",
    "createdAt": "2021-02-02T11:57:10.486Z"
}
```

_Response (400 - Bad Request)_
```
[
    "Validation isAfter on due_date failed"
]
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;
### GET /todos

> Get all todos

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
        "id": 10,
        "title": "playing batminton",
        "description": "playing tennis in surabaya",
        "status": true,
        "due_date": "2021-02-04T17:00:00.000Z",
        "UserId": 8,
        "createdAt": "2021-02-02T11:29:51.364Z",
        "updatedAt": "2021-02-02T11:30:13.823Z"
    },
    {
        "id": 11,
        "title": "Playing football",
        "description": "Playing football in surabaya",
        "status": false,
        "due_date": "2021-02-01T17:00:00.000Z",
        "UserId": 8,
        "createdAt": "2021-02-02T11:30:38.844Z",
        "updatedAt": "2021-02-02T11:30:38.844Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
### GET /todos/:id

> Get todos by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
``` id ```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 10,
    "title": "playing batminton",
    "description": "playing tennis in surabaya",
    "status": true,
    "due_date": "2021-02-04T17:00:00.000Z",
    "UserId": 8,
    "createdAt": "2021-02-02T11:29:51.364Z",
    "updatedAt": "2021-02-02T11:30:13.823Z"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "cannot acces"
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---

### PUT /todos/:id

> Edit Todo All Field

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
``` id ```

_Request Body_
```
{
  "title": '<title to get insert into>',
  "description": '<description to get insert into>',
  "status": '<status to get insert into>',
  "due_date": '<due_date to get insert into>' 
}
```

_Response (201 - Created)_
```
[
    1,
    [
        {
            "id": 10,
            "title": "playing tennis",
            "description": "playing tennis in surabaya",
            "status": false,
            "due_date": "2021-02-04T17:00:00.000Z",
            "UserId": 8,
            "createdAt": "2021-02-02T11:29:51.364Z",
            "updatedAt": "2021-02-02T12:01:48.207Z"
        }
    ]
]
```
_Response (401 - Unauthorized)_
```
{
    "message": "cannot acces"
}
```

_Response (400 - Bad request)_
```
[
    "Validation isAfter on due_date failed"
]
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---
### PATCH /todos/:id

> Update Status By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
``` id ```

_Request Body_
```
{
  "<status>": '<status to get insert into>'
}
```

_Response (201 - Created)_
```
[
    1,
    [
        {
            "id": 10,
            "title": "playing tennis",
            "description": "playing tennis in surabaya",
            "status": true,
            "due_date": "2021-02-04T17:00:00.000Z",
            "UserId": 8,
            "createdAt": "2021-02-02T11:29:51.364Z",
            "updatedAt": "2021-02-02T12:05:02.636Z"
        }
    ]
]
```
_Response (401 - Unauthorized)_
```
{
    "message": "cannot acces"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---
### DELETE /todos/:id

> Delete Todo By ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
``` id ```

_Request Body_
```
not needed
```


_Response (200 - Ok)_
```
{
    "msg": "delete succes"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "cannot acces"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;

### POST /register

> Create new User

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<description to get insert into>",
  "location": "<location to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "user": {
        "id": 17,
        "email": "amira@mail.com",
        "password": "$2a$05$e3tvToFMqRtBNq8zozSHV.Fiwsd293CMVko3yjgs072ep9pB9/c9K",
        "location": "Bandung",
        "updatedAt": "2021-02-02T09:32:50.700Z",
        "createdAt": "2021-02-02T09:32:50.700Z"
    },
    "wheater": {
        "country_code": "ID",
        "lon": 111.7844,
        "timezone": "Asia/Jakarta",
        "lat": -8.1676,
        "alerts": [],
        "city_name": "Bandung",
        "state_code": "08"
    }
}
```

_Response (400 - Bad Request)_
```
[
    "email must be unique"
]
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;
### POST /login

> Login

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<description to get insert into>"
}
```

_Response (200 - Ok)_
```
{
"getToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJpcndhbkBtYWlsLmNvbSIsImlhdCI6MTYxMjI2NTMwNn0.a3a5JYeHLU76PjmmQWK06B9kq3JE5S5MzpIjnSwkMqU"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "invalid email or password"
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;
### GET /users/location

> Get todos by id

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
    "wheater": {
        "country_code": "ID",
        "lon": 112.75083,
        "timezone": "Asia/Jakarta",
        "lat": -7.24917,
        "alerts": [],
        "city_name": "Surabaya",
        "state_code": "08"
    }
}
```
_Response (400 - Bad Request)_
```
{
    "message": "jwt must be provided"
}
```