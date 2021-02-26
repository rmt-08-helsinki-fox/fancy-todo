# fancy-todo

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : https://fancy-todo-hacktiv8-f0737.web.app/
Server URL : https://hacktiv8-fancy-todo.herokuapp.com
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

Request header
```
{
    token: token
}
```

Response(200)
{
    token: token
}

Response(500)
{
    message: "Internal server error"
}



### GET/brewery/list

Request header
{
    token: <string id_token>
}

Response(200)
{
    [
        {
            id: 2,
            name: "Avondale Brewing Co",
            brewery_type: "micro",
            street: "201 41st St S",
            address_2: null,
            address_3: null,
            city: "Birmingham",
            state: "Alabama",
            county_province: null,
            postal_code: "35222-1932",
            country: "United States",
            longitude: "-86.774322",
            latitude: "33.524521",
            phone: "2057775456",
            website_url: "http://www.avondalebrewing.com",
            updated_at: "2018-08-23T23:19:57.825Z",
            created_at: "2018-07-24T01:32:47.255Z"
        },

        ...
    ]
}