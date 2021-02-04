    
    const base_url = "http://localhost:3000/"
    
    $(document).ready(() => {
      auth()
      $("#login-form").on("submit", (e) => {
        e.preventDefault()
        login()
      })
      
      $("#register-form").on("submit", (e) => {
        e.preventDefault()
        register()
      })
      
      $("#addTodo-form").on("submit", (e) => {
        e.preventDefault()
        addTodo()
      })
      
      $("#update-form").on("submit", (e) => {
        e.preventDefault();
        update(e.id);
      })
      
      $("#nav-logout").on("click", (e) => {
        e.preventDefault()
        logout()
      })
    })
    
    function auth() {
      if (!localStorage.getItem("accessToken")) {
        
        $("#row-login").show()
        $("#nav-logout").hide()
        $("#row-register").hide()
        $("#addTodo").hide()
        $("#row-addTodo").hide()
        
      } else {
        $("div").removeClass("modal-backdrop show") // HANDLE AFTER SUBMIT MODAL
        $("#row-login").hide()
        $("#row-register").hide()
        $("#nav-login").hide()
        $("#addTodo").hide()
        $("#nav-logout").show()
        $("#row-addTodo").show()
        getReadMyTodos()
      }
    }
    
    function login() { // login-form
      const email = $("#inputLoginEmail").val()
      const password = $("#inputLoginPassword").val()
      $.ajax({
        url: base_url + "users/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
      .done((response) => {
        localStorage.setItem("accessToken", response.accessToken)
        auth()
        alert('yey')
      })
      .fail((xhr, text) => {
        console.log(xhr, text)
        swalFail(xhr.responseJSON.error)
      })
      .always(() => {
        $("#login-form").trigger("reset")
      })
    }
    
    function register() {
      const email = $("#inputRegisterEmail").val()
      const password = $("#inputRegisterPassword").val()
      console.log(email, password);
      $.ajax({
        url: base_url + "users/register",
        method: "POST",
        data: {
          email,
          password
        }
      })
      .done((response) => {
        console.log(response);
        auth()
      })
      .fail((xhr, text) => {
        console.log(xhr, text)
        swalFail(xhr.responseJSON.error)
      })
      .always(() => {
        $("#register-form").trigger("reset")
      })
    }
    
    
    function getReadMyTodos() {
      $.ajax({
        url: base_url + "todos/readMyTodos",
        method: "GET",
        headers: {
          token: localStorage.getItem("accessToken")
        }
      })
      .done((todos) => {   
        $("#todoList").empty()
        todos.forEach(el => {
          $("#todoList").append(`
          <div class="input-group mb-3" id="todo-${el.id}">
            <div class="card col">
              <div class="card-body">
                <div>
                  <button type="button" data-toggle="modal" data-target="#modal-todo-${el.id}" class="btn fas fa-pencil-alt text-info border border-info float-right m-1"></button>
                  <a href="#" onclick="swalDelete(${el.id})" class="btn fas fa-trash-alt text-danger border border-danger float-right m-1"></a>
                  <h3 class="card-title">${el.title}</h3>
                  <h6 class="card-subtitle mb-2 text-muted">${el.due_date}</h6>
                  <p class="card-text">${el.description}</p>
                  <p class="card-text">${el.status}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modal -->
          <div class="modal" id="modal-todo-${el.id}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal ${el.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form action="">
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="inputModalTitle-${el.id}">Title</label>
                      <input type="text" class="form-control" id="inputModalTitle-${el.id}" value="${el.title}" required>
                    </div>
                    <div class="form-group">
                      <label for="inputModalDescription-${el.id}">Description</label>
                      <input type="text" class="form-control" id="inputModalDescription-${el.id}" value="${el.description}" required>
                    </div>
                    <div class="form-group">
                      <label for="inputModalStatus-${el.id}">Status</label>
                      <select class="form-control" id="inputModalStatus-${el.id}" required>
                        <option value="" selected>Choose</option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="inputModalDuedate-${el.id}">Due Date</label>
                      <input type="date" class="form-control" id="inputModalDuedate-${el.id}" value="${el.due_date}" required>
                      
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="update(${el.id})">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          `)
        })
      })
      .fail((xhr, text) => {
        console.log(xhr,text);
        swalFail(xhr.responseJSON.error)
      })
      
    }
    
    function addTodo() {
      const title = $("#titleAdd").val()
      const description = $("#descriptionAdd").val()
      const status = $("#statusAdd").val()
      const due_date = $("#dueDateAdd").val()
      console.log(due_date);
      
      $.ajax({
        url: base_url + "todos",
        method: "POST",
        headers: {
          token: localStorage.getItem("accessToken")
        },
        data: {
          title,
          description,
          status,
          due_date
        }
      })
      .done((todo) => {
        $("#todoList").append(`
        <div class="input-group mb-3" id="todo-${todo.id}">
          <div class="card col">
            <div class="card-body">
              <div>
                <button type="button" data-toggle="modal" data-target="#modal-todo-${todo.id}" class="btn fas fa-pencil-alt text-info border border-info float-right m-1"></button>
                <a href="#" onclick="swalDelete(${todo.id})" class="btn fas fa-trash-alt text-danger border border-danger float-right m-1"></a>
                <h3 class="card-title">${todo.title}</h3>
                <h6 class="card-subtitle mb-2 text-muted">${todo.due_date}</h6>
                <p class="card-text">${todo.description}</p>
                <p class="card-text">${todo.status}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal -->
        <div class="modal" id="modal-todo-${todo.id}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal ${el.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form action="">
                <div class="modal-body">
                  <div class="form-group">
                    <label for="inputModalTitle-${todo.id}">Title</label>
                    <input type="text" class="form-control" id="inputModalTitle-${todo.id}" value="${todo.title}" required>
                  </div>
                  <div class="form-group">
                    <label for="inputModalDescription-${todo.id}">Description</label>
                    <input type="text" class="form-control" id="inputModalDescription-${todo.id}" value="${todo.description}" required>
                  </div>
                  <div class="form-group">
                    <label for="inputModalStatus-${todo.id}">Status</label>
                    <select class="form-control" id="inputModalStatus-${todo.id}" required>
                      <option value="" selected>Choose</option>
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="inputModalDuedate-${todo.id}">Due Date</label>
                    <input type="date" class="form-control" id="inputModalDuedate-${todo.id}" value="${todo.due_date}" required>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="update(${todo.id})">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        `)          
      })
      .fail((xhr, text) =>{
        console.log(xhr, text)
        swalFail(xhr.responseJSON.error)
      })
      .always(() => {
        $("#addTodo-form").trigger("reset")
      })
    }
    
    function update(id) {
      const title = $(`#inputModalTitle-${id}`).val()
      const description = $(`#inputModalDescription-${id}`).val()
      const status = $(`#inputModalStatus-${id}`).val()
      const due_date = $(`#inputModalDueDate-${id}`).val()
      console.log(due_date);
      $.ajax({
        url: base_url + "todos/" + id,
        method: "PUT",
        headers: {
          token: localStorage.getItem("accessToken")
        },
        data: {
          title,
          description,
          status,
          due_date
        }
      })
      .done((response) => {
        console.log(response);
        auth()
      })
      .fail((xhr, text) => {
        swalFail(xhr.responseJSON.error)
      })
    }
    
    function swalFail(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
    }
    
    function swalDelete(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: base_url + "todos/" + Number(id),
            method: "DELETE",
            headers: {
              token: localStorage.getItem("accessToken")
            }
          })
          .done(() => {
            $(`#todo-${id}`).remove(),
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
              )
            })
            .fail((xhr, text) => {
              console.log(xhr, text);
              swalFail(xhr.responseJSON.error)
            })
          }
        })
      }
      
      
      function logout() { // nav-logout
        console.log("logout");
        localStorage.clear()
        auth()
      }
      
      function navLogin() { // nav-logout
        auth()
      }
      
      function anchorRegister() {
        $("#row-login").hide()
        $("#row-register").show()
      }
      
      function anchorLogin(){
        auth()
      }
      
      function addTodoForm() { // button Add Todo Form
        $("#addTodo").show()
      }
      
      function cancleAdd(e) { // button Cancel add todo form
        e.preventDefault()
        $("#addTodo").hide()
      }