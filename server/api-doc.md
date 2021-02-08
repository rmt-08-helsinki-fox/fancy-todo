# fancy-todo

## User Register

Register user data to database

- URL
    /users/register

- Method
    POST

- Request Params
    `None`

- Request Body
   ` None`

- Success Response
    -> Code: 201
       Content: {id, email}

- Error Response:
    -> Code: 400
       Content: {Bad Request}
    OR
    -> Code: Custom
       Content: {error : Email has been used!}

## User Login

Logged in to access the features

- URL
    /users/login

- Method
    POST

- Request Params
    `None`

- Request Body
   ` None`

- Success Response
    -> Code: 200
       Content: {id, email}

- Error Response:
    -> Code: 400
       Content: {Bad Request}
    OR
    -> Code: Custom
       Content: {error : Incorrect Email or Password}

## Create Todo

To create a to do list

- URL
    /todos/create

- Method
    POST

- Request Params
    `None`

- Request Body
   `{title, description, status, due_date}`

- Success Response
    -> Code: 201
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {Internal Server Error}

## readAllTodos

Read all to do lists

- URL
    /todos

- Method
    GET

- Request Params
    `None`

- Request Body
   ` None`

- Success Response
    -> Code: 200
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {Internal Server Error}

## todoFindById

Read users to do lists

- URL
    /todos/:id

- Method
    GET

- Request Params
    `id`

- Request Body
   ` None`

- Success Response
    -> Code: 200
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {error : Internal Server Error}
    OR
    -> Code: 404
       Content: {error : Invalid ID!}

## updateTodo

Edit Users to do content

- URL
    /todos/edit/:id

- Method
    PUT

- Request Params
    `None`

- Request Body
   `{title, description, status, due_date}`

- Success Response
    -> Code: 200
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {error : Internal Server Error}
    OR
    -> Code: 404
       Content: {error : Invalid ID!}

## updateStatusTodo

Edit Users status on to do list

- URL
    /todos/statuscheck/:id

- Method
    PATCH

- Request Params
    `None`

- Request Body
   `{status}`

- Success Response
    -> Code: 200
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {error : Internal Server Error}
    OR
    -> Code: 404
       Content: {error : Invalid ID!}

## deleteTodo

delete 1 of Users to do lists

- URL
    /todos/delete/:id

- Method
    DELETE

- Request Params
    `id`

- Request Body
   `None`

- Success Response
    -> Code: 200
       Content: {id, title, description, status, due_date, UserId}

- Error Response:
    -> Code: 500
       Content: {error : Internal Server Error}
    OR
    -> Code: 404
       Content: {error : Invalid ID!}

==getWeather==

get weather data from 3rd party API

- URL
    /todos/weather

- Method
    GET

- Request Params
    `None`

- Request Body
   `None`

- Success Response
    -> Code: 200
       Content: {weathers}

- Error Response:
    -> Code: 500
       Content: {error : Internal Server Error}