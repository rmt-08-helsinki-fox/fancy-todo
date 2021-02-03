// navbar
// login-form
// todo-list
// update-form
const baseURL = 'localhost:3000'
$(document).ready(function() {
  //disini taro onclick onclick dan call function, kalo function taro diluar document.ready
  checkAuth()

  $('#login-btn').click(function(event){
    login(event)
  })

  $('#logout-btn').click(function(){
    logout()
  })

})

function checkAuth(){
  if(localStorage.access_token){
    $('#navbar').show()
    $('#login-form').hide()
    $('#todo-list').show()
    $('#update-form').hide()
  } else{
    $('#navbar').hide()
    $('#login-form').show()
    $('#todo-list').hide()
    $('#update-form').hide()
  }
}

function login(event){
  event.preventDefault()
  let email = $('#email').val()
  let password = $('#password').val()
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/login`,
    data:{
      email,
      password
    }
  })
  .done(response => {
    let access_token = response
    localStorage.setItem('access_token', access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    $("#email").val('')
    $("#password").val('')
  })
}

function logout(){
  localStorage.removeItem('access_token')
  checkAuth()
}