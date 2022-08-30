**TO-DO LIST**
===

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8083
Server URL : http://localhost:3000
```

### GET/ todos/list

>get all todos list


_Request Header_
```
{
  token: token
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
        "id": 10,
        "title": "swimming",
        "description": "conditioning for hiking",
        "status": "closed",
        "dueDate": "2021-02-10",
        "UserId": 14,
        "createdAt": "2021-02-03T18:15:41.946Z",
        "updatedAt": "2021-02-03T19:09:57.645Z"
    }
]
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
}
```



### POST/ todos/add

>Create new todos list

__Request Header_
```
{
  token: token
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "due_date": "<due_date to get insert into>",
  "description": "<description to get insert into>"
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
_Response(400 - SequelizeUniqueConstraintError) or (400 - SequelizeValidationError)_
```
{
    "errMsg": "Name required,Description required,Due date required, "This email is already taken try another, Your due date has already passed"
}
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
}
```


### GET /todos/:id

>Get todos list by ID


__Request Header_
```
{
  token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
        "id": 10,
        "title": "swimming",
        "description": "conditioning for hiking",
        "status": "closed",
        "dueDate": "2021-02-10",
        "UserId": 14,
        "createdAt": "2021-02-03T18:15:41.946Z",
        "updatedAt": "2021-02-03T19:09:57.645Z"
}

```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response(403- NOT_AUTHORIZED)_
```
{
    "errMsg": "User not authorized"
}
```

_Response(404 - DATA_NOT_FOUND)_
```
{
  "errMsg": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
}
```


### PUT /todos/:id

>Update todos list by ID

_Request Header_
```
{
  token: token
}
```


_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "status": "<status to get updated later on>",
  "due_date": "<due_date to get updated later on>"

}
```
_Response(200)_
```
{
	1
}
```

_Response(400 - SequelizeUniqueConstraintError) or (400 - SequelizeValidationError)_
```
{
    "errMsg": "Name required,Description required,Due date required, "This email is already taken try another, Your due date has already passed"
}
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response(403- NOT_AUTHORIZED)_
```
{
    "errMsg": "User not authorized"
}
```

_Response(404 - DATA_NOT_FOUND)_
```
{
  "errMsg": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
}
```

### PATCH /todos/:id

>Update todos list by ID

_Request Header_
```
{
  token: token
}
```


_Request Body_
```
{
  "status": "<status to get updated later on>",
}
```
_Response(200)_
```
{
	1
}
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response(403- NOT_AUTHORIZED)_
```
{
    "errMsg": "User not authorized"
}
```
_Response(404 - DATA_NOT_FOUND)_
```
{
  "errMsg": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
}
```

### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  token: token
}
```

_Response(200)_
```
{
     1
}
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response(403- NOT_AUTHORIZED)_
```
{
    "errMsg": "User not authorized"
}
```
_Response(404 - DATA_NOT_FOUND)_
```
{
  "errMsg": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
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

_Response(400 - SequelizeUniqueConstraintError) or (400 - SequelizeValidationError)_
```
{
    "errMsg": "Name required,Description required,Due date required, "This email is already taken try another, Your due date has already passed"
}
```

_Response(401 - JsonWebTokenError)_
```
{
    "errMsg": "User need login"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
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
    "token": alkdfknoeifheoifnien4y08
}
```

_Response(400 - SequelizeUniqueConstraintError) or (400 - SequelizeValidationError)_
```
{
    "errMsg": "Name required,Description required,Due date required, "This email is already taken try another, Your due date has already passed"
}
```

_Response (500 - Internal Server Error)_
```
{
    "errMsg": "Internal Server Error"
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

### GET /nyt

>Get trending news from New York Times

_Request Header_
```
{
	api-key	: sadsadkml123jimnl
}
```

_Request Body_
```
not needed
```

_Response(200)_
```
[
    {
        "title": "Biden Seizes on Weak Job Gains to Call for Quick Stimulus Action",
        "abstract": "The president said the economy was “in trouble” and warned Republicans he would move ahead with a $1.9 trillion aid package with or without their support.",
        "url": "https://www.nytimes.com/2021/02/05/business/biden-stimulus.html",
        "imageUrl": "https://static01.nyt.com/images/2021/02/05/us/05dc-bidenecon/05dc-bidenecon-superJumbo-v2.jpg"
    },
    {
        "title": "Biden Bars Trump From Receiving Intelligence Briefings, Citing ‘Erratic Behavior’",
        "abstract": "Mr. Biden said there was “no need” for former President Donald J. Trump to get the briefings, traditionally given to ex-presidents as a courtesy and to keep them informed if their advice is needed.",
        "url": "https://www.nytimes.com/2021/02/05/us/politics/biden-trump-intelligence-briefings.html",
        "imageUrl": "https://static01.nyt.com/images/2021/02/05/multimedia/05dc-biden-intel-breifing-trump/05dc-biden-intel-breifing-trump-superJumbo-v2.jpg"
    },
    {
        "title": "Biden Won’t Restore Bar Association’s Role in Vetting Judges",
        "abstract": "The decision not to give the American Bar Association names of potential nominees for evaluation came after progressives criticized the group for undercutting a push for diversity.",
        "url": "https://www.nytimes.com/2021/02/05/us/politics/biden-american-bar-association-judges.html",
        "imageUrl": "https://static01.nyt.com/images/2021/02/05/us/politics/05dc-judges/05dc-judges-superJumbo-v2.jpg"
    },
    {
        "title": "After Years in Government, Biden Has a New Perk: Air Force One",
        "abstract": "On Friday, he flew home for the first time as president. But it was not on the plane that has so delighted his predecessors.",
        "url": "https://www.nytimes.com/2021/02/05/us/politics/biden-air-force-one.html",
        "imageUrl": "https://static01.nyt.com/images/2021/02/05/us/politics/05c-biden-travel-sub/05c-biden-travel-sub-superJumbo-v2.jpg"
    }
]
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```


