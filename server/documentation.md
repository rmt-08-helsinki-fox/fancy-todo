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
    router.get('/todos', (req, res) => {
      TodoController.findTodos(res)
    })
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
    router.post('/todos', (req, res) => {
      TodoController.createTodos(req.body, res)
    })
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
    router.get('/todos/:id', (req, res) => {
      TodoController.findTodosById(req.params.id, res)
    })
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
    router.put('/todos/:id', (req, res) => {
      TodoController.editTodos(req.params.id, req.body, res)
    })
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
    router.patch('/todos/:id', (req, res) => {
      TodoController.editStatusTodos(req.params.id, req.body, res)
    })
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
    router.delete('/todos/:id', (req, res) => {
      TodoController.deleteTodo(req.params.id, res)
    })
  ```
----