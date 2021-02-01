# fancy-todo

## RESTful endpoints
### GET /todos
> Get all todos

_Request Header_
```
{
    
}
```

_Request Params_
```
not needed
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
        "status": "<todo status>",
        "due_date": "2021-03-23T00:00:00.000Z",
        "createdAt": "2021-02-01T09:14:24.359Z",
        "updatedAt": "2021-02-01T09:14:24.359Z"
    },
    {
         "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2021-02-23T00:00:00.000Z",
        "createdAt": "2021-02-01T09:14:24.359Z",
        "updatedAt": "2021-02-01T09:14:24.359Z"
    }
]
```
_Response (500 - Internal Server Erorr)_
```
{
    "message": "<error message>"
}
```

### POST /todos
> Create new todo

_Request Header_
```
{

}
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<date to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "updatedAt": "2021-02-01T13:41:03.498Z",
    "createdAt": "2021-02-01T13:41:03.498Z"
}
```

_Response (400 - Bad Request)_
```
{
    "message" : "[<validation message>]"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```

### GET /todos/:id
> Get todo by id

_Request Header_
```
{

}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
    "id": "<todo id to be used to>"
}
```

_Response (200)_
```
{
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T09:14:24.359Z",
    "updatedAt": "2021-02-01T09:14:24.359Z"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

### PUT /todos/:id
> Update todo field by id

_Request Header_
```
```

_Request Params_
```
{
    "id": "<todo id to be used to>"
}
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<date to get insert into>"
}
```

_Response 200_
```
{
    "id": <edited todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T09:14:24.359Z",
    "updatedAt": "2021-02-01T09:14:24.359Z"
}
```

_Response (404 - Not Found)_
```
{
    "message" : "error not found"
}
```

_Response (400 - Bad Request)_
```
{
    "message" : "[<validation message>]"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


### PATCH /todos/:id
> Update todo status by id

_Request Header_
```
```

_Request Params_
```
{
    "id": "<todo id to be used to>"
}
```

_Request Body_
```
{
    "status": "<status to get insert into>"
}
```

_Response 200_
```
{
    "id": <edited todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2021-02-01T09:14:24.359Z",
    "updatedAt": "2021-02-01T09:14:24.359Z"
}
```

_Response (404 - Not Found)_
```
{
    "message" : "error not found"
}
```

_Response (400 - Bad Request)_
```
{
    "message" : "[<validation message>]"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```

### DELETE /todos/:id
> Delete todo by id

_Request Header_
```
```

_Request Params_
```
{
    "id": "<todo id to be used to>"
}
```

_Request Body_
```
not needed
```

_Response 200_
```
{
    "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message" : "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```

