# Fancy To-Do


## Todos

---

#### Fetch All Todo

* URL: `/todos`

* Method: `GET`

* Request Params: `None`

* Request Body: `None`

* Success Response:

  * **Code**: `200`
  * **Content**:
    >`[
  {
    "id": "1",
    "title": "Make some omelete",
    "description": "Cook some omelete",
    "status": "Pending",
    "due_date": "2021-01-05"
  }
]`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

#### Add Todo

---

* URL: `/todos`

* Method: `POST`

* Request Params: 
  - `acess_token`
  - `access_token_key`


* Request Body: 
  -   `req.body.title`
  - `req.body.description`
  - `req.body.status`
  - `req.body.due_date`

* Success Response:

  * **Code**: `200`
  * **Content**:
    > `[
  {
    "id": "1",
    "title": "Make some omelete",
    "description": "Cook some omelete",
    "status": "Pending",
    "due_date": "2021-01-05",
    "createdAt": "2021-02-01 19:20:59.554+07"
    "updatedAt": "2021-02-01 19:20:59.554+07"
  }
]`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

#### Edit Todos

* URL: `/todos/:id`

* Method: `PUT`

* Request Params: 
  - `acess_token`
  - `access_token_key`

* Request Body:
  -   `req.body.title`
  - `req.body.description`
  - `req.body.status`
  - `req.body.due_date`


* Success Response:

  * **Code**: `200`
  * **Content**:
    >`[
  {
    "title": "Make some omelete",
    "description": "Cook some omelete",
    "status": "Pending",
    "due_date": "2021-01-05"
  }
]`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

#### Edit Todo Status

* URL: `/todos/:id`

* Method: `PATCH`

* Request Params: 
  - `acess_token`
  - `access_token_key`

* Request Body:
  - `req.body.status`


* Success Response:

  * **Code**: `200`
  * **Content**:
    >`[
  {
    "title": "Make some omelete",
    "description": "Cook some omelete",
    "status": "Pending",
    "due_date": "2021-01-05"
  }
]`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

#### Delete Todo
* URL: `/todos/:id`

* Method: `DELETE`

* Request Params: `user id`

* Request Body: `None`


* Success Response:

  * **Code**: `200`
  * **Content**:
    >`[
  {
    "title": "Make some omelete",
    "description": "Cook some omelete",
    "status": "Pending",
    "due_date": "2021-01-05"
  }
]`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

  * **Code**: `404`
  * **Content**: `Error Not Found`

<br>
