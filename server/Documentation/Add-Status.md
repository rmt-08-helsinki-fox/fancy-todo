## **ADD TODO**

Returns json data that were added.

- **URL**

  /todos/:id

- **Method:**

  `PATCH`

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

  - **Code:** 400 BAD REQUEST <br />

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  Todo.update(dataInput, {
  	where: {
  		id,
  	},
  	returning: true,
  })
  	.then((data) => {
  		if (!data[0]) res.status(404).json({ message: "Error: Not Found" });
  		res.status(200).json(data[1][0]);
  	})
  	.catch((err) => {
  		if (err.message) res.status(400).json(err.errors[0]);
  		res.status(500).json({ message: "Internal Server Error" });
  	});
  ```
