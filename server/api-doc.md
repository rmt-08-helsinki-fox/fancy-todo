# Fancy Todo

Fancy Todo is an application to manage your todos. This app has:
* To make todo's CRUD operation
* JSON formatted response

## Endpoint CRUD
-----
### _POST /todos_
> Create new Todo

* Request Body
  ```javascript
    { 
      "title": "<title to get insert into>", 
      "description": "<description to get insert into>",
      "status": "<status to get insert into>",
      "due_date": "<due_date to get insert into>" 
    }
  ```
* Success Response 
  * Code: 201 - Created
  ```javascript
    {
      "id": "<given id by system>",
      "title": "<posted title>",
      "description": "<posted description>",
      "status": "<posted status>",
      "due_date": "<>posted due_date",
      "updatedAt": "2021-02-01T14:38:20.158Z",
      "createdAt": "2021-02-01T14:38:20.158Z"
    }
  ```
* Error Response
  * Code: 400 - Bad Request
  ```javascript
    {
      "message": "Invalid requests"
    }
  ```
  OR
  * Code : 500 - Server Error
  ```javascript
    {
      "message": "Internal server error"
    }
  ```

### _GET /todos_
> Get all Todos

* Request Body
  ```javascript
    not need
  ```
* Success Response
  * Code: 200
  ```javascript
    {
      "id": 1,
      "title": "<todo title>",
      "description": "<todo description>",
      "status": "<todo status>",
      "due_date": "<todo due_date>",
      "updatedAt": "2021-02-01T14:38:20.158Z",
      "createdAt": "2021-02-01T14:38:20.158Z"
    }
  ```
* Error Response
  * Code: 500 - Server Eror
  ```javascript
    {
      "message": "Internal server error"
    }
  ```

### _GET /todos/:id_
> Get Todo by id

* Request Params
  ```javascript
    "id": "<to get insert into>"
  ```
* Request Body
  ```javascript
    not need
  ```
* Success Response
  * Code: 200
  ```javascript
    {
      "id": 1,
      "title": "<todo title>",
      "description": "<todo description>",
      "status": "<todo status>",
      "due_date": "<todo due_date>",
      "updatedAt": "2021-02-01T14:38:20.158Z",
      "createdAt": "2021-02-01T14:38:20.158Z"
    }
  ```
* Error Response
  * Code: 404 - Not Found
  ```javascript
    {
      "message": "Id doesn't exist"
    }
  ```

### _PUT /todos/:id_
> Update all Todo by id

* Request Params
  ```javascript
    "id": "<to get insert into>"
  ```
* Request Body
  ```javascript
    { 
      "title": "<title to get insert into>", 
      "description": "<description to get insert into>",
      "status": "<status to get insert into>",
      "due_date": "<due_date to get insert into>" 
    }
  ```
* Success Response
  * Code: 200
  ```javascript
    {
      "id": 1,
      "title": "<todo title>",
      "description": "<todo description>",
      "status": "<todo status>",
      "due_date": "<todo due_date>",
      "updatedAt": "2021-02-01T14:38:20.158Z",
      "createdAt": "2021-02-01T14:38:20.158Z"
    }
  ```
* Error Response
  * Code: 400 - Bad Request
  ```javascript
    {
      "message": "Invalid requests"
    }
  ```
  OR
  * Code: 404 - Not Found
  ```javascript
    {
      "message": "Id doesn't exist"
    }
  ```
  OR
  * Code: 500 - Server Error
  ```javascript
    {
      "message": "Internal server error"
    }
  ```

### _PATCH /todos/:id_
> Update patch Todo by id

* Request Params
  ```javascript
    "id": "<to get insert into>"
  ```
* Request Body
  ```javascript
    { 
      "status": "<status to get insert into>" 
    }
  ```
* Success Response
  * Code: 200
  ```javascript
    {
      "status": "<todo status>"
    }
  ```
* Error Response
  * Code: 400 - Bad Request
  ```javascript
    {
      "message": "Invalid requests"
    }
  ```
  OR
  * Code: 404 - Not Found
  ```javascript
    {
      "message": "Id doesn't exist"
    }
  ```
  OR
  * Code: 500 - Server Error
  ```javascript
    {
      "message": "Internal server error"
    }
  ```

### _DELETE /todos/:id_
> delete Todo by id

* Request Params
  ```javascript
    "id": "<to get insert into>"
  ```
* Request Body
  ```javascript
    not need
  ```
* Success Response
  * Code: 200
  ```javascript
    {
      message: "todo success to delete"
    }
  ```
* Error Response
  * Code: 404 - Not Found
  ```javascript
    {
      "message": "Id doesn't exist"
    }
  ```
  OR
  * Code: 500 - Server Error
  ```javascript
    {
      "message": "Internal server error"
    }
  ```


## Users
-----
### _POST /users/register_
> create new user

* Request Body
  ```javascript
    { 
      "role": "<role to get insert into>", 
      "email": "<email to get insert into>",
      "password": "<password to get insert into>"
    }
  ```
* Success Response 
  * Code: 201 - Created
  ```javascript
    {
      "id": "<given id by system>",
      "role": "<posted role>",
      "email": "<posted email>",
      "password": "<posted password>"
      "updatedAt": "2021-02-01T14:38:20.158Z",
      "createdAt": "2021-02-01T14:38:20.158Z"
    }
  ```
* Error Response
  * Code: 400 - Bad Request
  ```javascript
    {
      "message": "Invalid requests"
    }
  ```

### _POST /users/login_
> login user

* Request Body
  ```javascript
    { 
      "email": "<email to get insert into>",
      "password": "<password to get insert into>"
    }
  ```
* Success Response 
  * Code: 202 - Success
  ```javascript
    {
      "accessToken": "<given accessToken by sistem>"
    }
  ```
* Error Response
  * Code: 400 - Bad Request
  ```javascript
    {
      "message": "Invalid requests"
    }
  ```
  
