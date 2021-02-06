# Fancy Todo

base url : http://localhost:PORT

---

## Endpoint List

## 1. User

### Register

- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string (required)
    password=string (required)
    ```

  _Request Header_
  ```

  ```

  _Request Body_
  ```
  {
    "email": "<user>@mail.com",
    "password": "<user-password>"
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "id": <given id by system>,
    "email": "<user>@mail.com"
  }
  ```

- **Error Response**

  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "Email already registered"
    ]
  }
  ```
  
  _Response(400 - Bad Request)_
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

- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string (required)
    password=string (required)
    ```

  _Request Header_
  ```

  ```

  _Request Body_
  ```
  {
    "email": "<user>@mail.com",
    "password": "<user-password>"
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "accessToken": "<your access token>"
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

input format :

| key         | value                             |
|-------------|-----------------------------------|
| title       | req.body.title                    |
| description | req.body.description              |
| due_date    | req.body.due_date                 |
| userId      | req.decoded.id                    |


- **URL** : `/todos`
- **Method** : `POST`
- **Data Params** :
    ```
    title=string (required)
    description=string
    due_date=string format YYYY-MM-DD (required)
    ```

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "title": "<input title todo>",
    "description": "<input description todo>",
    "due_date": "YYYY-MM-DD" 
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "id": <given id by system>,
    "title": "<title todo",
    "description": "<description todo>",
    "due_date": "<due date todo>",
    "userId": <user id who create todo>
    "updatedAt": "2021-02-01T14:04:28.924Z",
    "createdAt": "2021-02-01T14:04:28.924Z",
    "status": false
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

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

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
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
      "title": "<title todo 1>",
      "description": "<title todo 1>",
      "status": <status todo 1>,
      "due_date": "<due date todo 1>",
      "userId": <user id who create todo 1>,
      "createdAt": "2021-02-01T14:04:28.924Z",
      "updatedAt": "2021-02-01T14:04:28.924Z"
    },
    {
      "id": 2,
      "title": "<title todo 2>",
      "description": "<title todo 2>",
      "status": <status todo 2>,
      "due_date": "<due date todo 2>",
      "userId": <user id who create todo 2>,
      "createdAt": "2021-02-01T14:08:24.919Z",
      "updatedAt": "2021-02-01T14:08:24.919Z"
    },
    {
      "id": 3,
      "title": "<title todo 3>",
      "description": "<description todo 3>",
      "status": <status todo 3>,
      "due_date": "<due date todo 3>",
      "userId": <user id who create todo 3>,
      "createdAt": "2021-02-01T14:09:00.788Z",
      "updatedAt": "2021-02-01T14:09:00.788Z"
    }
  ]
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

---

### Show One Task
> Show one task by id

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
- **URL Params** : `id=integer`

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
  ```

  _Request Body_
  ```

  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": 1,
    "title": "<title todo 1>",
    "description": "<description todo 1>",
    "status": <status todo 1>,
    "due_date": "<due date todo 1>",
    "userId": <user id who create todo 1>,
    "createdAt": "2021-02-01T14:04:28.924Z",
    "updatedAt": "2021-02-01T14:04:28.924Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to access"
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

### Update Task

