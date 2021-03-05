**Show TODO**
----
  Returns All todo lists.

* **URL**

  /todos

* **Method:**

  `GET`

*  **Request Params**

    None

* **Request Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    `[{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z  }, ...]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`

***

**Show Todo By ID**
----
  Returns single Todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`

*  **Request Params**

   **Required:**
 
   `id=[integer]`

* **Request Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    `{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Message : "Data Is Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`

***

**ADD TODO**
----
  Create New Todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **Request Params**

    None

* **Request Body**

    **Required:**
 
    `title=[string]` <br />
    `description=[string]`<br />
    `status=[boolean]` <br />
    `due_date=[date]`<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    `{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Message : 'Input Tanggal Tidak boleh hari yang sudah lewat dari hari ini' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`

***

**Edit All Field TODO**
----
  Update All Field.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **Request Params**

   **Required:**
 
   `id=[integer]`

* **Request Body**

    **Required:**
 
    `title=[string]` <br />
    `description=[string]`<br />
    `status=[boolean]` <br />
    `due_date=[date]`<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  <br />
    `{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Message : "Data Is Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`

  OR
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Message : 'Input Tanggal Tidak boleh hari yang sudah lewat dari hari ini' }`

***

**Update Status Todo**
----
  Update Status Todo.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **Request Params**

   **Required:**
 
   `id=[integer]`

* **Request Body**

  **Required:**

  `status=[boolean]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    `{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{Message: 'Data Is Not Found'}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`

***

**Delete TODO**
----
  Delete TODO.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **Request Params**

   **Required:**
 
   `id=[integer]`

* **Request Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{Message: 'todo success to delete'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{Message: 'Data Is Not Found'}`

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{message: 'Internal Server Error'}`