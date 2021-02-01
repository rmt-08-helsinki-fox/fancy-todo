# fancy-todo
Fancy Todo App is an application to create reminder and get well organized. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
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
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": false,
  "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": false,
  "due_date": "<todo due date>"
  "createdAt": "<todo created time>",
  "updatedAt": "<todo updated time>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### GET /todos

> Read all todos

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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": false,
    "due_date": "<todo due date>"
    "createdAt": "<todo created time>",
    "updatedAt": "<todo updated time>",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": false,
    "due_date": "<todo due date>"
    "createdAt": "<todo created time>",
    "updatedAt": "<todo updated time>",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Internal server error"
}
```
---
### GET /todos/:id

> Read todos by id

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

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200)_
```
{
  "id": <id by params>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": false,
  "due_date": "<todo due date>"
  "createdAt": "<todo created time>",
  "updatedAt": "<todo updated time>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Data not found"
}
```
---
### PUT /todos/:id

> Update all todos's property by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200)_
```
{
  "id": <id by params>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
  "createdAt": "<todo created time>",
  "updatedAt": "<todo updated time>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
}
```
---
### PATCH /todos/:id

> Update todos's status property by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": "<todo status>"
}
```

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200)_
```
{
  "id": <id by params>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
  "createdAt": "<todo created time>",
  "updatedAt": "<todo updated time>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
}
```
### DELETE /todos/:id

> Delete todo by id

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

_Request Params_
```
{
  "id": "<todo id>"
}
```

_Response (200)_
```
{
  "message": "todo success to delete"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (404 - Not found)_
```
{
  "message": "Error not found"
}
```