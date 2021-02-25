**fancy-todo**

# Show Todo List

Show all todo list

**URL** : `/todos`

**Method** : `GET`

**Headers** : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
}
```

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Authorize

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "data": [
        {
            "id": 1,
            "title": "baru1",
            "description": "ahoi",
            "status": true,
            "due_date": "2021-03-03T17:00:00.000Z",
            "UserId": 6,
            "createdAt": "2021-02-02T07:21:55.629Z",
            "updatedAt": "2021-02-02T07:21:55.629Z"
        },
        {
            "id": 2,
            "title": "baru1",
            "description": "ahoi",
            "status": true,
            "due_date": "2021-03-03T17:00:00.000Z",
            "UserId": null,
            "createdAt": "2021-02-02T08:20:55.643Z",
            "updatedAt": "2021-02-02T08:20:55.643Z"
        },
        {
            "id": 3,
            "title": "baru1",
            "description": "ahoi",
            "status": true,
            "due_date": "2021-03-03T17:00:00.000Z",
            "UserId": null,
            "createdAt": "2021-02-02T08:21:08.163Z",
            "updatedAt": "2021-02-02T08:21:08.163Z"
        },
        {
            "id": 4,
            "title": "test",
            "description": "ahoi",
            "status": true,
            "due_date": "2021-03-03T17:00:00.000Z",
            "UserId": null,
            "createdAt": "2021-02-02T08:24:02.378Z",
            "updatedAt": "2021-02-02T08:24:02.378Z"
        }
    ],
    "msg": "success"
}
```

## Error Response

**Code** : `401 Unauthorized`

**Content examples**

```json
{
    "msg": "Invalid Key"
}
```

**Code** : `500 Internal server Error`

**Content examples**

```json
{
    "msg": "Internal server Error"
}
```

**Code** : `401 Unauthorized` with no access_token

**Content examples**

```json
{
    "msg": "Please login/register first"
}
```


# Post Todo List

Post a todo to list

**URL** : `/todos`

**Headers** : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
}
```

**Data** : 

```json
{
    "title": "newJob",
    "description": "ahoi",
    "status": true,
    "due_date": "2021-03-03T17:00:00.000Z",
    "UserId": 1
}
```

**Method** : `POST`

**Auth required** : YES

**Permissions required** : Authorize

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "id": 4,
    "title": "newJob",
    "description": "ahoi",
    "status": true,
    "due_date": "2021-03-03T17:00:00.000Z",
    "updatedAt": "2021-02-02T08:24:02.378Z",
    "createdAt": "2021-02-02T08:24:02.378Z",
    "UserId": 1
}
```

## Error Response

**Code** : `500 Internal Server Error`

**Content examples**

```json
{
    "msg": "Internal Server Error" }
}
```

**Code** : `400 bad response`

**Content examples**

```json
{
    "msg": "Date must later than to this day" 
}
```

**Code** : `401 Unauthorized` with no access_token

**Content examples**

```json
{
    "msg": "Please login/register first" 
}
```

# Find post Todo by Id

Find a todo from list by Id

**URL** : `/todos/:id`

**Params** : `id`

**Headers** : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
}
```

**Data** : 

```json
{
    "TodosId": 1
}
```

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Authorize (isAdmin)

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "id": 3,
    "title": "baru1",
    "description": "ahoi",
    "status": true,
    "due_date": "2021-03-03T17:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-02-02T08:21:08.163Z",
    "updatedAt": "2021-02-02T08:21:08.163Z"
}
```

## Error Response

**Code** : `404 bad response`

**Content examples**

```json
{
    "msg": "Data not found"
}
```

**Code** : `500 Internal server error`

**Content examples**

```json
{
    "msg": "Internal server error"
}
```

**Code** : `401 Unauthorized`

**Content examples**

```json
{
    "msg": "Invalid key"
}
```

# Edit post Todo by Id

Edit a todo from list by Id

**URL** : `/todos/:id`

**Method** : `PUT`

**Params** : `id`

**Headers** : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
}
```

**Data** : 

```json
{
    "title": "edit",
    "description": "edit",
    "status": "false",
    "due_date": "2021-4-1"
}
```

**Auth required** : YES

**Permissions required** : Authorize (isAdmin)

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "title": "edit",
    "description": "edit",
    "status": "false",
    "due_date": "2021-4-1"
}
```

## Error Response

**Code** : `400 bad response`

**Content examples**

```json
{
    "msg": "Date must later than to this day"
}
```

**Code** : `500 bad response`

**Content examples**

```json
{
    "msg": "Internal server error"
}
```

**Code** : `401 Unauthorized`

**Content examples**

```json
{
    "msg": "Invalid key"
}
```

# Edit status post's Todo by Id

Edit a status todo's from list by Id

**URL** : `/todos/:id`

**Method** : `PATCH`

**Params** : `id`

**Headers** : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
}
```

**Data** : 

```json
{
    "status": "false"
}
```

**Auth required** : YES

**Permissions required** : Authorize (isAdmin)

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "msg": "Success edit"
}
```

## Error Response

**Code** : `400 bad response`

**Content examples**

```json
{
    "msg": "Must boolean"
}
```

**Code** : `500 internal server error`

**Content examples**

```json
{
    "msg": "Internal server error"
}
```

**Code** : `401 Unauthorized` with no access_token

**Content examples**

```json
{
    "msg": "Please login/register first"
}
```

# Delete a post Todo by Id

Delete a todo from list by Id

**URL** : `/todos/:id`

**Method** : `DELETE`

**Params** : `id`

**Auth required** : YES

**Permissions required** : Authorize (isAdmin)

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "msg": "todo success to delete"
}
```

## Error Response

**Code** : `404 bad response`

**Content examples**

```json
{
    "msg": "Data not found"
}
```

**Code** : `500 internal server error`

**Content examples**

```json
{
    "msg": "Internal server error"
}
```

**Code** : `401 Unauthorized` with no access_token

**Content examples**

```json
{
    "msg": "Please login/register first"
}
```

