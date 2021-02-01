**Create Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
 
   `title=[string]` <br />
   `description=[string]` <br />
   `status=[boolean]` <br />
   `due_date=[date]` <br />
  

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** <br /> 
    `{ errors : [ "Title is required", "Can't enter a date that has already passed" ] }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/todos",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```

---

**Show List Todos**
----
  Returns json data Todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None  

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/todos",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
---
**Show One Todo**
----
  Returns json data about a single todo.

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

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br /> 
    `{ errors : "Todo not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

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
  ```
---
**Update all Fields**
----
  Returns json data about a single todo.

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
   `description=[string]` <br />
   `status=[boolean]` <br />
   `due_date=[date]` <br />
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br /> 
    `{ errors : "Todo not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** <br />
    `{ errors : [ "Title is required", "Can't enter a date that has already passed" ] }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

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
  ```
---
**Update One Field**
----
  Returns json data about a single todo.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

    **Required:**
 
   `title=[string]` <br />
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br /> 
    `{ errors : "Todo not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

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
  ```
---
**Delete One Todo**
----
  Returns json data about a message success or error.

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

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    `{ title: "Fancy_Todo", description: "menyelesaikan challange", status: false, due_date: "2021-02-01T17:00:00.000Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br /> 
    `{ errors : "Todo not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/todos/:id",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```