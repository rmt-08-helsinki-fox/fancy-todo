console.log(new Date())

// token test
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXNAZ21haWwuY29tIiwiaWF0IjoxNjEyMjY4NjczfQ.KiE0tHsc0DVO--w4vZSxNd9j8J5hKfEsGIAY1ZvQVyA"
}

// contoh error
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "title cannot be empty",
            "type": "Validation error",
            "path": "title",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "kamu harus tidur minimal 8 jam",
                "status": "todo",
                "due_date": "2021-01-01T00:00:00.000Z",
                "UserId": 1,
                "updatedAt": "2021-02-02T05:31:20.542Z",
                "createdAt": "2021-02-02T05:31:20.542Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                {
                    "msg": "title cannot be empty"
                }
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    {
                        "msg": "title cannot be empty"
                    }
                ]
            }
        },
        {
            "message": "choose date after today",
            "type": "Validation error",
            "path": "due_date",
            "value": "2021-01-01T00:00:00.000Z",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "kamu harus tidur minimal 8 jam",
                "status": "todo",
                "due_date": "2021-01-01T00:00:00.000Z",
                "UserId": 1,
                "updatedAt": "2021-02-02T05:31:20.542Z",
                "createdAt": "2021-02-02T05:31:20.542Z"
            },
            "validatorKey": "isAfter",
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-2-2"
            ],
            "original": {
                "validatorName": "isAfter",
                "validatorArgs": [
                    "2021-2-2"
                ]
            }
        }
    ]
}