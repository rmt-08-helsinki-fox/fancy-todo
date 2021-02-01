**Show all Todos not private**
----
  Returns data of all list Todo is not private.

* **URL**

  /

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

  /todos

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

  /todos/:id

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

  /todos/create-new

* **Method:**

  `POST`
  
*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 200 <br />
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

  /todos/:id

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
**Delete Todo By Id**
----
  Delete todos by id.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```1```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />



---
**Add Todo Not Private By Id**
----
  Add Todo by id where is_private = false.

* **URL**

  /todos/add/:id

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
