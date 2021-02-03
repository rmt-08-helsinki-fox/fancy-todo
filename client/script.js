const base_url = "http://localhost:3000/"
function auth() {
  if(!localStorage.getItem("access_token")) {
    $("#login-container").show()
    $("#register-container").hide()
    $("#add-todos-container").hide()
    $("#list-todos-container").hide()
    $("#update-todos-container").hide()
  } else {
    $("#login-container").hide()
    $("#register-container").hide()
    $("#add-todos-container").show()
    $("#list-todos-container").show()
    getTodos()
    $("#update-todos-container").show()
  }
}

function login() {
  const email = $("#emailLogin").val()
  const password = $("#passwordLogin").val()
  $.ajax({
    url: base_url + "users/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log(response)
      localStorage.setItem("access_token", response.access_token)
      auth()
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
    .always(() => {
      $("#login-form").trigger("reset")
      // console.log("always")
    })
}

function getTodos() {
  $.ajax({
    url: base_url + "todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(data => {
      $("#tbody-id").empty()
      data.forEach(value => {
        $("#tbody-id").append(`
          <tr>
            <td>${value.title}</td>
            <td>${value.description}</td>
            <td>${value.due_date}</td>
            <td><a class="w3-btn w3-green" href="#" onclick="hapus(${value.id})">Delete Todos</a> </td>
          </tr>
        `)
      })
    })
    .fail((xhr, status) => {
      console.log(xhr, status)
    })
}

function hapus(id) {
  $.ajax({
    url: base_url + "todos/" + id,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(() => {
      getTodos()
    })
    .fail((err, status) => {
      console.log(err, status)
    })
}

$(document).ready(() => {
  auth()
  $("#login-form").on("submit", (event) => {
    event.preventDefault()
    login()
  })
})