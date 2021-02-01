# My Fancy Todo App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

##  Endpoints
### POST /todos

> Create new todos

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date""<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": <posted status>,
    "due_date": "<posted due_date>",
    "updatedAt": "2021-02-01T12:37:17.962Z",
    "createdAt": "2021-02-01T12:37:17.962Z"
}
```

_Response (404 - Bad Request)_
```
{
    "message": "Validation isAfter on due_date failed",
    "type": "Validation error",
    "path": "due_date",
    "value": "2020-03-03T17:00:00.000Z",
    "origin": "FUNCTION",
    "instance": {
        "id": null,
        "title": "diving",
        "description": "diving in bali",
        "status": false,
        "due_date": "2020-03-03T17:00:00.000Z",
        "updatedAt": "2021-02-01T12:39:16.159Z",
        "createdAt": "2021-02-01T12:39:16.159Z"
    },
    "validatorKey": "isAfter",
    "validatorName": "isAfter",
    "validatorArgs": [
        "2021-01-31"
    ],
    "original": {
        "validatorName": "isAfter",
        "validatorArgs": [
            "2021-01-31"
        ]
    }
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;
### GET /todos

> Get all todos

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
[
    {
        "id": 1,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": <asset status>,
        "due_date": "<asset due_date>",
        "createdAt": "2021-02-01T06:35:14.655Z",
        "updatedAt": "2021-02-01T09:27:45.302Z"
    },
    {
        "id": 2,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": <asset status>,
        "due_date": "<asset due_date>",
        "createdAt": "2021-02-01T10:53:33.125Z",
        "updatedAt": "2021-02-01T10:53:33.125Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
### GET /todos/:id

> Get todos by id

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "title": "<asset title>",
  "description": "<asset description>",
  "status": <asset status>,
  "due_date": "<asset due_date>",
  "createdAt": "2021-02-01T06:35:14.655Z",
  "updatedAt": "2021-02-01T09:27:45.302Z"
}
```
_Response (504 - Not Found)_
```
{
    "name": "id not found",
    "msg": "error not found"
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---

### PUT /todos/:id

> Edit Todo All Field

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Params_
``` id ```

_Request Body_
```
{
  "title": '<title to get insert into>',
  "description": '<description to get insert into>',
  "status": '<status to get insert into>',
  "due_date": '<due_date to get insert into>' 
}
```

_Response (201 - Created)_
```
[
    1,
    [
        {
            "id": <given id by system>,
            "title": "<posted title>",
            "description": "<posted description>",
            "status": <posted status>,
            "due_date": "<posted due_date>",
            "createdAt": "2021-02-01T10:53:33.125Z",
            "updatedAt": "2021-02-01T13:22:43.949Z"
        }
    ]
]
```

_Response (404 - Not Found)_
```
{
    "name": "id not found",
    "msg": "error not found"
}
```

_Response (400 - Bad request)_
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation isAfter on due_date failed",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-01-14T17:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "touring",
                "description": "touring to malang",
                "status": false,
                "due_date": "2020-01-14T17:00:00.000Z",
                "updatedAt": "2021-02-01T13:27:52.815Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-01-31"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-01-31"
                ]
            }
        }
    ]
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---
### PATCH /todos/:id

> Edit Todo per Field

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
```
{
  "<field who wants you edite>": '<value>'
}
```

_Response (201 - Created)_
```
[
    1,
    [
        {
            "id": <given id by system>,
            "title": "<posted title>",
            "description": "<posted description>",
            "status": <posted status>,
            "due_date": "<posted due_date>",
            "createdAt": "2021-02-01T10:53:33.125Z",
            "updatedAt": "2021-02-01T13:22:43.949Z"
        }
    ]
]
```

_Response (404 - Not Found)_
```
{
    "name": "id not found",
    "msg": "error not found"
}
```

_Response (400 - Bad request)_
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation isAfter on due_date failed",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-01-14T17:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "touring",
                "description": "touring to malang",
                "status": false,
                "due_date": "2020-01-14T17:00:00.000Z",
                "updatedAt": "2021-02-01T13:27:52.815Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-01-31"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-01-31"
                ]
            }
        }
    ]
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```
&nbsp;
---
### DELETE /todos/:id

> Delete Todo By ID

<!-- _Request Header_
```
{
  "access_token": "<your access token>"
}
``` -->

_Request Params_
``` id ```

_Request Body_
```
not needed
```


_Response (200 - Ok)_
```
{
    "name": "id not found",
    "msg": "error not found"
}
```

_Response (404 - Not Found)_
```
{
    "name": "id not found",
    "msg": "error not found"
}
```

_Response (400 - Bad request)_
```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Validation isAfter on due_date failed",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-01-14T17:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "touring",
                "description": "touring to malang",
                "status": false,
                "due_date": "2020-01-14T17:00:00.000Z",
                "updatedAt": "2021-02-01T13:27:52.815Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-01-31"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-01-31"
                ]
            }
        }
    ]
}
```
_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```