# FANCY TODO
a web app to manage and create  your list daily to do

**Show todos**
-----

* **URL**
  
  /todos

* **Method:**
   
   **GET**

* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       ```
       {
        "id": <given id by system>,
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
       }
       ```
* **Error Response:**
    * **Code** : 500<br>
      **Content** : 
      ```
      {error:messages}
      ```
      


**Create todos**
-----

* **URL**
  
  /todos

* **Method:**

   `POST`<br>

* **Success Response:**
    *  **Code** : 201 <br>
       **Content**:
       ```
       {
        "id": <given id by system>,
        "title": "<posted title>",
        "description": "<posted description>",
        "due_date": "<posted date>",
        "status": "<posted status>",
       }
       ```
* **Error Response:**
    * **Code** : 400 VALIDATION ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```
      
      OR 


    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```


**Find todos**
-----

* **URL**
  
  /todos/:id

* **Method:**

   `GET`<br>

* **URL Params:**

  **Required:**<br>

  `id=[integer]`


* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       ```
       {
        "id": <given id by system>,
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
       }
       ```
* **Error Response:**
    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:'data not found'}
      ```
      
      OR 


    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```


**Update todos**
-----

* **URL**
  
  /todos/:id

* **Method:**

   `PUT`<br>

* **URL Params:**<br>

  **Required:**<br>
    `id=[integer]`


* **Request Body:**<br>

  **Required:**<br>
  ```
     {
        "title": "<posted title>",
        "description": "<posted description>",
        "due_date": "<posted date>",
        "status": "<posted status>",
       }

  ```

* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       ```
       {
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
       }
       ```
* **Error Response:**
    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:'data not found'}
      ```

      OR 
      
    * **Code** : 400 VALIDATION ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

      OR 
      
    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**Patch todos**
-----

* **URL**
  
  /todos/:id

* **Method:**

   `PATCH`<br>

* **URL Params:**<br>

  **Required:**<br>
    `id=[integer]`


* **Request Body:**<br>

  **Required:**<br>
  ```
     {
        "status": "<posted status>",
       }

  ```

* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       ```
       {
        "status": "<status from db>",
       }
       ```
* **Error Response:**
    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:'data not found'}
      ```

      OR 
      
    * **Code** : 400 VALIDATION ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

      OR 
      
    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**Delete todos**
-----

* **URL**
  
  /todos/:id

* **Method:**

   `PATCH`<br>

* **URL Params:**<br>

  **Required:**<br>
    `id=[integer]`


* **Request Body:**<br>

  **Required:**<br>
  ```
  {"status": "<posted status>",}
  ```

* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       ```
       {
        "message": "todo success to delete",
       }
       ```
* **Error Response:**
    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:'data not found'}
      ```

      OR  
      
    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```
