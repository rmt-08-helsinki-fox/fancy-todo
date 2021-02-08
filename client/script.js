const base_url = "http://localhost:3000/"

// authenticate
function beforeLogin() {
  if (!localStorage.getItem("accessToken")) {
    $(".signin-container").show()
    $(".signup-container").hide()
    $(".navbar-brand").hide()
    $(".table-todos").hide()
    $(".ftco-section").hide()
    $(".update-section").hide()
  }else {
    $(".signin-container").hide()
    $(".signup-container").hide()
    $(".navbar-brand").show()
    $(".table-todos").show()
    $(".ftco-section").hide()
    $(".update-section").hide()
    getTodo()
  }
}

  // login
function login() {
  const email = $("#signin-email").val()
  const password = $("#signin-pass").val()
  $.ajax({
    method:"POST",
    url: base_url + "users/login",
    data: {
      email,
      password
    }
  }).done(response => {
    localStorage.setItem("accessToken", response.accessToken)
    beforeLogin()
  }).fail((xhr, text) => {
    console.log(xhr, "----");
    console.log(text, "====");
  }).always(_ => {
    $("#login-form").trigger("reset")
  })
}

//register

function register() {
  const email = $("#email").val()
  const password = $("#pass").val()
  $.ajax({
    method:"POST",
    url: base_url + "users/register",
    data: {
      email,
      password
    }
  }).done(response => {
    beforeLogin()
  }).fail((xhr, text) => {
    console.log(xhr, "----");
    console.log(text, "====");
  }).always(_ => {
    $("#signup-form").trigger("reset")
  })
}

  // get todo

function getTodo() {
  $.ajax({
    method: "GET",
    url: base_url + "todos",
    headers: {
      token: localStorage.getItem("accessToken")
    }
  }).done(response => {
    $("#tr").empty()
    response.forEach(el => {
      
      let status
      (el.status) ? status = "Done" : status = "Not Finished"

      $("#tr").append(
        `
        <tr>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.due_date}</td>
        <td>${status}</td>
        <td>

          <button class="w3-button w3-right w3-yellow" id= "edit-button" onclick= "updateTodo(${el.id})" >edit</button>
          <button class="w3-button w3-right w3-green" onclick= "doneTodo(${el.id})">done</button>
          <button class="w3-button w3-right w3-red" onclick= "deleteTodo(${el.id})">delete</button>
        </td>
        <tr>`
      )
    });
  }).fail((xhr, text) => {
    console.log(xhr);
    console.log(text);
  })
}

// add todo
function addTodo() {
  const title = $("#title").val()
  const description = $("#description").val()
  const status = $("#status").val()
  const due_date = $("#due_date").val()
  $.ajax({
    method: "POST",
    url: base_url + "todos",
    headers: {
      token: localStorage.getItem("accessToken")
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  }).done(response => {
    console.log(response);
    beforeLogin()
  }).fail((xhr, text) => {
    console.log(xhr, text);
  })
}

// update status todo

function doneTodo(id) {
  $.ajax({
    method: "PATCH",
    url: base_url + "todos/" + id,
    headers: {
      token: localStorage.getItem("accessToken")
    },
    data: {status: true}
    
  }).done(response => {
    getTodo()
  }).fail((xhr, text) => {
    console.log(xhr, text);
  })
}


//find todo
// function findTodo(id) {
  // $.ajax({
  //   method: "GET",
  //   url: base_url + "todos/" + id,
  //   headers: {
  //     token: localStorage.getItem("accessToken")
  //   }
    
  // }).done(response => {
//     console.log(response);
//     let id = response.id
    // $("#update-title").val(response.title)
    // $("#update-description").val(response.description)
    // $("#update-status").val(`${response.status}`)
    // $("#update-due_date").val(response.due_date.slice(0, 10))
    // $(".table-todos").hide()
    // $(".update-section").show()
//     // return id

//   }).fail((xhr, text) => {
//     console.log(xhr, text);
//   })
// }


//update todo
// function updateTodo(id) {
//   const title = $("#update-title").val()
//   const description = $("#update-description").val()
//   const status = $("#update-status").val()
//   const due_date = $("#update-due_date").val()
//   findTodo(id)
//   console.log(findTodo(id), "*****************************")
//   $.ajax({
//     method: "PUT",
//     url: base_url + "todos/" + id,
//     headers: {
//       token: localStorage.getItem("accessToken")
//     },
//     data: {
//       title,
//       description,
//       status,
//       due_date
//     }
//   }).done(response => {
//     console.log(response);
//     getTodo()
//   }).fail((xhr, text) => {
//     console.log(xhr, text);
//   })
// }


// coba update todo

function updateTodo(id) {
  // login()
  $.ajax({
    method: "GET",
    url: base_url + "todos/" + id,
    headers: {
      token: localStorage.getItem("accessToken")
    }
    
  }).done(response => {
    console.log(response);
    $(".table-todos").hide()
    $(".update-section").show()
    $("#update-title").val(response.title)
    $("#update-description").val(response.description)
    $("#update-status").val(`${response.status}`)
    $("#update-due_date").val(response.due_date.slice(0, 10))

     $.ajax({
      method: "PUT",
      url: base_url + "todos/" + response.id,
      headers: {
        token: localStorage.getItem("accessToken")
      },
      data: {
        title: $("#update-title").val(),
        description: $("#update-description").val(),
        status: $("#update-status").val(),
        due_date: $("#update-due_date").val()
      }
    })
  }).done(_ => {
    // beforeLogin()

  }).fail((xhr, text) => {
    console.log(xhr,text);
  })
}

//delete todo

function deleteTodo(id) {
  $.ajax({
    method: "DELETE",
    url: base_url + `todos/${id}`,
    headers: {
      token: localStorage.getItem("accessToken")
    }
  }).done(_ => {
    $(".deleteTodo").remove()
    getTodo()
  }).fail((xhr, text) => {
    console.log(xhr, text);
  })
}

// logout
function logout() {
  localStorage.removeItem("accessToken")
}


// signup click
$(".signup-image-link").click(() => {
  $(".signin-container").hide()
  $(".signup-container").show()
})

// signin click
$(".signin-image-link").click(() => {
  $(".signin-container").show()
  $(".signup-container").hide()
})

//add todo click
$(".w3-bar").click(() => {
  $(".table-todos").hide()
  $(".ftco-section").show()
}) 





$(document).ready(() => {
  beforeLogin()
  $(".signin-form").on("submit", (e) => {
    e.preventDefault()
    login()
  })
  $(".row").on("submit", (e) => {
    e.preventDefault()
    login()
  })
  $(".navbar-brand").on("click", (e) => {
    e.preventDefault()
    beforeLogin()
  })
  $(".signup").on("submit", (e) => {
    e.preventDefault()
    register()
  })
  $(".row1").on("submit", (e) => {
    e.preventDefault()
    console.log(localStorage);
    // login()
    beforeLogin()
  })


})