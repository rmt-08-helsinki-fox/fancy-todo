**Fancy Todo**
---
Fancy todo is an application to help make todo list.

---
* **Method:** 

  `Post /users/register`

> Making a new user register

* **data Params:**

    None

* **data Params:**

    ```
    {
    email:string,unique,email format "<email of user to register>"
    password: string "<password of user>"
    }
    ```

*  **success response**

    * **_response (201)_**
```
{
    "msg": "register succsess",
    "id": 8,
    "email": "surya@mail.com"
}
```
* **Error response**

    * **_response (400 - bad request)_**
```
{
    "message": [
        "email must be unique"
    ]
}
```

---
* **Method:** 

  `Post /users/login`

> Making user logged in

* **data Params:**

    None

* **data Params:**

    ```
    {
    email:string,unique,email format "<email of user to register>"
    password: string "<password of user>"
    }
    ```

*  **success response**

    * **_response (201)_**
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzdXJ5b0BtYWlsLmNvbSIsImlhdCI6MTYxMjI3MDg1OH0.2JiCNVS32BhRytg3K2DVmiQ2vjZZeGcaEeRWDjZYV_E"
}
```
* **Error response**

    * **_response (400 - bad request)_**
```
{
    "message": [
        "invalid email or password"
    ]
}
```
---

* **Method:** 

  `get /todos`

> Get all todo-list in server which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```
* **data Params:**

    None

*  **success response**

    * **_response (200)_**
```
[
    {
        "id": 10,
        "title": "memasak nasi",
        "description": "memasak nasi untuk makan siang",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:24:20.270Z",
        "updatedAt": "2021-02-01T12:24:20.270Z"
    },
    {
        "id": 9,
        "title": "merebus mie",
        "description": "merebus mie untuk makan malam",
        "status": true,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:23:59.830Z",
        "updatedAt": "2021-02-01T12:48:35.599Z"
    }
]
```

* **Error response**

    * **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```
---

* **Method:** 

  `post /todos`
> Add a new data into todo-list which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```

* **data Params:**

    ```
    {
    title:string "<name of the task>"
    description: string "<description of the task>"
    status: boolean "<status of the task, done: true, undone: false>"
    due_date: date "<due date of the task to be finished>"
    }
    ```

*  **success response**

    * **_response (201)_**
```
[
    {
        "id": 10,
        "title": "memasak nasi",
        "description": "memasak nasi untuk makan siang",
        "status": false,
        "UserId": 1
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:24:20.270Z",
        "updatedAt": "2021-02-01T12:24:20.270Z"
    }
]
```

* **Error response**

    * **_response (400 - Bad Request)_**
```
{
    "meesage": [
        "title should not be empty",
        "description should not be empty",
        "status should be either 'true' or 'false'",
        "date should not be empty and / or past date"
    ]
}
```

OR

* **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```
---
* **Method**

    `Get /todos/:id`

> Get todo-list with spesific id which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```

* **URL Params:**

    ```
    id = [integer]
    ```

* **data Params:**

    None

*  **success response**

    * **_response (201)_**
```
[
    {
        "id": 10,
        "title": "memasak nasi",
        "description": "memasak nasi untuk makan siang",
        "status": false,
        "UserId": 1
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:24:20.270Z",
        "updatedAt": "2021-02-01T12:24:20.270Z"
    }
]
```

* **Error response**

    * **_response (404 - Not Found)_**
```
{
    "message": "error, not found"
}
```

OR

* **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```
---
* **Method:**

    `Put /todos/:id`

> Edit a spesific row of todo-list which match with url params id which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```

* **URL Params:**

    ```
    id = [integer]
    ```


* **data Params:**

    ```
    {
    title:string "<name of the task>"
    description: string "<description of the task>"
    status: boolean "<status of the task, done: true, undone: false>"
    due_date: date "<due date of the task to be finished>"
    }
    ```

*  **success response**

    * **_response (200)_**
```
[
    {
        "id": 10,
        "title": "memasak nasi",
        "description": "memasak nasi untuk makan siang",
        "status": false,
        "UserId": 1
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:24:20.270Z",
        "updatedAt": "2021-02-01T12:24:20.270Z"
    }
]
```

* **Error response**

    * **_response (400 - Bad Request)_**
```
{
    "meesage": [
        "title should not be empty",
        "description should not be empty",
        "status should be either 'true' or 'false'",
        "date should not be empty and / or past date"
    ]
}
```

OR

* **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR

* **_response (404 - Not Found)_**
```
{
    "message": "error, not found"
}
```

OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```
---

* **Method:**

    `Patch /todos/:id`

> Edit column status of todo-list which match with url params id which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```

* **URL Params:**

    ```
    id = [integer]
    ```


* **data Params:**

    ```
    {
    status: boolean "<status of the task, done: true, undone: false>"
    }
    ```

*  **success response**

    * **_response (200)_**
```
[
    {
        "id": 10,
        "title": "memasak nasi",
        "description": "memasak nasi untuk makan siang",
        "status": true,
        "UserId": 1
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-01T12:24:20.270Z",
        "updatedAt": "2021-02-01T12:24:20.270Z"
    }
]
```

* **Error response**

    * **_response (400 - Bad Request)_**
```
{
    "message": [
        "status should not be empty and should be either 'true' or 'false'"
    ]
}
```

OR

* **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR

* **_response (404 - Not Found)_**
```
{
    "message": "error, not found"
}
```

OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```
---
* **Method:**

    `Delete /todos/:id`

> Delete a spesific row of todo-list which match with url params id which belongs to user

* **Headers**
```
    access_token <access token obtained via login> 
```

* **URL Params:**

    ```
    id = [integer]
    ```

* **data Params:**

    ```
    None
    ```

*  **success response**

    * **_response (200)_**
```
{
    "message": "todo success to delete"
}
```

* **Error response**


    * **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR

* **_response (404 - Not Found)_**
```
{
    "message": "error, not found"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```

---
* **Method:**

    `Get /todos/weather/today`

> get weather infromation for today

* **Headers**
```
    access_token <access token obtained via login> 
```

* **URL params:**

    ```
    None
    ```

* **data Params:**

    ```
    location : [string] <name of city/location>
    ```

*  **success response**

    * **_response (200)_**
```
{
    "coord": {
        "lon": 107.6186,
        "lat": -6.9039
    },
    "weather": [
        {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 294.83,
        "feels_like": 297.38,
        "temp_min": 294.83,
        "temp_max": 294.83,
        "pressure": 1011,
        "humidity": 86,
        "sea_level": 1011,
        "grnd_level": 929
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.12,
        "deg": 276
    },
    "rain": {
        "1h": 0.1304
    },
    "clouds": {
        "all": 100
    },
    "dt": 1612274069,
    "sys": {
        "country": "ID",
        "sunrise": 1612219876,
        "sunset": 1612264504
    },
    "timezone": 25200,
    "id": 1650357,
    "name": "Bandung",
    "cod": 200
}
```

* **Error response**


    * **_response (500 - internal error)_**
```
{
    "message": "internal server error"
}
```

OR

* **_response (400 - Bad request)_**
```
{
    "message": [
        "location cannot be empty"
    ]
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "invalid token"
}
```
OR
* **Error response**

    * **_response (401 - Unauthorized)_**
```
{
    "message": "not Authorized"
}
```

