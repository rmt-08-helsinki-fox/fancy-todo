# FANCY TODO

## RESTful endpoints
### **POST /todos** 
> Insert new Todo
* **request body:** 
    * _due_date must be after today_
```
{
    "title" : "<title to get insert into>",
    "description": "<desc to get insert into",
    "status": "todo" || "doing" || "done",
    "due_date": "<date format yyyy-mm-dd>"
}
```

* **Success response (201 - Created):**
```
{
    "id": <given id by system>,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "todo" || "doing" || "done",
    "due_date": "2021-02-27T00:00:00.000Z",
    "updatedAt": "2021-02-01T13:13:18.409Z",
    "createdAt": "2021-02-01T13:13:18.409Z"
}
```
* **Error response (400):**
```
{
    message: "Invalid requests"
}
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---
### **GET /todos** 
> Get all Todos
* **request body:**
```
not needed
```

* **Success response (200):**
```
[
    {
        "id": <given id by system>,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": "todo" || "doing" || "done",
        "due_date": "2021-02-27T00:00:00.000Z",
        "updatedAt": "2021-02-01T13:13:18.409Z",
        "createdAt": "2021-02-01T13:13:18.409Z"
    },
    {
        "id": <given id by system>,
        "title": "<asset title>",
        "description": "<asset description>",
        "status": "todo" || "doing" || "done",
        "due_date": "2021-02-27T00:00:00.000Z",
        "updatedAt": "2021-02-01T13:13:18.409Z",
        "createdAt": "2021-02-01T13:13:18.409Z"
    }
]
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---
### **GET /todos/:id**
> Get a Todo by ID
* **request body:**
```
not needed
```

* **Success response (200):**
```
{
    "id": <given id by system>,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "todo" || "doing" || "done",
    "due_date": "2021-02-27T00:00:00.000Z",
    "updatedAt": "2021-02-01T13:13:18.409Z",
    "createdAt": "2021-02-01T13:13:18.409Z"
}
```
* **Error response (404):**
```
{
    message: "Invalid requests"
}
```
---
### **PUT /todos/:id**
> Edit a all keys of a Todo by id
* **request body:** 
    * _due_date must be after today_
```
{
    "title" : "<title to update into>",
    "description": "<desc to update into",
    "status": "todo" || "doing" || "done",
    "due_date": "<date format yyyy-mm-dd>"
}
```

* **Success response (200):**
```
{
    "id": <selected id from params>,
    "title": "<edited title>",
    "description": "<edited description>",
    "status": "<selected status from request>",
    "due_date": "<edited date, e.g. 2021-02-27T00:00:00.000Z>",
    "updatedAt": "2021-02-01T13:13:18.409Z",
    "createdAt": "2021-02-01T13:13:18.409Z"
}
```
* **Error response (400):**
```
{
    message: "Invalid requests"
}
```
* **Error response (404):**
```
{
    msg: "error not found"
}
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---
### **PATCH /todos/:id**
> Edit a key of a Todo by id
* **request body:** 
```
{
    "status": "todo" || "doing" || "done"
}
```

* **Success response (200):**
```
{
    "id": <selected id from params>,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<selected status from request>",
    "due_date": "2021-02-27T00:00:00.000Z",
    "updatedAt": "2021-02-01T13:13:18.409Z",
    "createdAt": "2021-02-01T13:13:18.409Z"
}
```
* **Error response (400):**
```
{
    message: "Invalid requests"
}
```
* **Error response (404):**
```
{
    msg: "error not found"
}
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---
### **DELETE /todos/:id**
> Delete a Todo by id
* **request body:** 
```
not needed
```

* **Success response (200):**
```
{
    message: 'todo success to delete'
}
```
* **Error response (404):**
```
{
    msg: "error not found"
}
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---