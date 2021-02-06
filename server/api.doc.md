# FANCY_TODOS #

## ENDPOINTS:
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

- `POST /login`
- `POST /register`

- `GET /news`
----

### Create Todos
> POST /todos

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  No needed
```
_Request Body_
```json
  {
    "title" : "coding",
    "description" : "don't forget your drink",
    "status": "false",
    "due_date": "2021-02-02"
  }
```
_Response (201)_
```json
  {
    "title" : "coding",
    "description" : "don't forget your drink",
    "status": "false",
    "due_date": "2021-02-02",
    "UserId": 1
  }
```
_Response (400)_
```json
  {
    "message": [
      "You need to login",
      "Title is required",
      "Status is required",
      "Due date must greater then today"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Read Todos
> GET /todos

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  No needed
```
_Request Body_
```json
  No needed
```
_Response (200)_
```json
[
  {
    "id": 1,
    "title" : "coding",
    "description" : "don't forget your drink",
    "status": "false",
    "due_date": "2021-02-02",
    "UserId": 1,
    "createdAt": <Automatically insert by default>,
    "uodatedAt": <Automatically insert by default>
  },
  {
    "id": 2,
    "title" : "coding",
    "description" : "don't forget your drink",
    "status": "false",
    "due_date": "2021-02-02",
    "UserId": 1,
    "createdAt": <Automatically insert by default>,
    "uodatedAt": <Automatically insert by default>
  }
]
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Read Todos By Id
> GET /todos/:id

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  no needed
```
_Response (200)_
```json
  {
    "id": 1,
    "title" : "coding",
    "description" : "don't forget your drink",
    "status": "false",
    "due_date": "2021-02-02",
    "createdAt": <Automatically insert by default>,
    "uodatedAt": <Automatically insert by default>
  }
```
_Response (404)_
```json
  {
    "message": [
      "Todo not found",
      "Your account is Unauthorized"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Update Todos
> PUT /todos/:id

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  {
    "id": 1,
    "title" : "coding lagi",
    "description" : "don't forget your drink and keyboard",
    "status": "true",
    "due_date": "2021-02-02"
  }
```
_Response (200)_
```json
  {
    "id": 1,
    "title" : "coding lagi",
    "description" : "don't forget your drink and keyboard",
    "status": "true",
    "due_date": "2021-02-02",
    "createdAt": <Automatically insert by default>,
    "uodatedAt": <Automatically insert by default>
  }
```
_Response (404)_
```json
  {
    "message": [
      "Todo not found",
      "Your account is Unauthorized"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Update status Todos
> PATCH /todos/:id

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
before: "true"

  {
    "status": "false"
  }
```
_Response (200)_
```json
  {
    "id": 1,
    "title" : "coding lagi",
    "description" : "don't forget your drink and keyboard",
    "status": "false",
    "due_date": "2021-02-02",
    "createdAt": <Automatically insert by default>,
    "uodatedAt": <Automatically insert by default>
  }
```
_Response (404)_
```json
  {
    "message": [
      "Todo not found",
      "Your account is unauthorized"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Delete Todos
> DELETE /todos/:id

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  no needed
```
_Response (200)_
```json
  {
    "message": "Todo was deleted"
  }
```
_Response (404)_
```json
  {
    "message": [
      "Todo not found",
      "Your account is unathorized"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Register User
> POST /register

_Request Header_
```json
  no needed
```
_Request Params_
```json
  No needed
```
_Request Body_
```json
  {
    "email" : "user@user.com",
    "password": "123456"
  }
```
_Response (201)_
```json
  {
    "id" : 1,
    "email" : "user@user.com"
  }
```
_Response (400)_
```json
  {
    "message": [
      "Input an email correctly",
      "Email is required",
      "Email is already register",
      "Password minimum 6 characters",
      "Password is required"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---

### Login User
> POST /login

_Request Header_
```json
  no needed
```
_Request Params_
```json
  No needed
```
_Request Body_
```json
  {
    "email" : "user@user.com",
    "password": "123456"
  }
```
_Response (200)_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Response (400)_
```json
  {
    "message" : [
      "Email or Password is undefined"
    ]
  }
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```

### News
> GET /todos

_Request Header_
```json
  {
    "access_token" : "<access_token code>"
  }
```
_Request Params_
```json
  No needed
```
_Request Body_
```json
  No needed
```
_Response (200)_
```json
[
  {
    "source": {
      "id": 1,
      "name": "Kompas.com"
    },
    "author": "Aditya Maulana",
    "title": "Cek Daftar Harga Honda PCX 160 dan Rival-rival Sekelasnya - Kompas.com - Otomotif Kompas.com",
    "description": "<Description news>",
    "url": "<url source website>",
    "urlToImage": "<url source image>",
    "publishedAt": "2021-02-06T05:22:00Z",
    "content": "<core news with 250 characters>"
  },
  {
    "source": {
      "id": 2,
      "name": "Kompas.com"
    },
    "author": "JPNN.com",
    "title": "Ayu Ting Ting: Enggak Ada yang Menangis - JPNN.com",
    "description": "<Description news>",
    "url": "<url source website>",
    "urlToImage": "<url source image>",
    "publishedAt": "2021-02-06T05:12:00Z",
    "content": "<core news with 250 characters>"
  },
  {...}
]
```
_Response (500)_
```json
  {
    "message": [
      "Error in internal server"
    ]
  }
```
---