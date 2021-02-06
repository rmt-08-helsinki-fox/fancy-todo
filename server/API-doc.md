# Fancy - Todo Rest API Documentation
This is api documentation for Rest API Fancy Todo.
<br><br>

## Endpoint List
## 1. User (Authentication)
---
### Register
> Create new User.
- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": "<get auto by system>",
        "email": "<user>@mail.com"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Email already registered"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

### Login
> Login & get access token for client
- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "accessToken" : "<get-token-from-server>"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Invalid email or password"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

## 2. Task
---
### Create Task
> Create new Task.

input format :

| key         | value                   |
|-------------|-------------------------|
| title       | req.body.title          |
| description | req.body.description    |
| due_date    | req.body.due_date       |
| status    | req.body.status       |
| userId      | req.decoded.id          |


- **URL** : `/todos/create`
- **Method** : `POST`
- **Data Params** :
    ```
    title = string,
    description = string
    status = boolean,
    due_date = date format YYYY-MM-DD
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "title": "<title todo>",
        "description": "<description todo>",
        "due_date": "YYYY-MM-DD",
        "status": "<BOOLEAN>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": "<given id by system>",
        "title": "<title todo>",
        "description": "<description todo>",
        "due_date": "<due date todo>",
        "userId": "<user id who create todo>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "The Title field is required",
            "The Status field is required",
            "Date must be more than today"
        ]
    }
    ```

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>


### Show All Todo
> Show All todo.

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | title task (string)               |
| description | description task (string)         |
| status      | status task (boolean)             |
| due_date    | due date task (date)              |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |
| userId      | foreign key of User.id            |


- **URL** : `/todos`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title todo 1>",
        "description": "<description todo 1>",
        "due_date": "<due date todo 1>",
        "userId": "<user id who create todo 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    },
    {
        "id": "2",
        "title": "<title todo 2>",
        "description": "<description todo 2>",
        "due_date": "<due date todo 2>",
        "userId": "<user id who create todo 2>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    },
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Show Todo By Id
> Show All todo.

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | title task (string)               |
| description | description task (string)         |
| status      | status task (boolean)             |
| due_date    | due date task (date)              |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |
| userId      | foreign key of User.id            |


- **URL** : `/todos/:id`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title todo 1>",
        "description": "<description todo 1>",
        "due_date": "<due date todo 1>",
        "userId": "<user id who create todo 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Update Task
- **URL** : `/todos/:id`
- **Method** : `PUT`
- **URL Params** : id=integer
- **Data Params** :
    ```
    title=string (required)
    description=string
    due_date=string format YYYY-MM-DD (required)
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    "title": "<updated-title>",
    "description": "<updated-description>",
    "due_date": "<updated-due-date>"
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title todo 1>",
        "description": "<description todo 1>",
        "due_date": "<due date todo 1>",
        "userId": "<user id who create todo 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(400 - Bad Request)_
    ```json
    {
        "errors": [
            "The Title field is required",
            "The Status field is required",
            "Date must be more than today"
        ]
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Delete Task
- **URL** : `/todos/:id`
- **Method** : `DELETE`
- **URL Params** : id=integer
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title todo 1>",
        "description": "<description todo 1>",
        "due_date": "<due date todo 1>",
        "userId": "<user id who create todo 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
        "status": false
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Get Weather
- **URL** : `/todos/weather`
- **Method** : `GET`
- **URL Params** : id=integer
- **Data Params** :
    ```
    none
    ```

    _Request Header_
    ```json
    {
        "token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    none
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "data": [
            {
                "rh": 66,
                "pod": "d",
                "lon": 106.84513,
                "pres": 1003.1,
                "timezone": "Asia/Jakarta",
                "ob_time": "2021-02-06 10:30",
                "country_code": "ID",
                "clouds": 59,
                "ts": 1612607400,
                "solar_rad": 25.6,
                "state_code": "04",
                "city_name": "Jakarta",
                "wind_spd": 1.5,
                "wind_cdir_full": "north",
                "wind_cdir": "N",
                "slp": 1006,
                "vis": 5,
                "h_angle": -90,
                "sunset": "11:17",
                "dni": 209.18,
                "dewpt": 23,
                "snow": 0,
                "uv": 1.91101,
                "precip": 0,
                "wind_dir": 360,
                "sunrise": "22:55",
                "ghi": 29.56,
                "dhi": 27.11,
                "aqi": 54,
                "lat": -6.21462,
                "weather": {
                    "icon": "c02d",
                    "code": 802,
                    "description": "Scattered clouds"
                },
                "datetime": "2021-02-06:11",
                "temp": 30,
                "station": "WIHH",
                "elev_angle": 3.27,
                "app_temp": 34.2
            }
        ],
        "count": 1
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

