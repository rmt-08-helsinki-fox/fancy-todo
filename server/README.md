Access the API via `http://localhost:3000/`






##### POST  `/todos/`

```json
url : '//localhost:3000/todos/',
body : {
    title : 'Title',
    description : ' Description',
    status:'false'
    due_date : '2021-1-1'
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

##### GET  `/todos/`

```json
url : '//localhost:3000/todos/',
response : [
     {
        "id": 5,
        "title": "title",
        "descriiption": "description",
        "status": false,
        "due_date": "2021-01-01",
        "createdAt": "2021-02-01T15:18:44.808Z",
        "updatedAt": "2021-02-01T15:18:44.808Z"
    }
]
```



##### GET `/todos/{id}`

```json
url : '//localhost:3000/todos/5',
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

##### PUT  `/todos/{id}`

```json
response : {
    "message": "Successfully update Todos "
}
```

##### PATCH `/todos/{id}`

```json
body : {
    status:'true'
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