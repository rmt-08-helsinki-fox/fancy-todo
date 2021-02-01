# Fancy Todos
## 1. [Create Todos](#createTodos)
## 2. [Get Todos](#showTodos)
## 3. [Get Todos by Id](#showTodosById)
## 4. [Put Todos by Id](#putTodosById)
## 5. [Patch Todos by Id](#patchTodosById)
## 6. [Delete Todos by Id](#deleteTodos) 
<br>

### <a id="createTodos"></a>1.1 POST /todos
### *Create a todo object into database*
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
### <a id="showTodos"></a>1.2 GET /todos 
### *Show all todos from database*
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
### <a id="showTodosById"></a>1.3 GET /todos/:id 
### *Show a todo object with the corresponding id from the database*
### Parameters:
    Todo Id <integer>
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
* code 404: Corresponding id is not found
```
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
### <a id="putTodosById"></a>1.4 PUT /todos/:id
### *Edit a todo object from the database*
### Parameters:
    Todo Id <integer>
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
* code 404: Corresponding id is not found
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
### <a id="patchTodosById"></a>1.5 PATCH /todos/:id
### *Edit a property of a todo object from the database*
### Parameters:
    Todo Id <integer>
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
* code 404: Corresponding id is not found
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
###  <a id="deleteTodos"></a>1.6 DELETE /todos/:id 

### *Delete a todo object from a database*
### Parameters:
    Todo Id <integer>
### Responses:
* code 200: Successful operation.  
{
    "message": "a todo was deleted"
}
* code 404: Corresponding id is not found
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


