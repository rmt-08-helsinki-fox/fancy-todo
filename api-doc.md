# Fancy Todos
## 1. [Create Todos](#createTodos)
## 2. [Get Todos](#showTodos)
## 3. [Get Todos by Id](#showTodosById)
## 4. [Put Todos by Id](#putTodosById)
## 5. [Patch Todos by Id](#patchTodosById)
## 6. [Delete Todos by Id](#deleteTodos) 
<br>

## <a id="createTodos"></a>POST /todos
### *Create a todo object into database*
### Request Body
``` 
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
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
* code 400: Validation errors. 
```
{
    "error": {
        "code": 400,
        "message": "invalid input"
    }
}
```
* code 500: internal server error
```
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
<br>

## <a id="showTodos"></a>GET /todos 
### *Show all todos from database*
### Request Body
``` 
Not needed   
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
    },
    {
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
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
    "error": {
        "code": 400,
        "message": "invalid input"
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
<br>

## <a id="patchTodosById"></a>PATCH /todos/:id
### *Edit a property of a todo object from the database*
### Parameters:
    Required:
    Todo Id <integer>
### Request Body
``` 
{
    "title": <string>
}    
```
OR
``` 
{
    "description": <string>
}    
```
OR
``` 
{
    "status": <string>
}    
```
OR
``` 
{
    "date": <date>
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
    "error": {
        "code": 400,
        "message": "invalid input"
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
### Responses:
* code 200: Successful operation.  
{
    "message": "a todo was deleted"
}
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


