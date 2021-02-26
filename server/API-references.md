# Fancy Todo 

## Endpoints
---

## POST /todos

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Param
```
not needed
```

Request Body
```
{
  "title": "<todo title/name>",
  "description": "<some details related to title>",
  "status": "<notes for the related todo already done or not>",
  "due_date": "<todo deadline date>"
},
{
  "title": "<todo title/name>",
  "description": "<some details related to title>",
  "status": "<notes for the related todo already done or not>",
  "due_date": "<todo deadline date>"
  "location": "<input your current location to get info about today weather>"
}

```

Response(201)
```
{
    "id": 9,
    "title": "belajar nodejs",
    "description": "assist bersama buddy",
    "status": "undone",
    "due_date": "2021-03-01T00:00:00.000Z",
    "updatedAt": "2021-02-01T13:42:20.022Z",
    "createdAt": "2021-02-01T13:42:20.022Z"
},

[
    {
        "id": 57,
        "title": "makan malam",
        "description": "makan diluar(restoran)",
        "status": "undone",
        "due_date": "2021-03-01T00:00:00.000Z",
        "user_id": 2,
        "updatedAt": "2021-02-03T11:28:24.058Z",
        "createdAt": "2021-02-03T11:28:24.058Z"
    },
    [
        "Partly cloudy"
    ]
]
```

Response(400)
```
{
    "messages": [
        "title cannot be empty",
        "status cannot be empty"
    ]
}
```

Response(500)
```
{
    "message": "Internal Server Error"
}

```

---
## GET /todos

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Param
```
not needed
```

Request Body
```
not needed
```

Response(200)
```
[
    {
        "id": 9,
        "title": "belajar nodejs",
        "description": "assist bersama buddy",
        "status": "done",
        "due_date": "2021-03-01T00:00:00.000Z",
        "createdAt": "2021-02-01T13:42:20.022Z",
        "updatedAt": "2021-02-01T13:42:20.022Z"
    },
    {
        "id": 10,
        "title": "makan malam",
        "description": "makan bersama keluarga di restoran",
        "status": "undone",
        "due_date": "2021-03-01T00:00:00.000Z",
        "createdAt": "2021-02-01T13:50:00.261Z",
        "updatedAt": "2021-02-01T13:50:00.261Z"
    }
]
```
Response(401)
```
{
    "message": "Invalid Token"
}
```

Response(500)
```
{
    "message": "Internal ServerError"
}
```
---
## GET /todos/:id

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Body
```
not needed
```

Request Param
```
Required :

"id": <todo identifier number>
```

Response(200)
```
{
    "id": 9,
    "title": "belajar nodejs",
    "description": "assist bersama buddy",
    "status": "undone",
    "due_date": "2021-03-01T00:00:00.000Z",
    "createdAt": "2021-02-01T13:42:20.022Z",
    "updatedAt": "2021-02-01T13:42:20.022Z"
}
```

Response(401)
```
{
    "message": "Invalid Token"
}
```

Response(404)
```
{
    "message": "error not found"
}
```
---
## PUT /todos/:id

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Param
```
Required :
"id": <todo identifier number>
```

Request Body
```
{
  "title": "<todo title/name>",
  "description": "<some details related to title>",
  "status": "<notes for the related todo already done or not>",
  "due_date": "<todo deadline date>"
}
```

Response(200)
```
[
    1,
    [
        {
            "id": 9,
            "title": "belajar css",
            "description": "",
            "status": "done",
            "due_date": "2021-02-02T00:00:00.000Z",
            "createdAt": "2021-02-01T13:42:20.022Z",
            "updatedAt": "2021-02-01T14:13:48.520Z"
        }
    ]
]
```

Response(400)
```
{
    "messages": [
        "title cannot be empty",
        "status cannot be empty"
    ]
}
```

Response(401)
```
{
    "message": "Invalid Token"
}
```

Response(404)
```
{
    "message": "error not found"
}
```

Response(500)
```
{
    "message": "Internal Server Error"
}
```
---
## PATCH /todos/:id

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Param
```
Required :

"id": <todo identifier number>
```

Request Body
```

"status": "<notes for the related todo already done or not>"
```

Response(200)
```
[
    1,
    [
        {
            "id": 9,
            "title": "belajar css",
            "description": "",
            "status": "done",
            "due_date": "2021-02-02T00:00:00.000Z",
            "createdAt": "2021-02-01T13:42:20.022Z",
            "updatedAt": "2021-02-01T14:20:28.352Z"
        }
    ]
]
```

Response(400)
```
{
    "messages": [
        "status cannot be empty"
    ]
}
```

Response(401)
```
{
    "message": "Invalid Token"
}
```

Response(404)
```
{
    "message": "error not found"
}
```
---
## DELETE /todos/:id

Request Header
```
{
  "access_token": "token received after login"
}
```

Request Param
```
Required :

"id": <todo identifier number>
```

Request Body
```
not needed
```

Response(200)
```
{
    "message": "todo success to delete"
}
```

Response(401)
```
{
    "message": "Invalid Token"
}
```

Response(404)
```
{
    "message": "error not found"
}
```

Response(500)
```
{
    "message": "Internal Server Error"
}
```


