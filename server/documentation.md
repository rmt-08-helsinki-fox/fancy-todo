# FANCY TODO
Fancy Todo App is an application to manage your todos. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* Jwt, bcrypt for auth
* PostgreSQL, sequelize
* for client side: jquery, ajax, bootstrap

&nbsp;
3rd party API used:
* GMAIL API
* GAuth



&nbsp;
# RESTful ENDPOINTS:
## TODO endpoints

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
### **POST /todos/weather** 
> Get current weather based on city input
* **request body:**
```
{
    "city": "Jakarta"
}
```

* **Success response (200):**
```
[
    {
        "id": 721,
        "main": "Haze",
        "description": "haze",
        "icon": "50d"
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

## USER endpoints
### **POST /user/register** 
> Register new User
* **request body:** 
    * _email must be unique_
    * _password minimum length is 6 characters_
```
{
    "email" : "<email>",
    "password": "<password>"
}
```

* **Success response (201 - Created):**
```
{
    "id": <given id by system>,
    "email": "<user email>",
    "password": "<asset description>",
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
### **POST /user/login** 
> Authenticate login user
* **request body:** 
    * _email must be unique_
    * _password minimum length is 6 characters_
    * _email and password must match with data in database_
```
{
    "email" : "<email>",
    "password": "<password>"
}
```

* **Success response (201 - Created):**
```
{
    "id": <given id by system>,
    "email": "<user email>",
    "password": "<asset description>",
    "updatedAt": "2021-02-01T13:13:18.409Z",
    "createdAt": "2021-02-01T13:13:18.409Z"
}
```
* **Error response (400):**
```
{
    message: "Invalid email/password"
}
```
* **Error response (500):**
```
{
    message: "internal server error"
}
```
---
