<h1>API-Documentation</h1>


<h2>add todos</h2>


* **ROUTE** <br>
    POST /todos

* **REQUEST** <br>
    Body : 
    `{ title, description, status, due_date }`

* **RESPONSE** <br>
    `201` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `500` : `{ errors: "internal server errors" }`


<h2>show todos</h2>

* **ROUTE** <br>
    GET /todos

* **REQUEST** <br>
    none

* **RESPONSE** <br>
    `200` : `[{ title, description, status, due_date } ...args]` <br>
    `500` : `{ errors: "internal server errors" }`


<h2>show todo</h2>

* **ROUTE** <br>
    GET /todos/:id

* **REQUEST** <br>
    none

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `404` : `{ errors: "not found" }`


<h2>update todo</h2>

* **ROUTE** <br>
    PUT /todos/:id

* **REQUEST** <br>
    Body : 
    `{ title, description, status, due_date }`

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: "internal server errors" }`



<h2>update status todo</h2>

* **ROUTE** <br>
    PATCH /todos/:id

* **REQUEST** <br>
    Body : 
    `{ status }`

* **RESPONSE** <br>
    `200` : `{ title, description, status, due_date }` <br>
    `400` : `{ errors }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: "internal server errors" }`



<h2>delete todo</h2>

* **ROUTE** <br>
    DELETE /todos/:id

* **REQUEST** <br>
    none

* **RESPONSE** <br>
    `200` : `{ todo: { title, description, status, due_date }, message: "todo success to delete" }` <br>
    `404` : `{ errors: "not found" }` <br>
    `500` : `{ errors: "internal server errors" }`