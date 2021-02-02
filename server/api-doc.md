# TODOS APP ENDPOINT

## 1. POST /todos
```
add todo data
```

### -- Request Header --

Belum digunakan

### -- Request Body --

- title
- description
- status
- due_date

### -- Response 201 --

```js
{
    "id": 5,
    "title": null,
    "description": "Detail pekerjaan data 5",
    "status": true,
    "due_date": "2021-02-03T00:00:00.000Z",
    "updatedAt": "2021-02-02T00:25:07.957Z",
    "createdAt": "2021-02-02T00:25:07.957Z"
}

```

### -- Error Response --

- 400 Validation error
- 500 Internal Server Error


## 2.GET /todos

Menampilkan seluruh data todo

### -- Request Header --

belum digunakan

### -- Request Body --

tidak dibutuhkan

### -- Response 200 --

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

### -- Error Response --

- 500 Internal Server Error

## 3. GET /todos/:id

Menampilkan data todo berdasarkan id,
:id digunakan sebagai params id yang akan ditampilkan.

### -- Request Header --

belum digunakan

### -- Request Body --

tidak dibutuhkan

### -- Response 200 --

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

### -- Error Response --

- 404 error not found
- 500 internal server error

## 4. PUT /todos/:id

Melakukan perubahan data todo berdasarkan id yang dipilih,
:id digunakan sebagai params id mana yang akan diubah datanya.

### -- Request Header --

belum digunakan

### -- Request Body --

- title
- description
- status
- due_date

### -- Response 200 --

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

### -- Error Response --

- 400 validation error
- 404 error not found
- 500 internal server error

## 5. PATCH /todos/:id

Melakukan perubahan status todo berdasarkan id yang dipilih,
:id digunakan sebagai params id mana yang akan diubah statusnya.

### -- Request Header --

belum digunakan

### -- Request Body --

- status

### -- Response 200 --

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

### -- Error Response --

- 400 validation error
- 404 error not found
- 500 internal server error

## 6. DELETE /todo/:id

menghapus data todo berdasarkan id yang dipilih.
:id digunakan sebagai params data dengan id mana yang akan dihapus.

### -- Request Header --

belum digunakan

### -- Request Body --

tidak dibutuhkan

### -- Response 200 --

```js
{
    message: "todo succes to delete"
}
```

### -- Error Response --

- 404 error not found
- 500 internal server error


## ERROR RESPONSE DETAIL

### -- 404 Error not found --

```js
{ 
    message: "error not found"
}
```

### -- 400 validation error --

```js
{ 
    message: "validation errors"
}
```

### -- 500 internal server error --

Menampilkan message error dari server.