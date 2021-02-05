**FANCY TODOS**
----

Fancy Todos . This app has : 
* RESTful endpoint 
* JSON formatted response

List of available endpoints:
​
- `POST /users/register`
- `POST /users/login`
- `POST /users/googleLoginp`
- `GET /todos/`
- `POST /todos/`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`
- `GET /todos/searchBook/`

### POST /users/register`
> Create New Account
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
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      "msg": "Register Succes",
      "id": 3,
      "email": "hacktiv8@gmail.com",
      "password": "$2a$10$dE2/DshitsFkdzUt9nKdXOOG0CEohiz6Pez4RaOE..UbwFOKPRhri"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Invalid email format",
          "email tidak boleh kosong"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

### POST /users/login`

> Login User

Request:

- data:

```json
{
  "email": "string",
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYxMjE5NzU2Nn0.AjHfLXVC5c_rgIDq7fv_8nFxPc1nHFn6mMag6ctANE8"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"Internal server error"`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

### `POST /users/googleLoginp`

> Login with Google Account

Request:

- data:

```json
{
  "idToken": "<your token>",
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "idToken": "integer",
  "email": "string"
}
```

### `GET /todos/`

> Get list of Todos

Request:

- data:

```json
{
  "UserId": "<your token id>",
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "idToken": "integer",
  "email": "string"
}
```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 20,
      "title": "Tessss",
      "description": "halosss",
      "status": false,
      "due_date": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2021-02-01T14:37:27.934Z",
      "createdAt": "2021-02-01T14:37:27.934Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Title is required",
          "Description is required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

### `POST /todos/`

> Create new Todos

Request:

- data:

```json
{
  "title": "<string>",
  "description": "<string>",
  "status": "<false>",
  "due_date": "<date>",
  "UserId": "<your token id>"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "idToken": "integer",
  "email": "string"
}
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "title": "Tes",
        "description": "halo",
        "status": true,
        "due_date": "2021-03-03T00:00:00.000Z",
        "createdAt": "2021-02-01T05:49:49.619Z",
        "updatedAt": "2021-02-01T05:49:49.619Z"
    }, 
    {
        "id": 7,
        "title": "Pevita",
        "description": "Pearce",
        "status": true,
        "due_date": "2021-04-04T00:00:00.000Z",
        "createdAt": "2021-02-01T06:00:07.917Z",
        "updatedAt": "2021-02-01T08:57:37.439Z"
    },
    {
        "id": 1,
        "title": "Pevi",
        "description": "lalala",
        "status": false,
        "due_date": "2021-03-03T00:00:00.000Z",
        "createdAt": "2021-02-01T05:48:50.179Z",
        "updatedAt": "2021-02-01T13:29:37.468Z"
    },
    {
        "id": 20,
        "title": "Tessss",
        "description": "halosss",
        "status": false,
        "due_date": "2022-01-01T00:00:00.000Z",
        "createdAt": "2021-02-01T14:37:27.934Z",
        "updatedAt": "2021-02-01T14:37:27.934Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

### `GET /todos/:id`

> Find todo by Id


Request: 

- data
```json
{
    "id": "<interger>",
    "UserId": "<your token id>"
}
```

Response:

- status: 200
- data
```json
{
    "title": "<string>",
    "description": "<string>",
    "status": "<false>",
    "due_date": "<date>",
    "UserId": "<your token id>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
}
```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevi",
      "description": "lalala",
      "status": false,
      "due_date": "2021-03-03T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T13:29:37.468Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
      "msg": "error not found"
    }`

### `PUT /todos/:id`

> Update todos by Id

Request:

- data
```json
{
    "id": "<integer>",
    "UserId": "<your token id>"
}
```

Response:

- status: 200
- data
```json
{
    "title": "<string>",
    "description": "<string>",
    "status": "<your update status>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
}
```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevita",
      "description": "Pearce",
      "status": true,
      "due_date": "2022-02-02T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T15:26:07.220Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Title is required",
          "Description is required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`


### `PATCH /todos/:id`

> Update selected rows by Id

Request:

- data
```json
{
    "id": "<integer>",
    "UserId": "<your token id>"
}
```

Response:

- status: 200
- data
```json
{
    "title": "<string>",
    "description": "<string>",
    "status": "<your update status>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
}
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevita",
      "description": "Pearce",
      "status": true,
      "due_date": "2022-02-02T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T15:26:07.220Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "status id required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`


### `DELETE todos/:id`

> Delete todos by Id

Request:

- data
```json
{
    "id": "<integer>",
    "UserId": "<your token id>"
}
```

Response:

- status: 200
- data

```json
{
    "message": "todo succes to delete"
}
```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "messages": "todo succes to delete"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `"error not found"`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`
