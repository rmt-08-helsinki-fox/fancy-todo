
const base_url = "https://fancy-todo-helsinki-fox.herokuapp.com"
// const base_url = "http://localhost:3000"

      function auth() {
        if(!localStorage.getItem("accessToken")){
          $("#form-login").show()
          $("#form-register").hide()
          $("#form-add-todo").hide()
          $("#table-todos").hide()
          $("#logout-user").hide()
          $("#form-edit-todo").hide()
        } else {
          $("#form-login").hide()
          $("#form-register").hide()
          $("#form-add-todo").show()
          $("#table-todos").show()
          $("#logout-user").show()
          $("#form-edit-todo").hide()
          showTodo()
        }
        
      }

      function authRegister() {
        if(!localStorage.getItem("accessToken")){
          $("#form-login").hide()
          $("#form-register").show()
          $("#form-add-todo").hide()
          $("#table-todos").hide()
          $("#logout-user").hide()
          $("#form-edit-todo").hide()
        } else {
          $("#form-login").hide()
          $("#form-register").hide()
          $("#form-add-todo").show()
          $("#table-todos").show()
          $("#logout-user").show()
          $("#form-edit-todo").hide()
          showTodo()
        }
      }

      function authEdit() {
        if(!localStorage.getItem("accessToken")){
          $("#form-login").show()
          $("#form-register").show()
          $("#form-add-todo").hide()
          $("#table-todos").hide()
          $("#logout-user").hide()
        }else{
          $("#form-login").hide()
          $("#form-register").hide()
          $("#form-add-todo").hide()
          $("#table-todos").hide()
          $("#logout-user").show()
          $("#form-edit-todo").show()
        }

      }

      function login() {
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()

        $.ajax({
          url: base_url + "/users/login",
          method: "POST",
          data: {
            email: email,
            password: password
          }
        })
          .done((response) => {
            console.log(response)
            localStorage.setItem("accessToken",response.accessToken)
            auth()
          })
          .fail((xhr, text) => {
            console.log(xhr, text)
          })
          .always( _ => {
            $("#form-login-user").trigger("reset")
          })
      }

      function register(){
        const email = $("#registerEmail").val()
        const password = $("#registerPassword").val()

        console.log(email);
        console.log(password);

        $.ajax({
          url: base_url + "/users/register",
          method: "POST",
          data: {
            email: email,
            password: password
          }
        })
          .done( response => {
            console.log(response)
            auth()
          } )
          .fail((xhr, text) => {
            console.log(xhr, text)
            console.log('error')
          })
          .always( _ => {
            $("#form-register-user").trigger("reset")
          })
      }

      function addTodo(){
        const title = $("#todoTitle").val()
        const description = $("#todoDescription").val()
        const dueDate = $("#todoDueDate").val()

        console.log(title, description, dueDate);


        $.ajax({
          url: base_url + '/todos',
          method: "POST",
          headers: {
            token: localStorage.getItem("accessToken")
          },
          data: {
            title: title,
            description: description,
            status: "true",
            due_date: dueDate,
          }
        })
          .done( response => {
            console.log(response);
            auth()
          })
          .fail((xhr, text) => {
            console.log(xhr, text)
          })
          .always( _ => {
            $("#form-add-todo-data").trigger("reset")
          })
        
      }

      function showTodo(){

        $.ajax({
          url: base_url + '/todos',
          method: "GET",
          headers: {
            token: localStorage.getItem("accessToken")
          }
        })
        .done( todo => {
          $("#table-datas-todo").empty()

          todo.forEach(element => {
            $("#table-datas-todo").append(`
            <tr>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.due_date.split('T')[0]}</td>
            <td> 
                <a href="#" style="margin-right: 15px;" onclick="showEditTodo(${element.id})"> Edit </a>
                <a href="#" onclick="deleteTodo(${element.id})"> Delete </a> 
            </td>
            </tr>
        `)
          });
        })
        .fail((xhr, text) => {
          console.log(xhr, text);
        })
      }

      function onSignIn(googleUser) {

        const id_token = googleUser.getAuthResponse().id_token
      
        $.ajax({
            url: base_url + '/users/googlelogin',
            method: "POST",
            data: {
                id_token
            }
        }).done(result => {
            localStorage.setItem('accessToken', result.access_token)
            auth()
        }).fail(err => {
            console.log(err)
        })
      }
      
      
      function showEditTodo(idTodo){
        authEdit()

        $.ajax({
          url: base_url + '/todos' + `/${idTodo}`,
          method: "GET",
          headers: {
            token: localStorage.getItem("accessToken")
          }
        })
        .done( response => {
          
          let convertedDate = response.due_date.split('T')[0]
          $("#todoEditId").val(response.id)
          $("#todoEditTitle").val(response.title)
          $("#todoEditDescription").val(response.description)
          $("#todoEditDueDate").val(convertedDate)

        })
        .fail((xhr, text) => {
          console.log(xhr, text);
        })

      }

      function processEditTodo(){
        const id = $("#todoEditId").val()
        const title = $("#todoEditTitle").val()
        const description = $("#todoEditDescription").val()
        const dueDate = $("#todoEditDueDate").val()

        console.log(base_url + '/todos' + `/${id}`)

        $.ajax({
          url: base_url + '/todos' + `/${id}`,
          method: "PUT",
          headers: {
            token: localStorage.getItem("accessToken")
          },
          data: {
            title: title,
            description: description,
            status: "true",
            due_date: dueDate,
          }
        })
        .done( response => {
          console.log(response)
          auth()
        })
        .fail((xhr, text) => {
          console.log(xhr, text);
        })
      }

      function deleteTodo(idTodo){
        $.ajax({
          url: base_url + '/todos/' + idTodo,
          method: "DELETE",
          headers: {
            token: localStorage.getItem("accessToken")
          }
        })
          .done((_) => {
            showTodo()
          })
          .fail((xhr, text) => {
          console.log(xhr, text);
        })
      }

      function logoutUser(){
          localStorage.clear()
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
          auth()
      }


      $(document).ready(() => {

        auth()
        $("#form-login-user").on("submit", (event) => {
          event.preventDefault()
          login()
        })

        $("#link-login").on("click", (event) => {
          event.preventDefault()
          auth()
        })

        $("#link-register").on("click", (event) => {
          event.preventDefault()
          authRegister()
        })

        $("#form-register-user").on("submit", (event) => {
          event.preventDefault()
          register()
        })

        $("#form-add-todo-data").on("submit", (event) => {
          event.preventDefault()
          addTodo()
        })

        $("#logout-user").on("click",(event) => {
            event.preventDefault()
            logoutUser()
        })

        $("#form-edit-todo-data").on("submit", (event) => {
          event.preventDefault()
          processEditTodo()
        })

      })