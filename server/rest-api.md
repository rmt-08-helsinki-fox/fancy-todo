# Fancy Todo

## Todo

- /todos (get)


hanya user yang ter <i>authenticate</i> yang bisa mendapatkan semua list dari todo di DB milik user ter <i>login</i> 

akan megenerate random quotes

**success response**
200 status response OK
```javascript
[
    {
        "_id": "1fFK-Xgvy5",
        "tags": [
            "friendship"
        ],
        "content": "There is no friendship, no love, like that of the parent for the child.",
        "author": "Henry Ward Beecher",
        "length": 71
    },
    [
        {
            "id": 1,
            "title": "makan temen",
            "description": "makan",
            "status": false,
            "due_date": "2021-02-05T00:00:00.000Z",
            "UserId": 1,
            "createdAt": "2021-02-01T06:36:14.789Z",
            "updatedAt": "2021-02-02T11:24:19.432Z"
        },
        {
            "id": 2,
            "title": "mandi",
            "description": "di kali",
            "status": true,
            "due_date": "2021-02-05T00:00:00.000Z",
            "UserId": 1,
            "createdAt": "2021-02-01T06:37:23.500Z",
            "updatedAt": "2021-02-02T11:25:20.536Z"
        },
    ]
]
```
**error responses**
<br>
404 todo not found!
```javascript
{
    "msg": "404 not found",
    "status": 404
}
```
<br>
<br>

- /todos (post)


hanya user yang ter <i>authenticate</i> yang bisa create todo baru

semua field required dan date tidak boleh melewati dari hari ini


required:
```javascirpt
  title=[string]
  description=[string]
  status=[boolean]
  due_date=[date]
```

**success response**
201 status response created

input:
```javascript
  "id": "<given>"
  "title": "<given>"
  "description": "<given>"
  "due_date": "<given>"
  "createdAt": "<given>"
  "updatedAt": "<given>"
```
**error responses**

validation error, 400 status code

```javascript
"title cannot be empty!"
"description cannot be empty!"
"due date cannot be empty!"
```

internal server error, 500 status code
<br>

- /todos/:id (get)

hanya user yang ter <i>authenticate</i> dan ter <i>authorize</i> yang bisa mencari todo milik mereka sendiri (findone, untuk diedit)

required:
```javascript
id=[integer]
```
**success response**
200 status code OK
```javascript

{
"id": 2,
"title": "mandi",
"description": "pake sabun",
"status": true,
"due_date": "2021-02-02T00:00:00.000Z",
"createdAt": "2021-02-01T06:37:23.500Z",
"updatedAt": "2021-02-01T11:05:31.912Z"
}

```

- /todo/:id (put)

hanya user yang ter <i>authenticate</i> dan ter <i>authorize</i> yang bisa update semua field ke database

required:
```javascirpt
  title=[string]
  description=[string]
  status=[boolean]
  due_date=[date]
```

**success response**

200 status code ok

```javascript
{
    "id": 2,
    "title": "mandi",
    "description": "pake sabun",
    "status": true,
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T06:37:23.500Z",
    "updatedAt": "2021-02-01T11:05:31.912Z"
}
```

**error responses**

validation error, 400 status code

```javascript
"title cannot be empty!"
"description cannot be empty!"
"due date cannot be empty!"
```

validation error, 404 status code

404 todo not found!
```javascript
{
    "msg": "404 not found",
    "status": 404
}
```


- /todos/:id (patch)

hanya user yang ter <i>authenticate</i> dan ter <i>authorize</i> yang bisa mengubah status todo milik merkeka sendiri, dari true menjadi false dan sebaliknya

required:
```javascirpt
  status=[boolean]
```
**success response**

200 status code ok

```javascript
{
    "id": 2,
    "title": "mandi",
    "description": "pake sabun",
    "status": true,
    "due_date": "2021-02-02T00:00:00.000Z",
    "createdAt": "2021-02-01T06:37:23.500Z",
    "updatedAt": "2021-02-01T11:05:31.912Z"
}
```

**error responses**

validation error, 404 status code

404 todo not found!
```javascript
{
    "msg": "404 not found",
    "status": 404
}
```
internal server error, 500 status code
<br>

- /todos/:id (delete)

hanya user yang ter <i>authenticate</i> dan ter <i>authorize</i> yang bisa men delete todo milik mereka sendiri

required:
```javascript
id=[integer]
```
menghapus 1 todo(row) di db

200 success deleted

```javascript
{
    "msg": "todo success to delete"
}
```

**error responses**

404 not found!
```javascript
{
    "msg": "404 not found",
    "status": 404
}
```

## user login dan register

- /user/register  (POST)

required: 
```javascript
email=[string]
password=[string]
```

validation: 
email and password must be filed & 
email must be unique

password akan automatis ter <i>hash</i>

**success response**

201 status code created

```javascript
{
    "id": 4,
    "email": "new@mail.com",
}
```
**error responses**

400 status code

validation error:
```javascript
"email cannot be empty!"
"Please enter at least 6 characters password"
```

500 status code internal server error

- /user/login  (POST)


required: 
```javascript
email=[string]
password=[string]
```

**success response**

200 status code ok

user yang login akan memiliki token yang unik

```javascript
{
    "acces_token": "<token>"
}
```

**error responses**

jika password/email salah atau tidak diisi:
```javascript
{
    "error": "invalid email or password!"
}
```



- /user/googleLogin (POST)

required: 
```javascript
google account
```
akan automatis google login dengan accouont google dari user

password akan automatis ter <i>hash</i>

**success response**

jika belum memiliki account maka akan automatis dibuat account dan kemudian akan login

201 status code created


```javascript
{
    "id": 4,
    "email": "new@mail.com",
}
```

jika sudah memiliki account akan login

200 status code ok

user yang login akan memiliki token yang unik

```javascript
{
    "token": "<token>"
}
```


**error responses**


500 status code internal server error


