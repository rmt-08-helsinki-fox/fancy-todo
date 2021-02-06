**Add Todo**
----
  Menambahkan Todo baru ke dalam list (kedalam database).

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

    None


* **Data Params**
  
   **Required:**

    `title:[string]
    description:[string]
    status:[boolean]
    due_date:[date]`

* **Request Header**
  
   **Required:**

    `{
      access_token: token
    }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```{
    "error": "VALIDATION_ERROR",
    "message": [
        "Invalid date",
        "Title is required",
        "Description is required",
        "Status is required",
        "due_date is required"
    ]
}```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error." }
    ```


**Show Todo**
----
  Menampilkan list semua Todo yang ada di dalam database.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

    None


* **Data Params**
  
   None

* **Request Header**
  
   **Required:**

    `{
      access_token: token
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
          "id": 8,
          "title": "Kerja Challenge 3",
          "description": "Challenge REST API  Fancy Todos",
          "status": false,
          "due_date": "2021-03-04T16:00:00.000Z",
          "createdAt": "2021-02-01T06:35:55.948Z",
          "updatedAt": "2021-02-01T06:35:55.948Z"
      },
      {
          "id": 9,
          "title": "coba put",
          "description": "belajar put",
          "status": false,
          "due_date": "2021-02-01T16:00:00.000Z",
          "createdAt": "2021-02-01T06:40:49.293Z",
          "updatedAt": "2021-02-01T08:38:24.706Z"
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    `{ error : "Internal Server Error." }`

  OR

  * **Code:** 401 USER_NOT_AUTHENTICATED
 <br />
    **Content:** <br />
  ```
    {
      "error": "USER_NOT_AUTHENTICATED",
      "message": "Invalid User"
    }
  ```


**Update Todo**
----
  Mengupdate seluruh column Todo berdasarkan id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Data Params**
  
    **Required:**
 
   `title:[string]
    description:[string]
    status:[boolean]
    due_date:[date]`


* **Request Header**
  
    **Required:**
 
  `{ access_token: token }`



* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": 8,
        "title": "Kerja Challenge 3",
        "description": "Challenge REST API  Fancy Todos",
        "status": false,
        "due_date": "2021-03-04T16:00:00.000Z",
        "createdAt": "2021-02-01T06:35:55.948Z",
        "updatedAt": "2021-02-01T06:35:55.948Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      "error": "VALIDATION_ERROR",
      "message": [
          "Invalid date",
          "Title is required",
          "Description is required",
          "Status is required",
          "due_date is required"
          ]
    }
    ```


  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
     ```
     {
      "error": "USER_NOT_AUTHENTICATED",
      "message": "Invalid User"
    }
     ```

  OR


   * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```
    {
      "error": "FORBIDDEN_ACCESS",
      "message": "You are not authorized to access the file"
    }
    ```

  OR


  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** 
    ```
    {
      "error": "DATA_NOT_FOUND",
      "message": "Error not found"
    }
    ```

  OR



  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error." }
    ```



**Update Status Todo**
----
  Mengupdate column status Todo berdasarkan id.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Data Params**
  
    **Required:**
 
   `status:[boolean]`


* **Request Header**
  
    **Required:**
 
  `{ access_token: token }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": 8,
        "title": "Kerja Challenge 3",
        "description": "Challenge REST API  Fancy Todos",
        "status": false,
        "due_date": "2021-03-04T16:00:00.000Z",
        "createdAt": "2021-02-01T06:35:55.948Z",
        "updatedAt": "2021-02-01T06:35:55.948Z"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      "error": "VALIDATION_ERROR",
      "message": [
          "Invalid date",
          "Title is required",
          "Description is required",
          "Status is required",
          "due_date is required"
          ]
    }
    ```


  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
     ```
     {
      "error": "USER_NOT_AUTHENTICATED",
      "message": "Invalid User"
    }
     ```

  OR


   * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```
    {
      "error": "FORBIDDEN_ACCESS",
      "message": "You are not authorized to access the file"
    }
    ```

  OR


  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** 
    ```
    {
      "error": "DATA_NOT_FOUND",
      "message": "Error not found"
    }
    ```

  OR



  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error." }
    ```


**Delete Todo**
----
  Menghapus row Todo berdasarkan id.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Data Params**
  
    None


* **Request Header**
  
    **Required:**
 
  `{ access_token: token }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {message: "Todo Succes to delete"}
    ```
 
* **Error Response:**

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
     ```
     {
        "error": "USER_NOT_AUTHENTICATED",
        "message": "Invalid User"
      }
     ```

  OR


  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```
    {
      "error": "FORBIDDEN_ACCESS",
      "message": "You are not authorized to access the file"
    }
    ```

  OR


  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** 
    ```
    {
      "error": "DATA_NOT_FOUND",
      "message": "Error not found"
    }
    ```

  OR



  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error." }
    ```



    