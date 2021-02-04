const base_url = "http://localhost:3000";

// jQuery
$(document).ready(() => {
  auth();

  // Button Submit
  $("#register").on("submit", (e) => {
    e.preventDefault();
    register();
  });

  $("#login").on("submit", (e) => {
    e.preventDefault();
    login();
  });

  $("#addTodo").on("submit", (e) => {
    e.preventDefault();
    createTodo();
  });

  // Anchor
  $("#link-login").click((e) => {
    e.preventDefault();
    showLogin();
  });
  $("#link-register").click((e) => {
    e.preventDefault();
    showRegis();
  });
  $("#link-logout").click((e) => {
    e.preventDefault();
    logout();
  });
  $("#link-addTodo").click((e) => {
    e.preventDefault();
    showTodoForm();
  });
});

// Auth
function auth() {
  if (!localStorage.getItem("access_token")) {
    $("#link-login").show(500);
    $("#link-register").show(500);
    $("#link-logout").hide(500);
    $("#form-register").hide(500);
    $("#form-login").hide(500);
    $("#todo-table").hide(500);
    $("#form-add-todo").hide(500);
  } else {
    $("#img").empty();
    $("#list-todo").empty();
    $("#empty-message").remove();
    $("#form-register").hide(500);
    $("#form-login").hide(500);
    $("#link-logout").show(500);
    $("#link-login").hide(500);
    $("#link-register").hide(500);
    $("#todo-table").show(500);
    $("#img").append(
      `<img src="${localStorage.getItem(
        "url_img"
      )}"class="card-img-top" alt="status weather" style="width: 2rem;">`
    );
    $("#form-add-todo").hide(500);
    getListTodo();
  }
}

// Register
function register() {
  const email = $("#regisEmail").val();
  const password = $("#regisPass").val();
  const location = $("#regisLocation").val();
  $.ajax({
    url: base_url + "/users/register",
    method: "POST",
    data: {
      email,
      password,
      location,
    },
  })
    .done((response) => {
      console.log(response);
      showLogin();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(() => {
      console.log("hallo always");
    });
}

// Login
function login() {
  const email = $("#loginEmail").val();
  const password = $("#loginPass").val();
  $.ajax({
    url: base_url + "/users/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("url_img", response.weather.url_img[0]);
      localStorage.setItem("access_token", response.access_token);

      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(() => {
      $("#login").trigger("reset");
    });
}

// HTTP Request
function getListTodo() {
  $.ajax({
    url: base_url + "/todos",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(({ todos }) => {
      todos.forEach((el, i) => {
        $("#list-todo").append(`
              <tr class="table-info" >
                <td>${i + 1}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date}</td>
                <td>
                   <a class="btn btn-primary" onclick="remove(${
                     el.id
                   })" href="#">Delete</a>
                   <a class="btn btn-primary" onclick="update(${
                     el.id
                   })" href="#">Update</a>
                   <a class="btn btn-primary" onclick="complete(${
                     el.id
                   })" href="#">Complete</a>
                </td>
              </tr>
              `);
      });
    })
    .fail((xhr, text) => {
      $("#todo-table").append(
        `<h4 class="text-center" id="empty-message">Todo Data is Empty</h4>`
      );
      console.log(xhr, text);
    });
}

function createTodo() {
  const title = $("#todoTitle").val();
  const description = $("#todoDesc").val();
  const status = $("#todoStatus").val();
  const due_date = $("#todoDueDate").val();

  $.ajax({
    url: base_url + "/todos",
    method: "POST",
    data: {
      title,
      description,
      status,
      due_date,
    },
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      $("#img").empty();
      $("#list-todo").empty();
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always(() => {
      $("#addTodo").trigger("reset");
    });
}

// Other Function
function showLogin() {
  $("#link-register").show();
  $("#form-register").hide(500);
  $("#form-login").show(1500);
}

function showRegis() {
  $("#link-login").show();
  $("#form-login").hide(500);
  $("#form-register").show(1500);
}

function logout() {
  $("#img").empty();
  localStorage.clear();
  auth();
}

function showTodoForm() {
  $("#todo-table").hide(500);
  $("#form-add-todo").show(1000);
}

function remove(id) {
  $.ajax({
    url: base_url + "/todos/" + id,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(() => {
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    });
}
