Access the API via `http://localhost:3000/`




# POST `/users/register

**url** : '//localhost:3000/users/register'
```json
body: {
    "email": "<your-email",
    "password": "your-password"
}
```
## Succes Response
```json
response :{
    "id": <id>,
    "email": "<your-email>",
    "password": "<your-password>",
    "updatedAt": "2021-02-02T15:23:15.901Z",
    "createdAt": "2021-02-02T15:23:15.901Z"
}
```

## Error Response
```json
response :{
    "error": "Email already exist"
}
```

# POST /users/login

**url** : '//localhost:3000/users/login'
```json
body: {
    "email": "<your-email",
    "password": "your-password"
}
```

## Succes Response
```json
response :{
    "acces_token": "<your-accses-token>"
}
```

## Error Response
```json
response :{
    "error": "invalid email or password"
}
```

# POST  `/todos/`

**url** : '//localhost:3000/todos/'
**headers** :{token}

```json
body : {
    title : "Title",
    description :  "Description",
    status:false,
    due_date : 2021-1-1
}
response:{
    "id": 5,
    "title": "title",
    "descriiption": "description",
    "status": false,
    "due_date": "2021-01-01",
    "updatedAt": "2021-02-01T15:18:44.808Z",
    "createdAt": "2021-02-01T15:18:44.808Z"
}
```

# GET  ``/todos/``

**url** : '//localhost:3000/todos/',
**headers** :{token}

```json
response : [
     {
    "quote": {
        "_id": "<id>",
        "tags": [
            "<tag>"
        ],
        "content": "<content quote>",
        "author": "<name author>",
        "length": "integer"
    },
    "todos": [
        {
            "id": "<id>",
            "title": "<titile>",
            "description": "<description>",
            "status": "boolean",
            "due_date": "<date>",
            "createdAt": "2021-02-06T06:51:47.331Z",
            "updatedAt": "2021-02-06T09:42:33.821Z",
            "UserId": "<user id>"
        }
    ]
}
]
```



# GET `/todos/{id}`

**url** : '//localhost:3000/todos/5',
**headers** :{token}
```json
response : {
    "id": 5,
    "title": "title",
    "descriiption": "description",
    "status": false,
    "due_date": "2021-01-01",
    "createdAt": "2021-02-01T15:18:44.808Z",
    "updatedAt": "2021-02-01T15:18:44.808Z"
}
```

# PUT  `/todos/{id}`

```json
response : {
    "message": "Successfully update Todos "
}
```

# PATCH `/todos/{id}`

```json
body : {
    status:true
}
response:{
    "id": 5,
    "title": "inih di ganti",
    "descriiption": "gati lah",
    "status": true,
    "due_date": "2021-01-01",
    "createdAt": "2021-02-01T15:18:44.808Z",
    "updatedAt": "2021-02-01T15:29:41.874Z"
}
```

# Error Response
------

- ##### 400

  ```
  {
  	err:'Invalid Token'
  }
  ```

- ##### 403

  ```
  {
  	err:'cannot accses this todo'
  }
  ```

- ##### 404

  ```
  {
  	err : "not found"
  }
  ```

  

- ##### 500

  ```
  {
  	err : 'Internal Sever Error'
  }
  ```