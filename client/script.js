

const base_url = "http://localhost:3000"

      function auth() {
        if(!localStorage.getItem("accessToken")){
          $("#form-login").show()
          $("#form-register").show()
          $("#form-add-todo").hide()
          $("#table-todos").hide()
          $("#logout-user").hide()
        } else {
          $("#form-login").hide()
          $("#form-register").hide()
          $("#form-add-todo").show()
          $("#table-todos").show()
          $("#logout-user").show()
          showTodo()
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
          })
          .always( _ => {
            $("#form-register-user").trigger("reset")
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
            <td>${element.due_date}</td>
            <td> <a href="#" onclick="deleteTodo(${element.id})"> Delete </a>
            </tr>
        `)
          });
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
          auth()
      }


      $(document).ready(() => {
        auth()
        $("#form-login-user").on("submit", (event) => {
          event.preventDefault()
          login()
        })

        $("#form-register-user").on("submit", (event) => {
          event.preventDefault()
          register()
        })

        $("#logout-user").on("click",(event) => {
            event.preventDefault()
            logoutUser()
        })

      })