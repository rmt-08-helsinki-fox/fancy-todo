# Fancy Todo

## 1. User

### Register

- **URL** : `/register`
- **Method** : `POST`
- **Data Params** :
    ```
    email=[string]
    password=[string]
    ```
_Request Header_
```

```

_Request Body_
```
{
  "email": "gifania@mail.com",
  "password": "Gifania123"
}
```

- **Success Response**

_Response(201 - Created)_
```
{
  "id": 1,
  "email": "gifania@mail.com"
}
```

- **Error Response**

_Response(400 - Bad Request)_
```
{
  "errors": [
    "Email must be unique"
  ]
}
```

```
{
  "errors": [
    "Password must contain at least one number, one lowercase alphabet, one uppercase alphabet, and contain a length of at least 6 characters",
    "Email address must be valid"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```

---

### Login

- **URL** : `/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=[string]
    password=[string]
    ```
_Request Header_
```

```

_Request Body_
```
{
  "email": "gifania@mail.com",
  "password": "Gifania123"
}
```

- **Success Response**

_Response(201 - Created)_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnaWZhbmlhQG1haWwuY29tIiwiaWF0IjoxNjEyMTkyNzA0fQ.clQgrvcOApm6YJoo0ccY3H6cYrvv4k7CP_A_6716Vb4"
}
```

- **Error Response**

_Response(400 - Bad Request)_
```
{
  "errors": "Invalid email or password"
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```


## 2. Task

### Add Task
> Create new task

- **URL** : `/todos`
- **Method** : `POST`
- **Data Params** :
    ```
    title=[string]
    due_date=[string format YYYY-MM-DD]
    description=[string]
    status=[boolean]
    ```

_Request Header_
```

```

_Request Body_
```
{
  "title": "<title-task>",
  "description": "<task-description>",
  "status": <false/true>
  "due_date": "YYYY-MM-DD" 
}
```

- **Success Response**

_Response(201 - Created)_
```
{
  "id": 1,
  "title": "mengerjakan challenge",
  "description": "challenge fancy todo",
  "status": false,
  "due_date": "2021-02-06T00:00:00.000Z",
  "updatedAt": "2021-02-01T14:04:28.924Z",
  "createdAt": "2021-02-01T14:04:28.924Z",
  "userId": null
}
```

- **Error Response**

_Response(400 - Bad Request)_
```
{
  "errors": [
    "Task title should not be empty",
    "Invalid due date input"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```

---

### Show All Task

- **URL** : `/todos`
- **Method** : `GET`
- **Data Params** : None

_Request Header_
```

```

_Request Body_
```

```

- **Success Response**

_Response(200 - OK)_
```
[
  {
    "id": 1,
    "title": "mengerjakan challenge",
    "description": "challenge fancy todo",
    "status": false,
    "due_date": "2021-02-06T00:00:00.000Z",
    "userId": null,
    "createdAt": "2021-02-01T14:04:28.924Z",
    "updatedAt": "2021-02-01T14:04:28.924Z"
  },
  {
    "id": 2,
    "title": "buat server",
    "description": "server fancy todo",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "userId": null,
    "createdAt": "2021-02-01T14:08:24.919Z",
    "updatedAt": "2021-02-01T14:08:24.919Z"
  },
  {
    "id": 3,
    "title": "beli makan kucing",
    "description": "kitten dan adult",
    "status": false,
    "due_date": "2021-02-08T00:00:00.000Z",
    "userId": null,
    "createdAt": "2021-02-01T14:09:00.788Z",
    "updatedAt": "2021-02-01T14:09:00.788Z"
  }
]
```

- **Error Response**

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```

---

### Show One Task
> Show one task by id

- **URL** : `/todos/:id`
- **Method** : `GET`
- **URL Params** : `id=[integer]`

_Request Header_
```

```

_Request Body_
```

```

- **Success Response**

_Response(200 - OK)_
```
{
  "id": 3,
  "title": "beli makan kucing",
  "description": "kitten dan adult",
  "status": false,
  "due_date": "2021-02-08T00:00:00.000Z",
  "userId": null,
  "createdAt": "2021-02-01T14:09:00.788Z",
  "updatedAt": "2021-02-01T14:09:00.788Z"
}
```

- **Error Response**

_Response(404 - Not Found)_
```
{
  "errors": "Task Not Found"
}
```

_Response(500)_
```
{
  "errors": "Internal Server Error"
}
```

---

### Update Task All Field

- **URL** : `/todos/:id`
- **Method** : `PUT`
- **URL Params** : `id=[integer]`
- **Data Params** :
    ```
    title=[string]
    due_date=[string format YYYY-MM-DD]
    description=[string]
    status=[boolean]
    ```

_Request Header_
```

```

_Request Body_
```
{
  "title": "<updated-title>",
  "description": "<updated-description>",
  "status": <updated-status>,
  "due_date": "<updated-due-date>"
}
```

- **Success Response**

_Response(200 - OK)_
```
{
  "id": 1,
  "title": "deadline portfolio week 1",
  "description": "portfolio fancy todo",
  "status": false,
  "due_date": "2021-02-06T00:00:00.000Z",
  "userId": null,
  "createdAt": "2021-02-01T14:04:28.924Z",
  "updatedAt": "2021-02-01T14:12:24.963Z"
}
```

- **Error Response**

_Response(400 - Bad Request)_
```
{
  "errors": [
    "Task title should not be empty",
    "Invalid due date input"
  ]
}
```

_Response(404 - Not Found)_
```
{
    "errors": "Task Not Found"
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```

---

### Update Task One Field

- **URL** : `/todos/:id`
- **Method** : `PATCH`
- **URL Params** : `id=[integer]`
- **Data Params** :
    ```
    status=[boolean]
    ```

_Request Header_
```

```

_Request Body_
```
{
  "status": <updated-status>
}
```

- **Success Response**

_Response(200 - OK)_
```
{
  "id": 2,
  "title": "buat server",
  "description": "server fancy todo",
  "status": true,
  "due_date": "2021-02-03T00:00:00.000Z",
  "userId": null,
  "createdAt": "2021-02-01T14:08:24.919Z",
  "updatedAt": "2021-02-01T14:14:53.183Z"
}
```

- **Error Response**
_Response(400 - Bad Request)_
```
{
  "errors": [
    "Task title should not be empty",
    "Invalid due date input"
  ]
}
```

_Response(404 - Not Found)_
```
{
    "errors": "Task Not Found"
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```


---

### Delete One Task
> Delete by id

- **URL** : `/todos/:id`
- **Method** : `GET`
- **URL Params** : `id=[integer]`

_Request Header_
```

```

_Request Body_
```

```

- **Success Response**

_Response(200 - OK)_
```
{
  "delete_todo": {
    "id": 3,
    "title": "beli makan kucing",
    "description": "kitten dan adult",
    "status": false,
    "due_date": "2021-02-08T00:00:00.000Z",
    "userId": null,
    "createdAt": "2021-02-01T14:09:00.788Z",
    "updatedAt": "2021-02-01T14:09:00.788Z"
  },
  "message": "Todo success to delete"
}
```

- **Error Response**

_Response(404 - Not Found)_
```
{
    "errors": "Task Not Found"
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": "Internal Server Error"
}
```