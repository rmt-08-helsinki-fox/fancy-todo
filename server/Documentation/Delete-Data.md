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

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  Todo.destroy({
  	where: {
  		id,
  	},
  })
  	.then((data) => {
  		console.log(data);
  		if (!data) res.status(404).json({ message: "Error: Not Found" });
  		res.status(200).json({ message: "Todo Success To Delete" });
  	})
  	.catch((err) => {
  		res.status(500).json({ message: "Internal Server Error" });
  	});
  ```
