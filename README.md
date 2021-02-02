**fancy-todo**

# Show Todo List

Show all todo list

**URL** : `/todos`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

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
            "title": "testanjay",
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

# Post Todo List

Post a todo to list

**URL** : `/todos`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

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
    "UserId": null
}
```

# Find post Todo by Id

Find a todo from list by Id

**URL** : `/todos/:id`

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
    "UserId": null,
    "createdAt": "2021-02-02T08:21:08.163Z",
    "updatedAt": "2021-02-02T08:21:08.163Z"
}
```

# Edit post Todo by Id

Edit a todo from list by Id

**URL** : `/todos/:id`

**Method** : `PUT`

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

# Edit status post's Todo by Id

Edit a status todo's from list by Id

**URL** : `/todos/:id`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : Authorize (isAdmin)

## Success Response

**Code** : `200 OK`

**Content examples**

```json
[
    1 //success
]
```

# Delete a post Todo by Id

Delete a todo from list by Id

**URL** : `/todos/:id`

**Method** : `DELETE`

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
