const baseUrl = "http://localhost:3000/";

$(document).ready(() => {
	authenticate();

	$("#register-submit").click((e) => {
		e.preventDefault();
		register();
	});

	$("#login-submit").click((e) => {
		e.preventDefault();
		login();
	});

	$("#register-form").click((e) => {
		e.preventDefault();
		toRegister();
	});

	$("#login-form").click((e) => {
		e.preventDefault();
		toLogin();
	});

	$("#todos-add-submit").click((e) => {
		e.preventDefault();
		addTodos();
	});

	$("#show").click((e) => {
		e.preventDefault();
		listTodos();
	});

	$("#logout").click((e) => {
		e.preventDefault();
		logout();
	});
});

function logout() {
	localStorage.clear();
	authenticate();
}

function putEdit(id) {
	const title = $("#title").val();
	const description = $("#description").val();
	const due_date = $("#due_date").val();

	$.ajax({
		method: "PUT",
		url: baseUrl + "todos/" + id,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
		data: {
			title,
			description,
			due_date,
		},
	})
		.done((todos) => {
      console.log(todos)
		})
		.fail((jqXHR, textStatus) => {
			console.log(jqXHR, textStatus);
		})
		.always(() => {
			$("#title").val("");  
			$("#description").val("");
			$("#due_date").val("");
		});
}

function authenticate() {
	if (!localStorage.getItem("access_token")) {
		$("#enter").show();
		$(".login").show();
		$(".register").hide();
		$("#add-todos").hide();
	} else {
		$("#add-todos").show();
		$("#enter").hide();
		$(".add").show();
		$(".edit").hide();
	}
}

function register() {
  $(".success-handling").empty();
	
  const email = $("#email").val();
	const password = $("#password").val();

	$.ajax({
		method: "POST",
		url: baseUrl + "users/register",
		data: {
			email,
			password,
		},
	})
		.done((users) => {
      $(".success-handling").append(`${users.msg}`);
		})
		.fail((jqXHR, textStatus) => {
			console.log(jqXHR, textStatus);
		})
		.always(() => {
			$("#email").val("");
			$("#password").val("");
		});
}

function toRegister() {
	$(".register").show();
	$(".login").hide();
}

function toLogin() {
	$(".register").hide();
	$(".login").show();
}

function login() {
	const email = $("#email").val();
	const password = $("#password").val();

	$.ajax({
		method: "POST",
		url: baseUrl + "users/login",
		data: {
			email,
			password,
		},
	})
		.done((users) => {
			console.log(users);
			localStorage.setItem("access_token", users.access_token);
			authenticate();
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			$("#email").val("");
			$("#password").val("");
		});
}

function addTodos() {
  $(".success-handling").empty();

	const title = $("#title").val();
	const description = $("#description").val();
	const due_date = $("#due_date").val();

	$.ajax({
		method: "POST",
		url: baseUrl + "todos",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
		data: {
			title,
			description,
			due_date,
		},
	})
		.done((todos) => {
      $(".success-handling").append(`${todos.msg}`);
      listTodos()
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			$("#title").val("");
			$("#description").val("");
			$("#due_date").val("");
		});
}

function listTodos() {
	authenticate();
	$("#list-todos").empty();

	$.ajax({
		method: "GET",
		url: baseUrl + "todos",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((todos) => {
			if (todos.length === 0) {
				$("#list-todos").append(`
        <h1 style="text-align: center;">Game not found! :'(</h1>
          `);
        } else {
          $("#list-todos").append(`
          <h3>Total: ${todos.length}</h3>
        `)
        
        todos.forEach((el) => {
          if (!el.status) {
            $("#list-todos").append(`
              <div class="cart finish">
                <h5 class="title-todos">${el.title}</h5>
                <p>Description: ${el.description} at ${el.due_date.split("T")[0]}</p>
                <button type="submit" class="btn btn-primary" onclick="getEdit(${el.id})"><span class="fa fa-edit"></span></button>
                <button type="submit" class="btn btn-success" onclick="finished(${el.id})"><span class="fa fa-check"></span></button>
                <button type="submit" class="btn btn-danger" onclick="deleteTodo(${el.id})"><span class="fa fa-times"></span></button>
              </div>
            `);
          } else {
              $("#list-todos").append(`
              <div class="cart unfinish">
              <h5 class="title-todos">${el.title}</h5>
              <p>Description: ${el.description} at ${el.due_date.split("T")[0]}</p>
              <button type="submit" class="btn btn-danger" onclick="deleteTodo(${el.id})"><span class="fa fa-times"></span></button>
              </div>
            `);
          }
        });  
			}
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			$("#title").val("");
			$("#description").val("");
			$("#due_date").val("");
		});
}

function finished(id) {
	$.ajax({
		method: "PATCH",
		url: baseUrl + "todos/" + id,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((todos) => {
		  listTodos()
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			console.log("always");
		});
}

function getEdit(id) {
	$(".add").hide();
	$(".edit").show();

	$.ajax({
		method: "GET",
		url: baseUrl + "todos/" + id,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((todos) => {
			console.log(todos);
			due_date = todos.due_date.split("T");

			$("#title").val(todos.title);
			$("#description").val(todos.description);
			$("#due_date").val(due_date[0]);
			$("#pushBtn").prepend(`
        <button type="submit" class="btn btn-success edit" onclick="putEdit(${todos.id})">Edit <span class="fa fa-check"></span></button>
      `);
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			console.log("always");
		});
}

function deleteTodo(id) {
	$.ajax({
		method: "DELETE",
		url: baseUrl + "todos/" + id,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done(() => {
			console.log("Delete Success");
			listTodos();
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			console.log("always");
		});
}

function getTodos() {
	const title = $("#title").val();
	const description = $("#description").val();
	const due_date = $("#due_date").val();

	$.ajax({
		method: "POST",
		url: baseUrl + "todos",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
		data: {
			title,
			description,
			due_date,
		},
	})
		.done((users) => {
			console.log(users);
			authenticate();
		})
		.fail((xhr, text) => {
			console.log(xhr, text);
		})
		.always(() => {
			$("#title").val("");
			$("#description").val("");
			$("#due_date").val("");
		});
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present. 
    var id_token = googleUser.getAuthResponse().id_token 
    console.log(id_token)
    $.ajax({ 
        url :'http://localhost:3000/users/googlelogin',
        method : 'POST',
        data : { 
            googleToken : id_token
        }
    }) 
    .done((response) => { 
        localStorage.setItem('access_token', response.access_token)
        console.log(response,'<<< dari done sign google')
        authenticate()
    }) 
    .fail ((err) => { 
        console.log(err, '<<< dari err sign google')
    })
}

