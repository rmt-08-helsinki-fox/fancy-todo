# fancy - todo App Server
This fancy - todo is an application to manage your task. This fancy - app has:
* RESTful endpoint for tasks CRUD operation
* JSON formatted response



## RESTful endpoints
### POST/todos
> Create new task

_Request Header_
```
not needed
```

_Request Body_
```
{
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "02/11/2021",
}
```

_Response (201 - Created)_
```
{
    "id": 11,
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "2021-02-12T00:00:00.000Z",
    "updatedAt": "2021-02-01T15:22:09.335Z",
    "createdAt": "2021-02-01T15:22:09.335Z"
}
```

_Response (400 - Bad Request)_
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Date must be more then today",
            "type": "Validation error",
            "path": "due_date",
            "value": "2021-01-01",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "new challenge",
                "description": "ganti",
                "status": "completed",
                "due_date": "2021-01-01",
                "updatedAt": "2021-02-01T16:02:50.217Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-02-01"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-02-01"
                ]
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


### GET/todos
> Get all task created

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 1,
        "title": "challenges",
        "description": "daily challenge",
        "status": "uncompleted",
        "due_date": "2021-02-02T00:00:00.000Z",
        "createdAt": "2021-02-01T10:08:08.770Z",
        "updatedAt": "2021-02-01T10:08:08.770Z"
    },
    {
        "id": 4,
        "title": "challenges",
        "description": "daily challenge",
        "status": "completed",
        "due_date": "2021-02-02T00:00:00.000Z",
        "createdAt": "2021-02-01T10:52:19.670Z",
        "updatedAt": "2021-02-01T14:35:19.655Z"
    }
]
```

_Response (200 - OK)_
```
[]
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


### GET/todos/:id
> Get task by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "challenges",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T10:08:08.770Z"
}
```

_Response (400 - Not Found)_
```
{
    "msg": "Todo is not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


### PUT/:id
> Update task by id

_Request Header_
```
not needed
```

_Request Body_
```
{
    "title": "challenges daily",
    "description": "daily challenge",
    "status": "uncompleted",
    "due_date": "02/11/2021",
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:43:18.251Z"
}
```

_Response (400 - Bad Request)_
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Date must be more then today",
            "type": "Validation error",
            "path": "due_date",
            "value": "2021-01-01",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "new challenge",
                "description": "ganti",
                "status": "completed",
                "due_date": "2021-01-01",
                "updatedAt": "2021-02-01T16:02:50.217Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-02-01"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-02-01"
                ]
            }
        }
    ]
}
```

_Response (404 - Not Found)_
```
{
    "msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


### PATCH/:id
> Update status of task by id

_Request Header_
```
not needed
```

_Request Body_
```
{
    status : "completed"
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:45:53.503Z"
}
```

_Response (404 - Not Found)_
```
{
    "msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


### DELETE/:id
> Delete task by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "new challenge",
    "description": "daily challenge",
    "status": "completed",
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T10:08:08.770Z",
    "updatedAt": "2021-02-01T15:45:53.503Z"
}
```

_Response (404 - Not Found)_
```
{
    "msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    msg : "Internal server error"    
}
```


postman :
https://www.getpostman.com/collections/688d28cbd5c620ab3527