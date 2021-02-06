const baseUrl = "http://localhost:3000"

const auth = ()=>{
    console.log("MASUKK AUTH");
    if (!localStorage.getItem("accessToken")) {
      $("#container-login").show()
      $("#registerbuttona").hide()
      $("#loginbutton").hide()
      $("#registerform").hide()
      $("#navbar").hide()
      $("#todostable").hide()
      $("#addtodocard").hide()
      $("#edittodocard").hide()
    } else {
      $("#todostable").show()
      $("#container-login").hide()
      $("#edittodocard").hide()
      $("#addtodocard").hide()
      $("#addtodo").show()
      $("#logout").show()
      $("#navbar").show()
      getTodos()
    }
}

const register = ()=>{
    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()
    console.log("masukkk",{email,password});
    $.ajax({
        url: baseUrl+"/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done((res)=>{
        // localStorage.setItem("accessToken", res.accessToken)
        $("#registerbutton").show()
        $("#loginbuttona").show()
        $("#loginform").show()
        auth()
    })
    .fail((xhr, textStatus)=>{
      Swal.fire({
        icon: "error",
        title: "Email already registered, please use a different one",
        heightAuto: false,
    })
    })
    .always(()=>{
        $("#registerform").trigger("reset")
    })
}

const login = ()=>{
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()
    console.log("masukkk",{email,password});
    $.ajax({
        url: baseUrl+"/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
    .done((res)=>{
        localStorage.setItem("accessToken", res.accessToken)
        auth()
    })
    .fail((xhr, textStatus)=>{
      Swal.fire({
        icon: "error",
        title: "Wrong Email or Password",
        heightAuto: false,
      })
    })
    .always(()=>{
        $("#loginform").trigger("reset")
    })
}

const changeRegisterForm = ()=>{
    $("#registerbuttona").show()
    $("#loginbutton").show()
    $("#registerbutton").hide()
    $("#loginbuttona").hide()
    $("#loginform").hide()
    $("#registerform").show()
}

const changeLoginForm = ()=>{
    $("#registerbutton").show()
    $("#loginbuttona").show()
    $("#registerbuttona").hide()
    $("#loginbutton").hide()
    $("#registerform").hide()
    $("#loginform").show()
}

const getTodos = ()=>{
    $.ajax({
        url: baseUrl+"/todos",
        method:"GET",
        headers: {
            token: localStorage.getItem("accessToken")
        }
    })
    .done((dataTodos)=>{
        $("#todotablebody").empty()
        if (dataTodos.length === 0) {
            console.log("masukkk");
        } else {
            dataTodos.forEach(todo => {
              let status = `<button class="btn btn-danger btn-sm" onclick="status(${todo.id})">Not Completed</button>`
              let event = new Date(todo.due_date);
              let year = event.toISOString().slice(0,4)
              let month = event.toLocaleString('default', { month: 'short' })
              let date = event.toISOString().slice(8,10)
              if (todo.status) {
                status = `<button class="btn btn-success btn-sm" id="buttonstatus" onclick="status(${todo.id})">Completed</button>`
              }

              $("#todotablebody").append(`
                <tr>
                <th scope="row">${todo.title}</th>
                <td>${todo.description}</td>
                <td>${month} ${date} ${year}</td>
                <td id="status${todo.id}">${status}</td>
                <td><button class="btn btn-warning btn-sm" onclick="editTodo(${todo.id})">Edit</button></td>
                <td><button class="btn btn-dark btn-sm" onclick="deletetodo(${todo.id})">Delete</button></td>
                </tr>
              `)

            });
        }
    })
    .fail((xhr, text)=>{
        console.log(xhr);
    })
}

const addTodo = ()=>{
  const title = $("#title").val()
  const due_date = $("#duedate").val()
  const description = $("#description").val()
  const status = false

  $.ajax({
    url: baseUrl+"/todos",
    method:"POST",
    headers: {
        token: localStorage.getItem("accessToken")
    },
    data: {
      title,
      due_date,
      description,
      status
    }
  })
  .done((dataTodos)=>{
    $("#addform").trigger("reset")
    auth()
  })
  .fail((xhr, text)=>{
    Swal.fire({
      icon: "error",
      title: "Date Need tobe after Today",
      heightAuto: false,
    })
  })
  .always(()=>{
    $("#addform").trigger("reset")
  })
}

let todoId;
const editTodo = (id)=>{
    todoId = id
    $("#todostable").hide()
    $("#edittodocard").show()
    $.ajax({
      url: baseUrl+`/todos/${id}`,
      method:"GET",
      headers: {
          token: localStorage.getItem("accessToken")
      }
    })
    .done((dataTodo)=>{
      let event = new Date(dataTodo.due_date);
      event = event.toISOString().slice(0,10)
      $("#edittitle").val(dataTodo.title)
      $("#editduedate").val(event)
      $("#editdescription").val(dataTodo.description)
      if (dataTodo.status) {
        $("#editstatus").append(`
        <option value="true" selected>Completed</option>
        <option value="false">Not Completed</option>
        `)
      } else {
        $("#editstatus").append(`
        <option value="true">Completed</option>
        <option value="false" selected>Not Completed</option>
        `)
      }
    })
    .fail((xhr, text)=>{
      Swal.fire({
        icon: "error",
        title: "Date Need tobe after Today",
        heightAuto: false,
      })
    })
    .always(()=>{
      $("#editform").trigger("reset")
    })
}

const postEditTodo = ()=>{
  const title = $("#edittitle").val()
  const due_date = $("#editduedate").val()
  const description = $("#editdescription").val()
  const status = $("#editstatus").val()

  $.ajax({
    url: baseUrl+`/todos/${todoId}`,
    method:"PUT",
    headers: {
        token: localStorage.getItem("accessToken")
    },
    data: {
      title,
      due_date,
      description,
      status
    }
  })
  .done((dataTodos)=>{
    auth()
  })
  .fail((xhr, text)=>{
    Swal.fire({
      icon: "error",
      title: "Date Need tobe after Today",
      heightAuto: false,
    })
  })
  .always(()=>{
    $("#editform").trigger("reset")
  })
}

const logout = ()=>{
  localStorage.removeItem("accessToken")
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  auth()
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  $.ajax({
    url:baseUrl+"/googleLogin",
    method: "POST",
    data:{
      googleToken: id_token
    }
  })
  .done((res)=>{
    localStorage.setItem("accessToken", res.accessToken)
    auth()
  })
  .fail((err)=>{
    console.log(err);
  })
}

// const statustodo = (id)=>{
//   const status;
//   $.ajax({
//     url: baseUrl+`/todos/${id}`,
//     method:"GET",
//     headers: {
//         token: localStorage.getItem("accessToken")
//     }
//   })
//   .done((dataTodo)=>{
//     if (dataTodo.status) {
//       $(`#status${dataTodo.id}`).html(`<button class="btn btn-danger btn-sm" onclick="status(${todo.id})">Not Completed</button>`)
//       status = false
//     } else {
//       $(`#status${dataTodo.id}`).html(`<button class="btn btn-success btn-sm" onclick="status(${todo.id})">Completed</button>`)
//       status = true
//     }
//   })
//   .fail((xhr, text)=>{
//     console.log(xhr);
//   })
//   $.ajax({
//     url: baseUrl+`/todos/${id}`,
//     method:"PATCH",
//     headers: {
//         token: localStorage.getItem("accessToken")
//     },
//     data: {
//       status
//     }
//   })
//   .done((dataTodos)=>{
//     auth()
//   })
//   .fail((xhr, text)=>{
//     console.log(xhr);
//   })
// }

const deletetodo = (id)=>{
  $.ajax({
    url: baseUrl+`/todos/${id}`,
    method:"DELETE",
    headers: {
        token: localStorage.getItem("accessToken")
    }
  })
  .done((dataTodos)=>{
    auth()
  })
  .fail((xhr, text)=>{
    console.log(xhr);
  })
}