const {
  authentication,
  onSignIn,
  login,
  register,
  getUsers,
  getAccount,
  signOut
} = require("./account")

function deleteTodo(todoId) {
  console.log(todoId)
  $.ajax({
      url: baseUrl + `/todos/${todoId}`,
      method: "DELETE",
      headers: { access_token: localStorage.access_token }
    })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}


function getTodos() {
  $.ajax({
      url: baseUrl + "/todos",
      method: "GET",
      headers: { access_token: localStorage.access_token }
    })
    .done(response => {
      $("#todo-container").empty();

      response.forEach((todo, i) => {
        let bgColor;
        if(todo.status === "incomplete") {
          bgColor = "red";
        } else {
          bgColor = "green";
        }
        let dateTimeFormatted = new Date(todo.due_date).toUTCString()
        dateTimeFormatted = dateTimeFormatted.slice(0, dateTimeFormatted.length-13)
        $("#todo-container").append(`
        <div class="card text-center" style="margin: 10px 0;">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs justify-content-between">
                    <li class="nav-item">
                        <h4 class="nav-link active" aria-current="true" id="todo-detail_${todo.id}">Todo</h4>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="todo-member-tab_${todo.id}">Member</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-info text-end" id="edit-status-btn_${todo.id}_${todo.status}">A</a>
                        <a class="btn btn-warning text-end" id="edit-btn_${todo.id}">Edit</a>
                        <a class="btn btn-danger text-end" id="delete-btn_${todo.id}">Delete</a>
                    </li>
                </ul>
            </div>
          <div id="todo-container-body${todo.id}">
              <div class="card-body text-start">
                  <h5 class="card-title">
                        ${todo.title}
                        <span
                        style="background-color: ${bgColor}; border-radius: 3px; padding: 0 5px;"
                        >${todo.status}</span>
                  </h5>
                  <p class="card-text">${todo.description}</p>
                  <div class="text-end">
                    <div class="text-start">
                        <strong>Author:</strong> ${todo.Users[0].email} <strong>Due to:</strong> ${dateTimeFormatted}
                    </div>
                  </div>
              </div>
          </div>
        </div>
    `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}


function addTodo(from) {
  let title, due_date, description;
  if(from === "recommendation") {
    const animeTitle = localStorage.anime_title;
    const animeEpisode = localStorage.anime_episode;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    title = `watch ${animeTitle}`
    due_date = currentDate
    description = `total of ${animeEpisode} episodes on ${animeTitle} to watch`
  } else {
    title = $("#title-add-todo").val();
    due_date = $("#date-add-todo").val();
    description = $("#description-add-todo").val();
  }
  $.ajax({
      url: baseUrl + "/todos",
      method: "POST",
      headers: { access_token: localStorage.access_token },
      data: { title, description, due_date }
    })
    .done(response => {
      $("#add-todo-area").hide();
      getTodos();
    })
    .fail((err) => {
      console.log(err)
    })
}



function updateTodo(id) {
  const title = $(`#title-edit-todo${id}`).val();
  const description = $(`#description-edit-todo${id}`).val();
  const due_date = $(`#date-edit-todo${id}`).val();
  $.ajax({
      url: baseUrl + `/todos/${id}`,
      method: "PUT",
      headers: { access_token: localStorage.access_token },
      data: { title, description, due_date }
    })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}

function patchTodo(id, status) {
  $.ajax({
      url: baseUrl + `/todos/${id}`,
      method: "PATCH",
      headers: { access_token: localStorage.access_token },
      data: { status }
    })
    .done(response => {
      authentication();
    })
    .fail(err => {
      console.log(err)
    })
}

async function getDashboard() {
  try {
    $("#dashboard-area").show();
    getTodos();
    getUsers();
    getAccount();
  } catch (err) {
    console.log(err)
  }
}


function getTodoMember(id) {
  $.ajax({
    url: baseUrl + "/todos/"+id,
    method: "POST",
    headers: { access_token: localStorage.access_token }
  })
}

module.exports = {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  patchTodo,
  getDashboard,
  getTodoMember
}