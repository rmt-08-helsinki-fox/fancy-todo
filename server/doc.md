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
            **Content:** `{ error : "Input antara done dan not done" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Tanggal harus setelah hari ini  dengan format DD-MM-YYYY" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`


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
                title: "Gosok Gigi",
                description: "Gosok gigi sampe bersih",
                status: "not done",
                due_date: "02-02-2021
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
            **Content:** `{ error : "Input antara done dan not done" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Tanggal harus setelah hari ini dengan format DD-MM-YYYY" }`

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
            **Content:** `{ error : "Input antara done dan not done" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Invalid Token" }`

            OR

        * **Code:** 401 NOT AUTHORIZED <br />
            **Content:** `{ error : "Not authorized" }`

            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`


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
                title: "Gosok Gigi",
                description: "Gosok gigi sampe bersih",
                status: "not done",
                due_date: "02-02-2021
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

        * **Code:** 400 NOT AUTHORIZED <br />
            **Content:** `{ error : "Input email dengan format yang valid" }`

            OR

        * **Code:** 400 NOT AUTHORIZED <br />
            **Content:** `{ error : "Email sudah digunakan" }`

            OR

        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{ error : "Password minimal 6 karakter" }` 
        
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`

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
               token: JSON Web Token
            }
            ```
    
    * **Error Response:**

        * **Code:** 400 NOT AUTHORIZED <br />
            **Content:** `{ error : "Email atau Password salah" }`
        
            OR

        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{ error : "Internal Server Error" }`
