

const base_url = "http://localhost:3000/"
    $('#register-page').hide()
    $('#addTodo').hide()
    $('#putTodo').hide()

    function authenticate() {
      if (!localStorage.getItem("token")) {
        $('#login-page').show()
        $('#addTodo').hide()
        $('#todoCard').hide()
        $('nav.navBar').hide()

      } else {
        $('#login-page').hide()
        $('#todoCard').show()
        $('nav.navBar').show()
        getAllTodos()
      }
    }

    function login() {
      const email = $('#emailLogin').val();
      const password = $('#passwordLogin').val();
      $.ajax({
        url: base_url + "user/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
      .done((response) => {
        //console.log(response, 'ini responseee');
        localStorage.setItem('token', response.token)
        authenticate()

      })
      .fail((xhr, text) => {
        let timerInterval
          Swal.fire({
            title: xhr.responseJSON.error,
            html: 'please check your credentials!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        //alert(xhr.responseJSON.error)
        //console.log(xhr, text);
      })
      .always(()=>{
        $('emailLogin').val("")
        $('passwordLogin').val("")
      })
    }

    function register() {
      const email = $('#emailRegister').val();
      const password = $('#passwordRegister').val();
      $.ajax({
        url: base_url + "user/register",
        method: "POST",
        data: {
          email,
          password
        }
      })
      .done((response) => {
        $('#register-page').hide()
        $('#login-page').show()
        //console.log(response, 'ini responseee');
        //localStorage.setItem('token', response.token)
        //authenticate()

      })
      .fail((xhr, text) => {
        let timerInterval
          Swal.fire({
            title: xhr.responseJSON.error,
            html: 'please check your credentials!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        //alert(xhr.responseJSON.error)
        console.log(base_url);
        console.log(xhr, text);
      })
      .always(()=>{
        $('emailRegister').val("")
        $('passwordRegister').val("")
      })
    }
    
    function addNewTodo() {
      const title = $('#title').val()
      const description = $('#description').val()
      const due_date = $('#due_date').val()
      $.ajax({
        url: base_url + 'todos',
        method: "POST",
        data: {
          title,
          description,
          due_date,
        },
        headers: {
          token: localStorage.getItem('token')
        }
        
      })
      .done((data)=>{
        //console.log(data);
        authenticate()
      })
      .fail((xhr, text)=>{
        alert(xhr.responseJSON.error)
        console.log(xhr, text);
      })
    }

    function findTodoById() {
      let id = $('#searchById').val()
      $.ajax({
        url: base_url + 'todos/' + id,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .done(todo => {
        console.log(todo);
        $('#searchById').append('')
      })
      .fail((xhr, text) => {
        console.log(xhr, text);
      })
    }

    function getAllTodos() {
      $.ajax({
        url: base_url + 'todos',
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .done(response => {
        $('#todoCard').empty()
        $("#todoCard").prepend(`
        <div class="row">
          <div class="col s12 m5">
            <div class="card-panel teal">
              <span class="white-text"><q>${response[0].content}</q>
              </span>
              <p class="white-text">-${response[0].author}</p>
            </div>
          </div>
        </div>
        `)
        response[1].forEach(value =>{
          const status = value.status == true ? "Done" : 'Not Done'
          $("#todoCard").append(`
          <div id="card-${value.id}" >
          <div class="row" >
          <div class="col s12 m6" >
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${value.title}</span>
                <p>${value.description}</p>
                  <br>
                  <p>status: ${status} </p>
                  <p>due date: ${value.due_date.split('T')[0]}</p>
                </div>
                <div class="card-action">
                  <a href="#"> <button class="btn" onclick="patchTodo(${value.id})">mark as done</button> </a>
                  <a href="#"> <button class="btn" onclick="editTodo(${value.id})">edit</button> </a>
                  <a href="#"> <button class="btn red" onclick="destroy(${value.id})">delete</button></a>
                </div>
              </div>
            </div>
          </div>
          </div>
          `)
        })
      })
      .fail((xhr, text)=>{
        console.log(xhr, text);
      })
    }

    
    function editTodoPost(id) {
      let title = $('#editTitle').val()
      let description = $('#editDescription').val()
      let due_date = $('#editDue_date').val()
      let status = $('input[name="editStatus"]:checked').val();
      //console.log(title, description, due_date, status);
      $.ajax({
        url: base_url + 'todos/' + id,
        method: "PUT",
        data: {
          title,
          description,
          due_date,
          status
        },
        headers : {
          token: localStorage.getItem("token")
        }
      })
      .done(response => {
        $('#putTodo').empty()
        authenticate()
      })
      .fail((xhr, text) => {
        console.log(xhr, text);
      })
    }

    //edit todo
    //finone -> patch

    
    function patchTodo(id) {
      $.ajax({
        url: base_url + "todos/" + id,
        method: "PATCH",
        data: {
          status: true
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .done(response => {
        authenticate()
      })
      .fail((xhr, text) => {
        console.log(xhr, text);
      })
    }


    function editTodo(id) {
      $('#putTodo').show()
      $('#putTodo').empty()
      $.ajax({
        url: base_url + 'todos/' + id,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .done(response => {
        const statusTrue = response.status == true ? "checked" : ''
        const statusFalse = response.status == false ? "checked" : ''
        console.log(statusTrue);
        console.log(statusFalse);

        $('#todoCard').hide()
        $('#putTodo').append(`
        <form>
        <div class="row">
            <div class="input-field col s6">
              <input id="editTitle" type="text" class="validate" name="editTitle"  value="${response.title}">
              <label class="active" for="editTitle" >Edit Title</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="editDescription" type="text" class="validate" name="editDescription" value="${response.description}">
              <label class="active" for="Edit Description">edit Description</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="editDue_date" type="date" class="validate" name="editDue_date" value="${response.due_date.split('T')[0]}">
              <label class="active" for="editDue_date">Edit due date</label>
            </div>
          </div>

          <label class="active" for="editStatus" >Edit Status </label>
              <p>
                <label>
                  <input  name="editStatus" id="editStatus" type="radio" ${statusTrue}  value="true"/>
                  <span>Done</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="editStatus" type="radio" ${statusFalse} id="editStatus" value="false"/>
                  <span>Not Done</span>
                </label>
              </p>
          </div>
          <button id="editTodo" class="waves-effect waves-light btn" type="button" onclick="editTodoPost(${response.id})">Edit todo</button>
          <button id="cancelEdit" class="waves-effect waves-light btn" type="button" >Cancel</button>
          </form>
        `)
        console.log(response);
      })
      .fail((xhr, text) => {
        console.log(xhr, text);
      })
    }

    function destroy(id) {
      $.ajax({
        url: base_url + "todos/" + id,
        method: "DELETE",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .done(()=>{
        $(`#card-${id}`).remove()
      })
      .fail((xhr,text)=>{
        alert(xhr.responseJSON.error)
        console.log(xhr, text);
      })
    }


    function logout() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(()=>{
        console.log('User singed out');
      })

      authenticate()
    }
    function onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      $.ajax({
        url: base_url + 'user/googleLogin',
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
      .done(response=>{
        localStorage.setItem('token', response.token)
        //console.log(response);
        authenticate()
      })
      .fail(err => {
        console.log(err);
      })
    }

    //*********************************************************************************/
    $(document).ready(()=>{
      $('#register-page').hide()
      $('#login-page').show()
      authenticate()
      //show register/login
      $("button.switchbtn").on('click', (event)=> {
        $('#register-page').toggle()
        $('#login-page').toggle()
      })

      $('#login-form').on('submit', (event)=> {
        event.preventDefault()
        login()
      })

      $('#register-btn').on('click', (event) => {
        event.preventDefault()
        register()
      })

      $("#addTodoBtn").on('click', (event)=> {
        event.preventDefault()
        $('#putTodo').hide()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#todoCard').hide()
        $('#addTodo').show()
      })
      $("#myTodo").on('click', (event)=>{
        event.preventDefault()
        $('#putTodo').hide()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#todoCard').show()
        $('#addTodo').hide()
      })

      // $('a.editOneCard').on('click', (e)=> {
      //   $('#todoCard').hide()
      // })

      $('#addNewTodo').on('click', (event)=>{
        event.preventDefault()
        //console.log('masukk addnew todo');
        
        addNewTodo()
        $('#addTodo').hide()
        
      })

      $('#cancelEdit').on('click', (e) => {
        //console.log('masukl');
        e.preventDefault()
        $('#login-page').show()
        $('#addTodo').hide()
        $('#putTodo').hide()
        $('#todoCard').show()
      })

      $('#logout').on('click', (event)=> {
        logout()
      })
    })
