let baseUrl = 'http://localhost:3003'

function auth() {
  if (!localStorage.access_token) {
    $("#login").show();
    $("#navbar").hide();
    $("#status").hide();
    $("#home-page").hide();
    $("#list-todo").hide();
    $("#done-todo").hide();
    $("#register").hide();
    $("#add-form").hide();
    $("#edit-form").hide();
    $('#holidays').hide();
    $('.error').hide();
  } else {
    $("#login").hide();
    $("#navbar").show();
    fetchTodo()
    getUser()
    $("#list-todo").show();
    $("#done-todo").show();
    $("#register").hide();
    $("#add-form").hide();
    $("#edit-form").hide();
    $('#holidays').hide();
    $('.error').hide();
  }
}

$(document).ready(function () {
  auth();

  $("#to-reg-form").click(function (event) {
    event.preventDefault();
    $('#errorLogin').empty()
    $("#login").hide();
    $("#register").fadeIn();
  });

  $("#to-log-form").click(function (event) {
    event.preventDefault();
    $("#errorRegister").empty();
    $("#login").fadeIn();
    $("#register").hide();
  });

  $("#home").click(function (event) {
    event.preventDefault();
    auth()
  });
});
