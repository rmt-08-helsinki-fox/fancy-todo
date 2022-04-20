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
  {
  	email : <String> (Required)
  	password : <String> (Required)
    location : <String> (Required)
  }
  ```

- #### Succes Response

  ##### `code: 201`

  ```javascript
  {
    message: 'Succes create a user'
    id: (user.id) <Integer>
    email: (user.email) <String>
  }
  ```

- #### Error Response

  ##### `code: 500`

  ```javascript
  {
    message: "Invalid format of email",
  }
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
  {
  	email : <String> (Required)
  	password : <String> (Required)
  }
  ```

- #### Succes Response

  `Get an access token and info of weather`

  ##### `code: 200`

  ```javascript
  {
    access_token: <String>
    weather: <Object>
  }
  ```

- #### Error Response

  ##### `code: 400`

  ```javascript
  {
    message: "Wrong Email or Password";
  }
  ```

  ##### `code: 500`

  ```javascript
  {
    message: "Internal server error";
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
  {
    data: <Array of object>
  }
  ```

- #### Error Response

  ##### `code: 500`

  ```javascript
  {
    message: "Internal server Error";
  }
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
  {
   title: <String> (Required)
   description <String>
   status <String>
   due_date <Date> (Required)
  }
  ```

- #### Succes Response

  `Success create a ToDo`

  ##### `code: 201`

  ```javascript
  {
   Data: <Object>
  }
  ```

- #### Error Response

  ##### `code: 400`

  ```javascript
  {
    message: "Date must be after this day";
  }
  ```

  ##### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Show ToDo By Id</u>

Show a ToDo by his Id

- #### Url

  `/todos/:id`

- #### Method

  `GET`

- #### Url Params

  ##### Required: `id:<Integer>`

- #### Data Params

  ```javascript
  id : <Integer> (Required)
  ```

- #### Succes Response

  `Get a todo from database`

  ##### `code: 200`

  ```javascript
  {
    data: <Object>
  }
  ```

- #### Error Response

  ##### `code: 404`

  ```javascript
  message: "Data not found";
  ```

<br><br>

## <u>Update ToDo By Id</u>

Update a ToDo by his Id

- #### Url

  `/todos/:id`

- #### Method

  `PUT`

- #### Url Params

  ##### Required: `id:<Integer>`

- #### Data Params

  ```javascript
  {
    id: <Integer> (Required)
    titel: <String>
    description: <String>
  	status: <String>
    due_date: <Date>
  }
  ```

- #### Succes Response

  `Updated a ToDo By Id`

  ##### `code: 200`

  ```javascript
  {
    data: <Object>
  }
  ```

- #### Error Response

  ##### `code: 404`

  ```javascript
  {
    message: "Data not found";
  }
  ```

  ##### `code: 400`

  ```javascript
  {
    message: "Date must be after this day";
  }
  ```

  ##### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Update Status ToDo By Id</u>

Update a Status of ToDo by his Id

- #### Url

  `/todos/:id`

- #### Method

  `PATCH`

- #### Url Params

  ##### Required: `id:<Integer>`

- #### Data Params

  ```javascript
  {
    id: <Integer> (Required)
  }
  ```

- #### Succes Response

  `Updated a status ToDo By Id`

  ##### `code: 200`

  ```javascript
  {
    data: <Object>
  }
  ```

- #### Error Response

  ##### `code: 404`

  ```javascript
  {
    message: "Data not found";
  }
  ```

  ##### `code: 400`

  ```javascript
  {
    message: "Date must be after this day";
  }
  ```

  ##### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Delete a ToDo By Id</u>

Delete a ToDo by his Id

- #### Url

  `/todos/:id`

- #### Method

  `DELETE`

- #### Url Params

  ##### Required: `id:<Integer>`

- #### Data Params

  ```javascript
  {
    id: <Integer> (Required)
  }
  ```

- #### Succes Response

  `Delete a ToDo from database`

  ##### `code: 200`

  ```javascript
  message: "Todo success to delete";
  ```

- #### Error Response

  ##### `code: 404`

  ```javascript
  {
    message: "Data not found";
  }
  ```

  ##### `code: 500

  ```javascript
  {
    message: "Internal server error";
  }
  ```
