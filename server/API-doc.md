# FANCY TODO

base url : http://localhost:PORT

## ENV Requirements
---
```
SECRET="open shazam"
WEATHERKEY = 5563476f2b3d458e8799c311e8689447
CLIENT_ID = 69638797025-tg3t38rp8ciafgr8r7sn6hh4me45sde8.apps.googleusercontent.com
USER_PASS = "buka pintu"
```

## Endpoint List
---

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
    "password": "<user-password>",
  }
  ```

- **Success Response**

  _Response(201 - Created)_
  ```
  {
    "id": <given id by system>,
    "email": "<user>@mail.com",
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
  
  _Response(400 - Bad Request)_
  ```
  {
    "errors": [
      "not email format"
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
    access_token=string
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

  _Response(200 - OK)_
  ```
  {
    "access_token": "<your access token>"
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

---

### Login OAUTH

- **URL** : `/users/google-login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
    access_token=string
    ```

  _Request Header_
  ```

  ```

  _Request Body_
  ```
  {
    "email": "<user@gmail.com>",
    "password": "<user-password>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "access_token": "<your access token>"
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

---

### List Todo task 

- **URL** : `/todos`
- **Method** : `GET`
- **Data Params** :
    ```
    access_token=string
    ```

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
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
        "id": 21,
        "title": "memanggang sapi",
        "description": "memanggang sapi untuk makan malam",
        "status": false,
        "due_date": "2021-02-07T00:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T05:24:22.454Z",
        "updatedAt": "2021-02-06T05:24:25.593Z"
    },
    {
        "id": 18,
        "title": "group project",
        "description": "mengerjakan group project ",
        "status": false,
        "due_date": "2021-02-06T00:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T01:48:54.566Z",
        "updatedAt": "2021-02-06T05:24:26.541Z"
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

### Input New Task to Todo List

- **URL** : `/todos`
- **Method** : `POST`
- **Data Params** :
    ```
    title=string
    description=string
    status=boolean
    due_date=date
    access_token=string
    ```

  _Request Header_
  ```
    "access_token": "<your access token>"
  ```

  _Request Body_
  ```
  {
    "title": "<todos task>",
    "description": "<todos description>"
    "status": "<true(done)/false(not done)",
    "due date": "<due date for the task(cannot be past date)>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "id": 23,
    "title": "menggali taman",
    "description": "asdasdad",
    "status": "true",
    "due_date": "2021-02-09T00:00:00.000Z",
    "UserId": 28,
    "updatedAt": "2021-02-06T08:40:12.284Z",
    "createdAt": "2021-02-06T08:40:12.284Z"
    }
  ```

- **Error Response**
  
  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "title should not be empty"
    ]
  } 
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "description should not be empty"
    ]
  } 
  ```

   _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "status should not be empty"
    ]
  } 
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "date should not be empty and / or past date"
    ]
  } 
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "message": [
        "invalid token"
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

### Get Information of Todays Wather

- **URL** : `/todos/weather/today`
- **Method** : `POST`
- **Data Params** :
    ```
    location=string
    access_token=string
    ```

  _Request Header_
  ```
    "access_token": "<your access token>"
  ```

  _Request Body_
  ```
  {
    "lcoation": "<location user want to know the weather of e.g., Bandung,Jakarta,etc>",
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "data": [
        {
            "rh": 80.375,
            "pod": "d",
            "lon": 111.7844,
            "pres": 1000.5,
            "timezone": "Asia/Jakarta",
            "ob_time": "2021-02-06 08:41",
            "country_code": "ID",
            "clouds": 34,
            "ts": 1612600899,
            "solar_rad": 574.6,
            "state_code": "08",
            "city_name": "Bandung",
            "wind_spd": 6.53366,
            "wind_cdir_full": "west-northwest",
            "wind_cdir": "WNW",
            "slp": 1005,
            "vis": 16,
            "h_angle": 45,
            "sunset": "10:54",
            "dni": 645.14,
            "dewpt": 24,
            "snow": 0,
            "uv": 5.72549,
            "precip": 0,
            "wind_dir": 296,
            "sunrise": "22:31",
            "ghi": 586.93,
            "dhi": 209.35,
            "aqi": 44,
            "lat": -8.1676,
            "weather": {
                "icon": "c02d",
                "code": 802,
                "description": "Scattered Clouds"
            },
            "datetime": "2021-02-06:07",
            "temp": 27.8,
            "station": "WARR",
            "elev_angle": 43.09,
            "app_temp": 31.5
        }
    ],
    "count": 1
  }
  ```

- **Error Response**
  
  _Response(401 - Unaothorized)_
  ```
  {
    "message": [
        "invalid token"
    ]
  }
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "location cannot be empty"
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

### List Todo task 

- **URL** : `/todos/:id`
- **Method** : `GET`
- **Data Params** :
    ```
    id=Integer
    access_token=string
    ```

  _Request Header_
  ```
  {
    "access_token": "<your access token>"
  }
  ```
   _Request params_
    ```
    {
      "id": "<User.id>",
    }

  _Request Body_
  ```

  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  [
    {
        "id": 21,
        "title": "memanggang sapi",
        "description": "memanggang sapi untuk makan malam",
        "status": false,
        "due_date": "2021-02-07T00:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T05:24:22.454Z",
        "updatedAt": "2021-02-06T05:24:25.593Z"
    },
    {
        "id": 18,
        "title": "group project",
        "description": "mengerjakan group project ",
        "status": false,
        "due_date": "2021-02-06T00:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T01:48:54.566Z",
        "updatedAt": "2021-02-06T05:24:26.541Z"
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

### Edit Task in Users Todo List

- **URL** : `/todos/:id`
- **Method** : `PUT`
- **Data Params** :
    ```
    id=Integer
    title=string
    description=string
    status=boolean
    due_date=date
    acces_token=string
    ```

  _Request Header_
  ```
    {
    "acces_token": "<your access token>"
    }
  ```
   _Request params_
    ```
    {
      "id": "<User.id>",
    }

  _Request Body_
  ```
  {
    "title": "<todos task>",
    "description": "<todos description>"
    "status": "<true(done)/false(not done)",
    "due date": "<due date for the task(cannot be past date)>"
  }
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  [
    {
        "id": 18,
        "title": "asdad",
        "description": "asdadas",
        "status": false,
        "due_date": "2021-02-09T17:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T01:48:54.566Z",
        "updatedAt": "2021-02-06T09:03:06.872Z"
    }
  ]
  ```

- **Error Response**
  
  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "title should not be empty"
    ]
  } 
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "description should not be empty"
    ]
  } 
  ```

   _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "status should not be empty"
    ]
  } 
  ```

  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "date should not be empty and / or past date"
    ]
  } 
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "message": [
        "invalid token"
    ]
  }
  ```

  _Response(404 - Not found)_
  ```
  {
    "message": [
        "error, not found"
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

### Edit status only in Users Todo List

- **URL** : `/todos/:id`
- **Method** : `PATCH`
- **Data Params** :
    ```
    status=boolean
    access_token=string
    ```

  _Request Header_
  ```
    {
    "access_token": "<your access token>"
    }
  ```

  _Request params_
    ```
    {
      "id": "<User.id>",
    }

    _Request Body_
    ```
    {
      "status": "<true(done)/false(not done)",
    }
    ```

- **Success Response**

  _Response(200 - OK)_
  ```
  [
    {
        "id": 18,
        "title": "asdad",
        "description": "asdadas",
        "status": false,
        "due_date": "2021-02-09T17:00:00.000Z",
        "UserId": 28,
        "createdAt": "2021-02-06T01:48:54.566Z",
        "updatedAt": "2021-02-06T09:10:01.430Z"
    }
  ]
  ```

- **Error Response**
  
  _Response(400 - Bad Request)_
  ```
  {
    "message": [
        "status should not be empty"
    ]
  } 
  ```

  _Response(401 - Unauthorized)_
  ```
  {
    "message": [
        "Invalid Token"
    ]
  } 
  ```

  _Response(404 - Unauthorized)_
  ```
  {
    "message": [
        "error, not found"
    ]
  } 
  ```
   _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```

  ### Delete Users Todo List

- **URL** : `/todos/:id`
- **Method** : `DELETE`
- **Data Params** :
    ```
    id=Integer
    access_token=string
    ```

  _Request Header_
  ```
    {
    "access_token": "<your access token>"
    }
  ```
   _Request params_
    ```
    {
      "id": "<User.id>",
    }

  _Request Body_
  ```
  
  ```

- **Success Response**

  _Response(200 - OK)_
  ```
  {
    "message": "todo success to delete"
  }
  ```

- **Error Response**

  _Response(401 - Unauthorized)_
  ```
  {
    "message": [
        "Invalid Token"
    ]
  } 
  ```

   _Response(500 - Internal Server Error)_
  ```
  {
    "errors": "Internal Server Error"
  }
  ```