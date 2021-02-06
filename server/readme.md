# Fancy Todo List

Fancy Todo List is app to manage your todolist.

&nbsp;

## RESTful endpoints

### POST /todos

> Create Todo

_Request Header_

```
{
  access_token: {-your aacces token-}
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
  "message": {errors: ["Title cannot be empty", "Description cannot be empty", "Due date at least tomorrow"]}
}
```

_Respone (500 - Internal Error)_

```
{
  "message": "Internal server error"
}
```

---

### GET /todos

> To Get All Todos in database

_Request Header_

```
{
  access_token: {-your aacces token-}
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

> To update all data in todos

_Request Header_

```
{
  access_token: {-your aacces token-}
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
  "message": {errors: ["Title cannot be empty", "Description cannot be empty", "Due date at least tomorrow"]}
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Kesalahan server 500"
}
```

### PATCH /todos:id

> To update spesific data todos

_Request Header_

```
{
  access_token: {-your aacces token-}
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
not needed

```

_Response (200)_

```
    {
        "id": 15,
        "title": "Makan aa",
        "description": "Dirumah",
        "status": <change false to true>,
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

_Response (500 - Internal Server Error)_

```
{
  "message":  "Internal server error"
}
```

### DELETE /todos:id

> To Delete todos

_Request Header_

```
{
  access_token: {-your aacces token-}
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
    "message": "Todo deleted"
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
  "message":  "Internal Server Error"
}
```

### POST /register

> To Delete todos

_Request Header_

```
not needed
```

_Response (200)_

```
{
    "message": "User created",
    "user": {
        "id": 5,
        "email": "admin@mail.com",
        "password": "$2a$10$PyPQdiGanJkCpX44ZI27XuNjfHDb727BR3WtF2FhDEMOBlReiReue",
        "updatedAt": "2021-02-05T17:14:50.725Z",
        "createdAt": "2021-02-05T17:14:50.725Z"
    }
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "Invalid email format",
        "Please insert your email",
        "Please insert your password",
        "Minimum password length is 8 characters and include number",
         "Email already taken"
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "message":  "Internal Server Error"
}
```

### POST /login

> To Delete todos

_Request Header_

```
not needed
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMjU3MzczM30.sjihnjlxC3KyGUZCBxig_UxZUXLv-nqWJpNt2ysocZ8"
}
```

_Response (400 - Bad Request)_

```
{
    "error": "Invalid Email or password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message":  "Internal Server Error"
}
```

### POST /google-signin

> To Delete todos

_Request Header_

```
not needed
```

_Request Body_

```
{
    "id_token": "<google client id token"
}
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMjU3MzczM30.sjihnjlxC3KyGUZCBxig_UxZUXLv-nqWJpNt2ysocZ8"
}
```

_Response (404 - Not Found)_

```
{
    "error": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message":  "Internal Server Error"
}
```
