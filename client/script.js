
const base_url = "http://localhost:3000/"

function auth(){
  if(!localStorage.getItem("access_token")){
    $("#login").show()
    $("#register").hide()
    $("#todo-list").hide()
    $("#add-todo").hide()
  } else{
    $("#login").hide()
    $("#register").hide()
  }
}

function register(){
  const name = $("#register-name").val()
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  $.ajax({
    method : 'POST',
    url : base_url + "register",
    data : {
      name,
      email,
      password
    }
  })
  .done(response => {
    console.log(response)
    auth()
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_ => {
    $("#register-form").trigger("reset")
  })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        url: base_url + "googleLogin",
        method: "POST",
        data : {
            googleToken: id_token
        }
    })
    .done(response => {
        console.log(response)
    })
    .fail(err => {
        console.log(err)
    })
}

function login(){
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  console.log(email, password)
  $.ajax({
    method: "POST",
    url: base_url + "login",
    data: {
      email,
      password
    }
  })
  .done((response) => {
    console.log(response)
    localStorage.setItem("access_token", response.access_token)
    auth()
    getTodos()
    $("#todo-list").show()
    $("#add-todo").show()
    
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_ => {
    $("#login-form").trigger("reset")

  })
}

function getTodos(){
  $.ajax({
    url : base_url + "todos",
    method : "GET",
    headers : {
      access_token : localStorage.getItem("access_token")
    }
  })
  .done( data => {
    $("#tbody-todos").empty()
    data.forEach((el, number) => {
      $("#tbody-todos").append(`
        <tr>
          <td>${number + 1}</td>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>${el.status}</td>
          <td>${el.due_date}</td>
          <td><a href="#" class="btn btn-danger" onclick="hapus(${el.id})">Delete</a></td>
        </tr>
      `)
    });
  })
  .fail((xhr, text) => {
    console.log(xhr)
  })
  .always(_ => {
    console.log('always')
  })
}

function postTodos(){
  const title = $("#add-title").val()
  const description = $("#add-description").val()
  const due_date = $("#add-due_date").val()

  $.ajax({
    url : base_url + "todos",
    method : "POST",
    headers : {
      access_token : localStorage.getItem("access_token")
    },
    data :{
      title,
      description,
      due_date
    }
  })
  .done(data => {
    getTodos()
    $("#todo-list").show()
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })
  .always(_ => {
    
  })
}

function hapus(id){
  $.ajax({
    url : base_url + "delete/" + id,
    method : "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(data => {
    getTodos()
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_ => {

  })
}

$(document).ready(() => {
    
//   if(!localStorage.getItem("access_token")){
    auth()

    $("#login-form").on("submit", (e) => {
      e.preventDefault()
      login()
    })

    $("#register-form").on("submit", (e) => {
      e.preventDefault()
      register()
    })

    $("#add-todo-form").on("submit", (e) => {
      e.preventDefault()
      getTodos()
    })

//   }

  $('#btn-toregister').click(() => {
    $('#login').hide()
    $("#login-form").trigger("reset")
    $("#register-form").trigger("reset")
    $('#register').show()
  })

  $('#btn-tologin').click(() => {
    $('#login').show()
    $('#register').hide()
  })

  $('#btn-add-todo').click(() => {
    postTodos()
    $('#login').hide()
    $('#register').hide()
    $("#add-todo-form").trigger("reset")
    $("#todo-list").show()
  })
});
