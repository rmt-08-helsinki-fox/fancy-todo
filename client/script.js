const base_url = "http://localhost:5000/";

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  $.ajax({
    url: base_url+"user/googlelogin",
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
  .done(res => {
    console.log(res);
    localStorage.setItem("access_token", res.access_token);
    auth()
  })
  .fail(err => {
    console.log(err)
  } )
}

function auth() {
  if (!localStorage.getItem("access_token")) {
    $("#navbar-logout").show();
    $("#navbar-login").hide();
    $("#loginContainer").show();
    $("#registerContainer").hide();
    $("#kanban").hide();
  } else {
    getTodos();
    $("#navbar-logout").hide();
    $("#navbar-login").show();
    $("#loginContainer").hide();
    $("#registerContainer").hide();
    $("#kanban").show();
  }
}

function getRegisterPage() {
  $("#navbar-logout").show();
  $("#navbar-login").hide();
  $("#loginContainer").hide();
  $("#registerContainer").show();
  $("#kanban").hide();
}

function postLogin() {
  const email = $("#emailLogin").val();
  const password = $("#passwordLogin").val();
  console.log(email, password);
  $.ajax({
    url: base_url+"user/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
      auth();
    })
    .fail((xhr, test) => {
      console.log(xhr, test);
    })
    .always((_) => {
      console.log("always");
      $("#loginEmail").val("");
      $("#loginPassowrd").val("");
      // atauuu
      // $("#login-form").trigger("reset");
    });
}

function postRegister() {
  const email = $("#emailLogin").val();
  const password = $("#passwordLogin").val();
  console.log(email, password);
  $.ajax({
    url: base_url + "user/register",
    method: "POST",
    body: {
      email,
      password,
    },
  })
    .done((response) => {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
      auth();
    })
    .fail((xhr, test) => {
      console.log(xhr, test);
    })
    .always((_) => {
      console.log("always");
      $("#loginEmail").val("");
      $("#loginPassowrd").val("");
      // atauuu
      // $("#login-form").trigger("reset");
    });
}

function getTodos() {
  $.ajax({
    url: base_url + "todos",
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token"),
    },
  })  
    .done((todos) => {
      console.log(todos);
      $("#todo-list").empty(); //nanti ada doing-list, done-list
      todos.forEach((value) => {
        //next 
        $("#todo-list").append(`
          <!--start per task / mau loop-->
          <div class="card mb-3 bg-light">
            <div class="card-body p-3">
              <div class="float-end mr-n2">

                <!--action button disini-->
                <div class="mb-3">
                  <a id="del-task-${value.id}" href="#" class="btn btn-outline-danger btn-sm"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>
                  </a>
                </div>
                <div class="mb-3">

                  <a id="edit-task-${value.id}" href="#" class="btn btn-outline-primary btn-sm"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                  </a>
                </div>
              </div>
                    
              <h5><!--taskname-->${value.title}</h5>
              <p><!--task desc-->${value.description}</p>
              <a href="" class="btn btn-outline-secondary btn-sm"
                >${value.status}</a>
              <a href="" class="btn btn-outline-secondary btn-sm"
              >due-date:${value.due_date}</a>
            </div>
          </div>
        `);
      });
    })
    .fail((xhr, text) => {
      console.log(xhr, text)
    })
    .always((_) => {
      console.log('always getTodos')
    })
}

function deleteTodo(id) {
  $.ajax({
    url: base_url + "todos/" + id,
    method: "delete",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
  .done((_) => {
    $(`#kasur-${id}`).remove();
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
}

function logout() {
  localStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  auth();
}

$(document).ready(() => {
  auth();
  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    postLogin();
  });

  
  $("#gotoregister").on("click", (e) => {
    e.preventDefault();
    getRegisterPage();
  })

  $("#register-form").on("submit", (e) => {
    e.preventDefault();
    postRegister();
  });
  
  $("#navbar-register-button").on("click", (e) => {
    e.preventDefault();
    getRegisterPage();
  })
  
  $("#navbar-login-button").on("click", (e) => {
    e.preventDefault();
    auth();
  })
  
  $("#navbar-logout-button").on("click", (e) => {
    e.preventDefault();
    logout();
  });
  

});
// $("#tulisan").on(click);

// if (localStorage.getItem("access_token")) {
// }
