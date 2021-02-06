# Fancy Todo

List of available endpoints:
- `POST /users/register`
- `POST /users/login`
- `POST /users/googleLogin`
- `GET /quotes`
- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### POST /users/register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:

```json
{
  "id": "integer",
  "email": "string"
}
```

Error Response: 

- status: 500
- body:

```json
{
  "error": "error message"
}
```

### POST /users/login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "email": "string",
  "access_token": "string"
}
```

Error Response: 

- status: 404
- body:

```json
{
  "error": "wrong username / password"
}
```

### POST /users/googleLogin

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response if email not registered yet:

- status: 201
- body:
  ​

```json
{
  "email": "string",
  "access_token": "string"
}
```

Response if email already registered:

- status: 200
- body:
  ​

```json
{
  "email": "string",
  "access_token": "string"
}
```

Error Response: 

- status: 500
- body:

```json
{
  "error": "error message"
}
```

### GET /quotes

Description:
  get random quote from API

Request: 

Response: 

- status: 200
- body: 

```json
{
  "author": "string",
  "quote": "string"
}
```

Error Response: 

- status: 500
- body:

```json
{
  "error": "error message"
}
```

### GET /todos

Description:
  get user todos

Request: 

- headers: 

```json
{
  "access_token": "string"
}
```

Response: 

- status: 200
- body: 

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "due_date": "date",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

Error Response: 

- status: 500
- body:

```json
{
  "error": "error message"
}
```

### GET /todos/:id

Description: 
  get user todo

Request: 

- params: todo id
- headers: 

```json
{
  "access_token": "string"
}
```

Response: 

- status: 200
- body: 

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "due_date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Error Response: 

- status: 404
- body:

```json
{
  "error": "error message"
}
```

### POST /todos

Description: 
  create todo

Request: 

- headers: 

```json
{
  "access_token": "string"
}
```

- data: 

```json 
{
  "title": "string",
  "description": "string",
  "due_date": "date"
}
```

Response: 

- status: 201
- body: 

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "due_date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Error Response: 

- status: 500
- body:

```json
{
  "error": "error message"
}
```

### PUT /todos/:id

Description:
  edit user todo

- params: todo id
- headers: 

```json
{
  "access_token": "string"
}
```

- data: 

```json 
{
  "title": "string",
  "description": "string",
  "due_date": "date"
}
```

Response: 

- status: 200
- body: 

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "due_date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Error Response: 

Description:
  not user todo

- status: 401
- body:

```json
{
  "error": "unauthorize"
}
```

### PATCH /todos/:id

Description: 
  update todo status

Request:

- params: todo id
- headers: 

```json
{
  "access_token": "string"
}
```

- data: 

```json 
{
  "status": "boolean"
}
```

Response: 

- status: 200
- body: 

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "due_date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Error Response: 

Description:
  not user todo

- status: 401
- body:

```json
{
  "error": "unauthorize"
}
```

### DELETE /todos/:id

Description: 
  update todo status

Request:

- params: todo id
- headers: 

```json
{
  "access_token": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "message": "delete succeed"
}
```

Error Response: 

Description:
  not user todo

- status: 401
- body:

```json
{
  "error": "unauthorize"
}
```