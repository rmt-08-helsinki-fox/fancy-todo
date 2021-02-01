# Fancy Todo List

Fancy Todo List is app to manage your todolist. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos

> Create Todo

_Request Header_

```
-
```

_Request Body_

```
{
    "title": "Belajar API",
    "description": "Title description...",
    "status": false,
    "due_date": "2/2/2021"
}
```

_Response (201 - Created)_

```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted descriptiom>",
    "status": false,
    "due_date": "<posted due_date>",
    "updatedAt": "2021-02-01T15:35:58.137Z",
    "createdAt": "2021-02-01T15:35:58.137Z"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Due date at least tomorrow"
}
```

_Respone (500 - Internal Error)_

```
{
  "message": "Kesalahan server 500"
}
```

---

### GET /todos

> To Get All Todos in database

_Request Header_

```
{
 --
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
        "id": 15,
        "title": "Makan aa",
        "description": "Dirumah",
        "status": false,
        "due_date": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:28:46.062Z",
        "updatedAt": "2021-02-01T15:28:46.062Z"
    },
    {
        "id": 16,
        "title": "Makan bb",
        "description": "dirumah",
        "status": false,
        "due_date": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:31:55.106Z",
        "updatedAt": "2021-02-01T15:31:55.106Z"
    }
]
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

### PUT /todos/:id

> To Get spesific Todos in database

_Request Header_

```
{
 --
}
```

_Request Params_

```
{
    "id": 1
}
```

_Request Body_

```
{
    "title": "Belajar API",
    "description": "Title description...",
    "status": false,
    "due_date": "2/2/2021"
}
```

_Response (200)_

```
    {
        "id": 1,
        "title": "Makan aa",
        "description": "Dirumah",
        "status": false,
        "due_date": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:28:46.062Z",
        "updatedAt": "2021-02-01T15:28:46.062Z"
    }
```

_Response (404 - Not Fojund)_

```
{
  "message": "Id not found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Due date at least tomorrow"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Kesalahan server 500"
}
```

### PATCH /todos:id

> To Get All Todos in database

_Request Header_

```
{
 --
}
```

_Request Params_

```
{
    "id": 1
}
```

_Request Body_

```
{
    "status": false
}
```

_Response (200)_

```
    {
        "id": 15,
        "title": "Makan aa",
        "description": "Dirumah",
        "status": true,
        "due_date": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:28:46.062Z",
        "updatedAt": "2021-02-01T15:28:46.062Z"
    }
```

_Response (404 - Not Found)_

```
{
  "message": "Id not found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Due date at least tomorrow"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message":  "Kesalahan server 500"
}
```

### DELETE /todos:id

> To Get All Todos in database

_Request Header_

```
{
 --
}
```

_Request Params_

```
{
    "id": 1
}
```

_Response (200)_

```
{
    messagge: "todo succes to delete",

    {
        "id": 15,
        "title": "Makan aa",
        "description": "Dirumah",
        "status": true,
        "due_date": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:28:46.062Z",
        "updatedAt": "2021-02-01T15:28:46.062Z"
    }
}
```

_Response (404 - Not Found)_

```
{
  "message": "Id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message":  "Kesalahan server 500"
}
```
