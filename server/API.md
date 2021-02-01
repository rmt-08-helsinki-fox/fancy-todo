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

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 10,
    "title": "Kerja Challenge",
    "description": "Challenge REST API  Fancy Todos",
    "status": false,
    "due_date": "2021-03-04T16:00:00.000Z",
    "updatedAt": "2021-02-01T10:20:36.481Z",
    "createdAt": "2021-02-01T10:20:36.481Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Tanggal yang anda masukkan tidak valid",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-03-04T16:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Kerja Challenge 3333",
                "description": "Challenge REST API  Fancy Todos",
                "status": false,
                "due_date": "2020-03-04T16:00:00.000Z",
                "updatedAt": "2021-02-01T10:24:03.654Z",
                "createdAt": "2021-02-01T10:24:03.654Z"
            },
            "validatorKey": "isTrueDate",
            "validatorName": null,
            "validatorArgs": [],
            "original": {}
        }
    ]
}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error." }`


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

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
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
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error." }`



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
    **Content:** `{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Tanggal yang anda masukkan tidak valid",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-03-04T16:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Kerja Challenge 3333",
                "description": "Challenge REST API  Fancy Todos",
                "status": false,
                "due_date": "2020-03-04T16:00:00.000Z",
                "updatedAt": "2021-02-01T10:24:03.654Z",
                "createdAt": "2021-02-01T10:24:03.654Z"
            },
            "validatorKey": "isTrueDate",
            "validatorName": null,
            "validatorArgs": [],
            "original": {}
        }
    ]
}`

  OR


  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** `{
    "message": "Error not found"
}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error." }`



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
    **Content:** `{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Tanggal yang anda masukkan tidak valid",
            "type": "Validation error",
            "path": "due_date",
            "value": "2020-03-04T16:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Kerja Challenge 3333",
                "description": "Challenge REST API  Fancy Todos",
                "status": false,
                "due_date": "2020-03-04T16:00:00.000Z",
                "updatedAt": "2021-02-01T10:24:03.654Z",
                "createdAt": "2021-02-01T10:24:03.654Z"
            },
            "validatorKey": "isTrueDate",
            "validatorName": null,
            "validatorArgs": [],
            "original": {}
        }
    ]
}`

  OR


  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** `{
    "message": "Error not found"
}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error." }`


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


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: "Todo Succes to delete"}`
 
* **Error Response:**
  * **Code:** 404 ERROR NOT FOUND <br />
    **Content:** `{
    "message": "Error not found"
}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error." }`