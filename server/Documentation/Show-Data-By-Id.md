## **ADD TODO**

Returns json data that were added.

- **URL**

  /todos/:id

- **Method:**

  `GET`

- **Request Params**

  id = Integer

- **Request Body**

  None

- **Success Response:**

  - **Code:** 200 OK<br />

  OR

  - **CODE:** 404 NOT FOUND<br />
    **Content:** `{ error : "Error: Not Found" }`

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  Todo.findByPk(id)
  	.then((data) => {
  		if (!data) res.status(404).json({ message: "Error: Not Found" });
  		res.status(200).json(data);
  	})
  	.catch((err) => {
  		res.status(500).json({ message: "Internal Server Error" });
  	});
  ```
