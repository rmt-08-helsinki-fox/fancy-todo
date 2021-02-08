**To Do List App**
----
  To Do List App is an application to monitor your next activity. This app has:
*  **REST API**
 * **JSON formatted response**
---
# URL
```
Client URL : http://localhost:8000
Server URL : http://localhost:3000
```
---
* **URL**

  `GET`/todos

* **Method:**

  `GET`
  
*  **URL Params**

   
 
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
        "user_id": 1
        },
        {
            "id": 2,
            "title": "activity title",
            "description": "description title",
            "status": false,
            "due_date": "2021-02-04T00:00:00.000Z",
            "createdAt": "2021-02-02T04:29:23.411Z",
            "updatedAt": "2021-02-02T04:29:23.411Z",
            "user_id": 1
        }
    ]
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** 
    ```javascript
    { 
      "Server error" 
    }
---
* **URL**

  `GET`/todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   
 
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
        "user_id": 1
        }
        
 
* **Error Response:**

  * **Code:** 404  <br />
    **Content:** `{ "error not found" }`
---
* **URL**

  `POST`/todos

* **Method:**

  `POST`
  
*  **URL Params**

   
 
   None

* **Data Params**

  Request Body: `title=string`, `description=string`, `status=boolean`, `due_date=date`

* **Success Response:**

  * **Code:** 201 <br />
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
        "user_id": 1
        }
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** 
    ```javascript
    { 
      "Server error" 
    }
---
* **URL**

  `PUT`/todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   
   `id=[integer]`

* **Data Params**

  Request Body: `status=boolean`

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
    **Content:** 
    ```javascript
    { 
      "Server error" 
    }
---
* **URL**

  `PATCH`/todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   `id=[integer]`
 
   

* **Data Params**

  Request body: `status=boolean`

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
        "user_id": 1
        }
 
* **Error Response:**
* **If Server Error**  <br />
    
  * **Code:** 500  <br />
    **Content:** 
    ```javascript
    { 
      "Server error" 
    }
---
* **URL**

  `DELETE`/todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id=[integer]`
 
   

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{todo success delete}`
        
 
* **Error Response:**
* **If Server Error**  <br />
    
  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`
* **If id is not found**  <br />
    
  * **Code:** 404  <br />
    **Content:** `{ "Error not found" }`
---

* **URL**

  `GET`/todos/weather

* **Method:**

  `GET`
  
*  **URL Params**

   None
 
* **Data Params**

  Request Header
  ```javascript
        {
        access_token:token
        }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
        {
        [request],
        [location],
        [current]
        }
        
* **Error Response:**
* **If Server Error**  <br />
    
  * **Code:** 500  <br />
    **Content:** `{ "Server error" }`

---
* **URL**

  `POST`/register

* **Method:**

  `POST`
  
*  **URL Params**

   
 
   None

* **Data Params**

  Request Body: `email=string`, `password=string`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
        {
        "id": 1,
        "email": "user1@mail.com",
        "password": "$2a$10$9btTdLCT7.WdWMqe8uMgCe1WCpUFJhOswbMo5RZLoqp840rrFBPC6"
        }
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** 
    ```
    { 
      "Server error" 
    }
---
* **URL**

  `POST`/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  Request Body: `email=string`, `password=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
        {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidXNlcjdAbWFpbC5jb20iLCJpYXQiOjE2MTI1OTUxNTB9.5nLgBuzuF219E80kJlunb5m1rNYb2zwazWM7KkhXxf0"
        }
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** 
    ```
    { 
      "Server error" 
    }
---
* **URL**

  `POST`/googlelogin

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  ```
  {

      "id_token": "id_token";
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    Google Payload
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** 
    ```
    { 
      "Server error" 
    }
---

