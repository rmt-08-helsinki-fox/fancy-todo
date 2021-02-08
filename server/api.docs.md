**Show All Todos**
----
  Returns json data about a multiple user.

* **URL**

  /todos

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
            "id": 28,
            "title": "Fancy Toto",
            "description": "make a todo apps with fancy looks",
            "status": false,
            "due_date": "2021-02-01",
            "createdAt": "2021-02-01T11:58:31.194Z",
            "updatedAt": "2021-02-01T11:58:31.194Z"
        },
        {
            "id": 29,
            "title": "Fancy Toto",
            "description": "make a todo apps with fancy looks",
            "status": false,
            "due_date": "2021-02-01",
            "createdAt": "2021-02-01T11:58:31.594Z",
            "updatedAt": "2021-02-01T11:58:31.594Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`




**Add Todo**
----
  Returns json data about a single user.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `title=[string]`<br />
  `description=[text]`<br />
  `status=[boolean]`<br />
  `due_date=[date]`<br />

* **Success Response:**

  * **Code:** 201 DATA CREATED <br />
    **Content:** 
    ```javascript
    {
    "id": 32,
    "title": "Fancy Toto",
    "description": "make a todo apps with fancy looks",
    "status": false,
    "due_date": "2021-02-01",
    "updatedAt": "2021-02-01T12:39:12.857Z",
    "createdAt": "2021-02-01T12:39:12.857Z"
    }
    ```

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input Tanggal tidak boleh melewati hari ini" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`


**Show Todo By ID**
----
  Returns json data about a single user.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 SUCCESS <br />
    **Content:** 
    ```javascript
    {
    "id": 32,
    "title": "Fancy Toto",
    "description": "make a todo apps with fancy looks",
    "status": false,
    "due_date": "2021-02-01",
    "updatedAt": "2021-02-01T12:39:12.857Z",
    "createdAt": "2021-02-01T12:39:12.857Z"
    }
    ```

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Data Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`


**Edit All Todo By Id**
----
  Returns json data about a single user.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `title=[string]`<br />
  `description=[text]`<br />
  `status=[boolean]`<br />
  `due_date=[date]`<br />

* **Success Response:**

  * **Code:** 200 SUCCESS <br />
    **Content:** 
    ```javascript
    {
    "id": 32,
    "title": "Fancy Toto",
    "description": "make a todo apps with fancy looks",
    "status": false,
    "due_date": "2021-02-01",
    "updatedAt": "2021-02-01T12:39:12.857Z",
    "createdAt": "2021-02-01T12:39:12.857Z"
    }
    ```

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input Tanggal tidak boleh melewati hari ini" }`

  OR
    
  * **Code:** 404 DATA NOT FOUND <br />
    **Content:** `{ error : "Data Not Found" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`


**Update Status Todo**
----
  Returns json data about a single user.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `status=[boolean]`<br />

* **Success Response:**

  * **Code:** 200 SUCCESS <br />
    **Content:** 
    ```javascript
    {
    "id": 32,
    "title": "Fancy Toto",
    "description": "make a todo apps with fancy looks",
    "status": false,
    "due_date": "2021-02-01",
    "updatedAt": "2021-02-01T12:39:12.857Z",
    "createdAt": "2021-02-01T12:39:12.857Z"
    }
    ```

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input Tanggal tidak boleh melewati hari ini" }`

  OR
    
  * **Code:** 404 DATA NOT FOUND <br />
    **Content:** `{ error : "Data Not Found" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`


**Delete Todo**
----
  Returns Status

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 SUCCESS <br />
    **Content:** `"todo success to delete"`

 
* **Error Response:**
    
  * **Code:** 404 DATA NOT FOUND <br />
    **Content:** `{ error : "Data Not Found" }`


  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Todo doesn't exist" }`