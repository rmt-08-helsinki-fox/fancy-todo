# Checklist App
Checklist App is an application to manage your daily tasks on your account. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Axios
* Bycryptjs
* Bootsrap 
* Cors 
* Google-Auth-Library
* JSON Web Token
* Sequelize 

&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (400 - Bad Request)_
```
{
  "message": "Validation Error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "No Authorization"
}
``` 

_Response (404 - Not Found)_ 
``` 
{ 
    "message":"Not Found"
}
``` 

_Response (500 - Not Found)_ 
``` 
{ 
    "message":"Internal Server Error"
}
```


&nbsp;

## RESTful endpoints
### POST /user/login

> Login into account

_Request Body_
```
{ 
    "email" : "example@mail.com",
    "password" : "password"
}
```

_Response (200)_
```
{ 
    "access_token" : "<access token>"
}
```

---
### POST /user/register

> Register new account

_Request Body_
```
{ 
    "email" :"example@mail.com",
    "password" :"password"
}    
```

_Response (200)_
```
{
    "id": 1,
    "email": "example@mail.com",
    "createdAt": "<Created date given by system>",
    "updatedAt": "<Updated date given by system>"
}
```

---
### GET /todos

> Create new asset

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Response (200 - OK)_
```
[
    {
        "id": <given id by system>,
        "title": "<posted title>",
        "description": "<posted description>",
        "status":"<posted status>",
        "due_date":"<posted due_date>,
        "createdAt": "<Created date given by system>",
        "updatedAt": "<Updated date given by system>" 
        "UserId" : "<User id FK referred to user ID>"
    }, 
    {
        "id": <given id by system>,
        "title": "<posted title>",
        "description": "<posted description>",
        "status":"<posted status>",
        "due_date":"<posted due_date>,
        "createdAt": "<Created date given by system>",
        "updatedAt": "<Updated date given by system>" 
        "UserId" : "<User id FK referred to user ID>"
    }
]
```

---
### POST /todos

> Create new todo 

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
{
  "title": "title",
  "description": "description",
  "status":"true or false",
  "due_date":"due date",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status":"<posted status>",
  "due_date":"<posted due_date>,
  "createdAt": "<Created date given by system>",
  "updatedAt": "<Updated date given by system>" 
  "UserId" : "<User id FK referred to user ID>"
}
```

---
### GET /todos/:id

> Show single task defined by the id provided

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status":"<posted status>",
  "due_date":"<posted due_date>,
  "createdAt": "<Created date given by system>",
  "updatedAt": "<Updated date given by system>" 
  "UserId" : "<User id FK referred to user ID>"
}
```

---
### PUT /todos/:id

> Update a task defined by the id provided

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_ 
``` 
{
    "title": "new Title",
    "description": "new Description",
    "status":"new Status",
    "due_date":"new Due date"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<edited title>",
  "description": "<edited description>",
  "status":"<edited status>",
  "due_date":"<edited due_date>,
  "createdAt": "<Created date given by system>",
  "updatedAt": "<Updated date given by system>" 
  "UserId" : "<User id FK referred to user ID>"
}
``` 

---
### PATCH /todos/:id

> Update task's status defined by the id provided

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_ 
``` 
{
    "status": "new Status"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<edited title>",
  "description": "<edited description>",
  "status":"<edited status>",
  "due_date":"<edited due_date>,
  "createdAt": "<Created date given by system>",
  "updatedAt": "<Updated date given by system>" 
  "UserId" : "<User id FK referred to user ID>"
}
```  

---
### DELETE /todos/:id

> Delete task's status defined by the id provided

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Response (200 - OK)_
```
{
  "message" : "todo succes to delete"
}
``` 

---
### GET /weather

> Show weather

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Response (200 - OK)_
```
[
    {
        "location": "Jakarta",
        "time": "<current time>",
        "temperature": "<current temp>",
        "icons": ["icon url"],
        "descriptions": ["weather descriptions"]
    }
]
```
