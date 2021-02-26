const base_url = 'https://fancy-todo-hacktiv8-burhan.herokuapp.com'

function fetchProject(){
    $.ajax({
        url : `${base_url}/projects`,
        method: 'GET'
    }).done(response => {
        $("#project-container").html('');
        for(let project of response){
            $("#project-container").append(`
            <div class="row justify-content-md-center h-100 mt-4">
                <div class="col-md-9">
                    <div class="card" style="border: none;">
                        <div id="headingOne" class="card-header bg-white shadow-sm border-0">
                            <h6 class="mb-0 font-weight-bold"><a href="#" data-toggle="collapse" data-target="#collapse${project.id}" aria-expanded="true" aria-controls="collapseOne" class="d-block position-relative text-uppercase collapsible-link py-2">${project.name}</a>
                                <span class="float-left">${project.Users.length || 0} Person</span>
                            </h6>
                        </div>
                        <div id="collapse${project.id}" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse">
                            <div class="card-body px-4">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <td>Email</td>
                                        </tr>
                                    </thead>
                                    <tbody id="project${project.id}-members"></tbody>
                                </table>
                            </div>
                            <div class="card-body px-4">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" data-id="${project.id}" class="btn btn-sm btn-primary invite-project"><i class="fa fa-user-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `);
            $("#project-members").html('')
            for(let user of project.Users){
                $(`#project${project.id}-members`).append(`
                    <tr>
                        <td>${user.email}</td>
                    </tr>
                `)
            }
        }
    }).fail(err => {
        toastr.error(Array.isArray(err.responseJSON.msg) ? err.responseJSON.msg.join('<br />') : err.responseJSON.msg,"Oops");
    }) 
};

function fetchProjectTodos(){
    $.ajax({
        url : `${base_url}/projects/todos`,
        method: 'GET'
    }).done(response => {
        console.log(response);
    });
}

