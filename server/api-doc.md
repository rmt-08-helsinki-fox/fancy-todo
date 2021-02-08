**Show Todos**
---
----
  Mengembalikan semua data Todos

* **URL**

  /todos

* **Method**
  
  `GET`

* **URL Params**
  
  none

* **Data Params**
  
  none

* **Request Body**

  none
* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript 
    [
      {id:1, title: "Mandi", description:"Mandi pagi", status:false, due_date: 01/02/2021}
    ]
    ```

* **Error message**

  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`

----

**Create Todos**
----
Membuat data Todos

* **URL**

  /todos

* **Method**
  
  `POST`

* **URL Params**
  
  none

* **Data Params**
  
  none

* **Request Body***

  ```javascript
  title: "Mandi",
  description: "Mandi Pagi",
  status: false,
  due_date: 02/01/2021
  ```

* **Success Repone:**

  * **Code:** 201 <br/>
    **Content:** 
    ```javascript 
    {id:1, title: "Mandi", description:"Mandi pagi", status:false, due_date: 01/02/2021}
    ```

* **Error message**

  * **Code:** 400 BAD REQUEST <br/>
    **Content:** 
    ``` javascript
    message: [
      "title cannot be empty",
    "description cannot be empty"
    ]
    ```
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`

----

**Show Todos Id**
---

  Mengembalikan data Todos berdasarkan id

* **URL**

  /todos/:id

* **Method**
  
  `GET`

* **URL Params**
  
  **Required:**
 
   `id=[integer]`

* **Data Params**
  
  none

* **Request Body***

  none

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript 
    {id:1, title: "Mandi", description:"Mandi pagi", status:false, due_date: 01/02/2021}
    ```

* **Error message**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{message: "data not found"}`

----

**Edit Todos**
----
Merubah data Todos

* **URL**

  /todos/:id

* **Method**
  
  `PUT`

* **URL Params**
  
  `id=[integer]`

* **Data Params**
  
  none

* **Request Body***

  ```javascript
  title: "Bangun",
  description: "Bangun tidur",
  status: true,
  due_date: 07/21/2021
  ```

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript 
    {id:1, title: "Bangun", description:"Bangun tidur", status:true, due_date: 07/21/2021}
    ```

* **Error message**

  * **Code:** 400 Bad Request <br/>
    **Content:** 
    ``` javascript
    message: [
      "title cannot be empty",
      "description cannot be empty"
    ]
    ```
  
  OR
  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{message: "data not found"}`

  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`

----

**Edit Specific Todos**
----
Merubah data Todos

* **URL**

  /todos/:id

* **Method**
  
  `PATCH`

* **URL Params**
  
  `id=[integer]`

* **Data Params**
  
  none

* **Request Body**

  ```javascript
  status: true
  ```

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript 
    {id:1, title: "Bangun", description:"Bangun tidur", status:true, due_date: 07/21/2021}
    ```

* **Error message**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{message: "data not found"}`

  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`

----

**Delete Todos**
----
Menghapus data Todos

* **URL**

  /todos/:id

* **Method**
  
  `DELETE`

* **URL Params**
  
  `id=[integer]`

* **Data Params**
  
  none

* **Request Body***

  none

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** `{message: "todo success to delete"}`

* **Error message**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{message: "data not found"}`
  
  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`

----

**Register User**
---

* **URL**

  /users/register

* **Method**
  
  `POST`

* **URL Params**
  
  none

* **Data Params**
  
  none

* **Request Body***

  ```javascript
  username: "hansyah",
  email: "email@gmail.com",
  password: password,
  role: 'User'
  ```

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript
    {id: 1, username: 'hansyah', email: 'email@gmail.com', password: 'password', role: 'User'}
    ```

* **Error message**

  * **Code:** 400 BAD REQUEST <br/>
    **Content:** 
    ```javascript
    errors: [
      "username cannot be empty",
      "email cannot be empty",
      "password cannot be empty"
    ]
    ```

----

**Login User**
---

* **URL**

  /users/login

* **Method**
  
  `POST`

* **URL Params**
  
  none

* **Data Params**
  
  none

* **Request Body***

  ```javascript
  email: "email@gmail.com",
  password: password
  ```

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript
    { access_token }
    ```

* **Error message**

  * **Code:** 400 BAD REQUEST <br/>
    **Content:** 
    ```javascript
    errors: [
      "email cannot be empty",
      "password cannot be empty"
    ]
    ```
  
  OR


  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`
----

**Login Google**
---

* **URL**

  /users/googleLogin

* **Method**
  
  `POST`

* **URL Params**
  
  none

* **Data Params**
  
  none

* **Request Body**

  ```javascript
  googleToken: id_token
  ```

* **Success Repone:**

  * **Code:** 200 <br/>
    **Content:** 
    ```javascript
    { access_token }
    ```

* **Error message**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** 
    ```javascript
    Error 400: invalid_request
    ```
    OR
  * **Code:** 500 INTERNAL SERVER ERROR <br/>
    **Content:** `{message: "Internal server error"}`