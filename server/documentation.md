POST /todos
- add New Todo

Request Header
{
  "access_token": "<your access token>"
}

Request Body
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>"
}

Response (201 - Created)
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

GET /todos
- Find All Todo List

Request Header
{
  "access_token": "<your access token>"
}

Request Body
No needed

Response (200)
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]

Response (500)
{
  message: "Internal Server Error"
}

============================================================

GET /todos/:id
- Find Todo List by ID

Request Header
{
  "access_token": "<your access token>"
}

Request Body
No needed

Response (200)
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

PUT /todos/:id
- Update Todo List by ID

Request Header
{
  "access_token": "<your access token>"
}

Request Body
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>"
}

Response (200)
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

PATCH /todos/:id
- Update Todo List status by ID

Request Header
{
  "access_token": "<your access token>"
}

Request Body
{
  "status": "<status to get insert into>"
}

Response (200)
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

DELETE /todos/:id
- DELETE Todo List by ID

Request Header
{
  "access_token": "<your access token>"
}

Request Body
no needed

Response (200)
{
  message: "todo has been deleted"
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

POST /users/register
- add new User

Request Header
no needed

Request Body
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}

Response (201 - Created)
{
  "id": 1,
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}

============================================================

POST /users/login
- User login

Request Header
no needed

Request Body
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}

Response (200)
{
  "id": 1,
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (500)
{
  message: "Internal Server Error"
}