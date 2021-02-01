# API Documentation

## GET /todos

* Response :
```
[
  {
    "id": 1,
    "title": "Ngoding",
    "description": "Belajar Javascript",
    "status": false,
    "due_date": "2021-01-03T00:00:00.000Z",
    "createdAt": "2021-02-01T05:53:05.549Z",
    "updatedAt": "2021-02-01T05:53:05.549Z"
  }
]
```

## POST /todo/:id

* Request Header :
```
{
  "Content-Type": "application/json"
}
```
* Request Body :
```
{
  "title": "ngodding",
  "description": "Belajar Javascript",
  "due_date": "2021-02-02"
}
```
* Response :
```
{
  "id": 11,
  "title": "ngodding",
  "description": "Belajar Javascript",
  "status": false,
  "due_date": "2021-02-02T00:00:00.000Z",
  "updatedAt": "2021-02-01T14:06:31.803Z",
  "createdAt": "2021-02-01T14:06:31.803Z"
}
```

## PUT /todos/:id

* Request Header :
```
{
  "Content-Type": "application/json"
}
```
* Request Body :
```
{
  "title": "ngodding",
  "description": "Belajar Javascript",
  "due_date": "2021-02-02"
}
```
* Response :
```
{
  "id": 11,
  "title": "ngodding",
  "description": "Belajar Javascript",
  "status": false,
  "due_date": "2021-02-02T00:00:00.000Z",
  "updatedAt": "2021-02-01T14:06:31.803Z",
  "createdAt": "2021-02-01T14:06:31.803Z"
}
```

## PATCH /todos/:id

* Request Header :
```
{
  "Content-Type": "application/json"
}
```
* Request Body :
```
{
  "status": true
}
```
* Response :
```
{
  "id": 1,
  "title": "hahaha",
  "description": "check",
  "status": true,
  "due_date": "2021-02-02T00:00:00.000Z",
  "createdAt": "2021-02-01T05:52:15.168Z",
  "updatedAt": "2021-02-01T14:16:40.744Z"
}
```

## DELETE /todos/:id

* Response :
```
{
  "message": "todo success to delete."
}
```