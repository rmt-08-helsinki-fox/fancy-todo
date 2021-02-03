# fancy-todo
DOKUMENTASI 

# fancy-to-do
```
Create fancy to do lover app, to-do app for lover man,and women to reach their for potential of love using express,axios
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response
* Web Server response
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
```

##Restful endpoints
# URL
```
Server URL : http://localhost:3000
```

### POST/todos

>Create new todos list

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```javascript
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}
```
_Response (201 - Created)_
```javascript
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "duedate": "<posted duedate>"
  
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  VALIDATION_ERROR
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false", "This email is already taken try another, You date has already passed"
}
```

_Response (500)_
```javascript
{
   "Error": UNKNOWN_ERROR,
  "message": "Error undescribable"
}
```


### GET/todos

>get all todos list

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
not needed
```
_Response (200)_
```Get all data
[
    {
        "id": 2,
        "title": "makan bareng jenifer lawrence",
        "description": "hai",
        "status": false,
        "duedate": "2021-02-02",
        "createdAt": "2021-02-01T09:36:26.829Z",
        "updatedAt": "2021-02-01T11:08:33.164Z",
        "UserId": null
    },
    {
        "id": 4,
        "title": "makan malam bersama anies",
        "description": "makan sate",
        "status": false,
        "duedate": "2021-04-05",
        "createdAt": "2021-02-01T11:17:28.593Z",
        "updatedAt": "2021-02-01T11:17:28.593Z",
        "UserId": null
    },
    {
        "id": 1,
        "title": "makan bareng  mia khalifa",
        "description": "hai",
        "status": false,
        "duedate": "2021-02-02",
        "createdAt": "2021-02-01T09:17:28.868Z",
        "updatedAt": "2021-02-01T11:19:56.053Z",
        "UserId": null
    }
]
```

_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### GET/todos/:id

>Get todos list by ID
ex: id : 4

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
not needed
```

_Response (200)_
```javascript
```
{
    "todo": {
        "id": 4,
        "title": "makan malam bersama anies",
        "description": "makan sate",
        "status": false,
        "due_date": "2021-04-05"
      
    }
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```


_Response (500)_
```javascript
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```
```
### PUT/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```

{
  access_token: token
}
```


_Request Body_
```javascript
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "duedate": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```javascript

```
before
```
[
    1,
    [
        {
            "id": 1,
            "title": "berenang bareng  emma watson",
            "description": "di kali dekat rumah ",
            "status": false,
            "duedate": "2022-02-02",
            "createdAt": "2021-02-01T09:17:28.868Z",
            "updatedAt": "2021-02-02T01:49:29.608Z",
            "UserId": null
        }
    ]
]
```

after
```
[
    1,
    [
        {
            "id": 1,
            "title": "mancing  bareng  emma watson",
            "description": "di laut",
            "status": false,
            "duedate": "2021-05-02",
            "createdAt": "2021-02-01T09:17:28.868Z",
            "updatedAt": "2021-02-02T01:50:50.267Z",
            "UserId": null
        }
    ]
]
```




_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```



_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response (500)_
```javascript

{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```
### PATCH/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```javascript
{
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```javascript

```
before
```
[
    1,
    [
        {
            "id": 1,
            "title": "berenang bareng  emma watson",
            "description": "di kali dekat rumah ",
            "status": false,
            "duedate": "2022-02-02",
            "createdAt": "2021-02-01T09:17:28.868Z",
            "updatedAt": "2021-02-02T01:49:29.608Z",
            "UserId": null
        }
    ]
]
```

after
```
[
    1,
    [
        {
            "id": 1,
            "title": "mancing  bareng  emma watson",
            "description": "di laut",
            "status": true,
            "duedate": "2021-05-02",
            "createdAt": "2021-02-01T09:17:28.868Z",
            "updatedAt": "2021-02-02T01:50:50.267Z",
            "UserId": null
        }
    ]
]
```




_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```



_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response (500)_
```javascript

{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```javascript
{
    "todo": 1
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

