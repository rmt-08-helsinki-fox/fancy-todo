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
- title = 'Membuat landing page'
- description = 'Buat sesuai arahan PM'
- status = true
- due_date = '2021-02-20'
```

- ## RESPONSE 201

```js
{
    
    "addedTodo": {
        "id": 10,
        "title": "Membuat landing page",
        "description": "Buat sesuai arahan PM",
        "status": true,
        "due_date": "2021-02-20T00:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2021-02-03T00:06:45.792Z",
        "createdAt": "2021-02-03T00:06:45.792Z"
    },
    "references": [
        {
            "ns": 0,
            "title": "Lockheed L-1011 TriStar",
            "pageid": 837495,
            "size": 4318,
            "wordcount": 371,
            "snippet": "<span class=\"searchmatch\">landing</span> pada masanya L-1011-1, model pertama L-1011-100 L-1011-50 L-1011-150 L-1011-200 L-1011-250 L-1011-500, model terakhir, paling banyak <span class=\"searchmatch\">dibuat</span> Birtles",
            "timestamp": "2017-11-24T13:11:35Z"
        }
    ]
    
}

```

- ## ERROR RESPONSE

```
- 400 Validation error
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
        "id": 2,
        "title": "CRUD",
        "description": "Membuat crud to do",
        "status": false,
        "due_date": "2021-04-21T00:00:00.000Z",
        "createdAt": "2021-02-01T09:44:45.414Z",
        "updatedAt": "2021-02-01T13:55:36.894Z"
    },
    {
        "id": 3,
        "title": "movie todo",
        "description": "membuat app movie",
        "status": true,
        "due_date": "2021-03-01T00:00:00.000Z",
        "createdAt": "2021-02-01T14:04:09.605Z",
        "updatedAt": "2021-02-01T14:04:09.605Z"
    }
]

```

- ## ERROR RESPONSE
```
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
    "id": 1,
    "title": "Chelsea Fc",
    "description": "Membuat team sepak bola",
    "status": true,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-01T09:43:15.767Z",
    "updatedAt": "2021-02-01T15:28:19.312Z"
}
```

- ## ERROR RESPONSE
```
- 404 error not found
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
- title = 'Chelsea Fc'
- description = 'Membuat team sepak bola'
- status = 'true'
- due_date = '2021-02-03'
```
- ## RESPONSE 200

```js
{
    "id": 2,
    "title": "Chelsea Fc",
    "description": "Membuat team sepak bola",
    "status": true,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-01T09:44:45.414Z",
    "updatedAt": "2021-02-02T00:38:22.225Z"
}
```

- ## ERROR RESPONSE

```
- 400 validation error
- 404 error not found
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
    "id": 2,
    "title": "Chelsea Fc",
    "description": "Membuat team sepak bola",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-01T09:44:45.414Z",
    "updatedAt": "2021-02-02T00:41:01.710Z"
}
```

- ## ERROR RESPONSE
```
- 400 validation error
- 404 error not found
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
    "message": "Register success",
    "id": 7,
    "email": "rizkicandra@ecampuz.com"
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

### -- 500 internal server error --

```js
{ 
    'message': "internal server error"
}
```