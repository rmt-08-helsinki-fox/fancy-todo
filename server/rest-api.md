# Fancy Todo

## Todo

- /todo (get)


untuk mendapatkan semua list dari todo di DB

**success response**
200 status response OK
```javascript
[
    {
        "id": 1,
        "title": "mandi",
        "description": "mandi di toilet",
        "status": false,
        "due_date": given,
        "createdAt": given,
        "updatedAt": given
    }
}
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

- /todo (post)

create todo baru

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
  id: given
  title: "makan"
  description: "makan nasi uduk"
  due_date: 02-02-2021
  createdAt: given
  updatedAt: given
```
**error responses**

validation error, 400 status code

```javascript
"description cannot be empty!"
```

internal server error, 500 status code
<br>

- /todo/:id (get)

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

update semua field ke database

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
"description cannot be empty!"
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

ubah status dari true menjadi false dan sebaliknya

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

validation error, 400 status code

```javascript
"description cannot be empty!"
```

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

- /user/register

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
    "password": "$2a$10$Xns3I0AtP.GgdYSAbI0SIOCNfQDrjmb1VyzEQx/L8m.BN3WRkk0g.",
    "updatedAt": "2021-02-01T16:05:47.950Z",
    "createdAt": "2021-02-01T16:05:47.950Z"
}
```
**error responses**

400 status code

validation error:
```javascript
"email cannot be empty!"
```

500 status code internal server error

- /user/login


required: 
```javascript
email=[string]
password=[string]
```

**success response**

200 status code ok

```javascript
{
    "acces_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3dWh1QG1haWwuY29tIiwiaWF0IjoxNjEyMTk1ODAzfQ.D9JOrkcxLPREgmE4IUNKCZPie7w5jNpeGMX0uxMKis0"
}
```

**error responses**

jika password/email salah atau tidak diisi:
```javascript
{
    "error": "invalid email or password!"
}
```




