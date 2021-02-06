**Create User**
----
  Returns json data about a single user.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
    - Body:
    ``
    email=[string]
    password=[string]
    city=[boolean]
    ``
    - Headers: none

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```JSON 
    { 
      success : "Registration success",
      id : 27,
      email : "maddmi@gmail.com",
      city : "Banjarbaru"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```JSON
    { errors : 
      [ 
        "Email is required", 
        "Password is required",
        "Email has been used",
        "Password minimal 6 characters"
      ] 
    }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
    ```

---
**Login User**
----
  Returns json data about a access_token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
  - Body:
      ``
      email=[string]
      password=[string]
      ``
  - Headers: none

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```JSON 
    { access_token : <"access_token"> }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```JSON
    { errors : 
      [ 
        "Your Email or Password is Incorrect"
      ] 
    }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
    ```

---
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
  - Body: 
  ``
   title=[string]
   description=[string]
   status=[boolean]
   due_date=[date]
  ``
  - Headers: 
  ``
  access_token=[string]
  ``
  

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```JSON 
    { 
      title: "Fancy_Todo", 
      description: "menyelesaikan challange", 
      status: false, 
      due_date: "2021-02-01T17:00:00.000Z",
      UserId: 2
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```JSON
    { errors : 
      [ 
        "Title is required", 
        "Date must be greater than yesterday" 
      ] 
    }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
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

   - Body: none
   - Headers: 
    ``
    access_token=[string]
    ``

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```JSON
    { 
      todos: [
              {
                title: "Fancy_Todo", 
                description: "menyelesaikan challange", 
                status: false, 
                due_date: "2021-02-10T00:00:00.000Z",
                UserId: 2
              },
              {
                title: "Fancy_Todo", 
                description: "menyelesaikan challange", 
                status: false, 
                due_date: "2021-02-11T00:00:00.000Z",
                UserId: 2
              }
            ],

      moment: [
                "in 4 days",
                "in 5 days"
              ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
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

    - Body: None
    - Headers: 
      ``
      access_token=[string]
      ``
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```JSON
    { 
      title: "Fancy_Todo", 
      description: "menyelesaikan challange", 
      status: false, 
      due_date: "2021-02-01T17:00:00.000Z",
      UserId: 2
    }
    ```
 
* **Error Response:**

  * **Code:** 401 NOT AUTHORIZE <br />
    **Content:** 
    ```JSON
    { errors : [ "Not Authorize" ] }
    ```

  - OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```JSON 
    { errors : [ "Todo not found" ] }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
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
    - Body: 
      ``
      title=[string]
      description=[string]
      status=[boolean]
      due_date=[date]
      ``
    - Headers: 
      ``
      access_token=[string]
      ``
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br /> 
    ```JSON
    { 
      title: "Fancy_Todo", 
      description: "menyelesaikan challange", 
      status: false, 
      due_date: "2021-02-01T17:00:00.000Z",
      UserId: 2
    }
    ```
 
* **Error Response:**

  * **Code:** 401 NOT AUTHORIZE <br />
    **Content:** 
    ```JSON
    { errors : [ "Not Authorize" ] }
    ```

  - OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```JSON
    { errors : [ "Todo not found" ] }
    ```

  - OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```JSON
    { 
      errors : [ 
                "Title is required", 
                "Date must be greater than yesterday" 
               ] 
    }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
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
 
   - Body: 
    ``
    status=[boolean]
    ``
  - Headers: 
    ``
    access_token=[string]
    ``
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```JSON
    { 
      title: "Fancy_Todo", 
      description: "menyelesaikan challange", 
      status: true, 
      due_date: "2021-02-01T17:00:00.000Z",
      UserId: 2
    }
    ```
 
* **Error Response:**

  * **Code:** 401 NOT AUTHORIZE <br />
    **Content:** 
    ```JSON
    { errors : [ "Not Authorize" ] }
    ```

  - OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```JSON
    { errors : [ "Todo not found" ] }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
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

    - Body: none
    - Headers: 
      ``
      access_token=[string]
      ``
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```JSON
    { message : "Todo success to delete" }
    ```
 
* **Error Response:**

  * **Code:** 401 NOT AUTHORIZA <br />
    **Content:**
    ```JSON
    { errors : [ "Not Authorize" ] }
    ```

    -OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```JSON
    { errors : [ "Todo Not Found" ] }
    ```

  - OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { errors : [ "Internal server error" ] }
    ```
---

  **Weatherstack API**
----
  Returns json data about a current weather.

* **URL**

  /weather

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

   `access_key=[string]` <br>
   `query=[string]`

* **Data Params**

    - Body: none
    - Headers: 
      ``
      access_token=[string]
      ``
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```JSON
    {
      request : {
                  "type": "City",
                  "query": "Banjarbaru",
                  "language": "en",
                  "unit": "m"
                },

      location : {
                  "name": "Banjarbaru",
                  "country": "Indonesia",
                  "region": "Lampung",
                  "lat": "-4.772",
                  "lon": "104.532",
                  "timezone_id": "Asia/Jakarta",
                  "localtime": "2021-02-06 09:26",
                  "localtime_epoch": 1612603560,
                  "utc_offset": "7.0"
                },

      current : {
                  "observation_time": "02:26 AM",
                  "temperature": 23,
                  "weather_code": 353,
                  "weather_icons": [ ">URL>" ],
                  "weather_descriptions": [ "Light rain shower" ],
                  "wind_speed": 6,
                  "wind_degree": 307,
                  "wind_dir": "NW",
                  "pressure": 1009,
                  "precip": 0.1,
                  "humidity": 97,
                  "cloudcover": 92,
                  "feelslike": 25,
                  "uv_index": 1,
                  "visibility": 3,
                  "is_day": "yes"
                }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```JSON
    { error: [ "Internal Server Error" ] }
    ```
---