const baseUser = "https://fancy-todo-suryo.herokuapp.com/users/";
const baseTodo = "https://fancy-todo-suryo.herokuapp.com/todos"

        function authenticate(){
            if (!localStorage.getItem("access_token")){
                $("#register-form").show();
                $("#nav-login").show()
                $("#nav-register").show()
                $("#login-form").hide()
                $("#todo-form").hide()
                $("#todo-table-container").hide()
                $("#todo-table").hide()
                $("#nav-logout").hide()
                $("#nav-task").hide()
                $("#nav-weather").hide()
                $("#todo-form-edit").hide()
                $("#weather-form").hide()
                $("#row-weather2").hide()
            } else {
                $("#register-form").hide();
                $("#login-form").hide()
                $("#nav-login").hide()
                $("#nav-register").hide()
                $("#todo-form").hide()
                $("#todo-table").show()
                $("#todo-table-container").show()
                $("#nav-weather").show()
                $("#nav-logout").show()
                $("#nav-task").show()
                $("#todo-form-edit").hide()
                $("#weather-form").hide()
                $("#row-weather2").hide()
                getTodo();
            }
        }

        function logOut() {
          localStorage.clear()
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
          console.log('User signed out.');
          });
          authenticate()
        }

        function register(){
            const email = $("#register-email").val();
            const password = $("#register-password").val()
            $.ajax({
                url: baseUser + "register",
                method: "POST",
                data: {
                    email,
                    password
                }
            })
                .done((response) => {
                    $("p").remove(".error-message");
                    $("p").remove(".success-message");
                    $("#register").prepend(`<p class="success-message"><b style="color: green;">${response.msg}</b></p>`);
                    $("#register-form").hide();
                    $("#login-form").show()
                })
                .fail ((xhr, text) => {
                    let error = xhr.responseJSON.message[0]
                    $("p").remove(".error-message");
                    $("#register").prepend(`<p class="error-message"><b style="color: red;">${error}</b></p>`);
                })
                .always(() => {
                    $("#register").trigger("reset");
                })
        }

        function login(){
            const email = $("#login-email").val();
            const password = $("#login-password").val()
            $.ajax({
                url: baseUser + "login",
                method: "POST",
                data: {
                    email,
                    password
                }
            })
                .done((response) => {
                    localStorage.setItem("access_token", response.access_token)
                    authenticate()
                })
                .fail ((xhr, text) => {
                    let error = xhr.responseJSON.message[0]
                    $("p").remove(".error-message");
                    $("#login").prepend(`<p class="error-message"><b style="color: red;">${error}</b></p>`);
                })
                .always(() => {
                    $("#login").trigger("reset");
                })
        }

        function getTodo() {
            $.ajax({
                url: baseTodo,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .done((todo) => {
                    $("#todo-table").empty()
                    $("#todo-table").append(
                        `<thead id="table-head">
                            <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th colspan="3">Action</th>
                            </tr>
                        </thead>`
                    )
                    todo.forEach((element, indeks) => {
                        let dueDate = ""
                        for (let a = 0; a < element.due_date.length; a++){
                            dueDate += element.due_date[a]
                            if (element.due_date[a+1] === "T"){
                                break
                            }
                        }
                        let status;
                        if (element.status === true){
                            status = "Done"
                        } else {
                            status = "Not Done"
                        }
                        $("#todo-table").append(
                            `<tr>
                            <td>${indeks+1}</td>
                            <td>${element.title}</td>
                            <td>${element.description}</td>
                            <td>${status}</td>
                            <td>${dueDate}</td>
                            <td><a class="nav-link" href="#" id="mark-change" onclick="changeStatus(${element.id})">Change Status</a></td>
                            <td><a class="nav-link" href="#" id="mark-edit" onclick="changeAll(${element.id})">Edit</a></td>
                            <td><a class="nav-link" href="#" id="mark-delete" onclick="deleteTodo(${element.id})">Delete</a></td>
                            </tr>`
                        )
                    });
                    $("#todo-table").append(
                        `<tr>
                            <td colspan= "8"><button type="button" class="btn btn" id="todo-add" onclick="addTask()">Add New Task</button></td>
                        </tr>`
                    )
                })
                .fail((xhr, text) => {
                    console.log(xhr);
                })
                .always(() => {
                    console.log("always");
                })
        }

        function addTask(){
          $("p").remove(".error-message");
          $("#todo-form-edit").hide()
          $("#todo-table-container").hide()
          $("#todo-table").hide()
          $("#todo-form").show()
        }

        function changeAll(id){
            $.ajax({
                url: baseTodo + `/${id}`,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .done(response => {
                    let dueDate = ""
                    for (let a = 0; a < response.due_date.length; a++){
                        dueDate += response.due_date[a]
                        if (response.due_date[a+1] === "T"){
                            break
                        }
                    }
                    $("#todo-table-container").hide()
                    $("#todo-table").hide()
                    $("#todo-form-edit").show()
                    $("#todo-title-edit").val(response.title)
                    $("#todo-description-edit").val(response.description)
                    $(`#todo-status-edit option[value=${response.status}]`).attr('selected','selected');
                    $("#todo-date-edit").val(dueDate)
                    $("#todo-edit").on("submit", (e) => {
                        e.preventDefault()
                        let id = +response.id
                        let title = $("#todo-title-edit").val()
                        let description = $("#todo-description-edit").val()
                        let status = $("#todo-status-edit").val()
                        let due_date = $("#todo-date-edit").val()
                        $.ajax({
                            url: baseTodo + `/${id}`,
                            method: "PUT",
                            headers: {
                            access_token: localStorage.getItem("access_token")
                            },
                            data: {
                                title,
                                description,
                                status,
                                due_date
                            }
                        })
                            .done((response2) => {
                                $("#todo-form-edit").hide()
                                $("#todo-table-container").show()
                                $("#todo-table").show()
                                getTodo();
                            })
                            .fail ((xhr, text) => {
                                let error = xhr.responseJSON.message
                                $("p").remove(".error-message");
                                $("#todo-edit").prepend(`<p class="error-message"><b style="color: red;">${error}</b></p>`);
                            })
                            .always(() => {
                                console.log("always2");
                            })
                    })
                })
                .fail((xhr, text) => {
                    console.log(xhr);
                })
                .always(() => {
                    console.log("always1");
                })

        }

        function changeStatus(id){
            $.ajax({
                url: baseTodo + `/${id}`,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .done((response) => {
                    let status;
                    if (response.status === true){
                        status = false
                    } else {
                        status = true
                    }
                    $.ajax({
                    url: baseTodo + `/${id}`,
                    method: "PATCH",
                    headers: {
                    access_token: localStorage.getItem("access_token")
                    },
                    data: {
                        status
                    }
                    })
                })
                .done((response2) => {
                    getTodo();
                })
                .fail((xhr, text) => {
                    console.log(xhr);
                })
                .always(() => {
                    console.log("always");
                })
        }

        function deleteTodo(id) {
          $.ajax({
                url: baseTodo + `/${id}`,
                method: "DELETE",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .done((response) => {
                    getTodo()
                })
                .fail((xhr, text) => {
                    console.log(xhr);
                })
                .always(() => {
                    console.log("always");
                })
        }

        function addTodo(){
            const title = $("#todo-title").val();
            const description = $("#todo-description").val();
            const status = $("#todo-status").val();
            const due_date = $("#todo-date").val();
            console.log(status);
            $.ajax({
                url: baseTodo,
                method: "POST",
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    title,
                    description,
                    status,
                    due_date,
                }
            })
                .done((newTodo) => {
                    $("#todo-form").hide()
                    $("#todo-table-container").show()
                    $("#todo-table").show()
                    getTodo();
                })
                .fail ((xhr, text) => {
                    let error = xhr.responseJSON.message
                    $("p").remove(".error-message");
                    $("#todo").prepend(`<p class="error-message"><b style="color: red;">${error}</b></p>`);
                })
                .always(() => {
                    $("#todo").trigger("reset");
                })
        }

        function postWeather(){
          const location = $("#weather-location").val();
          $.ajax({
            
                url: baseTodo + '/weather/today',
                method: "POST",
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                  location
                }
            })
            .done((dataWeather) => {
                $("p").remove(".error-message");
              $("#row-weather2").show()
              $("#row-weather2").empty()
            $("#row-weather2").append(`
              <div class="card mt-3 pl-5 pr-8 col-md-6 mx-auto">
                <div class="card p-4">
                    <div class="d-flex">
                        <h1 class="flex-grow-3 mb-0">${dataWeather.data[0].city_name}</h1>
                    </div>
                    <div class="d-flex flex-column temp mt-5 mb-3">
                        <h1 class="mb-0 font-weight-bold" id="heading"> ${dataWeather.data[0].temp}° C </h1> <span class="small grey">${dataWeather.data[0].weather.description}</span>
                    </div>
                    <div class="d-flex">
                        <div class="temp-details flex-grow-1">
                            <p class=""> <i class="fas fa-wind mr-2" aria-hidden="true"></i> <span> ${dataWeather.data[0].wind_spd} m/s </span> </p>
                            <p class=""> <i class="fa fa-tint mr-2" aria-hidden="true"></i> <span> ${dataWeather.data[0].rh}% </span> </p>
                        </div>
                        <div> <img src="https://www.weatherbit.io/static/img/icons/${dataWeather.data[0].weather.icon}.png"> </div>
                        
                    </div>
                </div>
              </div>
            `);   
            })
            .fail ((xhr, text) => {
                    let error = xhr.responseJSON.message
                    $("p").remove(".error-message");
                    $("#weather").prepend(`<p class="error-message"><b style="color: red;">${error}</b></p>`);
                })
                .always(() => {
                    $("#weather").trigger("reset");
                })
          
        }

        function revealPassword(dataType){
          if (dataType === "register"){
            let pass = document.getElementById("register-password")
            if (pass.type === "password") {
              pass.type = "text"
            } else {
              pass.type = "password"
            }
          } 
          else if (dataType === "login"){
            let pass = document.getElementById("login-password")
            if (pass.type === "password") {
              pass.type = "text"
            } else {
              pass.type = "password"
            }
          }
        }

        function onSignIn(googleUser) {
          // var profile = googleUser.getBasicProfile();
          // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          // console.log('Name: ' + profile.getName());
          // console.log('Image URL: ' + profile.getImageUrl());
          // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          var id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token)
          $.ajax({
            url: baseUser + "google-login",
            method: "POST",
            data: {
              googleToken: id_token
            }
          })
          .done(response => {
            localStorage.setItem("access_token", response.access_token)
            authenticate()
          })
          .fail(err => {
            console.log(err)
          })
        }