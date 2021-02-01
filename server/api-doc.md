**Add Todo**
----
  return json data about todo that just added.

* **URL**
  
  /todos

* **Method**

  `POST`

* **URL Params**



* **Data Params**

    None

* **Request Body**
    {
      id: '4',
      title: "documentasi api",
      description: "post todo add",
      status: false,
      due_date: 02/03/2021
    }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "id": 4,
                    "title": "documentasi api",
                    "description": "post todo add",
                    "status": false,
                    "due_date": "2021-02-02T17:00:00.000Z",
                    "updatedAt": "2021-02-01T13:12:29.072Z",
                    "createdAt": "2021-02-01T13:12:29.072Z"
                  }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{error: "Validation error"}`
  
  OR

  * **Code:** 500 <br />
    **Content:** ``


**Show Todo List**
----
  return json data about all todos in database.

* **URL**
  
  /todos

* **Method**

  `GET`

* **URL Params**



* **Data Params**

    None

* **Request Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
                    {
                      "id": 4,
                      "title": "documentasi api",
                      "description": "post todo add",
                      "status": false,
                      "due_date": "2021-02-02T17:00:00.000Z",
                      "updatedAt": "2021-02-01T13:12:29.072Z",
                      "createdAt": "2021-02-01T13:12:29.072Z"
                    }
                  ]`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** ``


**Find Todo**
----
  return json data about todo that chosen by id.

* **URL**
  
  /todos/:id

* **Method**

  `PUT`

* **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

    {id: '4'}

* **Request Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                    "id": 4,
                    "title": "documentasi api",
                    "description": "post todo add",
                    "status": false,
                    "due_date": "2021-02-02T17:00:00.000Z",
                    "updatedAt": "2021-02-01T13:12:29.072Z",
                    "createdAt": "2021-02-01T13:12:29.072Z"
                  }`

  OR

  * **Code:** 404 <br />
    **Content:** `{error: "not found"}`



* **Error Response:**

  * **Code:** 500 <br />
    **Content:** ``


**Update Todo Put Method**
----
  return json data about todo that just updated by id.

* **URL**
  
  /todos/:id

* **Method**

  `PUT`

* **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

    {id: '4'}

* **Request Body**

    {
      id: '4',
      title: "dokumentasi api",
      description": "put todo update",
      status: false,
      due_date: 02/04/2021
    }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
                    1,
                    [
                      {
                        "id": 4,
                        "title": "dokumentasi api",
                        "description": "put todo update",
                        "status": false,
                        "due_date": "2021-02-03T17:00:00.000Z",
                        "createdAt": "2021-02-01T13:12:29.072Z",
                        "updatedAt": "2021-02-01T13:50:25.310Z"
                      }
                    ]
                  ]`
                  
  OR

  * **Code:** 404 <br />
    **Content:** `{error: "not found"}`



* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{error : "Validation error"}`
  
  OR

  * **Code:** 500 <br />
    **Content:** ``



**Update Todo Patch Method**
----
  return json data about todo that just updated by id.

* **URL**
  
  /todos/:id

* **Method**

  `PATCH`

* **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

    {id:'1'}

* **Request Body**

    {
      "status": true
    }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
                    1,
                    [
                      {
                        "id": 4,
                        "title": "dokumentasi api",
                        "description": "put todo update",
                        "status": true,
                        "due_date": "2021-02-03T17:00:00.000Z",
                        "createdAt": "2021-02-01T13:12:29.072Z",
                        "updatedAt": "2021-02-01T13:54:51.856Z"
                      }
                    ]
                  ]`
  OR

  * **Code:** 404 <br />
    **Content:** `{error: "not found"}`



* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{error : "Validation error"}`

  OR

  * **Code:** 500 <br />
    **Content:** ``



**Delete Todo**
----
  return json data about todo that just deleted by id.

* **URL**
  
  /todos/:id

* **Method**

  `DELETE`

* **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

    {id: '4'}

* **Request Body**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "todo success to delete"}`

  OR

  * **Code:** 404 <br />
    **Content:** `{error: "not found"}`



* **Error Response:**

  * **Code:** 500 <br />
    **Content:** ``