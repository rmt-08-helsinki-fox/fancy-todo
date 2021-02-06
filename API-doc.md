# Fancy - todo

### base url : http://localhost:PORT/

-----

## POST user/register

### Request
_Request Body_
```
{
  "full_name": "<input full name>",
  "email": "<input email>",
  "password": "<input password>",
  "city": "<input city>"
}
```

### Success Response
_Response (201 - Created)_

```
{
  "msg": "Register Success",
  "id": 1,
  "full_name": "halo",
  "email": "halo@mail.com",
  "city": "pekanbaru"
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
  "error": [
    "email must be unique"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## POST /user/login

### Request

_Request Body_
```
{
  "email": "<input email>",
  "password": "<input password>"
}
```

### Success Response
_Response (200 - OK)_
```
{
  "access_token": "<access_token>
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
  "error": "Invalid email or password!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## POST /todos/

### Request
_Request Header_
```
{
  "token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<input title>",
  "description": "<input description>",
  "due_date" : "<input due date"
}
```

### Success Response
_Response (201 - Created)_
```
{
  "id": 3,
  "title": "jemput ibu",
  "description": "bandara soetta",
  "status": false,
  "due_date": "2021-02-20",
  "UserId": 1,
  "createdAt": "2021-02-06T09:42:48.395Z",
  "updatedAt": "2021-02-06T09:42:48.395Z"
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
  "error": [
    "Title cannot be empty",
    "Description cannot be empty",
    "Due date must be after todays date"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## GET /todos/

### Request
_Request Header_
```
{
  "token": "<access_token>"
}
```

### Success Response
_Response (201 - Created)_
```
[
  {
    "id": 2,
    "title": "test",
    "description": "test",
    "status": false,
    "due_date": "2021-02-19",
    "UserId": 1,
    "createdAt": "2021-02-06T09:41:52.099Z",
    "updatedAt": "2021-02-06T09:41:52.099Z"
  },
  {
    "id": 3,
    "title": "jemput ibu",
    "description": "bandara soetta",
    "status": false,
    "due_date": "2021-02-20",
    "UserId": 1,
    "createdAt": "2021-02-06T09:42:48.395Z",
    "updatedAt": "2021-02-06T09:42:48.395Z"
  }
]
```

### Error Response
_Response (400 - Bad Request)_
```
{
  "error": [
    "Title cannot be empty",
    "Description cannot be empty",
    "Due date must be after todays date"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## GET /todos/:id

### Request
_Request Params_
```
{
  "id": "<input id todos>"
}
```

_Request Header_
```
{
  "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
[
  {
    "id": 2,
    "title": "test",
    "description": "test",
    "status": false,
    "due_date": "2021-02-19",
    "UserId": 1,
    "createdAt": "2021-02-06T09:41:52.099Z",
    "updatedAt": "2021-02-06T09:41:52.099Z"
  }
]
```

### Error Response
_Response (401 - Unauthorized)_
```
{
  "error": "You dont have authorization to access"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## PUT /todos/:id

### Request
_Request Params_
```
{
  "id": "<input id todos>"
}
```

_Request Header_
```
{
  "token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<input title>",
  "description": "<input description>",
  "status": "<input status>"
  "due_date" : "<input due date"
}
```

### Success Response
_Response (200 - OK)_
```
{
  "id": 3,
  "title": "h8",
  "description": "learning promise",
  "status": false,
  "due_date": "2021-02-09",
  "UserId": 1,
  "createdAt": "2021-02-06T09:42:48.395Z",
  "updatedAt": "2021-02-06T09:52:34.728Z"
}
```

### Error Response
_Response (401 - Unauthorized)_
```
{
  "error": "You dont have authorization to access"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## PATCH /todos/:id

### Request
_Request Params_
```
{
  "id": "<input id todos>"
}
```

_Request Header_
```
{
  "token": "<access_token>"
}
```

_Request Body_
```
{
  "status": "<input status>"
}
```

### Success Response
_Response (200 - OK)_
```
{
  "id": 3,
  "title": "h8",
  "description": "learning promise",
  "status": true,
  "due_date": "2021-02-09",
  "UserId": 1,
  "createdAt": "2021-02-06T09:42:48.395Z",
  "updatedAt": "2021-02-06T09:52:34.728Z"
}
```

### Error Response
_Response (401 - Unauthorized)_
```
{
  "error": "You dont have authorization to access"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

-----

## DELETE /todos/:id

### Request
_Request Params_
```
{
  "id": "<input id todos>"
}
```

_Request Header_
```
{
  "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
"Todo Success to Delete"
```

### Error Response
_Response (401 - Unauthorized)_
```
{
  "error": "You dont have authorization to access"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```

----

## GET /user/weather/:city

### Request
_Request Params_
```
{
  "city": "<input city>"
}
```

_Request Header_
```
{
  "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
{
  "data": [
    {
      "moonrise_ts": 1612544903,
      "wind_cdir": "S",
      "rh": 82,
      "pres": 986.38635,
      "high_temp": 31,
      "sunset_ts": 1612608968,
      "ozone": 248.83522,
      "dewpt": 22.6,
      "snow": 0,
      "uv": 0.56113154,
      "weather": {
        "icon": "r02d",
        "code": 501,
        "description": "Moderate rain"
      }
    }
  ]
}
```

### Error Response
_Response (404 - Not Found)_
```
{
  "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Internal Server Error"
}
```