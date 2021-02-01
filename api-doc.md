# Fancy Todos
## 1. Create Todos 
## 2. Get Todos
## 3. Get Todos by Id
## 4. Put Todos by Id
## 5. Patch Todos by Id
## 6. Delete Todos by Id



### 1.1 POST /todos 
### *Create a todo object into database*
### Responses:
* code 201: success operation will return the added object
``` 
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}    
```
* code 400: validation errors will return object of validation errors
```json
{
    "error": {
        "code": 400,
        "message": "invalid input"
    }
}
```
* code 500: internal server error
```json
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
### 1.2 GET /todos 
### *Show all todo's from database*
### Responses:
* code 200: success operation will return array of objects from todo's
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
* code 500: internal server error
```json
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
### 1.3 GET /todos/:id 
### *Show a todo object with the corresponding id from the database*
### Responses:
* code 200: success operation will return object of the corresponding id
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}    
```
* code 404: corresponding id is not found
```json
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
### 1.4 PUT /todos/:id
### *Edit a todo object from the database*
### Responses:
* code 200: success operation will return the updated object
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}   
```
* code 400: validation errors will return object of validation errors
```json
{
    "error": {
        "code": 400,
        "message": "invalid input"
    }
}
```
* code 404: corresponding id is not found
```json
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: internal server error
```json
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
### 1.5 PATCH /todos/:id
### *Edit a property of a todo object from the database*
### Responses:
* code 200: success operation will return the updated object
```
{
    "title": <string>,
    "description": <string>,
    "status": <string>,
    "due_date": <date>
}   
```
* code 400: validation errors will return object of validation errors
```json
{
    "error": {
        "code": 400,
        "message": "invalid input"
    }
}
```
* code 404: corresponding id is not found
```json
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: internal server error
```json
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```
### 1.6 DELETE /todos/:id
### *Delete a todo object from a database*
### Responses:
* code 200: deletion of an object is success
{
    "message": "a todo was deleted"
}
* code 404: corresponding id is not found
```json
{
    "error": {
        "code": 404,
        "message": "id was not found"
    }
}
```
* code 500: internal server error
```json
{
    "error": {
        "code": 500,
        "message": "internal server"
    }
}
```


