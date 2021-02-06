# Fancy Todo App
About application : application that helps us to schedule or mark our activities

&nbsp;

## List of Endpoints

###  >> USER  
```
- POST /user/register
- POST /user/login
```

&nbsp;
###  >> TODO
```
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos/:id
```

&nbsp;

## List of Endpoints

###  >> 3rd Party  
```
- GET /weathers
```

&nbsp;

## RESTfull Endpoints

### POST /user/register
> Create a new user

_Request Header_
```
{
    not needed
}
```

_Request Body_
```
{
    "email": "<email from request body>",
    "password": "<password from request body>"
}
```

_Response (201 - Created)_
```
{
    "msg": "berhasil register",
    "id": 14,
    "email": "awang@mail.com",
    "password": "$2a$10$EknywD1NdGfWc19vF0sajuZ.121464zZqhRol65vA9cfb2y33GsWy"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
        "Invalid Email"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### POST /user/login
> for user login and get access token

_Request Header_
```
{
    not needed
}
```

_Request Body_
```
{
    "email": "<email  from  request body>",
    "password": "<password  from  request body>"
}
```

_Response (200 - Ok)_
```
{
    "access_token": <given access_token by system>,
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /todos
> Create a Todo

_Request Header_
```
{
    "access_token": "<your access token>"
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Request Body_
```
{
    "title": "<title from request body >",
    "description": "<description  from request body >",
    "status": "<status  from request body >",
    "due_date": "<due_date  from request body >"
}
```

_Response (201 - Created)_
```
{
    "id": 29,
    "title": "Belajar 3rd Party and API odc",
    "description": "Salah satu materi client di Phase 1",
    "status": false,
    "due_date": "2021-03-14T00:00:00.000Z",
    "UserId": 4,
    "updatedAt": "2021-02-06T08:12:46.468Z",
    "createdAt": "2021-02-06T08:12:46.468Z"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
        "Title cannot be Empty",
        "Description cannot be Empty",
        "Status cannot be Empty",
        "Must be Today and Tomorrow"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /todos
> Get all Todos
_Request Header_
```
{
    "access_token": "<your access token>"
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```
_Request Body_
```
    not needed
```
_Response (200 - OK)_
```
[
    {
        "id": 13,
        "title": "Belajar Express",
        "description": "Mempelajari bagian Server pada Javascript",
        "status": false,
        "due_date": "2021-03-18T00:00:00.000Z",
        "UserId": 3,
        "createdAt": "2021-02-02T14:15:38.811Z",
        "updatedAt": "2021-02-05T16:14:42.798Z"

    },
    {
        ...
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /todos/:id
> Get all Todos

_Request Header_
```
{
    "access_token": "<your access token>"
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Request Body_
```
    not needed
```

_Request Params_
```
{
    "id": "<id from request params>"
}
```

_Response (200 - OK)_
```
{
    "id": 11,
    "title": "Life Study",
    "description": "Mempelajari Hal yang terjadi",
    "status": true,
    "due_date": "2021-03-19T00:00:00.000Z",
    "UserId": 3,
    "createdAt": "2021-02-02T14:03:20.965Z",
    "updatedAt": "2021-02-06T08:00:32.943Z"
}
```
_Response (401 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### PUT /todos/:id

> Update Todo by Id

_Request Header_
```
{
    "access_token": "<your access token>"
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Request Body_
```
{
    "title": "<title from request body>",
    "description": "<description from request body>",
    "status": "<status from request body>",
    "due_date": "<due_date from request body>"
}
```

_Request Params_
```
{
    "id": "<id from request params>"
}
```

_Response (200 - OK)_
```
{
    example:
        "id": 11,
        "title": "Life Study",
        "description": "Mempelajari Hal yang terjadi",
        "status": true,
        "due_date": "2021-03-19T00:00:00.000Z",
        "UserId": 3,
        "createdAt": "2021-02-02T14:03:20.965Z",
        "updatedAt": "2021-02-06T08:00:32.943Z"
}
```

_Response (400 - Bad Request)_
```
{
  example:
  "errors": [
        "Title cannot be Empty",
        "Description cannot be Empty",
        "Status cannot be Empty",
        "Must be Today and Tomorrow"
    ]
}
```

_Response (401 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /todos/:id
> Update Status Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Request Body_
```
{
    "status": "<status get update>"
}
```

_Request Params_
```
{
    "id": "<id from request params>"
}
```

_Response (200 - OK)_
```
{
    example
    "id": 11,
        "title": "Belajar Node js",
        "description": "Mempelajari framework JS",
        "status": true,
        "due_date": "2021-03-06T00:00:00.000Z",
        "UserId": 3,
        "createdAt": "2021-02-02T14:03:20.965Z",
        "updatedAt": "2021-02-06T07:55:27.328Z"
}
```

_Response (401 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /todos/:id
> Delete Data Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
  "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhd2FuZ21lZGlkYXQ2NUBnbWFpbC5jb20iLCJpYXQiOjE2MTI1OTc2ODh9.Ebb8eCYUImbgEyX7otmtYlVduuBCriffjJIr4iBe8Yc"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
    "id": "<id from request params>"
}
```

_Response (200 - OK)_
```
{
    "message:" "todo success to delete"
}
```

_Response (401 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /weathers
> Get 3rd Party
_Request Header_
```
{
    not needed
}
```
_Request Body_
```
    not needed
```
_Response (200 - OK)_
```
{
    "request": {
        "type": "City",
        "query": "Depok, Indonesia",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Depok",
        "country": "Indonesia",
        "region": "West Java",
        "lat": "-6.689",
        "lon": "107.400",
        "timezone_id": "Asia/Jakarta",
        "localtime": "2021-02-06 15:24",
        "localtime_epoch": 1612625040,
        "utc_offset": "7.0"
    },
    "current": {
        "observation_time": "08:24 AM",
        "temperature": 30,
        "weather_code": 116,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
        ],
        "weather_descriptions": [
            "Partly cloudy"
        ],
        "wind_speed": 11,
        "wind_degree": 360,
        "wind_dir": "N",
        "pressure": 1006,
        "precip": 2,
        "humidity": 66,
        "cloudcover": 50,
        "feelslike": 38,
        "uv_index": 6,
        "visibility": 6,
        "is_day": "yes"
    }
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
