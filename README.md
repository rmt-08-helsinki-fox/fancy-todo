# fancy-todo

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:notyet
Server URL : http://localhost:3000
```

### GET/todos

>get all todos list

Request Header

{
    token: token
}

Response (200)

[
    {
        "id": 44,
        "title": "Learn API",
        "description": "Learning API",
        "due_date": null,
        "createdAt": "2021-02-02T17:10:21.597Z",
        "updatedAt": "2021-02-02T17:10:21.597Z",
        "UserId": 16
    },
    {
        "id": 45,
        "title": "Learn API",
        "description": "Learning API",
        "due_date": "2021-03-05T00:00:00.000Z",
        "createdAt": "2021-02-02T17:12:06.563Z",
        "updatedAt": "2021-02-02T17:12:06.563Z",
        "UserId": 16
    },
    {
        "id": 46,
        "title": "Learn API",
        "description": "Learning API",
        "due_date": "2021-02-28T17:00:00.000Z",
        "createdAt": "2021-02-02T17:12:15.358Z",
        "updatedAt": "2021-02-02T17:12:15.358Z",
        "UserId": 16
    }
]

Response (400)
{
    message: "Authentication failed"
}

Response (403)
{
    message: "Authorization failed"
}

Response (500)
{
    message: "Internal server error"
}






### POST/todos

>Create new todos list

Request Header

{
    token: token
}

Request Body
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}

Response (201)
{
    "id": 48,
    "title": "Learn API",
    "description": "Learning API",
    "due_date": "2021-02-04T17:00:00.000Z",
    "UserId": 16,
    "status": null
}

Response (400)
{
    message: "Todo.title cannot be null,Todo.description cannot be null, Todo.due_date cannot be null, "This email is already taken try another, Validation isAfter on due_date failed"
}

Response (400)
{
    message: "Authentication failed"
}

Response (403)
{
    message: "Authorization failed"
}

Response (500)
{
    message: "Internal server error"
}



### GET/todos/:id

>Get todos list by ID

Request Header

{
    token: token
}

Response (200)
{
    "id": 45,
    "title": "Learn API",
    "description": "Learning API",
    "due_date": "2021-03-05T00:00:00.000Z",
    "status": null,
    "createdAt": "2021-02-02T17:12:06.563Z",
    "updatedAt": "2021-02-02T17:12:06.563Z",
    "UserId": 16
}


Response (400)
{
    message: "Authentication failed"
}

Response (403)
{
    message: "Authorization failed"
}

Response (404)
{
    message: "Todo tidak ditemukan"
}

Response (500)
{
    message: "Internal server error"
}




### PUT/todos/:id

Request Header

{
    token: token
}

Request Body
{
  "title": "<title to get updated into>",
  "description": "<description to get updated into>",
  "due_date": "<due_date to get updated into>"
}

Response (200)
{
    "id": 47,
    "title": "Learn API",
    "description": "Learning API",
    "due_date": "2021-02-04T17:00:00.000Z",
    "status": null,
    "createdAt": "2021-02-03T06:33:30.776Z",
    "updatedAt": "2021-02-03T06:39:53.659Z",
    "UserId": 16
}


Response (400)
{
    message: "Authentication failed"
}

Response (403)
{
    message: "Authorization failed"
}

Response (404)
{
    message: "Todo tidak ditemukan"
}

Response (500)
{
    message: "Internal server error"
}

Response (400)
{
    message: "error: invalid input syntax for type boolean"
}



### DELETE/todos/:id

Request Header

{
    token: token
}

Response (200)


Response (400)
{
    message: "Authentication failed"
}

Response (403)
{
    message: "Authorization failed"
}

Response (404)
{
    message: "Todo tidak ditemukan"
}

Response (500)
{
    message: "Internal server error"
}




### POST/register

>Create User

Request Body

{
    "email": "<User's email>",
    "password": "<User's password>"
}


Response (201)
{
    "id": 3
    "email": "test@gmail.com"
}

Response (400)
{
    message: "User.email cannot be null,Todo.description cannot be null, Todo.due_date cannot be null, "This email is already taken try another, Validation isAfter on due_date failed"
}

Response (500)
{
    message: "Internal server error"
}




### POST/login

>Login User


Request Body
{
    "email": "<User's email>",
    "password": "<User's password>"
}

Response (200)
{
    token: token
}

Response (400)
{
    message: "Login gagal"
}

Response (500)
{
    message: "Internal server error"
}


### GET/auth

>Refresh page, Auth

Request Headers
{
    token: token
}

Response (200)
{
    name: <user name>,
    email: <user email>
}

Response (400)
{
    message: "Authentication failed"
}




### GET/googlelogin

>Google Sign IN User

_Request Header_
```
{
    "token":  "id_token"
}
```

_Response(200)_
```
{
    token: token
}
```

_Response (500)_
```
{
  "message": "Internal server error"
}
```













































### GET/charity

>Get charity List

_Request Header_
```
not needed
```

_Request Body_
```
not need
```

_Response(200)_
```
{
    "data": {
        "code": 200,
        "msg": "OK, all went through!",
        "data": [
            {
                "categoryId": "?",
                "categoryDesc": "Not Provided"
            },
            {
                "categoryId": "A",
                "categoryDesc": "Arts, Culture and Humanities"
            },
            {
                "categoryId": "B",
                "categoryDesc": "Educational Institutions and Related Activities"
            },
            {
                "categoryId": "C",
                "categoryDesc": "Environmental Quality, Protection and Beautification"
            },
            {
                "categoryId": "D",
                "categoryDesc": "Animal-Related"
            },
            {
                "categoryId": "E",
                "categoryDesc": "Health - General and Rehabilitative"
            },
            {
                "categoryId": "F",
                "categoryDesc": "Mental Health, Crisis Intervention"
            },
            {
                "categoryId": "G",
                "categoryDesc": "Diseases, Disorders, Medical Disciplines"
            },
            {
                "categoryId": "H",
                "categoryDesc": "Medical Research"
            }
```



_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### POST/simplemailsender.p.rapidapi.com/SendMails/Send

>Sending success notice to User's email

_Request Header_
```
{
"x-rapidapi-host":"simplemailsender.p.rapidapi.com",
"x-rapidapi-key":<User's API key>
}
```

_Request Body_
```
{
	Correo_Delivery : User's email,
  Mensjae : `You have successfully added a new todo`
}
```

_Response(200)_
```
You will receive a successfully added response/notice that sounds like: `You have successfully added a new todo`
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```


