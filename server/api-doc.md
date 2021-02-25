# TODOS APP ENDPOINT

# FITUR TODO

# 1. POST /todos
```
add todo data, Dimana setelah proses add app akan menampilkan referensi artikel yang didapat dari wikipedia
```

- ## REQUEST HEADER

```js
    token = '<token>'
```

- ## REQUEST BODY

```js
- title = "string"
- description = "string"
- status = "boolean"
- due_date = "string"
```

- ## RESPONSE 201

```js
{
    
    "addedTodo": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "boolean",
        "due_date": "string",
        "UserId": "integer",
        "updatedAt": "string",
        "createdAt": "string"
    },
    "references": [
        {
            "ns": "integer",
            "title": "string",
            "pageid": "integer",
            "size": "integer",
            "wordcount": "integer",
            "snippet": "string",
            "timestamp": "string"
        }
    ]
    
}

```

- ## ERROR RESPONSE

```
- 400 Validation error
- 401 Unauthorized 
- 500 Internal Server Error
```
# 2.GET /todos

Menampilkan seluruh data todo

- ## REQUEST HEADER

```js

    token = '<token>'

```
- ## REQUEST BODY

tidak dibutuhkan

- ## RESPONSE 200

```js

[
    {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "boolean",
        "due_date": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "boolean",
        "due_date": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
]

```

- ## ERROR RESPONSE
```
- 401 Unauthorized 
- 500 Internal Server Error
```

# 3. GET /todos/:id

Menampilkan data todo berdasarkan id,
:id digunakan sebagai params id yang akan ditampilkan.

- ## REQUEST HEADER

```js
    token = '<token>'
```

- ## REQUEST BODY

tidak dibutuhkan

- ## RESPONSE 200

```js
{
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "boolean",
    "due_date": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

- ## ERROR RESPONSE
```
- 404 error not found
- 401 Unauthorized 
- 500 internal server error
```
# 4. PUT /todos/:id

Melakukan perubahan data todo berdasarkan id yang dipilih,
:id digunakan sebagai params id mana yang akan diubah datanya.

- ## REQUEST HEADER

```js
    token = '<token>'
```

- ## REQUEST BODY
```js
- title = "string"
- description = "string"
- status = "string"
- due_date = "string"
```
- ## RESPONSE 200

```js
{
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "boolean",
    "due_date": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

- ## ERROR RESPONSE

```
- 400 validation error
- 404 error not found
- 401 Unauthorized 
- 500 internal server error
```

# 5. PATCH /todos/:id

Melakukan perubahan status todo berdasarkan id yang dipilih,
:id digunakan sebagai params id mana yang akan diubah statusnya.

- ## REQUEST HEADER

```js
    token = '<token>'
```

- ## REQUEST BODY
```js
- status = 'false'
```
- ## RESPONSE 200

```js
{
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "boolean",
    "due_date": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

- ## ERROR RESPONSE
```
- 400 validation error
- 404 error not found
- 401 Unauthorized 
- 500 internal server error
```
# 6. DELETE /todo/:id

menghapus data todo berdasarkan id yang dipilih.
:id digunakan sebagai params data dengan id mana yang akan dihapus.

- ## REQUEST HEADER

```js
    token = '<token>'
```

- ## REQUEST BODY

tidak dibutuhkan

- ## RESPONSE 200

```js
{
    message: "todo succes to delete"
}
```

- ## ERROR RESPONSE
```
- 404 error not found
- 401 Unauthorized 
- 500 internal server error
```

# FITUR USER

# 1. POST /users/register

register new user

- ## REQUEST HEADER

tidak dibutuhkan

- ## REQUEST BODY
```
- email = rizkicandra@ecampuz.com
- password = <your password>
```
- ## RESPONSE 201

```js
{
    "message": "string",
    "id": "integer",
    "email": "string"
}
```

- ## ERROR RESPONSE
```
- 400 uniqe email
- 500 internal server error
```

# 2. POST /users/login

login user

- ## REQUEST HEADER

tidak dibutuhkan

- ## REQUEST BODY

- email
- password

- ## RESPONSE 200

```js
{
    "access_token": "<token>"
}

```

- ## ERROR RESPONSE
```
- 400 Invalid email or password
- 500 internal server error
```

# 3. POST /users/googlelogin

login menggunakan akun google

- ## REQUEST HEADER

tidak dibutuhkan

- ## REQUEST BODY

id_token

- ## RESPONSE 201
```js
    {
        access_token: <accessToken>
    }
```
- ## ERROR RESPONSE
```
- 500 internal server error
```

# ERROR RESPONSE DETAIL

## 404 ERROR NOT FOUND

```js
{ 
    'message': "error not found"
}
```

## 400 BAD REQUEST

ERROR FOR UNIQUE DATA :
```js
{
    "message": [
        "email must be unique"
    ]
}
```

ERROR FOR INVALID EMAIL OR PASSWORD :

```js
{
    "message": [
        "Invalid email or password"
    ]
}
```
ERROR VALIDATION :

```js
{ 
    'message': "validation errors"
}
```

## 401 UNAUTHORIZED

ERROR AUTHENTICATE :

```js
{ 
    "message": "Invalid Token"
}
```

ERROR AUTHORIZE :

```js
{ 
    "message": "Not Authorized"
}
```

### -- 500 internal server error --

```js
{ 
    'message': "internal server error"
}
```