**To Do List App**
----
  To Do List App is an application to monitor your next activity. This app has:
*  **REST API**
 * **JSON formatted response**
---
* **URL**

  `GET`/todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        {
        "id": 1,
        "title": "activity title",
        "description": "description title",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-02T04:20:06.830Z",
        "updatedAt": "2021-02-02T04:20:06.830Z",
        "user_id": null
        },
        {
            "id": 2,
            "title": "activity title",
            "description": "description title",
            "status": false,
            "due_date": "2021-02-04T00:00:00.000Z",
            "createdAt": "2021-02-02T04:29:23.411Z",
            "updatedAt": "2021-02-02T04:29:23.411Z",
            "user_id": null
        }
    ]
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
---
* **URL**

  `GET`/todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    
        {
        "id": 1,
        "title": "activity title",
        "description": "description title",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-02T04:20:06.830Z",
        "updatedAt": "2021-02-02T04:20:06.830Z",
        "user_id": null
        }
        
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
---
* **URL**

  `GET`/todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        {
        "id": 1,
        "title": "activity title",
        "description": "description title",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-02T04:20:06.830Z",
        "updatedAt": "2021-02-02T04:20:06.830Z",
        "user_id": null
        },
        {
            "id": 2,
            "title": "activity title",
            "description": "description title",
            "status": false,
            "due_date": "2021-02-04T00:00:00.000Z",
            "createdAt": "2021-02-02T04:29:23.411Z",
            "updatedAt": "2021-02-02T04:29:23.411Z",
            "user_id": null
        }
    ]
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
---
* **URL**

  `GET`/todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        {
        "id": 1,
        "title": "activity title",
        "description": "description title",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-02T04:20:06.830Z",
        "updatedAt": "2021-02-02T04:20:06.830Z",
        "user_id": null
        },
        {
            "id": 2,
            "title": "activity title",
            "description": "description title",
            "status": false,
            "due_date": "2021-02-04T00:00:00.000Z",
            "createdAt": "2021-02-02T04:29:23.411Z",
            "updatedAt": "2021-02-02T04:29:23.411Z",
            "user_id": null
        }
    ]
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
---
* **URL**

  `GET`/todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        {
        "id": 1,
        "title": "activity title",
        "description": "description title",
        "status": false,
        "due_date": "2021-02-03T00:00:00.000Z",
        "createdAt": "2021-02-02T04:20:06.830Z",
        "updatedAt": "2021-02-02T04:20:06.830Z",
        "user_id": null
        },
        {
            "id": 2,
            "title": "activity title",
            "description": "description title",
            "status": false,
            "due_date": "2021-02-04T00:00:00.000Z",
            "createdAt": "2021-02-02T04:29:23.411Z",
            "updatedAt": "2021-02-02T04:29:23.411Z",
            "user_id": null
        }
    ]
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
---


