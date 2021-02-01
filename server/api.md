**TO-DO LIST**
===
    Implementasi REST API CRUD

* **Show All To-Do List**

    `/todos/list`

    * **Method:**

        `GET`

    * **URL Params**

        `None`

    * **Data Params**

        `None`

    * **Success Response:**

        *   **Code:** 200 <br/>
            **Content:** `{ id: 1, title: "Reading", description: "Reading a calculus", status: "open", dueData: "2022-05-05"}`

    * **Error Response:**

        *   **Code:** 500 INTERNAL SERVER ERROR <br/>
            **Content:** `{ error: "Internal server error"}`



* **Create a New To-do**

    `/todos/add`

    * **Method:**

        `POST`

    * **URL Params**

        `None`

    * **Data Params**

        `title=[string], desription=[string], status=[string], dueData=[date]`

    * **Success Response:**

        *   **Code:** 201 <br/>
            **Content:** `{ id: 1, title: "Reading", description: "Reading a calculus", status: "open", dueData: "2022-05-05"}`

    * **Error Response:**

        *   **Code:** 400 VALIDATION ERROR <br/>
            **Content:** `{ error: "Validation error"}`

        OR

        *   **Code:** 500 INTERNAL SERVER ERROR <br/>
            **Content:** `{ error: "Internal server error"}`


* **Show detail one To-do list**

    `/todos/:id`

    * **Method:**

        `GET`

    * **URL Params**

        `id=[integer]`

    * **Data Params**

        `None`

    * **Success Response:**

        *   **Code:** 200 <br/>
            **Content:** `{ id: 1, title: "Reading", description: "Reading a calculus", status: "open", dueData: "2022-05-05"}`

    * **Error Response:**

        *   **Code:** 404 NOT FOUND <br/>
            **Content:** `{ error: "To-do list does not exist"}`



* **Update one To-do List**

    `/todos/:id`

    * **Method:**

        `PUT`

    * **URL Params**

        `id=[integer]`

    * **Data Params**

        `title=[string], desription=[string], status=[string], dueData=[date]`

    * **Success Response:**

        *   **Code:** 200 <br/>
            **Content:** `{ id: 1, title: "Reading", description: "Reading a calculus", status: "open", dueData: "2022-05-05"}`

    * **Error Response:**

        *   **Code:** 400 VALIDATION ERROR <br/>
            **Content:** `{ error: "Validation error"}`

        OR

        *   **Code:** 404 NOT FOUND <br/>
            **Content:** `{ error: "To-do list does not exist"}`

        OR
        
        *   **Code:** 500 INTERNAL SERVER ERROR <br/>
            **Content:** `{ error: "Internal server error"}`



* **Update status one To-do List**

    `/todos/:id`

    * **Method:**

        `PATCH`

    * **URL Params**

        `id=[integer]`

    * **Data Params**

        `status=[string]`

    * **Success Response:**

        *   **Code:** 200 <br/>
            **Content:** `{ id: 1, title: "Reading", description: "Reading a calculus", status: "done", dueData: "2022-05-05"}`

    * **Error Response:**

        *   **Code:** 400 VALIDATION ERROR <br/>
            **Content:** `{ error: "Validation error"}`

        OR

        *   **Code:** 404 NOT FOUND <br/>
            **Content:** `{ error: "To-do list does not exist"}`

        OR

        *   **Code:** 500 INTERNAL SERVER ERROR <br/>
            **Content:** `{ error: "Internal server error"}`



* **Delete one To-do List**

    `/todos/:id`

    * **Method:**

        `DELETE`

    * **URL Params**

        `id=[integer]`

    * **Data Params**

        `None`

    * **Success Response:**

        *   **Code:** 200 <br/>
            **Content:** `{ msg: "todo succecc to delete"}`

    * **Error Response:**

        *   **Code:** 404 NOT FOUND <br/>
            **Content:** `{ error: "To-do list does not exist"}`

        OR

        *   **Code:** 500 INTERNAL SERVER ERROR <br/>
            **Content:** `{ error: "Internal server error"}`