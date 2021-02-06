# fancy-todo
##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
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
```


[
    {
    "id": 13,
    "title": "Belajar JWT",
    "description": "step Authentication",
    "status": true,
    "due_date": "2020-10-10T00:00:00.000Z",
    "UserId": 5,
    "createdAt": "2021-02-02T05:17:19.953Z",
    "updatedAt": "2021-02-02T10:22:13.172Z"
  },
  {
    "id": 16,
    "title": "Belajar JWT",
    "description": "step Authentication",
    "status": true,
    "due_date": "2020-10-10T00:00:00.000Z",
    "UserId": 5,
    "createdAt": "2021-02-02T08:35:42.883Z",
    "updatedAt": "2021-02-02T10:36:41.191Z"
  }
]
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "WrongToken"
    "message": "Invalid Token"
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
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
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
  
}
```
_Response(400- bad request)_
```
{
    "Error" :  VALIDATION_ERROR
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false", "This email is already taken try another, You date has already passed"
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```



_Response (500)_
```
{
   "Error": UNKNOWN_ERROR,
  "message": "Error undescribable"
}
```
### GET/todos/:id

>Get todos list by ID


__Request Header_
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
```
{
    "todo": {
        "id": 6,
        "title": "nyapu",
        "description": "nyapu kamar",
        "status": false,
        "due_date": "2020-01-01"
      
    }
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```
### POST/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```
{
    "todo": [
        1
    ]
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```



_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response (500)_
```

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
```
{
    "todo": 1
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```
_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<User's Name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```
{
    "name": "Joey",
    "email": "joy@gmail.com",
    "password": "kvndlkfrnfoieneknne"
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```
{
    "access_token": alkdfknoeifheoifnien4y08
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```



_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
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