**Show Todos**
----
  Returns json data todo.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    [{
        "id": 1,
        "title": "kelarin portfolio",
        "description": "yuk bisa yuk",
        "status": "wajib",
        "due_date": "2021-02-08",
        "createdAt": "2021-02-01T06:21:42.087Z",
        "updatedAt": "2021-02-01T06:21:42.087Z"
    },
    {
        "id": 3,
        "title": "lecture siang",
        "description": "gajadi tidur siangnya yaa hari ini",
        "status": "urgent",
        "due_date": "2021-02-01",
        "createdAt": "2021-02-01T08:48:36.225Z",
        "updatedAt": "2021-02-01T08:48:58.480Z"
    }]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    router.get('/', TodoController.findTodos)
  ```
----

**Create Todos**
----
  Returns json new data todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  ```js
  {
  "title": "bobo siang",
  "description": "biar sehat jangan lupa bobo siang",
  "status": "wajib",
  "due_date": "2021-02-02",
  }
  ```

  * **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
    "id": 4,
    "title": "bobo siang",
    "description": "biar sehat jangan lupa bobo siang",
    "status": "wajib",
    "due_date": "2021-02-02",
    "updatedAt": "2021-02-01T08:49:16.389Z",
    "createdAt": "2021-02-01T08:49:16.389Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ "error": "Tanggal sudah terlewati" }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ "error": "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    router.post('/', TodoController.createTodos)
  ```
----
  **Show Todo By Id**
----
  Returns json data todo by id.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None

* **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
    "id": 4,
    "title": "bobo siang",
    "description": "biar sehat jangan lupa bobo siang",
    "status": "wajib",
    "due_date": "2021-02-02",
    "updatedAt": "2021-02-01T08:49:16.389Z",
    "createdAt": "2021-02-01T08:49:16.389Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "error": "Not Found" }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ "error": "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    router.get('/:id', TodoController.findTodosById)
  ```
----
  **Edit Todo**
----
  Returns json edited data todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    ```js
    {
      "title": "lecture siang",
      "description": "gajadi tidur siangnya yaa hari ini",
      "status": "wajib",
      "due_date": "2021-02-01",
    }
    ```

* **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
      "id": 4,
      "title": "lecture siang",
      "description": "gajadi tidur siangnya yaa hari ini",
      "status": "wajib",
      "due_date": "2021-02-01",
      "updatedAt": "2021-02-01T08:49:16.389Z",
      "createdAt": "2021-02-01T08:49:16.389Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "error": "Not Found" }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ "error": "Internal Server Error" }`

    OR

  * **Code:** 400 <br />
  **Content:** `{ "error": "Tanggal sudah terlewati" }`

* **Sample Call:**

  ```javascript
    router.put('/:id', TodoController.editTodos)
  ```
----
 **Edit Status Todo**
----
  Returns json edited data todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    ```js
    {
      "status": "urgent"
    }
    ```

* **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
      "id": 4,
      "title": "lecture siang",
      "description": "biar sehat jangan lupa bobo siang",
      "status": "urgent",
      "due_date": "2021-02-02",
      "updatedAt": "2021-02-01T08:49:16.389Z",
      "createdAt": "2021-02-01T08:49:16.389Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "error": "Not Found" }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ "error": "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    router.patch('/:id', TodoController.editStatusTodos)
  ```
----
 **Delete Todo**
----
  Returns json message `todo success to delete`.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None

* **Request Header**

  *required
  ```js
  {
    "token": "uhiuqwheoqSAD203Sdqjwe/';DUWq"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
    "message": "todo success to delete"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ "error": "Not Found" }`

    OR

  * **Code:** 500 <br />
    **Content:** `{ "error": "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    router.delete('/:id', TodoController.deleteTodo)
  ```
----
**Register**
----
  Returns json data user exclude password.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  ```js
  {
    "email": "john@mail.com",
    "password": "password"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```js
    {
    "id": 12,
    "email": "john@mail.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`
    OR
  * **Code:** 400 <br />
    **Content:** 
    ```js
    "error": [
        "Email is already registered",
        "Password is required"
    ]
    ```

* **Sample Call:**

  ```javascript
    router.post('/register', UserController.register)
  ```
----
**Login**
----
  Returns json token.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**
  ```js
  {
    "email": "john@mail.com",
    "password": "password"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsImlhdCI6MTYxMjI0MzYzNX0.lKuG7uPPao7Tq9xHO8xRMmVZl7ChS3zcp4i7fftBA4w"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`
    OR
  * **Code:** 400 <br />
    **Content:** 
    ```js
    {
      "error": "Invalid email or password"
    }
    ```

* **Sample Call:**

  ```javascript
    router.post('/login', UserController.login)
  ```
----