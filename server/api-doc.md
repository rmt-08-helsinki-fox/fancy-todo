# Fancy Todo

## Task

### Add Task
> Create new task

- **URL** : `/todos`
- **Method** : `GET`
- **Data Params** :
  - Required : `title`, `due_date`
  - Optional : `description`

_Request Header_
```

```

_Request Body_
```
{
    "title": "<title-task>",
    "description": "<task-description>",
    "status": <false/true>
    "due_date": "YYYY-MM-DD" 
}
```

- **Success Response**
_Response(201)_
```
{
    "title": "beli makan kucing",
    "description": "cat choize kitten",
    "status": false,
    "due_date": "2021-02-05" 
}
```

