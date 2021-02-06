# Fancy Todos


```Models: ```

**1. Todos table**
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>,
    "UserId": <integer>,
}
```
foreign key:
```  UserId  ```

validations:
* title: notEmpty
* description: notEmpty
* due_date: notEmpty, notPassedDate


**2. Users table**
```
{
    "email": <string>,
    "name": <string>,
    "password": <string>,
    
}
```

validations:
* email: isEmail, notEmpty
* name: notEmpty
* password: notEmpty, len[6]

``` API```

- https://newsapi.org/ => news api

```Routes:```
## <a id="routesIndex"></a>
## 1. [Create Todos](#createTodos)
## 2. [Get Todos](#showTodos)
## 3. [Get Todos by Id](#showTodosById)
## 4. [Put Todos by Id](#putTodosById)
## 5. [Patch Todos by Id](#patchTodosById)
## 6. [Delete Todos by Id](#deleteTodos) 
## 7. [Get Headline News](#getHeadlineNews) 
## 8. [User Sign Up](#userSignUp) 
## 9. [User Sign In](#userSignIn) 
## 10. [User Google Sign In](#UserGoogleSignIn) 
<br>



## <a id="createTodos"></a>POST /todos/add
### *Create a todo object into database*
### Request Body
``` 
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
    "UserId": <integer>
}    
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
### Responses:

* code 201: Successful operation. Return the added object
``` 
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}    
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,
        "message":"jwt malformed"
    }
}
```
* code 400: Validation errors. 
```
{
    "error":
    {
        "code":400,
        "messages":
        [
        "Cannot input past day in due_date parameter","Validation notEmpty on title failed","Validation notEmpty on description failed"
        ]
    }
}
```
* code 500: internal server error
```
{
    "error": {
        "code": 500,
        "messages": "internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="showTodos"></a>GET /todos 
### *Show all todos from database*
### Request Body
``` 
Not needed   
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
### Responses:

* code 200: Successful operation. Return array of objects from todos table in the database
```
[
    {
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
    "UserId": <integer>
    },
    {
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
    "UserId": <integer>
    },
    {...} 
]
```
* code 500: Internal server error
```
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="showTodosById"></a>GET /todos/:id 
### *Show a todo object with the corresponding id from the database*
### Parameters:
    Required:
    Todo Id <integer>
### Request Body
``` 
Not needed   
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
### Responses:
* code 200: Successful operation. Return object of the corresponding id
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}    
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
* code 404: Corresponding id was not found
```
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: Internal server error
```
{
    "error": {
        "code": 500,
        "message": "Internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="putTodosById"></a>PUT /todos/:id
### *Edit a todo object from the database*
### Parameters:
    Required:
    Todo Id <integer>
### Request Body
``` 
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}    
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
### Responses:
* code 200: Successful operation. Return the updated object
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}   
```
* code 400: Validation errors.
```
{
    "error":
    {
        "code":400,
        "messages":
        [
        "Cannot input past day in due_date parameter","Validation notEmpty on title failed","Validation notEmpty on description failed"
        ]
    }
}
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
* code 404: Corresponding id was not found
```
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: Internal server error
```
{
    "error": {
        "code": 500,
        "message": "Internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="patchTodosById"></a>PATCH /todos/:id
### *Edit a property of a todo object from the database*
### Parameters:
    Required:
    Todo Id <integer>
### Request Body
```
{
    "status": <string>
}    
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```

### Responses:
* code 200: Successful operation. Return the updated object.
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}   
```
* code 400: Validation errors. 
```
{
    "error":
    {
        "code":400,
        "messages":
        [
            "Validation notEmpty on status failed"
        ]
    }
}
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
* code 404: Corresponding id was not found
```
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: Internal server error
```
{
    "error": {
        "code": 500,
        "message": "Internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

##  <a id="deleteTodos"></a>DELETE /todos/:id 

### *Delete a todo object from a database*
### Parameters:
    Required:
    Todo Id <integer>
### Request Body
``` 
Not needed   
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
### Responses:
* code 200: Successful operation.  
{
    "message": "a todo was deleted"
}
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
* code 404: Corresponding id was not found
```
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: Internal server error
```
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>


## <a id="getHeadlineNews"></a> GET /todos/news
### *Show headline news on current day*
### Request Body
``` 
Not needed   
```
### Request Headers
``` 
{
    "accessToken": <string>
}
```
* code 401: error in authentication
```
{
    "error":
    {
        "code":401,"message":"jwt malformed"
    }
}
```
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="userSignUp"></a> POST /users/signup
### *Show headline news on current day*
### Request Body
``` 
{
    "email": <string>,
    "name": <string>,
    "password": <string>,
}  
```

* code 400: validation errors
```
{
    "error":
    {
        "code":400,"messages":
        [
            "six characters are required to make a password","invalid email format","please input your name", email must be unique
        ]
    }
}
```
* code 500: internal server error

## <a id="userSignIn"></a> POST /users/signin
### *Show headline news on current day*
### Request Body
``` 
{
    "email": <string>,
    "password": <string>,
}  
```

* code 400: validation errors
```
{
    "error":
    {
        "code":400,
        "messages": "Your email address or password is incorrect!"   
    }
}
```
* code 500: internal server error
#### [Back to Routes Index](#routesIndex)
<br>

## <a id="userGoogleSignIn"></a> POST /users/signinGoogle
### *Show headline news on current day*
### Request Body
``` 
{
    "id_token": <string>
}  
```

* code 500: internal server error
#### [Back to Routes Index](#routesIndex)
<br>





