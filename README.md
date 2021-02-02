# fancy-todo

## RESTful endpoints

```
Client URL:
Server URL: http://localhost:3000
```

### GET /todos
> Get all todos

_Request Header_
```
{
    "access_token": "<token>"
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
    "message": "interal server error"
}
```

### POST /todos
> Create new todo

_Request Header_
```
{
    "access_token": "<token>"
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
    "message": "internal server error"
}
```

### GET /todos/:id
> Get todo by id

_Request Header_
```
{
    "access_token": "<token>"
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
    "message": "data not found"
}
```

_Response (500 - Internal Server Error)-
```
{
    "message": "internal server error"
}
```


### PUT /todos/:id
> Update todo field by id

_Request Header_
```
{
    "access_token": "<token>"
}
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
    "message" : "data not found"
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
    "message": "internal server error"
}
```


### PATCH /todos/:id
> Update todo status by id

_Request Header_
```
{
    "access_token": "<token>"
}
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
    "message" : "data not found"
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
    "message": "internal server error"
}
```

### DELETE /todos/:id
> Delete todo by id

_Request Header_
```
{
    "access_token": "<token>"
}
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
    "message": "internal server error"
}
```

### POST /users/register
> Create new users

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "email": "<posted email>"
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
    "message": "internal server error"
}
```

### POST /users/login
> Login to app

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response (200)_
```
{
    "access_token" : "<token>"
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
    "message": "internal server error"
}
```

### POST /weather
> Check current choosen city weather

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Params_
```
{
    "query": "<choosen city>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "request": {
        "type": "City",
        "query": "Surabaya, Indonesia",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Surabaya",
        "country": "Indonesia",
        "region": "East Java",
        "lat": "-7.249",
        "lon": "112.751",
        "timezone_id": "Asia/Jakarta",
        "localtime": "2021-02-02 19:46",
        "localtime_epoch": 1612295160,
        "utc_offset": "7.0"
    },
    "current": {
        "observation_time": "12:46 PM",
        "temperature": 27,
        "weather_code": 356,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0010_heavy_rain_showers.png"
        ],
        "weather_descriptions": [
            "Moderate or heavy rain shower"
        ],
        "wind_speed": 22,
        "wind_degree": 296,
        "wind_dir": "WNW",
        "pressure": 1007,
        "precip": 3.6,
        "humidity": 81,
        "cloudcover": 76,
        "feelslike": 31,
        "uv_index": 6,
        "visibility": 7,
        "is_day": "yes"
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": {
        "code": 615,
        "type": "request_failed",
        "info": "Your API request failed. Please try again or contact support."
    }
}
```



