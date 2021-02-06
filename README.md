# fancy-todo
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
  access_token: token
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