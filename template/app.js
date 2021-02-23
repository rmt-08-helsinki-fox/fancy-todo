let baseUrl = 'https://hacktiv8-fancy-todo.herokuapp.com'
// let baseUrl = 'http://localhost:3000'

let user_name
let email



$(document).ready(function(){
    console.log('ready')
    defaultLogout()

    if(localStorage.getItem('token')){
        Auth()
    }

});

function defaultLogout(){
    $("#loginForm").show()
    $("#registerForm").hide()
    $("#profile").hide()
    $("#todoSegment").hide()
    $("#brewery").hide()
    $("#todos").empty()

    $("#loginError").hide()
    $("#registerError").hide()
    $("#addTodoForm").hide()
    $("#addTodoError").hide()
    $("#editTodoForm").hide()
    $("#editTodoError").hide()
}

function homepage(){
    $("#loginForm").hide()
    $("#registerForm").hide()
    $("#profileMessage").text(`Welcome, ${user_name}`)
    $("#profile").show()
    $("#toHome").hide()
    $("#toBrewery").show()
    getTodos()
    $("#addTodoForm").hide()
    $("#addTodoError").hide()
    $("#editTodoForm").hide()
    $("#editTodoError").hide()
    $("#todoSegment").show()
    $("#brewery").hide()

    $("#cancelEditTodo").click((e)=>{
        e.preventDefault()
        homepage()
    })
    $("#cancelAddTodo").click((e)=>{
        e.preventDefault()
        homepage()
    })



    $("#addTodoTitle").val('')
    $("#addTodoDescription").val('')
    $("#addTodoDuedate").val('')
    
}

