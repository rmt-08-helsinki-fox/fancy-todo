let base_url = "http://localhost:3000/"
    function aut () {
      if(!localStorage.getItem("access_token")) {
        $("#name").hide()
        $("#form-login").show()
        $("#google-button").show()
        $("#welcome").show()
        $("#form-register").hide()
        $("#form-edit-todo").hide()
        $("#todo-table").hide()
        $("#form-add-todo").hide()
        $("#logout").hide()
        $("#register").show()
      } else {
        $("#name").show()
        $("#form-login").hide()
        $("#google-button").hide()
        $("#welcome").hide()
        $("#form-register").hide()
        $("#form-edit-todo").hide()
        $("#todo-table").show()
        $("#form-add-todo").show()
        $("#logout").show()
        $("#register").hide()
        getTodos()
      }
    }
    function login() {
      const email = $("#login-email").val()
      const password = $("#login-password").val()
      $.ajax({
        url: base_url + "users/login",
        method: "POST",
        data: {
          email, 
          password
        }
      })
        .done(response => {
          localStorage.setItem("access_token", response.getToken)
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
        .always(_ => {
          $("#form-login").trigger("reset")
        })
    }

    function logout() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
    })
      aut()
    }

    function getTodos() {
      console.log(localStorage.getItem("access_token"))
      $.ajax({
        url: base_url + "todos",
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done((respons) => {
          console.log(respons)
          $("#todo-list").empty()
          respons.forEach(value => {
            $("#todo-list").append(`
            <tr>
              <th scope="row">${value.id}</th>
              <td>${value.title}</td>
              <td>${value.description}</td>
              <td>${value.status}</td>
              <td>${value.due_date}</td>
              <td>
                <button class="btn btn-primary mb-2" onclick="showFormEdit(${value.id})">Edit</button>
                <button class="btn btn-primary mb-2" onclick="isDone(${value.id})">Done</button>
                <button class="btn btn-danger" onclick="remove(${value.id})">Delete</button>
            </tr>
            `)
          });
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }

    function addTodo() {
      const title = $("#todo-title-add").val()
      const description = $("#todo-description-add").val()
      const status = $("#todo-status-add").val()
      const due_date = $("#todo-due_date-add").val()
      $.ajax({
        url: base_url + "todos",
        method: "POST",
        headers: {
          token: localStorage.getItem("access_token")
        },
        data: {
          title,
          description,
          status,
          due_date
        }
      })
        .done(response => {
          console.log('masuk response <<<<<<<<<<<<<<<')
          console.log(response)
          aut()
        })
        .fail((xhr, text) => {
          console.log('masuk fail<<<<<<<<<<<<<')
          console.log(xhr, text)
        })
    }

    function showRegisterForm() {
        $("#form-login").hide()
        $("#form-register").show()
        $("#form-edit-todo").hide()
        $("#todo-table").hide()
        $("#form-add-todo").hide()
        $("#logout").hide()
        $("#name").hide()
        $("#register").hide()
    }

    function register() {
      const email = $("#register-email").val()
      const password = $("#register-password").val()
      const location = $("#register-location").val()
      $.ajax({
        url: base_url + "users/register",
        method: "POST",
        data: {
          email, 
          password,
          location
        }
      })
        .done(response => {
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }

    function remove(id) {
      $.ajax({
        url: base_url + `todos/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(response => {
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }

    function getOneTodo(id) {
      $.ajax({
        url: base_url + `todos/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(response => {
          console.log(response)
          $("#form-edit-todo").data('val', response.id)
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })

    }
    function showFormEdit(id) {
        $("#form-login").hide()
        $("#form-register").hide()
        getOneTodo(id)
        $("#form-edit-todo").show()
        $("#todo-table").hide()
        $("#form-add-todo").hide()
        $("#logout").hide()
        $("#name").hide()
        $("#register").hide()
    }

    function edit(id) {
      const title = $("#todo-title-edit").val()
      const description = $("#todo-description-edit").val()
      const status = $("#todo-status-edit").val()
      const due_date = $("#todo-due_date-edit").val()
      console.log(id)
      console.log(title)
      console.log(description)
      console.log(status)
      console.log(due_date);
      $.ajax({
        url: base_url + `todos/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("access_token")
        }, 
        data: {
          title,
          description,
          status,
          due_date
        }
      })
        .done(response => {
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }
    function isDone(id) {
      $.ajax({
        url: base_url + `todos/${id}`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(response => {
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }
    function onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token
      $.ajax({
        url: base_url + 'users/googlelogin',
        method: 'POST',
        data: {
          googleToken: id_token
        }
      })
        .done(response => {
          console.log(response)
          localStorage.setItem("access_token", response.getToken)
          aut()
        })
        .fail(err => {
          console.log(err)
        })
    }


    $(document).ready(function(){
      aut()
      $("#form-login").on("submit", (e) => {
        e.preventDefault()
        login()
      })
      
      $("#logout").on("click", (e) => {
        e.preventDefault()
        logout()
      })

      $("#form-add-todo").on("submit", (e) => {
        e.preventDefault()
        addTodo()
      })

      $("#register").on("click", (e) => {
        e.preventDefault()
        showRegisterForm()
      })
      $("#form-register").on("submit", (e) => {
        e.preventDefault()
        register()
      })

      $("#form-edit-todo").on("submit", (e) => {
        e.preventDefault()
        let id = $('#form-edit-todo').data('val'); //
        edit(id)
      })
    });