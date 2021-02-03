**Show all Todos not private**
----
  Returns data of all list Todo is not private.

* **URL**

  http://localhost:3000/

* **Method:**

  `GET`
  
*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
        "id": 3,
        "title": "Rest API",
        "description": "doing rest api fancy todo",
        "status": false,
        "due_date": "2021-03-02T00:00:00.000Z",
        "is_private": false,
        "user_id": 1,
        "createdAt": "2021-02-01T21:53:44.794Z",
        "updatedAt": "2021-02-01T21:53:44.794Z"
      },
      {
        "id": 4,
        "title": "Rest API",
        "description": "doing rest api fancy todo",
        "status": false,
        "due_date": "2021-03-02T00:00:00.000Z",
        "is_private": false,
        "user_id": 1,
        "createdAt": "2021-02-01T21:54:59.117Z",
        "updatedAt": "2021-02-01T21:54:59.117Z"
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Show Todos User**
----
  Returns data todos user.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `GET`
  
*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
        "id": 3,
        "title": "Rest API",
        "description": "doing rest api fancy todo",
        "status": false,
        "due_date": "2021-03-02T00:00:00.000Z",
        "is_private": false,
        "user_id": 1,
        "createdAt": "2021-02-01T21:53:44.794Z",
        "updatedAt": "2021-02-01T21:53:44.794Z"
      },
      {
        "id": 4,
        "title": "Rest API",
        "description": "doing rest api fancy todo",
        "status": false,
        "due_date": "2021-03-02T00:00:00.000Z",
        "is_private": false,
        "user_id": 1,
        "createdAt": "2021-02-01T21:54:59.117Z",
        "updatedAt": "2021-02-01T21:54:59.117Z"
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Show Todo List By Id**
----
  Show todo by id and return data to client.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 3,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": false,
      "due_date": "2021-03-02T00:00:00.000Z",
      "is_private": false,
      "user_id": 1,
      "createdAt": "2021-02-01T21:53:44.794Z",
      "updatedAt": "2021-02-01T21:53:44.794Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Create New Todo**
----
  Create new todos and return data to client.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `POST`
  
*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 4,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": false,
      "due_date": "2021-03-02T00:00:00.000Z",
      "is_private": false,
      "user_id": 1,
      "updatedAt": "2021-02-01T21:54:59.117Z",
      "createdAt": "2021-02-01T21:54:59.117Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Edit Todo By Id**
----
  Edit todos by id and return data to client.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 1,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": false,
      "due_date": "2021-03-02T00:00:00.000Z",
      "is_private": false,
      "user_id": 1,
      "createdAt": "2021-02-01T21:45:05.960Z",
      "updatedAt": "2021-02-01T21:49:00.487Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />


---
**Edit Todo Status**
----
  Edit todos status and return data to client.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 10,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": true,
      "due_date": "2021-02-05T00:00:00.000Z",
      "is_private": false,
      "user_id": 2,
      "createdAt": "2021-02-02T22:38:05.671Z",
      "updatedAt": "2021-02-02T22:55:01.348Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />


---
**Edit Todo is_private**
----
  Edit todos is_private and return data to client.

* **URL**

  http://localhost:3000/todos/set-private/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 10,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": true,
      "due_date": "2021-02-05T00:00:00.000Z",
      "is_private": true,
      "user_id": 2,
      "createdAt": "2021-02-02T22:38:05.671Z",
      "updatedAt": "2021-02-02T22:57:18.840Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />


---
**Delete Todo By Id**
----
  Delete todos by id.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "msg": "Delete Success"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Add Todo Not Private By Id**
----
  Add Todo by id where is_private = false.

* **URL**

  http://localhost:3000/todos/add/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 3,
      "title": "Rest API",
      "description": "doing rest api fancy todo",
      "status": false,
      "due_date": "2021-03-02T00:00:00.000Z",
      "is_private": false,
      "user_id": 1,
      "createdAt": "2021-02-01T21:53:44.794Z",
      "updatedAt": "2021-02-01T21:53:44.794Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
