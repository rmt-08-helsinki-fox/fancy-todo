# Fancy Todos
## 1. Create Todos >>> buat link ke 1.1 cari link markdown link to a fragment!
## 2. Get Todos

## 1. Todo's
### 1.1 POST /todos 
### *Create a todo object into database*
### Responses:
* code 201: success operation will return the added object
``` (json, js, <>)
{
    "title": <string>,
    description: string,
    status: string,
    due_date: date
}    
```
* code 400: validation errors will return object of validation errors
```json >>> type:(400)m msg:{} 
{
    error1: invalid title,
    error2: invalid description,
    error2: invalid description,
}
```
* code 500: internal server error
### 1.2 GET /todos 
### *Show todo list*
### Responses:
* code 200: success operation will return array of objects from todo's
```javascript
[
    {
        title: string,
        description: string,
        status: string,
        dueDate: date       >>>>camel case soalnya js
    },
    {
        title: string,
        description: string,
        status: string,
        due_date: date
    },
    {...} 
]
```
* code 500: internal server error
### 1.3 GET /todos/:id 
### *Show a todo activity with corresponding id's*
### Responses:
* code 200: success operation will return object of the corresponding id
```javascript
{
    title: string,
    description: string,
    status: string,
    due_date: date
}    
```
* code 404: corresponding id is not found
### 1.4 PUT /todos/:id
### *Edit a todo activity*
### Responses:
* code 200: success operation will return the updated object
```javascript
{
    title: string,
    description: string,
    status: string,
    due_date: date
}    
```
* code 400: validation errors will return object of validation errors
```javascript
{
    error1: invalid title,
    error2: ...
}
```
* code 404: corresponding id is not found
* code 500: internal server error
### PATCH /todos/:id
### *Edit a todo activity*
### Responses:
* code 200: success operation will return the updated object
```javascript
{
    title: string,
    description: string,
    status: string,
    due_date: date
}    
```
* code 400: validation errors will return object of validation errors
```javascript
{
    error1: invalid title,
    error2: ...
}
```
* code 404: corresponding id is not found
* code 500: internal server error
### DELETE /todos/:id
### *Delete a todo list*
### Responses:
* code 200: return **"a todo is deleted"**
* code 404: corresponding id is not found
* code 500: internal server error


