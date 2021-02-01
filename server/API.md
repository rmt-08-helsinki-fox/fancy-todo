# Fancy Todo
Fancy Todo is an application to manage your todo list. This app has :
* RESTful endpoint for todo list's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos
_Request Body_
```
{
  "title": "Challenge 3",
  "description": "Membuat FancyTodo 3",
  "status": false,
  "due_date": "2021-02-07"
}
```
_Success Response (201)_
```
{
  "id": 10,
  "title": "Challenge 3",
  "description": "Membuat FancyTodo 3",
  "status": false,
  "due_date": "2021-02-07T00:00:00.000Z",
  "updatedAt": "2021-02-01T16:48:38.866Z",
  "createdAt": "2021-02-01T16:48:38.866Z"
}
```
_Error Response (400)_
```
{
  "msg": "Can not Choose Past Date"
}
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```

### GET /todos
_Request Body_
```
not needed
```
_Success Response (200)_
```
[
  {
    "id": 1,
    "title": "Challenge 1",
    "description": "Membuat FancyTodo 1",
    "status": false,
    "due_date": "2021-01-05T00:00:00.000Z",
    "createdAt": "2021-02-01T08:40:35.959Z",
    "updatedAt": "2021-02-01T08:40:35.959Z"
  },
]
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```

### GET /todos/:id
_Request Params_
```
{
  "id": 10
}
```
_Success Response (200)_
```
{
  "id": 10,
  "title": "Challenge 3",
  "description": "Membuat FancyTodo 3",
  "status": false,
  "due_date": "2021-02-07T00:00:00.000Z",
  "updatedAt": "2021-02-01T16:48:38.866Z",
  "createdAt": "2021-02-01T16:48:38.866Z"
}
```
_Error Response (404)_
```
{
  "msg": "Error not Found"
}
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```

### PUT /todos/:id
_Request Body_
```
{
  "title": "Challenge 4",
  "description": "Membuat FancyTodo 4",
  "status": false,
  "due_date": "2021-02-08",
}
```
_Request Params_
```
{
  "id": 10
}
```
_Success Response (200)_
```
{
  "id": 10,
  "title": "Challenge 4",
  "description": "Membuat FancyTodo 4",
  "status": false,
  "due_date": "2021-02-08T00:00:00.000Z",
  "createdAt": "2021-02-01T16:48:38.866Z",
  "updatedAt": "2021-02-01T17:05:42.399Z"
}
```
_Error Response (404)_
```
{
  "msg": "Error not Found"
}
```
_Error Response (400)_
```
{
  "msg": "Can not Choose Past Date"
}
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```

### PATCH /todos/:id
_Request Body_
```
{
  "status": true
}
```
_Request Params_
```
{
  "id": 10
}
```
_Success Response (200)_
```
{
  "id": 10,
  "title": "Challenge 4",
  "description": "Membuat FancyTodo 4",
  "status": true,
  "due_date": "2021-02-08T00:00:00.000Z",
  "createdAt": "2021-02-01T16:48:38.866Z",
  "updatedAt": "2021-02-01T17:05:42.399Z"
}
```
_Error Response (404)_
```
{
  "msg": "Error not Found"
}
```
_Error Response (400)_
```
{
  "msg": "Can not Choose Past Date"
}
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```

### DELETE /todos/:id

_Request Params_
```
{
  "id": 7
}
```
_Success Response (200)_
```
{
  "msg": "Todo Success to Delete"
}
```
_Error Response (404)_
```
{
  "msg": "Error not Found"
}
```
_Error Response (500)_
```
{
  "msg": "Internal Server Error"
}
```