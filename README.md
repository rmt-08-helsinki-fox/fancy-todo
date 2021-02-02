# fancy-todo
fancy todo is an application to create the new activity that you want to do. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

## endpoint fancy todo
### POST /todos

> Create New Activity

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<what do you want to do?>",
  "description": "<describe your activity>",
  "status": <done or not? (true/false)>,
  "due_date": <deadline (yyyy-mm-dd)>
}
```

_Response (201)_
```

{
    "id": 11,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": <todo status>,
    "due_date": "<todo deadline>",
    "updatedAt": "2021-02-01T11:51:50.252Z",
    "createdAt": "2021-02-01T11:51:50.252Z"
}

```

_Response (404 - Invalid Request)_
```
{
  "message": "Invalid request"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Invalid request"
}
```
---
