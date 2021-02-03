
let baseUrl = "http://localhost:3000";

let toDoId = null;

function checkAuthentication() {
  console.log(localStorage.access_token);
  if (localStorage.access_token) {
    console.log("yeaah");
    loggedIn()
  } else {
    console.log('no')
    loggedOut()
    
  }
}

function loggedIn(){
    readToDo()
    $("#login-form").hide()
    $('#logout-button').show()
    $('#register-form').hide()
    $('#add-todo').show()
    $('#add-form').hide()
   
}


function loggedOut(){
$("#login-form").show()
$('#logout-button').hide()
$('#register-form').hide()
$('#add-todo').hide()

localStorage.clear()   
}


$(document).ready(function () {

    console.log('page di reload')
    checkAuthentication()
})

$('#login-button').click(function (event) {
    event.preventDefault()
    login()
})

$('#logout-button').click(function (event) {
    event.preventDefault()
    localStorage.clear()
    localStorage.removeItem('access_token')
    checkAuthentication()
})


$('#register-button').click(function (event) {
    event.preventDefault()
    $('#register-form').show()
    $("#login-form").hide()
})

$('#register-submit').click(function (event) {
    event.preventDefault()
      register()
})

$('#cancel-submit').click(function (event) {
    event.preventDefault()
      loggedOut()
})

$('#add-task').click(function (event) {
  event.preventDefault()
  $('#add-form').show()
})

$(`#add-cancel-button`).click(function (event) {
  event.preventDefault()
  $('#add-form').hide()
})

$('#add-button').click(function (event) {
  event.preventDefault()
  AddTodo()
})







//=========LOGIN========

function login() {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  if (email == '' || password == '') {
    swal("ERROR", "You have to fill email and password honey💋");
  } else {
    $.ajax({
      method: "POST",
      url: `${baseUrl}/users/login`,
      data: {
        email,
        password,
      },
    })

      .done((response) => {
        localStorage.setItem("access_token", response.access_token);
        checkAuthentication();
      })
      .fail((err) => {
        console.log(err);
      })
      .always(() => {
        $("#login-email").val();
        $("#login-password").val();
      });
  }
  console.log(email, password)
}

//===== Register======

function register(){
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    let name = $("#register-name").val()
    let location = $("register-location").val()


    if(email == "" || password == "" || name == "" || location == ""){
        swal("ERROR", "You have to fill email,password,location,name honey💋");
    }else{
        $.ajax({
            method: "POST",
            url: `${baseUrl}/users/register`,
            data: {
              email,
              password,
              name,
              location
            },
          })

          .done(response=>{
              loggedOut()
          })
          .fail(err=>{
              console.log(err)
          })

          .always(()=>{
              console.log('always')
          })
    }

}


//=========READ=========

function readToDo(){
    
    $.ajax({
        method: "GET",
        url: `${baseUrl}/todos`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .done(data=>{
         $("#todo").empty()
         $.each(data,(index,value)=>{
          let checkbox = `<input type="checkbox" class="form-check-input" id="status-${value.id}" onclick="editStatus(${value.id}, '${value.status}')" `
          if (value.status === true) {
            checkbox += `checked>`
          } else if(value.status === false){
            checkbox += `>`
          }

          $("#todo").append(`
          <div class="card" id="list-task" style="width: 40rem";>
              <div class="card-body badan-kartu" id=toDoCard${value.id}>
                  <div id=todoCardBody${value.id}>
                      ${checkbox}
                      <h5 class="card-title">${value.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${value.duedate.split('T')[0]}</h6>
                      <p class="card-text">${value.description}</p>
                      <a href="#" onclick='editForm(${value.id})' class="card-link btn btn-success" id="editTodo">Edit</a>
                      <a href="#" onclick='deleteToDo(event, ${value.id})' class="card-link btn btn-danger" id="delTodo">Hapus</a>
                  </div>
              </div>
          </div>
          `)
         })

      })
      .fail(err => {
        console.log(err, "ERROR")
    })
       .always()

}


//=========ADD TO DO=========


function AddTodo(){
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title: $('#task-name').val(),
      description: $('#task-description').val(),
      duedate: $('#task-date').val()
  }
  })

  .done(done => {
    readToDo()
    $('#add-form').hide()
})
.fail(err => {
    swal("ERROR", "You have to fill the descriptition,and task name", "also you cannto input yesterdays date honey 💋" )
    console.log(err, "ERROR")
})
.always(() => {
    $('#task-name').val('')
    $('#task-description').val('')
    $('#task-date').val('')
    toDoId = null
})

}


//===========DELETE============

function deleteToDo(event,id){
     event.preventDefault()

     $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
          access_token: localStorage.access_token
        }

     })

     readToDo()
}


