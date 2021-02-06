const base_URL = "http://localhost:3000/"
    function auth(){
      if(!localStorage.getItem("access_token")){
        $("#form-input-login").show()
        $("#form-register").hide()
        $("#main-content").hide()
        $("#form-add-data").hide()
        $("#show-result-create").hide()
        $("#show-list-comic").hide()
        $("#form-edit-data").hide()
      }else{
        $("#form-input-login").hide()
        $("#form-register").hide()
        $("#form-add-data").hide()
        $("#main-content").show()
        $("#show-result-create").hide()
        $("#show-list-comic").hide()
        $("#form-edit-data").hide()
        todos()
      }
    }

    function register(){
      $("#form-input-login").hide()
      $("#form-register").show()
      $("#main-content").hide()
      $("#form-add-data").hide()
      $("#show-result-create").hide()
      $("#show-list-comic").hide()
      $("#form-edit-data").hide()
    }

    function addTodo(){
      $("#form-input-login").hide()
      $("#form-register").hide()
      $("#main-content").hide()
      $("#form-add-data").show()
      $("#show-result-create").hide()
      $("#show-list-comic").hide()
      $("#form-edit-data").hide()
    }

    function login(){
      let email = $("#input-email").val()
      let password = $("#input-password").val()
      $.ajax({
        url: `${base_URL}users/login`,
        method: "POST",
        data: {email,password}
      })
        .done(res => {
          localStorage.setItem("access_token", res.access_token)
          auth()
        })
        .fail((xhr, text) => {
          $("#alert-error").empty()
          $("#alert-error").prepend(`
          <p style="color: red; text-align: center;">${xhr.responseJSON.message}</p>
          `)
          setTimeout(() => {
            $("#alert-error").empty()
          }, 3000);
        })
        .always(_ => {
          $("#login-form").trigger("reset")
        })
    }

    function onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      $.ajax({
        url: base_URL+"users/googleLogin",
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
        .done(respone => {
          localStorage.setItem("access_token", respone.access_token)
          auth()
        })
        .fail((xml, err) => {
          console.log(xml,err);
        })
    }

    function todos(){
      $.ajax({
        url: base_URL+"todos",
        method: "GET",
        headers:{
          token: localStorage.getItem("access_token")
        }
      })
        .done(todo => {
          $("#table-todos").empty()
          todo.forEach((el,i) => {
            let kata = ''
            if(el.status === true){
              kata = 'Finish <i class="fa fa-check" aria-hidden="true" style="color: green;"></i>'
            }else{
              kata = 'Unfinish <i class="fa fa-times" aria-hidden="true" style="color: red;"></i>'
            }
            $("#table-todos").append(`
            <tr>
              <th>${i+1}</th>
              <td>${el.title}</td>
              <td class="text-center">${kata}</td>
              <td class="text-center">
                <a onclick="doneRead(${el.id})" class="btn btn-primary"><i class="fa fa-check" aria-hidden="true"></i> Done</a>
                <a onclick="showId(${el.id})" class="btn btn-success"> <i class="fa fa-eye" aria-hidden="true"></i> Show</a>
                <a onclick="editTodo(${el.id})" class="btn btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                <a onclick="deleteTodo(${el.id})" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i> Delete</a>
              </td>
            </tr>
            `)
          })
        })
        .fail((xml,err) =>{
          console.log(xml,err);
        })
    }

    // Ambil DAta Edit Todo
    function editTodo(id){ 
      $.ajax({
        url: base_URL+"todos/"+id,
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(data => {
          getEditTodo(data)
        })
        .fail((xml,err) => {
          console.log(xml,err);
        })
    }
    // Tampilkan Data Edit Todo
    function getEditTodo(param){
      $("#form-input-login").hide()
      $("#form-register").hide()
      $("#main-content").hide()
      $("#form-add-data").hide()
      $("#show-result-create").hide()
      $("#show-list-comic").hide()
      $("#form-edit-data").show()

      $("#edit-title").val(param.title)
      $("#hidden-id").val(param.id)
      $("#edit-description").text(param.description)
    }

    //Ganti Data Edit Todo
    function postEditTodo(){
      let title = $("#edit-title").val()
      let description = $("#edit-description").val()
      let id = $("#hidden-id").val()

      $.ajax({
        url: base_URL+"todos/"+id,
        method: "PUT",
        data:{title,description},
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(data => {
          auth()
        })
        .fail((xml,err) => {
          xml.responseJSON.message.forEach(el => {
            $("#error-edit-todo").prepend(`
              <p style="color: red; text-align:center;">${el}
            `)
          })
          setTimeout(() => {
            $("#error-edit-todo").empty()
          }, 3000);
        })
    }

    // selesai membaca status jadi true
    function doneRead(id){
      $.ajax({
        url: base_URL+"todos/"+id,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(data => {
          auth()
        })
        .fail((xml,err) => {
          console.log(xml,err);
        })
    }
    
    function showId(id){

      $.ajax({
        url: base_URL+"todos/show/"+id,
        method: "GET",
        headers: {
          token: localStorage.getItem("access_token")
        }
      })
        .done(data => {
          showListComic(data)
        })
        .fail((xml,err) => {
          console.log(xml,err);
        })
    }

    function showListComic(param){
      $("#form-input-login").hide()
      $("#form-register").hide()
      $("#main-content").hide()
      $("#form-add-data").hide()
      $("#show-result-create").hide()
      $("#form-edit-data").hide()
      $("#show-list-comic").show()
      
      console.log(param);
      $("#row-result-comic").empty()
      if(param.comic.response === 'error'){
        $("#error-id-comic").prepend(`
          <h3 style="margin-left: 70px; text-align: center;">Character with given name not found</b></h3>
        `)
      }else{
        $("#row-result-comic").prepend(`
        <h3 style="margin-left: 70px;">Total: ${param.comic.results.length}</h3>
        `)
        param.comic.results.forEach(el => {
          $("#row-result-comic").append(`
          <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem; margin-left: 70px; margin-top: 30px;">
            <img src="${el.image.url}" class="card-img-top" alt="${el.name}">
            <div class="card-body">
              <h5 class="card-title">${el.name}</h5>
              <p>Publisher: ${el.biography.publisher}</p>
            </div>
          </div>
          `)
        })
      }
    }

    function createTodo(){
      let title = $("#add-title").val()
      let description = $("#add-description").val()
      let due_date = $("#add-date").val()
      $.ajax({
        url: base_URL+"todos",
        method: "POST",
        headers: {
          token: localStorage.getItem("access_token")
        },
        data:{title,description,due_date}
      })
        .done(res => {
          showCreateTodo(res)
        })
        .fail((xml,err) => {
          xml.responseJSON.message.forEach(el => {
            $("#error-create-todo").prepend(`
              <p style="color: red; text-align:center;">${el}
            `)
          })
          setTimeout(() => {
            $("#error-create-todo").empty()
          }, 3000);
        })
        .always(_ => {
          $("#data-form-create-todo").trigger('reset')
        })
    }

    function showCreateTodo(param){
      $("#form-input-login").hide()
      $("#form-register").hide()
      $("#main-content").hide()
      $("#form-add-data").hide()
      $("#form-edit-data").hide()
      $("#show-result-create").show()
      console.log(param);
      $("#title-show-create").text("Title: "+param.hasil.title)
      $("#description-show-create").text("Descrpiption: "+param.hasil.description)
      $("#row-result-create").empty()
      if(param.comic.response === 'error'){
        $("#row-result-create").prepend(`
        <h3 style="margin-left: 70px;">character with given name not found</b></h3>
        `)
      }else{
        $("#row-result-create").prepend(`
        <h3 class="alert alert-success">Total <b style="color: red;">${param.comic.results.length}</b> result with title: ${param.hasil.title}</h3>
        `)
        param.comic.results.forEach(el => {
          $("#row-result-create").append(`
          <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem; margin-left: 70px; margin-top: 30px;">
            <img src="${el.image.url}" class="card-img-top" alt="${el.name}">
            <div class="card-body">
              <h5 class="card-title">${el.name}</h5>
              <p>Publisher: ${el.biography.publisher}</p>
            </div>
          </div>
          `)
        })
      }
    }

    function logout(){
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      auth()
    }

    function createUser(){
      let username = $("#register-username").val()
      let email = $("#register-email").val()
      let password = $("#register-password").val()
      $.ajax({
        url: base_URL+"users/register",
        method: "POST",
        data: {username,email,password}
      })
        .done(user => {
          auth()
        })
        .fail((xhr, err) => {
          $("#alert-error-register").empty()
          xhr.responseJSON.message.forEach(el => {
            $("#alert-error-register").append(`
            <label style="color: red;">${el}</label><br>
            `)
          })
          setTimeout(() => {
            $("#alert-error-register").empty()
          }, 3000);
        })
        .always(_ => {
          $("#form-register-user").trigger("reset")
        })
    }

    function deleteTodo(id){
      $.ajax({
        url: base_URL+"todos/"+id,
        method: "DELETE",
        headers:{
          token: localStorage.getItem("access_token")
        }
      })
        .done(res => {
          $("#notification-delete").empty()
          $("#notification-delete").prepend(`
          <div class="alert alert-danger" role="alert">
            ${res.message}
          </div>
          `)
          auth()
          setTimeout(() => {
            $("#notification-delete").empty()
          }, 3000);
        })
        .fail((xhr, err) => {
          console.log(xhr, err);
          
        })
    }