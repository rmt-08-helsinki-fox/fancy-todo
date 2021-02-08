# fancy_todo

Membuat web aplikasi untuk mencatat hal - hal ynag perlu dilakukan

- RESTful endpoint for assset's CRUD operation
- JSON formated response

&nbsp;

## List Endpoints Todo

- "POST/todos"
- "GET/todos"
- "GET/todos/:id"
- "PUT/todos/:id"
- "PATCH/todos/:id"
- "DELETE/todos/:id"

## RESTful endpoints

## POST/todos

> create new Todo

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
{
  "title": "<title to get insert into",
  "description": "<description to get insert into",
  "due_date": "<due date to get insert into"
}
```

_Response (201 - Created)_

```json
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad request)_

```json
["Please Insert Title", "Date must be greater then today"]
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## GET/todos

> Show All Todos

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
not needed
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "Not Found"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## GET/todos/:id

> Show Todo find by id

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
not needed
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "Not Found"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## PUT/todos

> Update todo

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
{
  "title": "<title to get update",
  "description": "<description to get update",
  "due_date": "<due date to get update"
}
```

_Response (200 - OK)_

```json
{
  "id": <given id by system>,
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad request)_

```json
["Please Insert Title", "Date must be greater then today"]
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## PATCH/todos/:id

> Update status todo

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
{
  "status": "<status to get update"
}
```

_Response (200 - OK)_

```json
{
  "id": "<same as before>",
  "title": "<title same as before>",
  "description": "<description same as before>",
  "status": "<status updated>",
  "due_date": "<due_date same as before>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## DELETE/todos/:id

> Delete todo

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json

not needed

```

_Response (200 - OK)_

```json
{
  "Todo Success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "Not Found"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## DELETE/todos

> Delete all done todos

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json

not needed

```

_Response (200 - OK)_

```json
{
  "All Done Todo Deleted"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## List Endpoints User

- "POST/register"
- "POST/login"
- "POST/user"
- "POST/login/google"

## RESTful endpoints

## POST/register

> create new register

_Request Header_

```json
{
  not needed
}
```

_Request Body_

```json
{
  "username": "<username to get insert into",
  "email": "<email to get insert into",
  "password": "<password to get insert into"
}
```

_Response (200 - Ok)_

```json
{
  "id": "<given id by system>",
  "username": "<posted username>",
  "email": "<posted email>"
}
```

_Response (400 - Bad request)_

```json
["Please Insert Username", "invalid email format", "password min 6 characters"]
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## POST/login

> login process

_Request Header_

```json
{
  not needed
}
```

_Request Body_

```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - Ok)_

```json
{
  "access_token": "<access token generated>"
}
```

_Response (400 - Bad request)_

```json
{
  "Email/Password Wrong"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## POST/user

> Get user

_Request Header_

```json
{
  "access_token": "<Your access_token>"
}
```

_Request Body_

```json
not needed
```

_Response (200 - Ok)_

```json
{
  "id": "<user id>",
  "email": "<user email>",
  "username": "<user username>"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## POST/login/google

> login process

_Request Header_

```json
{
  not needed
}
```

_Request Body_

```json
{
  "id_token":"<id_token to get insert into">,
}
```

_Response (200 - Ok)_

```json
{
  "access_token": "<access token generated>"
}
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```

## List Endpoints Holidays

- "GET/holidays"

## RESTful endpoints

## GET/holidays

> Show holidays in a year

_Request Header_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_

```json
not needed
```

_Response (200 - OK)_

```json
[
    {
        "name": "New Year's Day",
        "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
        "date": "2021-01-01"
    },
    {
        "name": "Chinese Lunar New Year's Day",
        "description": "Chinese New Year is the first day of the Chinese calendar, which is a lunisolar calendar mainly used for traditional celebrations.",
        "date": "2021-02-12"
    },
```

_Response (500 - internal server error)_

```json
{
  "Internal server Error"
}
```
