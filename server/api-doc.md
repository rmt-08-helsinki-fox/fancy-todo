<h1>API-Documentation</h1>


<h2>add todos</h2>


* **ROUTE** <br>
    POST /todos

* **REQUEST** <br>
    Body : `{ title, description, status, due_date }` <br>
    Headers: `{ access_token }`

* **RESPONSE** <br>
    `201` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `500` : `{ errors: ["internal server errors"] }`


<h2>show todos</h2>

* **ROUTE** <br>
    GET /todos

* **REQUEST** <br>
    headers: `{ access_token }`

* **RESPONSE** <br>
    `200` : `[{ title, description, status, due_date } ...args]` <br>
    `500` : `{ errors: ["internal server errors"]}`


<h2>show todo</h2>

* **ROUTE** <br>
    GET /todos/:id

* **REQUEST**  <br>
  headers: `{ access_token }`

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `404` : `{ errors: "not found" }` <br>
  `500` : `{ errors: ["internal server errors"] }`


<h2>update todo</h2>

* **ROUTE** <br>
    PUT /todos/:id

* **REQUEST** <br>
    Body : `{ title, description, status, due_date }` <br>
    Headers: `{ access_token }`

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: ["internal server errors"] }`



<h2>update status todo</h2>

* **ROUTE** <br>
    PATCH /todos/:id

* **REQUEST** <br>
    Body : `{ status }` <br>
    Headers: `{ access_token }`

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: ["internal server errors"] }`



<h2>delete todo</h2>

* **ROUTE** <br>
    DELETE /todos/:id

* **REQUEST**  <br>
    Headers: `{ access_token }`

* **RESPONSE** <br>
    `200` : `{ todo: { title, description, status, due_date }, message: "todo success to delete" }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: ["internal server errors"] }`



<h2>register</h2>

* **ROUTE** <br>
    POST /register

* **REQUEST** <br>
    body: `{ email, password }`

* **RESPONSE** <br>
    `201` : `{ id, email }` <br>
    `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`


<h2>login</h2>

* **ROUTE** <br>
    POST /login

* **REQUEST** <br>
    body: `{ email, password }`

* **RESPONSE** <br>
    `200` : `{ access_token }` <br>
    `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`


<h2>login-google</h2>

* **ROUTE** <br>
  POST /login-google

* **REQUEST** <br>
  body: `{ id_token }`

* **RESPONSE** <br>
  `200` : `{ access_token }` <br>
  `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`


<h2>account profile</h2>

* **ROUTE** <br>
  GET /user

* **REQUEST** <br>
  headers: `{ access_token }`

* **RESPONSE** <br>
  `200` : `{ user }` <br>
  `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`


<h2>userlist</h2>

* **ROUTE** <br>
  GET /users

* **REQUEST** <br>
  headers: `{ access_token }`

* **RESPONSE** <br>
  `200` : `{ users: [...args] }` <br>
  `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`



<h2>fetch anime recommendation</h2>

* **ROUTE** <br>
  GET /anime

* **REQUEST** <br>
  headers: `{ access_token }`

* **RESPONSE** <br>
  `200` : `{ anime }` <br>
  `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`



<h2>add member</h2>

* **ROUTE** <br>
  POST /todos/:id/members

* **REQUEST** <br>
  headers: `{ access_token }`,
  data: `{ member_email }`

* **RESPONSE** <br>
  `201` : `{}` <br>
  `400` : `{ errors }` <br>
  `500` : `{ errors: ["internal server errors"] }`