- **URL** : `/todos/:id`
- **Method** : `PUT`
- **URL Params** : `id=integer`
- **Data Params** :
    ```
    title=string (required)
    description=string
    due_date=string format YYYY-MM-DD (required)
    ```

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "title": "<updated-title>",
    "description": "<updated-description>",
    "due_date": "<updated-due-date>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": 1,
    "title": "<updated-title>",
    "description": "<updated-description>",
    "status": false,
    "due_date": "<updated-due-date>",
    "userId": <user id who create todo 1>,
    "createdAt": "2021-02-01T14:04:28.924Z",
    "updatedAt": "2021-02-01T14:12:24.963Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to access"
  }
  ```

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

### Update Status Task

- **URL** : `/todos/:id`
- **Method** : `PATCH`
- **URL Params** : `id=integer`
- **Data Params** :
    ```
    status=boolean (required)
    ```

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
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
    "id": 1,
    "title": "<title todo 1>",
    "description": "<description todo 1>",
    "status": <updated-status>,
    "due_date": "<due date todo 1>",
    "userId": <user id who create todo 1>,
    "createdAt": "2021-02-01T14:08:24.919Z",
    "updatedAt": "2021-02-01T14:14:53.183Z"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to access"
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
- **URL Params** : `id=integer`

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
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
      "title": "<title todo 3>",
      "description": "<description todo 3>",
      "status": <status todo 3>,
      "due_date": "<due date todo 3>",
      "userId": <user id who create todo 3>,
      "createdAt": "2021-02-01T14:09:00.788Z",
      "updatedAt": "2021-02-01T14:09:00.788Z"
    },
    "message": "Successfully delete todo"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to access"
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

### Weather Prediction Information on Due Date Todo
> Get weather Prediction information on Due Date by todo id

- **URL** : `/weathers/:id`
- **Method** : `POST`
- **URL Params** : `id=integer`
- **Data Params** : `city=string (required)`

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "city": "<your city>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
      "moonrise_ts": 1612636050,
      "wind_cdir": "NW",
      "rh": 60,
      "pres": 1004.8333,
      "high_temp": 31.9,
      "sunset_ts": 1612696395,
      "ozone": 247.25,
      "moon_phase": 0.225299,
      "wind_gust_spd": 6.1328125,
      "snow_depth": 0,
      "clouds": 68,
      "ts": 1612630860,
      "sunrise_ts": 1612652093,
      "app_min_temp": 29.3,
      "wind_spd": 3.502747,
      "pop": 15,
      "wind_cdir_full": "northwest",
      "slp": 1007.6667,
      "moon_phase_lunation": 0.84,
      "valid_date": "2021-02-07",
      "app_max_temp": 35,
      "vis": 24.12089,
      "dewpt": 20.8,
      "snow": 0,
      "uv": 7.1170425,
      "weather": {
          "icon": "c03d",
          "code": 803,
          "description": "Broken clouds"
      },
      "wind_dir": 305,
      "max_dhi": null,
      "clouds_hi": 57,
      "precip": 0.5,
      "low_temp": 27.8,
      "max_temp": 32.1,
      "moonset_ts": 1612682002,
      "datetime": "2021-02-07",
      "temp": 29.5,
      "min_temp": 27.7,
      "clouds_mid": 0,
      "clouds_low": 11
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "You are not authorized to access"
  }
  ```

  _Response(404 - Not Found)_
  ```
  {
    "errors": "Task Not Found"
  }
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "errors": "You must enter the city name"
  }
  ```

    _Response(400 - Bad Request)_
  ```
  {
    "errors": "Sorry, weather prediction is not available yet"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```


### Weather Information Widget
> Get the weather prediction information for today and the next 3 days

- **URL** : `/weathers/all`
- **Method** : `POST`
- **Data Params** : `city=string (required)`

  _Request Header_
  ```
  {
    "token": "<your access token>"
  }
  ```

  _Request Body_
  ```
  {
    "city": "<your city>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "data": [
        {
            "moonrise_ts": 1612546359,
            "wind_cdir": "NW",
            "rh": 67,
            "pres": 1004.61,
            "high_temp": 31.3,
            "sunset_ts": 1612609999,
            "ozone": 253.778,
            "moon_phase": 0.330601,
            "wind_gust_spd": 8.69531,
            "snow_depth": 0,
            "clouds": 87,
            "ts": 1612544460,
            "sunrise_ts": 1612565682,
            "app_min_temp": 29.1,
            "wind_spd": 4.48171,
            "pop": 90,
            "wind_cdir_full": "northwest",
            "slp": 1007.89,
            "moon_phase_lunation": 0.8,
            "valid_date": "2021-02-06",
            "app_max_temp": 34.4,
            "vis": 14.0449,
            "dewpt": 21.9,
            "snow": 0,
            "uv": 3.96428,
            "weather": {
                "icon": "t03d",
                "code": 202,
                "description": "Thunderstorm with heavy rain"
            },
            "wind_dir": 324,
            "max_dhi": null,
            "clouds_hi": 76,
            "precip": 22.625,
            "low_temp": 26.6,
            "max_temp": 31.4,
            "moonset_ts": 1612592072,
            "datetime": "2021-02-06",
            "temp": 28.8,
            "min_temp": 26.8,
            "clouds_mid": 0,
            "clouds_low": 40
        },
        {
          ...
        },
        {
          ...
        }
    ]
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```