function Auth(){
    let token = localStorage.getItem('token')
    $.ajax({
        url: baseUrl+'/auth',
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then((result)=>{
        // console.log('auth berhasil')
        // console.log(result)
        user_name = result.name
        email = result.email
        // redirect to homepage
        homepage()
    })
    .catch((err)=>{
        console.log(err)
    })
}

$("#toRegister").click((e)=>{
    e.preventDefault()
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#toLogin").click((e)=>{
    e.preventDefault()
    $("#loginForm").show()
    $("#registerForm").hide()
})

$("#login").click((e)=>{
    e.preventDefault()
    login($("#loginEmail").val(), $("#loginPassword").val())
})

$("#register").click(e=>{
    e.preventDefault()
    $.ajax({
        url: baseUrl+'/register',
        method: 'POST',
        data: {
            name: $("#registerName").val(),
            email: $("#registerEmail").val(),
            password: $("#registerPassword").val()
        }
    })
    .done((result)=>{
        $("#loginForm").show()
        $("#registerForm").hide()

        $("#registerName").val('')
        $("#registerEmail").val('')
        $("#registerPassword").val('')
    })
    .fail((xhr, err)=>{
        // console.log(xhr.responseJSON.message)
        $("#registerErrorMessage").text(xhr.responseJSON?xhr.responseJSON.message:'No Connection')
        $("#registerError").show()

    })
})

$("#logout").click((e)=>{
    e.preventDefault()
    logout()
})

function login(email, password){
    console.log('loging in')
    $.ajax({
        url: baseUrl+'/login',
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done((result)=>{
        // console.log(result)
        localStorage.setItem('token', result.token)
        user_name = result.name
        homepage()
        // Auth()
    })
    .fail((xhr, err)=>{
        $("#loginErrorMessage").text(xhr.responseJSON?xhr.responseJSON.message:'No Connection')
        $("#loginError").show()
    })
}

function logout(){
    localStorage.removeItem('token')
    user_name = ''
    email = ''

    $("#loginEmail").val('')
    $("#loginPassword").val('')

    signOut()
    defaultLogout()
}

function getTodos(){
    // e.preventDefault()
    $.ajax({
        url: baseUrl+"/todos",
        method: 'GET',
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .done((result)=>{
        $("#todoSegment").show()
        $("#todos").empty()
        result.forEach(todo => {
            $("#todos").append(`
                <div class="card">
                    <div class="content">
                    <img class="right floated mini ui image" src="https://semantic-ui.com/images/avatar/large/elliot.jpg">
                    <div class="header">
                        ${todo.title}
                    </div>
                    <div class="meta">
                        ${todo.due_date}
                    </div>
                    <div class="description" style="margin-top:20px;">
                        ${todo.description}
                    </div>
                    <div class="ui label" style="margin-top:10px;">
                        <b>${todo.status?'Completed':'On Progress'}</b>
                    </div>
                    </div>
                    <div class="extra content">
                    <div class="ui three buttons">
                        <div class="ui basic green button completeTodo" data-value="${todo.id}">Complete</div>
                        <div class="ui basic grey button editTodo" data-value="${todo.id}">Edit</div>
                        <div class="ui basic red button deleteTodo" data-value="${todo.id}">Delete</div>
                    </div>
                    </div>
                </div>
            `)
        })
        $(".completeTodo").on('click',(e) => {
            // console.log($(this).data('value'))
            // console.log(e.target.dataset.value)
            let id = e.target.dataset.value
            completeTodo(id)
            
        })
        $(".deleteTodo").on('click',(e) => {
            let id = e.target.dataset.value
            deleteTodo(id)
        })
        $(".editTodo").on('click',(e) => {
            let id = e.target.dataset.value
            $("#editTodo").data('value', id)

            $.ajax({
                url: baseUrl+`/todos/${id}`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done((result)=>{
                console.log(result)
                let {title, description, due_date} = result
                $("#editTodoTitle").val(title)
                $("#editTodoDescription").val(description)
                $("#editTodoDuedate").val(due_date.split('T')[0])
            })
            .fail((xhr, err)=>{
                $("#editTodoErrorMessage").text(xhr.responseJSON?xhr.responseJSON.message:'No Connection')
                $("#editTodoError").show()
            })

            $("#editTodoForm").show()
            $("#todoSegment").hide()
        })
    })
    .fail((xhr,err)=>{
        console.log(err)
    })

}


$("#toAddTodo").click((e)=>{
    e.preventDefault()
    $("#addTodoForm").show()
    $("#todoSegment").hide()
})

$("#addTodo").click((e)=>{
    e.preventDefault()
    let newAddTodo = {
        title: $("#addTodoTitle").val(),
        description : $("#addTodoDescription").val(),
        due_date: $("#addTodoDuedate").val()
    }
    console.log(newAddTodo)
    $.ajax({
        url: baseUrl+'/todos',
        method: 'POST',
        headers: {
            token: localStorage.getItem('token')
        },
        data: newAddTodo
    })
    .done((result)=>{
        homepage()
    })
    .fail((xhr, err)=>{
        $("#addTodoErrorMessage").text(xhr.responseJSON?xhr.responseJSON.message:'No Connection')
        $("#addTodoError").show()
    })
})

function completeTodo(id){
    $.ajax({
        url: baseUrl+`/todos/${id}`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: true
        }
    })
    .done((result)=>{
        homepage()
    })
    .fail((xhr, err)=>{
        console.log(xhr.responseJSON.message)
    })
}

function deleteTodo(id){
    $.ajax({
        url: baseUrl+`/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: true
        }
    })
    .done((result)=>{
        homepage()
    })
    .fail((xhr, err)=>{
        console.log(xhr.responseJSON.message)
    })
}


$("#editTodo").click((e)=>{
    e.preventDefault()
    let id = $("#editTodo").data('value')

    let updateTodo = {
        title: $("#editTodoTitle").val(),
        description : $("#editTodoDescription").val(),
        due_date: $("#editTodoDuedate").val()
    }
    
    $.ajax({
        url: baseUrl+`/todos/${id}`,
        method: 'PUT',
        headers: {
            token: localStorage.getItem('token')
        },
        data: updateTodo
    })
    .done((result)=>{
        homepage()
    })
    .fail((xhr, err)=>{
        console.log(xhr.responseJSON.message)
    })
})





// BREWERY

$("#toHome").click(()=>{
    homepage()
})

$("#toBrewery").click(()=>{
    // homepage()
    $("#toHome").show()
    $("#toBrewery").hide()
    $("#todoSegment").hide()
    $("#brewery").show()

    $("#breweryList").empty()

    $.ajax({
        url: baseUrl+'/brewery/list',
        method: 'GET'
    })
    .done((result)=>{
        console.log(result)
        result.forEach(el => {
            $("#breweryList").append(`
            <div class="ui card">
                <div class="content">
                    <div class="header">${el.name}</div>
                </div>
                <div class="content">
                    <h4 class="ui sub header">Activity</h4>
                    <div class="ui small feed">
                    <div class="event">
                        <div class="content">
                        <div class="summary">
                            <a>Country</a> ${el.country}
                        </div>
                        </div>
                    </div>
                    <div class="event">
                        <div class="content">
                        <div class="summary">
                            <a>State</a> ${el.state}
                        </div>
                        </div>
                    </div>
                    <div class="event">
                        <div class="content">
                        <div class="summary">
                            <a>Website</a> ${el.website_url}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="extra content">
                    <button class="ui button primary disabled">Add To Favorites</button>
                    <div class="right floated author">
                        <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg">
                    </div>
                </div>
                
            </div>
            `)
        })
    })
    .fail((err)=>{
        console.log(err)
    })
})








// GOOGLE OAUTH

function onSignIn(googleUser) {
    console.log('google oauth')

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax({
        url: baseUrl+'/googlelogin',
        method: 'GET',
        headers: {
            token: id_token
        }
    })
    .done((result)=>{
        // auto login
        console.log('login google berhasil')
        // console.log(result.token)
        localStorage.setItem('token',result.token)
        user_name = result.name
        homepage()
    })
    .fail((err)=>{
        console.log(err)
    })
}

function signOut() {
    console.log('google sign out')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }




//   Firebase Google Signin

$("#googleSignIn").click((e)=>{
    e.preventDefault()
    googleSignin()
})

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      var id_token = result.credential.idToken
		
      console.log(result)
      console.log(token)
      console.log(user)
      console.log(id_token)

      $.ajax({
        url: baseUrl+'/googlelogin',
        method: 'GET',
        headers: {
            token: id_token
        }
      })
      .done((result)=>{
        // auto login
        console.log('login google berhasil')
        // console.log(result.token)
        localStorage.setItem('token',result.token)
        user_name = result.name
        homepage()
      })
      .fail((err)=>{
        console.log(err)
      })
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}