## **ADD TODO**

Returns json data that were added.

- **URL**

  /todos

- **Method:**

  `POST`

- **Request Params**

  None

- **Request Body**

  `{ title: <title to get insert into>, description: <description to get insert into>, status: <status to get insert into>, due_date: <due_date to get insert into> }`

- **Success Response:**

  - **Code:** 201 CREATED<br />

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

- **Sample Call:**

  ```javascript
  Todo.create(dataInput)
  	.then((data) => {
  		res.status(201).json(data);
  	})
  	.catch((err) => {
  		if (err.message) res.status(400).json(err.errors[0]);
  		res.status(500).json({ message: "Internal Server Error" });
  	});
  ```
