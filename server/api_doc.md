### GET http://localhost:3000/todos

> Get all todo list

_Request Headers_
```
{
  "Content-Type": "json"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "learn REST_API 2",
    "description": "how to create REST_API 2",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T00:08:32.134Z",
    "updatedAt": "2021-02-02T04:02:56.271Z"
  },
  {
    "id": 4,
    "title": "Learn Javascript",
    "description": "how to create Javascript",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:20.235Z",
    "updatedAt": "2021-02-02T04:38:09.399Z"
  },
  {
    "id": 5,
    "title": "Learn CSS",
    "description": "how to create CSS",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:22.168Z",
    "updatedAt": "2021-02-02T04:38:43.329Z"
  },
  {
    "id": 6,
    "title": "Learn HTML",
    "description": "how to create HTML",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:23.258Z",
    "updatedAt": "2021-02-02T04:39:00.053Z"
  }
]
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST http://localhost:3000/todos

> Create new todo

_Request Headers_
```
{
    "Content-Type": "json"
}
```

_Request Body_
```
{
  "title": "Learn Javascript",
  "description": "how to create javascripte",
  "status": "false",
  "due_date": "2021/02/03",
}
```

_Response (201 - Created)_
```
  {
    "id": 4,
    "title": "Learn Javascript",
    "description": "how to create Javascript",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:20.235Z",
    "updatedAt": "2021-02-02T04:38:09.399Z"
  }
```

_Response (400 - Bad Request)_
```
{
    "message": [
      "Status must filled by true/false",
      "title is required field",
      "description is required field",
      "Cannot enter a date that has passed"
    ]
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET http://localhost:3000/todos/:id

> Get todo by id

_Request Headers_
```
{
    "Content-Type": "json"
}
```

_Request Params_
```
id = [integer]
```

_Response (200 - OK)_
```
  {
    "id": 4,
    "title": "Learn Javascript",
    "description": "how to create Javascript",
    "status": false,
    "due_date": "2021-02-03T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:20.235Z",
    "updatedAt": "2021-02-02T04:38:09.399Z"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT http://localhost:3000/todos/:id

> Edit todo value

_Request Headers_
```
{
    "Content-Type": "json"
}
```

_Request Params_
```
id = [integer]
```

_Request Body_
```
{
  "title": "Learn Javascript OOP",
  "description": "how to create OOP",
  "status": "false",
  "due_date": ""2021-02-04"",
}
```

_Response (200 - OK)_
```
  {
    "id": 4,
    "title": "Learn Javascript OOP",
    "description": "how to create OOP",
    "status": false,
    "due_date": "2021-02-04T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:20.235Z",
    "updatedAt": "2021-02-02T04:38:09.399Z"
  }
```

_Response (400 - Bad Request)_
```
{
    "message": [
      "Status must filled by true/false",
      "title is required field",
      "description is required field",
      "Cannot enter a date that has passed"
    ]
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### PATCH http://localhost:3000/todos/:id

> Edit todo value

_Request Headers_
```
{
    "Content-Type": "json"
}
```

_Request Params_
```
id = [integer]
```

_Request Body_
```
{
  "status": "true",
}
```

_Response (200 - OK)_
```
  {
    "id": 4,
    "title": "Learn Javascript OOP",
    "description": "how to create OOP",
    "status": "true",
    "due_date": "2021-02-04T00:00:00.000Z",
    "createdAt": "2021-02-02T04:13:20.235Z",
    "updatedAt": "2021-02-02T04:38:09.399Z"
  }
```

_Response (400 - Bad Request)_
```
{
    "message": "Status must filled by true/false"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE http://localhost:3000/todos/:id

> Delete todo value

_Request Headers_
```
{
    "Content-Type": "json"
}
```

_Request Params_
```
id = [integer]
```

_Request Body_
```
not nedeed
```

_Response (200 - OK)_
```
  {
    "message": "Todo success to deleted"
  }
```

_Response (400 - Bad Request)_
```
{
    "message": "Status must filled by true/false"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---