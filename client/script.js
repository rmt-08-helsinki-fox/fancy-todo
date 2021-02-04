

const base_url = "http://localhost:3000/"
    $('#register-page').hide()
    $('#addTodo').hide()
    
    function authenticate() {
      if (!localStorage.getItem("token")) {
        $('#login-page').show()
        $('#addTodo').hide()
        $('#todoCard').hide()
        $('nav.navBar').hide()

      } else {
        $('#login-page').hide()
        $('#todoCard').show()
        $('#navBar').show()
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
        alert(xhr.responseJSON.error)
        console.log(base_url);
        console.log(xhr, text);
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
        alert(xhr.responseJSON.error)
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




    function getAllTodos() {
      //console.log(localStorage.getItem("token"));
      $.ajax({
        url: base_url + 'todos',
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .done(response => {
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
          <div id="card-${value.id}">
          <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${value.title}</span>
                <p>${value.description}</p>
                  <br>
                  <p>status: ${status} </p>
                </div>
                <div class="card-action">

                  <a href="#"> <button class="btn">edit</button> </a>
                  <a href="#"> <button class="btn red" onclick="destroy(${value.id})">delete</button></a>
                </div>
              </div>
            </div>
          </div>
          </div>
          `)

        })
        

        //console.log(response, 'maskkk');
      })
      .fail((xhr, text)=>{
        console.log(xhr, text);
      })
    }

    // //edit todo
    // function editTodo() {
    //   $.ajax({
    //     url: base_url + 'todo',
    //     method: "PUT",
    //     headers: {
    //       token: localStorage.getItem("token")
    //     }
    //   })
    //   .done(response => {
    //     console.log(respone);
    //   })
    //   .fail((xhr, text)=>{
    //     console.log(xhr, text);
    //   })
    // }

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
      // var profile = googleUser.getBasicProfile();
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      //console.log(id_token);
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

      $('#register-form').on('submit', (event) => {
        event.preventDefault()
        register()
        
      })

      $("#addTodoBtn").on('click', (event)=> {
        event.preventDefault()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#todoCard').hide()
        $('#addTodo').show()
      })
      $("#myTodo").on('click', (event)=>{
        event.preventDefault()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#todoCard').show()
        $('#addTodo').hide()
      })


      $('#addNewTodo').on('click', (event)=>{
        event.preventDefault()
        console.log('masukk addnew todo');
        addNewTodo()
        $('#addTodo').hide()
        
      })

      $('#logout').on('click', (event)=> {
        logout()
        
      })
    })
