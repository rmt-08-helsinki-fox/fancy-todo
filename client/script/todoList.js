function fetchTodo(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $('#list-todo').empty()
    $('#done-todo').empty()
    if(response.length === 0){
      $('#status').show()
      $('#list-todo').hide()
      $('#done-todo').hide()
      $('#home-page').hide()
    } else {
      $('#status').hide()
      $('#list-todo').append(`
        <div id="active-todo" class="d-flex justify-content-between">
          <h2>Active Todo</h2>
          <button onclick="formAdd()" class="addTodoBtn2 btn_clear btn btn-success">Add</button>
        </div>
        <hr>
      `)
      $('#done-todo').append(`
        <div id="done" class="d-flex justify-content-between">
          <h2>Done</h2>
          <button onclick="bulkDelete(event)" class="btn_clear btn btn-danger" id="clearBtn">Clear</button>
        </div>
        <hr>
      `)
      response.forEach((el)=>{
        if(el.status === false) {
          $('#list-todo').append(`
            <div class="card text-dark bg-warning mb-3 shadow" style="max-width: 18rem;  min-width: 30rem; min-height: 15rem;">
              <div class="card-header d-flex justify-content-between">
                  <p id="due_date">Due date: ${new Date(el.due_date).toString().slice(0,15)}</p>
                  <input type="checkbox" id="checkbox" onclick="getTodoByIdForUpdateStatus(${el.id}, event)">
              </div>
              <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.description}</p>
                <a href="" onclick="getTodoById(${el.id},${el.status},event)"><i id="edit-icon" class="medium material-icons">edit</i></a>
                <a href="" onclick="deleteTodo(${el.id},event)"><i id="delete-icon" class="medium material-icons">delete</i></a>
              </div>
            </div>
          `)
        } else {
          $('#done-todo').append(`
            <div class="card text-dark bg-warning mb-3 shadow" style="max-width: 18rem; min-width: 30rem; min-height: 15rem;">
              <div class="card-header d-flex justify-content-between">
                <p id="due_date">Due date: ${new Date(el.due_date).toString().slice(0,15)}</p>
                <input type="checkbox" id="checkbox" checked onclick="getTodoByIdForUpdateStatus(${el.id}, event)">
              </div>
              <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.description}</p>
              </div>
            </div>
          `)
        }
      })
    }
  })
  .fail((jqXHR, textStatus)=>{
    console.log(jqXHR, textStatus)
  })
}