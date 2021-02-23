## **FANCY TODO**

# 1. USER REGISTERING

- **URL**

  /users/register

- **Method:**

  `POST`

- **Request Params**

  None

- **Request Header**

  None

- **Request Body**

  ```javascript
  {
  	"email": "example@mail.com",
    "password": "password",
  }
  ```

- **Success Response:**

  - **Code:** 201 CREATED<br />
    **Content:**
    ```javascript
    {
    	msg: "Successfully Registered";
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST<br />
    **Content:**
    ```javascript
    [
      {
    	  msg: "Email is Required";
      },
      {
    	  msg: "Email Format Wrong";
      },
      {
    	  msg: "Password is Required";
      },
      {
    	  message: "duplicate key value violates unique constraint";
      }
    ]
    ```

  OR

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 2. USER LOGIN

- **URL**

  /users/login

- **Method:**

  `POST`

- **Request Params**

  None

- **Request Header**

  None

- **Request Body**

  ```javascript
  {
  	"email": "example@mail.com",
    "password": "password",
  }
  ```

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
    	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
    }
    ```

- **Error Response:**

  - **Code:** 401 NOT AUTHENTICATED<br />
    **Content:**
    ```javascript
    {
    	msg: "Invalid Email/Password";
    }
    ```

  OR

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 3. USER LOGIN WITH GOOGLE

- **URL**

  /users/googlelogin

- **Method:**

  `POST`

- **Request Params**

  None

- **Request Header**

  None

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
    	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 4. GET TODOS LIST

- **URL**

  /todos

- **Method:**

  `GET`

- **Request Params**

  None

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
      id: 1,
      title: "todos1",
      description: "this is todos",
      status: false
    },
    {
    ...
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 5. GET TODOS BY ID

- **URL**

  /todos/:id

- **Method:**

  `GET`

- **Request Params**

  ```javascripts
  {
    id: 1,
  }
  ```

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
      id: 1,
      title: "todos1",
      description: "this is todos",
      status: false
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 6. ADD TODO LIST

- **URL**

  /todos

- **Method:**

  `POST`

- **Request Params**

  None

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  ```javascript
  {
    title: "new todos",
    description: "new description"
  }
  ```

- **Success Response:**

  - **Code:** 201 CREATED<br />
    **Content:**
    ```javascript
    {
    	msg: "Successfully Added";
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 7. EDIT TODO LIST

- **URL**

  /todos/:id

- **Method:**

  `PUT`

- **Request Params**

  ```javascript
  {
  	id: 1;
  }
  ```

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  ```javascript
  {
    title: "edited todos",
    description: "edited description"
  }
  ```

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
      id: 1
      title: "edited todos",
      description: "edited description"
      status: false
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 8. CHANGE STATUS TODO

- **URL**

  /todos/:id

- **Method:**

  `PATCH`

- **Request Params**

  ```javascript
  {
  	id: 1;
  }
  ```

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 CREATED<br />
    **Content:**
    ```javascript
    {
      id: 1
      title: "edited todos",
      description: "edited description"
      status: true
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```

# 9. DELETE TODO LIST

- **URL**

  /todos/:id

- **Method:**

  `DELETE`

- **Request Params**

  ```javascript
  {
  	id: 1;
  }
  ```

- **Request Header**

  ```javascript
  {
  	access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbHdheXMzMEBtYWlsLmNvbSIsImlhdCI6MTYxMzIxNDU5OX0.OQZOjMdMG3gXKblAnUu5Yt-LWRRbPLWcpQseN16-B4c";
  }
  ```

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```javascript
    {
      msg: "Successfully Deleted"
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:**
    ```javascript
    {
    	msg: "Internal Server Error";
    }
    ```
