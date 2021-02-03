// const auth = require("../helpers/helper.js");
const baseUrl = 'http://localhost:3000/'
const auth = () => {
  if (!localStorage.getItem("access_token")) {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#todos-table").hide()

  } else {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#todos-table").show()
    getAllTodo()
  }
}

const signIn = () => {
  const email = $('#signInEmail').val()
  const password = $('#signInPass').val()

  $.ajax({
    url: baseUrl + 'signIn',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    localStorage.setItem('access_token',res.access_token)
    auth()
  })
  .fail((xhr,text) => {
    console.log(xhr, text);
  })
  .always(_ => {
    $('#signInEmail').val('')
    $('#signInPass').val('')
  })
}

const signUp = () => {
  const email = $('#signUpEmail').val()
  const password = $('#signUpPass').val()

  $.ajax({
    url: baseUrl + 'signUp',
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(res => {
    console.log(res.msg);
  })
  .fail((xhr, text) => {
    console.log(xhr, text);
  })
  .always(_ => {
    $('#signUpEmail').val('')
    $('#signUpPass').val('')
  })
}

const getAllTodo = () => {
  $.ajax({
    url: baseUrl + 'todos',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    $('#tBody').empty()
    res.forEach(e => {
      $('#tBody').append(`<tr>
      <td>${e.title}</td>
      <td>${e.description}</td>
      <td>${e.status}</td>
      <td>${e.due_date}</td>
      <td>${e.User}</td>
      <td><button type="button" class="btn btn-success" onClick="${destroy(e.id)}">Done</button></td>
    </tr>`)
    });
  })
  .fail((xhr,text) => {

  })
}

const destroy = id => {
  $.ajax({
    url: baseUrl + `todos/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(_ => {
    getAllTodo()
  })
  .fail((xhr, text) => {

  })
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(){
  auth()
  $('#navbarSignIn').click(() => {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#todos-table").hide()
  })
  $('#navbarSignUp').click(() => {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").show()
    $("#sign-in-page").hide()
    $("#addTodo-page").hide()
    $("#todos-table").hide()
  })
  $('#navbarSignOut').click(() => {
    $("#sign-out-navbar").hide()
    $("#sign-in-navbar").show()
    $("#sign-up-navbar").show()
    $("#sign-up-page").hide()
    $("#sign-in-page").show()
    $("#addTodo-page").hide()
    $("#todos-table").hide()
  })
  $('#signInForm').submit((e) => {
    e.preventDefault()

  })
  $('#signUpForm').submit((e) => {
    e.preventDefault()
    
  })
  $('#addTodoBtn').click(() => {
    $("#sign-out-navbar").show()
    $("#sign-in-navbar").hide()
    $("#sign-up-navbar").hide()
    $("#sign-up-page").hide()
    $("#sign-in-page").hide()
    $("#addTodo-page").show()
    $("#todos-table").hide()
  })
  $('#addTodoForm').submit((e) => {
    e.preventDefault()
    
  })
});