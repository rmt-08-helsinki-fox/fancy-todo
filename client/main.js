
const base_url = "http://localhost:3000/"
      function authentic(){
        if(!localStorage.getItem("token")){ 
          $("#form-login").show()
          $("#form-register").hide()
          $("#table-todo").hide()
          $("#login-fail").hide()
          $("#login-success").hide()
          $("#logout").hide()
          $("#addTodo").hide()
          $("#login").hide()
          $("#container-create").hide()
          $("#container-edit").hide()
          $("#home").hide()
          //register()    
        }else{
          $("#form-login").hide()
          $("#form-register").hide()
          $("#table-todo").show()
          $("#login-fail").hide()
          $("#login-success").show()
          $("#logout").show()
          $("#addTodo").show()
          $("#login").hide()
          $("#register").hide()
          $("#container-create").hide()
          $("#container-edit").hide()
          $("#table-todo").show()
          getTodo()
         
        }
      }

      function login(){
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()
        $.ajax({
          url : base_url + "users/login",
          method : "POST",
          data : {
            email,
            password
          }
        })
        .done((response) => {
          console.log(response)
          localStorage.setItem("token", response.token)
          authentic()
        })
        .fail((xhr, text) => {
          $("#login-fail").show()
          console.log(xhr, text)
        })
        .always(_ => {
          console.log("always")
          $("#loginEmail").val("")
          $("#loginPassword").val("")
        })
      }

      function getTodo(){
        $.ajax({
          url : base_url + "todos",
          method : "GET",
          headers : {
            token : localStorage.getItem("token")
          }
        })
        .done((response) => {
          console.log(response)
          $("#todo-list").empty()
          for(let i = 0 ; i < response.data.length ; i++){

            $("#todo-list").append(
              `<tr>
              <th scope="row">${i+1}</th>
              <td>${response.data[i].title}</td>
              <td>${response.data[i].description}</td>
              <td>${response.data[i].due_date}</td>
              <td>${response.data[i].status}</td>
              <td>
              <button type="button" class="btn btn-primary" id="btn-edit" onclick="getById(${response.data[i].id})">Edit</button>
              <button type="button" class="btn btn-danger" id="btn-delete" onclick="Delete(${response.data[i].id})">Delete</button>
              </td>
            </tr>`
            )
          }     
          $("#quotes").empty()
          $("#quotes").append(
              `<blockquote class="blockquote">
                  <p class="mb-0">${response.quotes.quote}</p>
               <footer class="blockquote-footer">${response.quotes.author} in <cite title="Source Title">${response.quotes.series}</cite></footer>
               </blockquote>
               `
            )
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
          //console.log(localStorage.getItem("access_token"), "<<<<<")
          
        })

      }

      function logout(){
        localStorage.clear()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
        authentic()
        $("#register").show()
        $("#login").show()
      }

      $("#logout").on("click", (el) => {
        el.preventDefault()
        logout()
      })

      $("#register").on("click", (el) =>{
        el.preventDefault()
        $("#form-login").hide()
        $("#form-register").show()
        $("#register").hide()
        $("#login").show()
      })

      $("#login").on("click", (el) =>{
        el.preventDefault()
        $("#form-login").show()
        $("#form-register").hide()
        $("#register").show()
        $("#login").hide()
      })

      $("#form-register").on("submit", (el) =>{
        el.preventDefault()
        register()
      })

      $("#addTodo").on("click", (el) =>{
        el.preventDefault()
        $("#container-create").show()
        $("#table-todo").hide()
        $("#login-success").hide()
        $("#quotes").hide()
      })

      $("#container-create").on("submit", (el) =>{
        el.preventDefault()
        create()
        $("#form-login").hide()
        $("#form-register").hide()
        $("#table-todo").show()
        $("#login-fail").hide()
        $("#login-success").hide()
        $("#logout").show()
        $("#addTodo").show()
        $("#login").hide()
        $("#register").hide()
        $("#container-create").hide()
        $("#quotes").show()
      })

      $("#home").on("click", (el) =>{
          el.preventDefault()
          authentic()
          $("#quotes").show()
          getTodo()
          $("#table-todo").show()
          $("#login-success").hide()
      })

      $("#form-edit").on("submit", (el) =>{
        el.preventDefault()
        edit()
        getTodo()
      })


      function register(){
        const email = $("#inputEmail").val()
        const username = $("#inputUsername").val()
        const password = $("#inputPassword").val()
        console.log(email, username, password)

        $.ajax({
          url : base_url + "users/register",
          method : "POST",
          data : {
            email,
            username,
            password
          }
        })
        .done((response) => {
          console.log(response)
          $("#inputEmail").val("")
          $("#inputUsername").val("")
          $("#inputPassword").val("")

        })
        .fail((xhr, text) =>{
          console.log(xhr, text)
        })
        .always(() =>{
          console.log("register")
        })
      }

      function create(){
        const title = $("#create-title").val()
        const description = $("#create-desc").val()
        const due_date = $("#create-dueDate").val()
        const status = $("#create-status").val()

        $.ajax({
          url : base_url + "todos",
          method : "POST",
          headers : {
            token : localStorage.getItem("token")
          },
          data : {
            title,
            description,
            due_date,
            status
          }
        })
        .done((response) => {
          console.log(response)
          getTodo()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
        .always(() => {
          console.log("success create")
        })
      }

      function Delete (id){
        
        $.ajax({
          url : base_url + `todos/${id}`,
          method : "DELETE",
          headers : {
            token : localStorage.getItem("token")
          }
        })
        .done((response) => {
        console.log(response)
         getTodo()
         $("#login-success").hide()

        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
        .always(() =>{
          console.log("Delete Om")
        })
      }
      
      function edit () {
        const title = $("#edit-title").val()
        const description = $("#edit-desc").val()
        const due_date = $("#edit-dueDate").val()
        const status = $("#edit-status").val()
        const id = $("#todoId").val()
        $.ajax({
            url : base_url + `todos/${id}`,
            method : "PUT",
            headers : {
                token : localStorage.getItem("token")
            },
            data : {
                title,
                description,
                due_date,
                status
            }
        })
        .done((response) => {
            console.log(response, '<<<<<')
            $("#container-edit").hide()
            $("#table-todo").show()
            getTodo()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(() => {
            console.log("updated gan")
        })
      }

      function getById (id) {
         
        $.ajax({
            url : base_url + `todos/${id}`,
            method : "GET",
            headers : {
                token : localStorage.getItem("token")
            }

        })
        .done((response) => {
            console.log(response)
            const date = response.due_date.split("T")[0]
            //console.log(date)
            $("#container-edit").show()
            $("#edit-title").val(response.title)
            $("#edit-desc").val(response.description)
            $("#edit-dueDate").val(date)
            $("#edit-status").val(response.status)
            $("#addTodo").hide()
            $("#table-todo").hide()
            $("#todoTitle").hide()
            $("#todoId").val(response.id)

        })
        .fail((xhr, txt) => {
            console.log(xhr, txt)
        })
        .always(() => {
        })
      }

      function onSignIn(googleUser) {
        // var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        var id_token = googleUser.getAuthResponse().id_token;
        $.ajax({
            url : base_url + "users/googleLogin",
            method : "POST",
            data : {
                googleToken : id_token
            }
        })
        .done((response) => {
            console.log(response)
            localStorage.setItem("token", response.token)
            authentic()
        })
        .fail((xhr, txt) => {
            console.log(xhr, txt)
        })
      }

      $("#form-login").on("submit", (el)=> {
        el.preventDefault()
        login()
      })

      $(document).ready(() => {  
         authentic()
      })