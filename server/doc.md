**FANCY TODO**
---
* **Add Todo**
    Create a new todo and return it

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

*  **Required:**
 
    None

* **Data Params**

  `title=[string]`<br />
  `status=[string]`<br />
  `due_date=[string]`<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
        id: 1,
        title: "Gosok Gigi",
        description: "Gosok gigi sampe bersih",
        status: "not done",
        due_date: "02-02-2021
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Judul tidak boleh kosong" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input between done and not done" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Tanggal harus setelah hari ini" }`

* **Sample Call:**

  ```javascript
    ({
      url: "/todos",
      dataType: "json",
      type : "POST",
      success : function(todo) {
        res.status(201).json(todo))
      }
    });
  ```
* **Display All Todo**
    Show all todo in todo list

    * **URL**

    /todos

    * **Method:**

    `GET`
    
    *  **URL Params**

    * **Required:**
    
        None

    * **Data Params**

        None

    * **Success Response:**

    * **Code:** 200 <br />
        **Content:** 
        ```
        [{
            id: 1,
            title: "Gosok Gigi",
            description: "Gosok gigi sampe bersih",
            status: "not done",
            due_date: "02-02-2021
        },
        { ...
        }]
        ```
    
    * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        ({
        url: "/todos",
        dataType: "json",
        type : "GET",
        success : function(todo) {
            res.status(200).json(todo))
        }
        });
    ```
* **Display Todo By Id**
    Show todo that match the id

    * **URL**

        /todos/:id

    * **Method:**

        `GET`
    
    *  **URL Params**

    * **Required:**
    
        `id=[integer]`

    * **Data Params**

        None

    * **Success Response:**

    * **Code:** 200 <br />
        **Content:** 
        ```
        {
            id: 1,
            title: "Gosok Gigi",
            description: "Gosok gigi sampe bersih",
            status: "not done",
            due_date: "02-02-2021
        }
        ```
    
    * **Error Response:**

    * **Code:** 404 BAD REQUEST <br />
        **Content:** `{ error : "error not found" }` 
    
        OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        ({
        url: "/todos",
        dataType: "json",
        type : "GET",
        success : function(todo) {
            res.status(200).json(todo))
        }
        });
    ```
* **Edit Todo**
    Edit todo that match the id

    * **URL**

        /todos/:id

    * **Method:**

        `PUT`
    
    *  **URL Params**

    * **Required:**
    
        `id=[integer]`

    * **Data Params**

        `title=[string]`<br />
        `status=[string]`<br />
        `due_date=[string]`<br />

    * **Success Response:**

    * **Code:** 200 <br />
        **Content:** 
        ```
        {
            id: 1,
            title: "Gosok Gigi",
            description: "Gosok gigi sampe bersih",
            status: "not done",
            due_date: "02-02-2021
        }
        ```
    
    * **Error Response:**

    * **Code:** 404 BAD REQUEST <br />
        **Content:** `{ error : "error not found" }` 
    
        OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{ error : "Judul tidak boleh kosong" }`

        OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{ error : "Input between done and not done" }`

        OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{ error : "Tanggal harus setelah hari ini" }`

        OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        ({
        url: "/todos",
        dataType: "json",
        type : "GET",
        success : function(todo) {
            res.status(200).json(todo))
        }
        });
    ```
* **Update Todo Status**
    Update todo status that match the id

    * **URL**

        /todos/:id

    * **Method:**

        `PATCH`
    
    *  **URL Params**

    * **Required:**
    
        `id=[integer]`

    * **Data Params**

        None

    * **Success Response:**

    * **Code:** 200 <br />
        **Content:** 
        ```
        {
            id: 1,
            title: "Gosok Gigi",
            description: "Gosok gigi sampe bersih",
            status: "not done",
            due_date: "02-02-2021
        }
        ```
    
    * **Error Response:**

    * **Code:** 404 BAD REQUEST <br />
        **Content:** `{ error : "error not found" }` 
    
        OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{ error : "Input between done and not done" }`

        OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        ({
        url: "/todos",
        dataType: "json",
        type : "GET",
        success : function(todo) {
            res.status(200).json(todo))
        }
        });
    ```

* **Delete Todo**
    Delete todo that match the id

    * **URL**

        /todos/:id

    * **Method:**

        `DELETE`
    
    *  **URL Params**

    * **Required:**
    
        `id=[integer]`

    * **Data Params**

        None

    * **Success Response:**

    * **Code:** 200 <br />
        **Content:** `{ msg : "delete success" }` 
    
    * **Error Response:**

    * **Code:** 404 BAD REQUEST <br />
        **Content:** `{ error : "error not found" }` 
    
        OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        ({
        url: "/todos",
        dataType: "json",
        type : "GET",
        success : function(todo) {
            res.status(200).json(todo))
        }
        });
    ```