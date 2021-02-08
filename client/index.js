let baseUrl = "https://fancytodo-2aaa6.web.app/";

let toDoId = null;

$("#register-form").hide();

function checkAuthentication() {
  console.log(localStorage.access_token);
  if (localStorage.access_token) {
    console.log("yeaah");
    loggedIn();
  } else {
    console.log("no");
    loggedOut();
  }
}

function loggedIn() {
  
  $("#login-form").hide();
  $("#logout-button").show();
  $("#register-form").hide();
  $("#add-todo").show();
  $("#add-form").hide();
  $("#main-weather").show();
}

function loggedOut() {
  $("#login-form").show();
  $("#logout-button").hide();
  $("#register-form").hide();
  $("#add-todo").hide();
  $("#main-weather").hide();

  localStorage.clear();
}

$(document).ready(function () {
  console.log("page di reload");

  checkAuthentication();
});

$("#login-button").click(function (event) {
  event.preventDefault();
  login();
});

$("#logout-button").click(function (event) {
  event.preventDefault();
  localStorage.clear();
  localStorage.removeItem("access_token");
  checkAuthentication();
});

$("#register-button").click(function (event) {
  event.preventDefault();
  $("#register-form").show();
  $("#login-form").hide();
});

$("#register-submit").click(function (event) {
  event.preventDefault();
  register();
});

$("#cancel-submit").click(function (event) {
  event.preventDefault();
  loggedOut();
});

$("#add-task").click(function (event) {
  event.preventDefault();
  $("#add-form").show();
});

$("#show-task").click(function (event) {
  event.preventDefault();
  readToDo()
});



$(`#add-cancel-button`).click(function (event) {
  event.preventDefault();
  $("#add-form").hide();
});

$("#add-button").click(function (event) {
  event.preventDefault();
  AddTodo();
});

//=========GOOGLE LOGIN========

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: "POST",
    url: `${baseUrl}/users/googlelogin`,
    data: {
      id_token,
    },
  })
    .done((result) => {
      // console.log(result)
      localStorage.setItem("access_token", result.access_token);
      loggedIn();
      // console.log(result)
    })
    .fail((err) => {
      console.log(err);
    });
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

//=========LOGIN========

function login() {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  if (email == "" || password == "") {
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
  console.log(email, password);
}

//===== Register======

function register() {
  let email = $("#register-email").val();
  let password = $("#register-password").val();
  let name = $("#register-name").val();
  let location = $("register-location").val();

  if (email == "" || password == "" || name == "" || location == "") {
    swal("ERROR", "You have to fill email,password,location,name honey💋");
  } else {
    $.ajax({
      method: "POST",
      url: `${baseUrl}/users/register`,
      data: {
        email,
        password,
        name,
        location,
      },
    })

      .done(({ msg, LoveQuotesForYou }) => {
        console.log(msg);
        console.log(LoveQuotesForYou); // INI 3rd API PARTYNYA KA
        swal(`${LoveQuotesForYou} Thank u for Registering Honey 💋 `);
        // $('#quite').append(`

        // `)
        loggedOut();
      })
      .fail((err) => {
        swal("password must be at least 6 character")
        console.log(err);
      })

      .always(() => {
        console.log("always");
      });
  }
}

//=========READ=========

function readToDo() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((data) => {
      $("#todo").empty();
      $.each(data, (index, value) => {
        let checkbox = `<input type="checkbox" class="form-check-input" id="status-${value.id}" onclick="editStatus(${value.id}, '${value.status}')" `;
        if (value.status === true) {
          checkbox += `checked>`;
        } else if (value.status === false) {
          checkbox += `>`;
        }

        $("#todo").append(`
          <div class="card" id="list-task" style="width: 40rem";>
              <div class="card-body badan-kartu" id=toDoCard${value.id}>
                  <div id=todoCardBody${value.id}>
                      ${checkbox}
                      <h5 class="card-title">${value.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${
                        value.duedate.split("T")[0]
                      }</h6>
                      <p class="card-text">${value.description}</p>
                      <a href="#" onclick='editForm(${
                        value.id
                      })' class="card-link btn btn-success" id="editTodo">Edit</a>
                      <a href="#" onclick='deleteToDo(event, ${
                        value.id
                      })' class="card-link btn btn-danger" id="delTodo">Hapus</a>
                  </div>
              </div>
              
          </div>
          
          `);
         
      });
    })
    .fail((err) => {
      console.log(err, "ERROR");
    })
    .always();
}

//=========ADD TO DO=========

function AddTodo() {
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      title: $("#task-name").val(),
      description: $("#task-description").val(),
      duedate: $("#task-date").val(),
    },
  })

    .done((done) => {
      readToDo();
      $("#add-form").hide();
    })
    .fail((err) => {
      swal(
        "ERROR",
        "You have to fill the descriptition,and task name",
        "also you cannto input yesterdays date honey 💋"
      );
      console.log(err, "ERROR");
    })
    .always(() => {
      $("#task-name").val("");
      $("#task-description").val("");
      $("#task-date").val("");
      toDoId = null;
    });
}

//===========DELETE============

function deleteToDo(event, id) {
  event.preventDefault();

  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token,
    },
  });

  readToDo();
}

//===========EDIT============\\

function editForm(id) {
  toDoId = id;

  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${toDoId}`,
    headers: {
      access_token: localStorage.access_token,
    },
  }).done((value) => {
    $(`#todoCardBody${toDoId}`).hide();
    $(`#toDoCard${toDoId}`).append(
      `
     <div class = "edit-form">
      <h2>Update your Todo<h2>
    <form role="form" id="form-edit-main${toDoId}">     
    <input type="text" class="form-control" value="${value.title}" name="task" id="edittask">
    <input type="date" class="form-control" value="${value.duedate.split('T')[0]}" name="date" id="editdate">
    <input type="text" class="form-control" value="${value.description}" name="task" id="editdescription">
    <button onclick=submitEdit(event) class="btn btn-primary" id="edit-button">edit</button>
    <button onclick=cancelEdit(event) class="btn btn-primary" id="edit-cancel-button">cancel</button>
     </form>
           
        </div>

        `
    );
  });
}

function cancelEdit(event){
  event.preventDefault();
  $('.edit-form').hide()
  $('.badan-kartu').show()
  readToDo()
}

function submitEdit(event){
event.preventDefault()
  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${toDoId}`,
    headers: {
      access_token: localStorage.access_token,
    },
    data :{
      title : $('#edittask').val(),
      description : $('#editdescription').val(),
      duedate : $('#editdate').val()
    }
  })  
  .done(data =>{
    $('.edit-form').hide()
    $('.badan-kartu').show()
    readToDo()
  })
  .fail(err =>{
    swal(`dat must be today or after today 💋` )
     console.log(err)
  })
  .always(()=>{
    $('#edittask').val('')
    $('#editdescription').val('')
    $('#editdate').val('')
  })

}

function editStatus(id , status){
  
  let newStatus

  if(status === "true"){
    newStatus = false
  }else{
    newStatus = true
  }
   

  $.ajax({
    method: "PATCH",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token,
    },
    data : {
      status : newStatus
    }
  })

  .done(data=>{
      
      readToDo()
  })
  .fail(err=>{
    
    console.log(err)
  })
  .always({

  })
}



