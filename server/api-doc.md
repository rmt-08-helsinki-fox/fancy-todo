# Fancy Todo

base url : http://localhost:PORT

## App Requirements
---

Dependencies :
- expres
- pg
- sequelize
- axios
- bcryptjs
- jsonwebtoken


## Endpoint List
---

## 1. User

### Register

- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
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

- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
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
| status      | req.body.status                   |
| due_date    | req.body.due_date                 |
| userId      | req.decoded.id                    |


- **URL** : `/todos`
- **Method** : `POST`
- **Data Params** :
    ```
    title=string
    description=string
    status=boolean
    due_date=string format YYYY-MM-DD
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
    "status": <false/true>
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
    "status": <status todo>,
    "due_date": "<due date todo>",
    "updatedAt": "2021-02-01T14:04:28.924Z",
    "createdAt": "2021-02-01T14:04:28.924Z",
    "userId": <user id who create todo>
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

  _Response(403 - Forbidden)_
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

### Update Task All Field

- **URL** : `/todos/:id`
- **Method** : `PUT`
- **URL Params** : `id=integer`
- **Data Params** :
    ```
    title=string
    description=string
    status=boolean
    due_date=string format YYYY-MM-DD
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
    "status": <updated-status>,
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
    "status": <updated-status>,
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

  _Response(403 - Forbidden)_
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
    status=boolean
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

  _Response(403 - Forbidden)_
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
    "message": "Todo success to delete"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "errors": "Invalid Token"
  }
  ```

  _Response(403 - Forbidden)_
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

### Get Weather Information
> Get weather information by id

- **URL** : `/todos/:id/weather-info?city=<city name>`
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

  _Response(403 - Forbidden)_
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

  ```
  {
    "errors": "You must enter the city name"
  }
  ```

  _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```


