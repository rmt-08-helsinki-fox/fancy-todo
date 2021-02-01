**Fancy Todo**
Fancy todo is an application to help make todo list. This application has : 
* RESTful endpoints for CRUD operation
* JSON formatted response

* **URL**

 /todos

* **method** 
  `GET`
> Get all todo-list in server

* **data Params**
None

*  **success response**

_response (200)_
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

_response (500)_

```
internal error
```



