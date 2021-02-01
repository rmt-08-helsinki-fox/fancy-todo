## Fancy Todo Rest Api Documentation

This is api documentation for Rest API Fancy Todo.

Sample call will use fetch() vanilla js

## Authentication

### Login

Endpoint to get access token for client request.

### URL

```
/login
```

### METHOD

```
POST
```

### URL PARAMS

```
None
```

#### DATA PARAMS

```
{
	email : string,
	password : string
}
```

#### SUCCESS RESPONSE

```
200 ( OK )
{
		access_token : string
}
```

#### ERROR RESPONSE

```
401 ( UnAuthorized )
{
		message : string // Combination email or password not correct
}
```

#### SAMPLE CALL

```javascript
fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email : 'mail@example.com', password : '12345678'})
});
```

<hr/>

### Register

Endpoint to register new user.

### URL

```
/register
```

### METHOD

```
POST
```

### URL PARAMS

```
None
```

#### DATA PARAMS

```
{
	email : string,
	password : string,
	name : string
}
```

#### SUCCESS RESPONSE

```
201 ( OK )
{
		access_token : string
}
```

#### ERROR RESPONSE

```
400 ( Bad Request )
{
		message : string
}
```

#### SAMPLE CALL

```javascript
fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email : 'mail@example.com', 
      password : '12345678',
      name : 'John Doe'
    })
});
```

<hr/>

## Todo Resource

### Create

Endpoint to create Todo.

### URL

```
/todos
```

### METHOD

```
POST
```

### URL PARAMS

```
None
```

#### DATA PARAMS

```
{
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD
}
```

#### SUCCESS RESPONSE

```
201 ( Created )
{
	id,
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD,
	createdAt : timestamps,
	updatedAt : timestamps,
}
```

#### ERROR RESPONSE

```
400 ( Bad Request )
[
		...validation message
]
```

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title : 'Create Todo CRUD', description : 'Make fancy todo', status : false, due_date : '2021-02-05'})
});
```

<hr/>

### Get Todos

Endpoint to get All Todos.

### URL

```
/todos
```

### METHOD

```
GET
```

### URL PARAMS

```
None
```

#### DATA PARAMS

```
None
```

#### SUCCESS RESPONSE

```
200 ( OK )
[
  {
    id,
    title : string,
    description : string,
    status : boolean,
    due_date : date // YYYY-MM-DD,
    createdAt : timestamps,
    updatedAt : timestamps,
  }
]
```

#### ERROR RESPONSE

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/');
```

<hr/>

### Get Todo

Endpoint to get single Todo by Todo id.

### URL

```
/todos/:id
```

### METHOD

```
GET
```

### URL PARAMS

```
id=integer
```

#### DATA PARAMS

```
None
```

#### SUCCESS RESPONSE

```
200 ( OK )
{
	id,
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD,
	createdAt : timestamps,
	updatedAt : timestamps,
}
```

#### ERROR RESPONSE

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/1');
```

<hr/>

### Update Todo

Endpoint to update data Todo by todo id.

### URL

```
/todos/:id
```

### METHOD

```
PUT
```

### URL PARAMS

```
id=integer
```

#### DATA PARAMS

```
{
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD
}
```

#### SUCCESS RESPONSE

```
200 ( OK )
{
	id,
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD,
	createdAt : timestamps,
	updatedAt : timestamps,
}
```

#### ERROR RESPONSE

```
400 ( Bad Request )
[
		...validation message
]
```

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title : 'Create Todo CRUD', description : 'Make fancy todo', status : false, due_date : '2021-02-05'})
});
```

<hr/>

### Update Todo Status

Endpoint to update Todo Status by Todo id.

### URL

```
/todos/:id
```

### METHOD

```
PATCH
```

### URL PARAMS

```
id=integer
```

#### DATA PARAMS

```
{
	status : boolean
}
```

#### SUCCESS RESPONSE

```
200 ( OK )
{
	id,
	title : string,
	description : string,
	status : boolean,
	due_date : date // YYYY-MM-DD,
	createdAt : timestamps,
	updatedAt : timestamps,
}
```

#### ERROR RESPONSE

```
400 ( Bad Request )
[
		...validation message
]
```

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({status : false})
});
```

<hr/>

### Delete Todo Status

Endpoint to delete Todo Status by Todo id.

### URL

```
/todos/:id
```

### METHOD

```
DELETE
```

### URL PARAMS

```
id=integer
```

#### DATA PARAMS

```
NONE
```

#### SUCCESS RESPONSE

```
200 ( OK )
{
	msg : "Success to delete"
}
```

#### ERROR RESPONSE

```
500 ( Internal Server Error )
{
	...errorMessage
}
```

#### SAMPLE CALL

```javascript
fetch('/todos/1', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
});
```

<hr/>

### 