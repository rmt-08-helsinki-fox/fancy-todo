# fancy-todo
fancy todo is an application to create the new activity that you want to do. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

##  Endpoint list fancy todo
### POST /todos

> Create New Activity

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<what do you want to do?>",
  "description": "<describe your activity>",
  "status": <done or not? (true/false)>,
  "due_date": <deadline (yyyy-mm-dd)>
}
```

_Response (201)_
```
example :


{
    "id": 11,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": <todo status>,
    "due_date": "<todo deadline>",
    "updatedAt": "2021-02-01T11:51:50.252Z",
    "createdAt": "2021-02-01T11:51:50.252Z"
}

```

_Response (400 - Validataion Error)_
```
example :

{
  "message": "Title must not Empty"
}
```


_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### GET /todos

> Show All Activity

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


[
    {
        "id": 1,
        "title": "menulis",
        "description": "asdfasdfs",
        "status": false,
        "due_date": "2021-02-15",
        "createdAt": "2021-02-02T07:55:03.258Z",
        "updatedAt": "2021-02-02T07:55:03.258Z",
        "UserId": 13
    },
    {
        "id": 3,
        "title": "menulis",
        "description": "asdfasdfs",
        "status": false,
        "due_date": "2021-02-15",
        "createdAt": "2021-02-02T07:58:21.232Z",
        "updatedAt": "2021-02-02T07:58:21.232Z",
        "UserId": 13
    }, 
    ...
]
```


_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### PUT /todos/:id

> Edit Activity 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
    "id": 1,
    "title": "menulis",
    "description": "asdfasdfs",
    "status": false,
    "due_date": "2021-02-15",
    "createdAt": "2021-02-02T07:55:03.258Z",
    "updatedAt": "2021-02-02T07:55:03.258Z",
    "UserId": 13
}

```
_Response (400 - Validation Error)_
```
example :

{
  "message": "Title must not Empty"
}
```
_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```



_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---
### PATCH /todos/:id

> Edit Status Activity 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
    "id": 3,
    "status": true,
    "createdAt": "2021-02-02T07:58:21.232Z",
    "updatedAt": "2021-02-02T10:14:41.059Z",
    "UserId": 13
}

```
_Response (400 - Validation Error)_
```
example :

{
  "message": "Title must not Empty"
}
```
_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```



_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### DELETE /todos/:id

> Edit Status Activity 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
      message : "todo success to delete"
}

```

_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---
### POST /register
> Register your account 


_Request Body_
```
{
    "email": <string>,
    "password" : <string>

}
```

_Response (201)_
```
example :

{
    "message": "success register",
    "email": "user2@mail.com"
}

```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---
### POST /login
> Login your account 


_Request Body_
```
{
    "message": "success register",
    "email": "user2@mail.com"
}
```

_Response (200)_
```
example :

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImVtYWlsIjoidXNlcjJAbWFpbC5jb20iLCJpYXQiOjE2MTI3NzYyNDJ9.7419DqJwIJiCCL6WHvDVziUiPdkL-bm14Q1DOfvtMIc"
}

```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

