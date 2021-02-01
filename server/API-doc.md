## RESTful endpoints
### 1. POST /todos

> Create new todo

* **Request Header :**
``` 
NONE
```

* **Request Body :**

```json
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "duedate": "<date to get insert into>"
}
```

* **Response (201 - Created) :**
```json
{
    "id": 7,
    "title": "bacaaaaaaaaaaaa",
    "description": "baca dokumentasi, belajar cara baca dokumentasi",
    "duedate": "2021-02-01T17:00:00.000Z",
    "updatedAt": "2021-02-01T15:48:46.932Z",
    "createdAt": "2021-02-01T15:48:46.932Z",
    "status": false
}
```

* **Response (400 - ValidationError) :**
```json
[
    {
        "message": "Tanggal tidak boleh kosong",
        "type": "Validation error",
        "path": "duedate",
        "value": "",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "test",
            "description": "test",
            "duedate": "",
            "updatedAt": "2021-02-01T15:54:04.005Z",
            "createdAt": "2021-02-01T15:54:04.005Z"
        },
        "validatorKey": "notEmpty",
        "validatorName": "notEmpty",
        "validatorArgs": [
            true
        ],
        "original": {
            "validatorName": "notEmpty",
            "validatorArgs": [
                true
            ]
        }
    }
]
```

## 2. GET /todos

> Show all todos

* **Request Header :**
```
NONE
```

* **Request Body :**
```
NONE
```

* **Response (200) :**
```json
[
    {
        "id": 6,
        "title": "belajar, jangan ketinggalan terus",
        "description": "baca dokumentasi, belajar cara baca dokumentasi",
        "status": false,
        "duedate": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:35:16.986Z",
        "updatedAt": "2021-02-01T15:35:16.986Z"
    },
    {
        "id": 5,
        "title": "belajar yang lain lagi ya",
        "description": "baca dokumentasi",
        "status": true,
        "duedate": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T12:52:00.282Z",
        "updatedAt": "2021-02-01T15:36:23.306Z"
    },
    {
        "id": 7,
        "title": "bacaaaaaaaaaaaa",
        "description": "baca dokumentasi, belajar cara baca dokumentasi",
        "status": false,
        "duedate": "2021-02-01T17:00:00.000Z",
        "createdAt": "2021-02-01T15:48:46.932Z",
        "updatedAt": "2021-02-01T15:48:46.932Z"
    }
]
```

* **Response (500) :**
```

```

## 3. GET /todos/:id

* **Request Header :**
```
NONE
```

* **Request Body :**
```
NONE
```

* **Request Params :**
```
id = <INTEGER>
```

* **Response (200) :**
```json
{
    "id": 6,
    "title": "belajar, jangan ketinggalan terus",
    "description": "baca dokumentasi, belajar cara baca dokumentasi",
    "status": false,
    "duedate": "2021-02-01T17:00:00.000Z",
    "createdAt": "2021-02-01T15:35:16.986Z",
    "updatedAt": "2021-02-01T15:35:16.986Z"
}
```

* **Response (404) :**
```json
{
    "error": "not found"
}
```


## 4. PUT /todos/:id

* **Request Header :**
```
NONE
```

* **Request Body :**
```json
{
  "title": "<name to get insert into that has been updated>",
  "description": "<description to get insert into that has been updated>",
  "status": "<status to get insert into that has been updated>",
  "duedate": "<date to get insert into that has been updated>"
}
```

* **Response (200) :**
```json
{
    "id": 6,
    "title": "belajar, jangan ketinggalan terus",
    "description": "baca dokumentasi, belajar cara baca dokumentasi",
    "status": false,
    "duedate": "2021-02-01T17:00:00.000Z",
    "createdAt": "2021-02-01T15:35:16.986Z",
    "updatedAt": "2021-02-01T15:35:16.986Z"
}
```

* **Response (400 - ValidationError) :**
```json
[
    {
        "message": "Tanggal tidak boleh kosong",
        "type": "Validation error",
        "path": "duedate",
        "value": "",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "test",
            "description": "test",
            "duedate": "",
            "updatedAt": "2021-02-01T15:54:04.005Z",
            "createdAt": "2021-02-01T15:54:04.005Z"
        },
        "validatorKey": "notEmpty",
        "validatorName": "notEmpty",
        "validatorArgs": [
            true
        ],
        "original": {
            "validatorName": "notEmpty",
            "validatorArgs": [
                true
            ]
        }
    }
]
```

* **Response (404) :**
```json
{
    "error": "not found"
}
```

* **Response (500) :**
```json

```

## 5. PATCH /todos/:id

* **Request Header :**
```
NONE
```

* **Request Body :**
```javascript
{ status: 'true' }
```

* **Response (200) :**
```json
{
    "id": 5,
    "title": "belajar yang lain lagi ya",
    "description": "baca dokumentasi",
    "status": true,
    "duedate": "2021-02-01T17:00:00.000Z",
    "createdAt": "2021-02-01T12:52:00.282Z",
    "updatedAt": "2021-02-01T16:29:10.976Z"
}
```

* **Response (400) :**
```json
{
    "message": "Status tidak boleh kosong",
    "type": "Validation error",
    "path": "status",
    "value": "",
    "origin": "FUNCTION",
    "instance": {
        "id": null,
        "status": "",
        "updatedAt": "2021-02-01T16:30:56.926Z"
    },
    "validatorKey": "notEmpty",
    "validatorName": "notEmpty",
    "validatorArgs": [
        true
    ],
    "original": {
        "validatorName": "notEmpty",
        "validatorArgs": [
            true
        ]
    }
}
```

* **Response (404) :**
```json
{
    "error": "not found"
}
```

* **Response (500) :**
```

```

## 6. DELETE /todos/:id

* **Request Header :**
```
NONE
```

* **Request Body :**
```
NONE
```

* **Request Params :**
```
id = <INTEGER>
```

* **Response (200) :**
```json
{
    "message": "todo berhasil dihapus"
}
```

* **Response (400) :**
```json
{
    "error": "not found"
}
```

* **Response (500) :**
```

```



