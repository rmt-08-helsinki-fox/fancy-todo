let base_url = "https://fancy-todo-app01.herokuapp.com/"
// ============= authentication ===========
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
        $("#cancle").hide()
        $("#location").hide()
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
        $("#location").show()
        $("#register").hide()
        $("#cancle").hide()
        getLocation()
        getTodos()
      }
    }

    // =========== login ===========
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
          $("#isi-form-login").trigger("reset")
        })
    }

    // ========== logout ==========
    function logout() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
    })
      aut()
    }

    // ============= get Todo ===========
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

    // ============= add todo ============
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

    // ============ show register form ==============
    function showRegisterForm() {
        $("#form-login").hide()
        $("#form-register").show()
        $("#form-edit-todo").hide()
        $("#todo-table").hide()
        $("#form-add-todo").hide()
        $("#logout").hide()
        $("#name").hide()
        $("#register").hide()
        $("#google-button").hide()
        $("#location").hide()
        $("#cancle").show()
    }

    // ============ register =============
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
        .always(_ => {
          $("#isi-form-register").trigger("reset")
        })
    }

    // ============ delete Todo =============
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

    // ========= edit ==============
    function getOneTodo(id) {
      $.ajax({
        url: base_url + `todos/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(response => {
          // console.log(response)
          $("#form-edit-todo").data('val', {
            id: response.id,
            title: response.title,
            description: response.description,
            status: response.status,
            due_date: response.due_date
          })
          
          let {title, description, status, due_date} = $('#form-edit-todo').data('val')
          $("#input-form-edit-todo").empty()
          $("#input-form-edit-todo").append(`
          <label for="">Title</label><br>
          <input type="text" id="todo-title-edit" value="${title}"><br>
          `)
          $("#input-form-edit-todo").append(`
          <label for="">Description</label><br>
          <input type="text" id="todo-description-edit" value="${description}"><br>
          `)
          $("#input-form-edit-todo").append(`
          <label for="">Status</label><br>
          <input type="text" id="todo-status-edit" value="${status}"><br>
          `)
          $("#input-form-edit-todo").append(`
          <label for="">Due Date</label><br>
          <input type="text" id="todo-due_date-edit" value="${due_date.slice(0, 10)}"><br>
          <button type="submit" class="btn btn-primary mb-2">Edit</button>
          `)
          $("#cancle").show()
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
        $("#google-button").hide()
        $("#location").hide()
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

    // ============= google Oauth =======
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

    // =========== get location 3rd party api ============
    function getLocation() {
      $.ajax({
        url: base_url + "users/location",
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
      .done(response => {
        console.log(response)
          $("#location").empty()
          $("#location").append(`
          <div class="card border-info mb-3" style="max-width: 18rem;">
          <div class="card-header">Location</div>
          <div class="card-body text-info">
            <h5 class="card-title">Region: Indonesia</h5>
            <p class="card-text">City: ${response.wheater.city_name}</p>
            <p class="card-text">Latitude: ${response.wheater.lat}</p>
            <p class="card-text">Longitude: ${response.wheater.lon}</p>
          </div>
          `)
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
        let {id} = $('#form-edit-todo').data('val'); //
        edit(id)
      })
      $("#cancle").on("click", (e) => {
        e.preventDefault()
        aut()
      })
    });