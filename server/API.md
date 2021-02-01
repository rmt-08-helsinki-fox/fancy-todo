**FANCY TODOS**
----
  <_Additional information about FANCY TODOS API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

---- 

* **URL** 

  1. /todos/
  
* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      "id": 20,
      "title": "Tessss",
      "description": "halosss",
      "status": false,
      "due_date": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2021-02-01T14:37:27.934Z",
      "createdAt": "2021-02-01T14:37:27.934Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Title is required",
          "Description is required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

----


* **URL** 

  2. /todos/
  
* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `None`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "title": "Tes",
        "description": "halo",
        "status": true,
        "due_date": "2021-03-03T00:00:00.000Z",
        "createdAt": "2021-02-01T05:49:49.619Z",
        "updatedAt": "2021-02-01T05:49:49.619Z"
    }, 
    {
        "id": 7,
        "title": "Pevita",
        "description": "Pearce",
        "status": true,
        "due_date": "2021-04-04T00:00:00.000Z",
        "createdAt": "2021-02-01T06:00:07.917Z",
        "updatedAt": "2021-02-01T08:57:37.439Z"
    },
    {
        "id": 1,
        "title": "Pevi",
        "description": "lalala",
        "status": false,
        "due_date": "2021-03-03T00:00:00.000Z",
        "createdAt": "2021-02-01T05:48:50.179Z",
        "updatedAt": "2021-02-01T13:29:37.468Z"
    },
    {
        "id": 20,
        "title": "Tessss",
        "description": "halosss",
        "status": false,
        "due_date": "2022-01-01T00:00:00.000Z",
        "createdAt": "2021-02-01T14:37:27.934Z",
        "updatedAt": "2021-02-01T14:37:27.934Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


---- 

* **URL** 

  3. /todos/:id
  
* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevi",
      "description": "lalala",
      "status": false,
      "due_date": "2021-03-03T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T13:29:37.468Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
      "msg": "error not found"
    }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/:id",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

---- 

* **URL** 

  4. /todos/:id
  
* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id:[integer]`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevita",
      "description": "Pearce",
      "status": true,
      "due_date": "2022-02-02T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T15:26:07.220Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Title is required",
          "Description is required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/:id",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

---- 

* **URL** 

  5. /todos/:id
  
* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id:[integer]`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "id": 1,
      "title": "Pevita",
      "description": "Pearce",
      "status": true,
      "due_date": "2022-02-02T00:00:00.000Z",
      "createdAt": "2021-02-01T05:48:50.179Z",
      "updatedAt": "2021-02-01T15:26:07.220Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Title is required",
          "Description is required"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/:id",
      dataType: "json",
      type : "PATCH",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

---- 

* **URL** 

  6. /todos/:id
  
* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id:[integer]`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "messages": "todo succes to delete"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `"error not found"`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/todos/:id",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
---- 

* **URL** 

  7. /users/register
  
* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      "msg": "Register Succes",
      "id": 3,
      "email": "hacktiv8@gmail.com",
      "password": "$2a$10$dE2/DshitsFkdzUt9nKdXOOG0CEohiz6Pez4RaOE..UbwFOKPRhri"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      "message": [
          "Invalid email format",
          "email tidak boleh kosong"
      ]
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/users/post",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

---- 

* **URL** 

  8. /users/login
  
* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

   **Optional:**
 
   `None`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYxMjE5NzU2Nn0.AjHfLXVC5c_rgIDq7fv_8nFxPc1nHFn6mMag6ctANE8"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"Internal server error"`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `error html`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "/user/login",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 


