**Show TODO**
----
  Returns All todo lists.

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
    **Content:** <br />
    `[{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z  }, ...]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error : "Todo doesn't exist" }`

***

**Show Todo By ID**
----
  Returns single Todo.

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

  * **Code:** 200 <br />
    **Content:** <br />
    `{ id : 1,title: Todo, description: Bikin Todo, status: false, due_date: 2021-02-01T00:00:00.000Z, createdAt": 2021-02-01T06:48:40.555Z, updatedAt": "2021-02-01T06:48:40.555Z  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Message : "Data Is Not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error : "Todo doesn't exist" }`

***

**ADD TODO**
----
  Create New Todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

    ` none `

* **Data Params**

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
    **Content:** `{ Message : 'Input Tanggal Tidak boleh lewat dari hari ini' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error : "Todo doesn't exist" }`

***

**Edit All Field TODO**
----
  Update All Field.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

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
    **Content:** `{ error : "Todo doesn't exist" }`

  OR
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Message : 'Input Tanggal Tidak boleh lewat dari hari ini' }`

***

**Update Status Todo**
----
  Update Status Todo.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

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
    **Content:** `{ error : "Todo doesn't exist" }`

***

**Delete TODO**
----
  Delete TODO.

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

  * **Code:** 200 <br />
    **Content:** `{Message: 'todo success to delete'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{Message: 'Data Is Not Found'}`

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error : "Todo doesn't exist" }`