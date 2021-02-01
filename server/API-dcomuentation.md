**Fancy Todo**
---
Fancy todo is an application to help make todo list.

* **URL:**

    `/todos`

* **method:** 

  `get`
> Get all todo-list in server

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

* **URL:**

    `/todos`

* **method:** 

  `post`
> Add a new data into todo-list

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

* **URL:**

    `/todos/:id`

* **URL Params:**

    ```
    id = [integer]
    ```

* **method:** 

  `Get`
> Get todo-list with spesific id

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

* **URL:**

    `/todos/:id`

* **URL Params:**

    ```
    id = [integer]
    ```

* **method:** 

  `Put`
> Edit a spesific row of todo-list which match with url params id

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

* **URL:**

    `/todos/:id`

* **URL Params:**

    ```
    id = [integer]
    ```

* **method:** 

  `patch`
> Edit column status of todo-list which match with url params id

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

* **URL:**

    `/todos/:id`

* **URL Params:**

    ```
    id = [integer]
    ```

* **method:** 

  `Delete`
> Delete a spesific row of todo-list which match with url params id

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

