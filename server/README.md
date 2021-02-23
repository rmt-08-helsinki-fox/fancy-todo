# API Documentation

## GET /todos

* Response :
  - 200 OK
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
  - 404 Not Found
  ```
  []
  ```
  - 500 Internal Server Error
  ```
  {
    "error": "Internal server error"
  }
  ```


## POST /todo

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

- 201 OK

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
   - 400 Bad Request
  ```
  {
    "error": "invalid input syntax for type timestamp with time zone: \"Invalid date\""
  }
  ```
  - 500 Internal Server Error
  ```
  {
    "error": "Internal server error"
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
  - 200 OK
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
  - 400 Bad Request
  ```
  {
    "error": "column \"nan\" does not exist"
  }
  ```
  - 404 Not Found
  ```
  []
  ```
  - 500 Internal Server Error
  ```
  {
    "error": "Internal server error"
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
  - 200 OK
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
  - 400 Bad Request
  ```
  {
    "error": "invalid input syntax for type boolean: \"trues\""
}
  ```
  - 404 Not Found
  ```
  []
  ```
  - 500 Internal Server Error
  ```
  {
    "error": "Internal server error"
  }
  ```


## DELETE /todos/:id

* Response :
  - 200 OK
  ```
  {
    "message": "todo success to delete."
  }
  ```
  - 400 Bad Request
  ```
  {
    "error": "column \"nan\" does not exist"
  }
  ```
  - 404 Not Found
  ```
  []
  ```
  - 500 Internal Server Error
  ```
  {
    "error": "Internal server error"
  }
  ```