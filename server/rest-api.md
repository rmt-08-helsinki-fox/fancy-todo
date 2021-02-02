## Fancy Todo List
----

## URL

/user

/todos

---

## METHODS

<b><u>POST /user/register</u></b>

Untuk mendaftarkan diri anda sebagai pengguna todo app kami. Semua input harus diisi, dan <u>e-mail</u> bersifat unique, yang berarti tidak bisa ada 2 e-mail yang sama yang akan terdaftar di database kami. Endpoint ini menerima 2 request body, yaitu:

- email
- password

Output berupa sebuah object.

Success response (201)

```json
{
    "msg": "Register success",
    "id": 32,
    "email": "shark@gmail.com"
}
```

Error responses:

- 400
- 500

<b><u>POST /user/login</u></b>

Setelah anda berhasil register, anda dapat login dengan e-mail dan password yang anda daftar di endpoint /user/register. Semua input harus diisi. Endpoint ini menerima 2 request body, yaitu:

- email
- password

Output berupa sebuah object yang berisi access_token.

Success response (200)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoic2hhcmtAZ21haWwuY29tIiwiaWF0IjoxNjEyMjYwNTE2fQ.8tCkcnrnHe05ETPwkCx_58KosHlgqnIYgN7cNwnVNUc"
}
```

Error responses:

- 400
- 404
- 500

---

<b><u>GET /todos</u></b>

Untuk melihat semua item yang terdapat dalam todo list app. Output berupa array of objects.

Success responses (200) 
```json
  [
    {
        "id": 24,
        "title": "Singing",
        "description": "Sing Aurora",
        "status": "Super good",
        "due_date": "2021-03-03",
        "createdAt": "2021-02-01T08:55:51.408Z",
        "updatedAt": "2021-02-01T08:55:51.408Z"
    },
    {
        "id": 25,
        "title": "Dancing",
        "description": "Dance Like Stylebender",
        "status": "good",
        "due_date": "2021-03-03",
        "createdAt": "2021-02-01T08:56:07.532Z",
        "updatedAt": "2021-02-01T08:56:07.532Z"
    }
]
```

Error responses:
- 500

<u><b>GET /todos/:id</b></u>

Untuk melihat satu item yang terdapat dalam todo list app, sesuai dengan <b>id</b> yang diberikan. Output berupa sebuah object. Anda harus memberikan parameter <b>id</b> berupa integer.

Success response (200)

```json
    {
        "id": 24,
        "title": "Singing",
        "description": "Sing Aurora",
        "status": "Super good",
        "due_date": "2021-03-03",
        "createdAt": "2021-02-01T08:55:51.408Z",
        "updatedAt": "2021-02-01T08:55:51.408Z"
    }
```

Error responses:
- 404
- 500

<u><b>POST /todos</b></u>

Untuk menambahkan item pada todo list app. Endpoint ini menerima 4 request body, yaitu:

- title: String
- description: String
- status: String
- due_date: String dalam format (dd-mm-yyyy)

Semua input harus diisi, dan <u>due_date</u> tidak boleh diisi tanggal yang sudah lewat hari ini. 

Output berupa sebuah object, berdasarkan data yang barusan anda inputkan.

Success response (201)

```json
{
    "id": 36,
    "title": "Berlari",
    "description": "5 kilometer",
    "status": "Not done",
    "due_date": "2021-03-02",
    "updatedAt": "2021-02-01T11:32:55.676Z",
    "createdAt": "2021-02-01T11:32:55.676Z"
}
```

Error responses:

- 400
- 500

<b><u>PUT /todos/:id</u></b>

Untuk meng-update data, berdasarkan <b>id</b> yang anda tuliskan di parameter /todos. Endpoint ini menerima 4 request body, yaitu:

- title: String
- description: String
- status: String
- due_date: String dalam format (dd-mm-yyyy)

Output berupa sebuah object, berdasarkan data yang baru saja anda update. Semua input harus diisi, dan <u>due_date</u> tidak boleh diisi tanggal yang sudah lewat hari ini. 

Success response (200)

```json
{
    "id": 30,
    "title": "Melukis",
    "description": "Menggambar indah",
    "status": "Not done",
    "due_date": "2021-04-02",
    "createdAt": "2021-02-01T09:06:06.540Z",
    "updatedAt": "2021-02-01T11:41:04.516Z"
}
```

Error responses:

- 400
- 404
- 500

<b><u>PATCH /todos/:id</u></b>

Untuk meng-update data, <u>hanya row status</u> berdasarkan <b>id</b> yang anda tuliskan di parameter /todos. Endpoint ini hanya menerima 1 request body:

- status: String

Output berupa sebuah object, berdasarkan data yang baru saja anda update. Field <u>status</u> harus diisi.

Success response (200)

```json
{
    "id": 30,
    "title": "Melukis",
    "description": "Menggambar indah",
    "status": "Done",
    "due_date": "2021-04-02",
    "createdAt": "2021-02-01T09:06:06.540Z",
    "updatedAt": "2021-02-01T11:50:43.745Z"
}
```

Error responses:

- 400
- 404
- 500

<b><u>DELETE /todos/:id</u></b>

Untuk menghapus data, berdasarkan <b>id</b> yang anda tuliskan dalam parameter /todos. Output berupa sebuah object, yang datanya adalah data yang baru saja anda hapus.

Success response (200)

```json
{
    "listDeleted": {
        "id": 30,
        "title": "Melukis",
        "description": "Menggambar indah",
        "status": "Done",
        "due_date": "2021-04-02",
        "createdAt": "2021-02-01T09:06:06.540Z",
        "updatedAt": "2021-02-01T11:50:43.745Z"
    },
    "message": "todo success to delete"
}
```

Error responses:

- 404
- 500

---

## Error Responses

- 400 (Validation Error)

Ada beberapa validasi di inputan di routes kami. Jika input anda tidak memenuhi validasi kami, maka anda akan menerima error 400, yang tipenya adalah "Validation error". 

```json
{
    "error": "Description tidak boleh kosong!"
}
```

- 404 (Not found)

Pada bagian tertentu di route kami, anda diminta untuk menuliskan parameter <b>id</b>. Jika <b>id</b> yang anda tuliskan tidak terdaftar dalam database kami, maka anda akan menerima error 404.

```json
{
    "error": "ID not found!"
}
```

- 500 (Server Internal Error)

Jika anda menerima error ini, maka terjadi kesalahan teknis dalam sistem kami. Mohon menunggu, selagi kami memperbaiki kesalahan yang terdapat dalam sistem kami.
