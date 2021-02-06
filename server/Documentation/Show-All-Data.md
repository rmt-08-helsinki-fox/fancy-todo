## **ADD TODO**

Returns json data that were added.

- **URL**

  /todos

- **Method:**

  `GET`

- **Request Params**

  None

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  Todo.findAll()
  	.then((data) => {
  		res.status(200).json(data);
  	})
  	.catch((err) => {
  		res.status(500).json({ message: "Internal Server Error" });
  	});
  ```
