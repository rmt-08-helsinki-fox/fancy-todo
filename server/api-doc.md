**FANCY TODO**
---
* **Add Todo**

    Create a new todo and return it

    * **URL**

        /todos

    * **Method:**

        `POST`
    
    *  **URL Params**
    
            None

    * **Data Params**

        *  **Required:**

            `title=[string]`<br />
            `status=[string]`<br />
            `due_date=[string]`<br />

        *  **Optional:**

            `description=[string]`<br />

    * **Success Response:**

        * **Code:** 201 <br />
            **Content:** 
            ```
            {
                id: 1,
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            }
            ```
    
    * **Error Response:**

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Title cannot be empty" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Input status between done and not done" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Date have to be at least today" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`
        
    * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/todos",
                method: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    title,
                    description,
                    status,
                    due_date
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
    
        None

    * **Data Params**

        None

    * **Success Response:**

        * **Code:** 200 <br />
            **Content:** 
            ```
            [{
                id: 1,
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            },
            { ...
            }]
            ```
    
    * **Error Response:**         

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/todos",
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
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
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            }
            ```
    
    * **Error Response:**

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

            OR

        * **Code:** 404 BAD REQUEST <br />
            **Content:** `{ error : "error not found" }` 
        
            OR
            
        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/todos/" + id,
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
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

        * **Required:**

            `title=[string]`<br />
            `status=[string]`<br />
            `due_date=[string]`<br />

        *  **Optional:**

            `description=[string]`<br />

    * **Success Response:**

        * **Code:** 200 <br />
            **Content:** 
            ```
            {
                id: 1,
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            }
            ```
    
    * **Error Response:**

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Title cannot be empty" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Input status between done and not done" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Date have to be at least today" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 404 BAD REQUEST <br />
            **Content:** `{ error : "error not found" }` 

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        $.ajax({
            url: baseUrl + "/todos/" + id,
            method: "PUT",
            headers: {
                token: localStorage.getItem("token")
            },
            data: {
                title,
                description,
                status,
                due_date
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

        * **Required:**
            `status=[string]`<br />

    * **Success Response:**

        * **Code:** 200 <br />
            **Content:** 
            ```
            {
                id: 1,
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            }
            ```
    
    * **Error Response:**

        * **Code:** 404 BAD REQUEST <br />
            **Content:** `{ error : "error not found" }` 
        
            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Input status between done and not done" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        $.ajax({
            url: baseUrl + "/todos/" + id,
            method: "PATCH",
            headers: {
                token: localStorage.getItem("token")
            },
            data: {
                status: setStatus
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
            **Content:** 
            ```
            {
                id: 1,
                title: <todo title>,
                description: <todo decription>,
                status: <done or not done>,
                due_date: <todo due date DD-MM-YYYY>
            }
            ```
    
    * **Error Response:**

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

            OR

        * **Code:** 404 BAD REQUEST <br />
            **Content:** `{ error : "error not found" }` 
        
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        $.ajax({
            url: baseUrl + "/todos/" + id,
            method: "DELETE",
            headers: {
                token: localStorage.getItem("token")
            }
        });
    ```


* **Register User**
    Register a new user

    * **URL**

        /register

    * **Method:**

        `POST`
    
    *  **URL Params**

        None

    * **Data Params**

        * **Required:**
        
            `email=[string]`<br />
            `password=[string]`<br />

    * **Success Response:**

        * **Code:** 201 <br />
            **Content:** 
            ```
            {
                id: 1,
                email: budi@mail.com
            }
            ```
    
    * **Error Response:**

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Input a valid email format" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Email already taken" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Minimum password is 6 character" }` 
        
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

    * **Sample Call:**

    ```javascript
        $.ajax({
            url: baseUrl + "/register",
            method: "POST",
            data: {
                email,
                password
            }
        });
    ```

* **Login User**
    Login an existing user

    * **URL**

        /login

    * **Method:**

        `POST`
    
    *  **URL Params**

        None

    * **Data Params**

        * **Required:**
        
            `email=[string]`<br />
            `password=[string]`<br />

    * **Success Response:**

        * **Code:** 201 <br />
            **Content:** 
            ```
            {
               token: <JSON Web Token>
            }
            ```
    
    * **Error Response:**

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Email or Password is wrong" }`
        
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

     * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/login",
                method: "POST",
                data: {
                    email,
                    password
                }
            });
        ```
* **Get News**

    Get news from New York Times base on search query and display it

    * **URL**

        /todos/:id/news

    * **Method:**

        `GET`
    
    *  **URL Params**

        None

    * **Data Params**

        None

    * **Success Response:**

        * **Code:** 200 <br />
            **Content:** 
            ```
            {
                title: <news title>,
                abstract: <news abstract>,
                web_url: <news url>,
            }
            ```
    
    * **Error Response:**
         
        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

      
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`
        
    * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/todos/" + id + "/news",
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            });
        ```
* **OAuth**

    Authenticate user using google

    * **URL**

        /oAuth

    * **Method:**

        `POST`
    
    *  **URL Params**

        None

    * **Data Params**
        
        *  **Required:**
        
        `id_token=[string]`

    * **Success Response:**

        * **Code:** 200 <br />
            **Content:** 
            ```
            {
                token: <access_token>
            }
            ```
        OR

        * **Code:** 201 <br />
            **Content:** 
            ```
            {
                token: <access_token>
            }
            ```
    
    * **Error Response:**

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`
        
    * **Sample Call:**

        ```javascript
            $.ajax({
                url: baseUrl + "/oAuth",
                method: "POST",
                data: {
                    id_token
                }
            });
        ```