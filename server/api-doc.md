# API Document

## <u>Register User</u>

Make a new user

- #### Url

  `/users/register`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Params

  ```javascript
  body: {
  	email : req.body.email,
  	password : req.body.password
  }
  ```

- #### Succes Response

  ##### `code: 201`

  ```javascript
  json({
    msg: 'Succes create a user'
    id: user.id
    email: user.email
  })
  ```

- #### Error Response

  ##### `code: 500`

  ```javascript
  json({
    msg: "Invalid format of email",
  });
  ```

<br><br>

## <u>Login User</u>

Login a user to aplication

- #### Url

  `/users/login`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Params

  ```javascript
  body: {
  	email : req.body.email,
  	password : req.body.password
  }
  ```

- #### Succes Response

  `Get an access token`

  ##### `code: 200`

  ```javascript
  json({
    access_token,
  });
  ```

- #### Error Response

  ```javascript
  if user not found => {
    code/status: 400
    msg: 'Wrong Email or Password'
  }
  if password wrong => {
    code/status: 400
    msg: 'Wrong Email or Password'
  }
  if server error => {
    code/status: 500
    msg: 'Internal server error'
  }
  ```

<br><br>

## <u>Show All ToDo</u>

Showing all ToDo from database

- #### Url

  `/todos`

- #### Method

  `GET`

- #### Url Params

  ##### Required: `none`

- #### Data Params

  ```javascript
  None;
  ```

- #### Succes Response

  `Get all todos from database`

  ##### `code: 200`

  ```javascript
  json({
    data all todos
  })
  ```

- #### Error Response

  ##### `code: 500`

  ```javascript
  msg: "Internal server Error";
  ```

<br><br>

## <u>Create ToDo</u>

Make a ToDo

- #### Url

  `/todos`

- #### Method

  `POST`

- #### Url Params

  ##### Required: `none`

- #### Data Params

  ```javascript
  {title,description,status,due_date} = req.body
  ```

- #### Succes Response

  `Success create a ToDo`

  ##### `code: 201`

  ```javascript
  json(
  ToDo(has been created)
  )
  ```

- #### Error Response

  ```javascript
  if Validation Error => {
    msg: 'Date must be after this day'
    code/status: 400
  }
  if server error => {
    msg: 'Internal server error'
  	code/status: 500
  }
  ```

<br><br>

## <u>Show ToDo By Id</u>

- #### Url

  `/todos/:id`

- #### Method

  `GET`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Params

  ```javascript
  id : req.params.id AS Interger
  ```

- #### Succes Response

  `Get a todo from database`

  ##### `code: 200`

  ```javascript
  json({
    data a todo
  })
  ```

- #### Error Response

  ##### `code: 404`

  ```javascript
  msg: "Data not Found";
  ```

<br><br>

## <u>Update ToDo By Id</u>

- #### Url

  `/todos/:id`

- #### Method

  `PUT`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Params

  ```javascript
  {
    id: req.params.id AS Integer
  }
  {title,description,status,due_date} = req.body
  ```

- #### Succes Response

  `Updated a ToDo By Id`

  ##### `code: 200`

  ```javascript
  json({
    data an updated todo
  })
  ```

- #### Error Response

  ```javascript
  if todo not found => {
    msg: 'Data not Found'
  	code/status: 404
  }
  if validation error => {
    msg: 'Date must be after this day'
  	code/status: 400
  }
  if server error => {
    msg: 'Internal server Error'
  	code/status: 500
  }
  ```

<br><br>

## <u>Update Status ToDo By Id</u>

- #### Url

  `/todos/:id`

- #### Method

  `PATCH`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Params

  ```javascript
  {
    id: req.params.id AS Integer
  }
  {title,description,status,due_date} = req.body
  ```

- #### Succes Response

  `Updated a status ToDo By Id`

  ##### `code: 200`

  ```javascript
  json({
    data an updated todo
  })
  ```

- #### Error Response

  ```javascript
  if todo not found => {
    msg: 'Data not Found'
  	code/status: 404
  }
  if validation error => {
    msg: 'Date must be after this day'
  	code/status: 400
  }
  if server error => {
    msg: 'Internal server Error'
  	code/status: 500
  }
  ```

<br><br>

## <u>Delete a ToDo By Id</u>

- #### Url

  `/todos/:id`

- #### Method

  `DELETE`

- #### Url Params

  ##### Required: `id:[INTEGER]`

- #### Data Params

  ```javascript
  {
    id: req.params.id AS Integer
  }
  ```

- #### Succes Response

  `Delete a ToDo from database`

  ##### `code: 200`

  ```javascript
  msg: "todo success to delete";
  ```

- #### Error Response

  ```javascript
  if todo not found => {
    msg: 'Data not Found'
  	code/status: 404
  }
  if server error => {
    msg: 'Internal server error'
  	code/status: 500
  }
  ```