function fetchTodo(){
    $.ajax({
        url : `${base_url}/todos`,
        method: 'GET',
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    }).done(response => {
        $("#todo-container").html('');
        for(let todo of response){
            let badge = `<span class="px-2 badge badge-warning text-white">Pending</span>`;
            if(todo.status){
                badge = `<span class="px-2 badge badge-success">Finished</span>`
            }else if(!todo.status && Date.parse(todo.due_date) < new Date(Date.now() - 86400000)){
                badge = `<span class="px-2 badge badge-danger">Overdue</span>`
            }
            $("#todo-container").append(`
            <div class="row justify-content-md-center h-100 mt-4">
                <div class="col-md-9">
                    <div class="card" style="border: none;">
                        <div id="headingOne" class="card-header bg-white shadow-sm border-0">
                            <h6 class="mb-0 font-weight-bold"><a href="#" data-toggle="collapse" data-target="#collapse${todo.id}" aria-expanded="false" aria-controls="collapseOne" class="d-block position-relative text-uppercase collapsible-link py-2">${todo.title}</a>
                                <span class="float-right mr-6">Due : ${todo.due_date}</span>
                                <span class="float-left">${badge}</span>
                            </h6>
                        </div>
                        
                        <div id="collapse${todo.id}" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse">
                            <div class="card-body px-4">
                                <p class="font-weight-light m-0">
                                    ${todo.description}
                                </p>
                                <div class="separator-todo py-2">Random Food For You</div>
                                <center><img class="py-2" src="${todo.Food.image}" style="width: 50%;"/>
                                <p class="font-weight-light m-0 pt-2">
                                    ${todo.Food.foodName}
                                </p></center>
                                
                                <p class="pt-2">${todo.Food.description}</p>
                                <p class="pt-2">Instructions : </p>
                                <div class="pt-2 ml-4">${todo.Food.instruction}</div>
                            </div>
                        </div>

                        <div class="card-body px-4">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" data-id="${todo.id}" class="btn btn-sm ${ todo.status ? 'btn-warning text-white' : 'btn-success'} updateStatusTodo" title="Mark As Done"><i class="fa ${ todo.status ? 'fa-undo' : 'fa-check'}"></i></button>
                                <button type="button" data-id="${todo.id}" class="btn btn-sm btn-primary edit-todo"><i class="fa fa-edit"></i></button>
                                <button type="button" class="btn btn-sm btn-danger btn-delete" data-id="${todo.id}"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
        }
    }).fail(err => {
        toastr.error(Array.isArray(err.responseJSON.msg) ? err.responseJSON.msg.join('<br />') : err.responseJSON.msg,"Oops");
    })
}

function mainApp(){
    if(localStorage.getItem("access_token")){
        $('#loginPage').fadeOut();
        $('#registerPage').fadeOut();
        $("#appPage").fadeIn();
        $.ajaxSetup({
            headers : {
                access_token : localStorage.getItem("access_token")
            }
        });
        fetchTodo();
        fetchProject();
        fetchProjectTodos();
    }
}

function login(access_token){
    localStorage.setItem("access_token",access_token);
    mainApp();
}

$(document).ready(function(){
    mainApp();
    let date = $(".dateTodo");
    date.prop('min',new Date().toISOString().split("T")[0]);
    $('#register-link').click((e) => {
        e.preventDefault();
        $("#loginPage").fadeOut();
        $("#registerPage").fadeIn();
    })

    $('#login-link').click((e) => {
        e.preventDefault();
        $("#registerPage").fadeOut();
        $("#loginPage").fadeIn();
    });

    $('.logout-link').click((e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        $("#appPage").fadeOut();
        $("#loginPage").fadeIn();
        $.ajaxSetup({});
    })

    $("#registerForm").submit((e) => {
        e.preventDefault();
        let data = $("#registerForm").serialize()
        $.ajax({
            method : "POST",
            url: base_url + '/register',
            data
        }).done((response) => {
            toastr.success('Success to register , you can login now','Yeay!')
            $("#login-link").trigger('click');
        }).fail(err => {
            if(Array.isArray(err.responseJSON.msg)){
                err.responseJSON.msg.forEach(msg => {
                    toastr.error(msg, 'Oops!')
                })
            }else{
                toastr.error(err.responseJSON, 'Oops!')
            }
        })
    })

    $("#loginForm").submit((e) => {
        e.preventDefault();
        let data = $("#loginForm").serialize()
        $.ajax({
            method : "POST",
            url: base_url + '/login',
            data
        }).done((response) => {
            login(response.access_token);
        }).fail(err => {
            toastr.error(err.responseJSON.msg, 'Oops!')
        })
    });
});

function onSignIn(googleUser){
    const token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url:  base_url + '/signInWithGoogle',
        data : {
            token
        }
    }).done(response => {
        login(response.access_token)
        console.log('abc')
    }).fail(err => {
        console.log(err)
    })
}

$(document).on("submit", "#addTodo",(e) =>{
    e.preventDefault();
    let data = $("#addTodo").serialize();
    $("#addTodo").find("button[type=submit]").attr('disabled',true)
    $.ajax({
        method : "POST",
        url : base_url + "/todos",
        data
    }).done(response => {
        fetchTodo();
        $("#addTodoModal").modal('hide');
        toastr.success('Add todo successfully','Success')
        $("#addTodo").find("button[type=submit]").attr('disabled',false)
        $("#addTodo").trigger('reset');
    }).fail(err => {
        toastr.error(Array.isArray(err.responseJSON.msg) ? err.responseJSON.msg.join('<br />') : err.responseJSON.msg,"Oops");
        $("#addTodo").find("button[type=submit]").attr('disabled',false)
    })
});

$(document).on("click",".updateStatusTodo",function(){
    let todo_id = $(this).data('id');
    $.ajax({
        method : "PATCH",
        url : base_url + "/todos/" + todo_id
    }).done(response => {
        fetchTodo();
        toastr.success('Update todo status successfully','Success')
    }).fail(err =>{
        toastr.error(Array.isArray(err.responseJSON.msg) ? err.responseJSON.msg.join('<br />') : err.responseJSON.msg,"Oops");
    })
})

$(document).on("click",".edit-todo",function(){
    let todo_id = $(this).data('id');
    $.ajax({
        method: 'GET',
        url: base_url + '/todos/'+todo_id,
    }).done(response => {
        $("#editTodo").find('input[name=due_date]').val(response.due_date);
        $("#editTodo").find('select[name=status]').val(response.status.toString());
        $("#editTodo").find('input[name=title]').val(response.title);
        $("#editTodo").find('input[name=todo_id]').val(todo_id);
        $("#editTodo").find('textarea[name=description]').val(response.description);
        $("#editTodoModal").modal('show');
    });
})

$(document).on("submit","#editTodo",function(e){
    e.preventDefault();
    let todo_id = $(this).find("input[name=todo_id]").val();
    let data = $(this).serialize();
    $.ajax({
        method : "PUT",
        url: base_url + '/todos/'+todo_id,
        data
    }).done(response => {
        fetchTodo();
        toastr.success('Update todo successfully','Success')
        $("#editTodoModal").modal('hide');
    }).fail(err => {
        toastr.error('Update todo unsuccessfull','Error')
    });
});

$(document).on("click",".btn-delete",function(){
    let todo_id = $(this).data('id');
    let confirmation = confirm('Are you sure delete this todo?');
    if(confirmation){
        $.ajax({
            method : 'DELETE',
            url: base_url + '/todos/' + todo_id
        }).done(response => {
            fetchTodo();
            toastr.success('Delete todo successfully','Success')
            $("#editTodoModal").modal('hide');
        }).fail(err => {
            toastr.error('Delete todo unsuccessfull','Error')
        });
    }
})

$(document).on("submit","#addProject",function(e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        method : "POST",
        url: base_url + '/projects/',
        data
    }).done(response => {
        fetchProject();
        toastr.success('Create project successfully','Success');
        $("#addProject").trigger('reset')
        $("#addProjectModal").modal('hide');
    }).fail(err => {
        toastr.error('Create project unsuccessfull : '+ err.responseJSON.msg,'Error')
    });
})

$(document).on("click",".invite-project",function(){
    $("#inviteProject").find('input[name=project_id]').val($(this).data('id'));
    $("#inviteProjectModal").modal('show')
});

$(document).on('submit','#inviteProject',function(e){
    e.preventDefault();
    let data = $(this).serialize();
    let project_id = $("#inviteProject").find('input[name=project_id]').val();

    $.ajax({
        method : 'POST',
        url : base_url + '/projects/' + project_id + '/invite',
        data
    }).done(response => {
        fetchProject();
        toastr.success('Invite project successfully','Success');
        $("#inviteProject").trigger('reset')
        $("#inviteProjectModal").modal('hide');
    }).fail(err => {
        toastr.error(Array.isArray(err.responseJSON.msg) ? err.responseJSON.msg.join('<br />') : err.responseJSON.msg,"Oops");
    })
});