const baseURL = 'http://localhost:3000' 

$(document).ready(() => { 
  $('#reg-form').hide()
  $('#navbar').hide()
  $('#todos-table').hide() 
  $('#add-todo-form').hide()

  $('#reg-button').click((event) => { 
    event.preventDefault() 
    const email = $('#reg-email').val() 
    const password = $('#reg-password').val() 
    $.ajax({ 
      url : `${baseURL}/user/register`,
      method :'POST',
      data : {email,password} 
    }) 
    .done(response => {   
      toLoginForm()
      console.log('Register succes')
    }) 
    .fail(err => { 
      console.log(err)
    }) 
    .always(() => { 
      $('#reg-email').val('')
      $('#reg-password').val('')
    })
  }) 

  $('#btn-to-reg-form').click((event) => { 
      event.preventDefault() 
      toRegisterForm()
  }) 

  $('#login-button').click((event) => { 
      event.preventDefault()
      const email = $('#log-email').val() 
      const password = $('#log-password').val() 
      $.ajax({ 
          url : `${baseURL}/user/login`,
          method :'POST',
          data : {email,password}
      }) 
      .done ((response) => { 
          let acces_token = response.accesToken 
          localStorage.setItem('acces_token',acces_token) 
          $('#log-email').val('')
          $('#log-password').val('')
          authentication()
      }) 
      .fail((err) => { 
          console.log(err)
      }) 
  })

  $('#log-out').click((event) => { 
    event.preventDefault() 
    localStorage.removeItem('acces_token')
    toLoginForm()
  }) 

  $('#add-todo').click((event) => { 
    event.preventDefault() 
    toAddToDoForm()
  })
  
  $('#add-todo-button').click((event) => { 
    event.preventDefault() 
    const title =  $('#add-title').val()
    const description = $('#add-description').val()
    const due_date = $('#add-due-date').val()
    const status = $('#add-status').val() 
    $.ajax({ 
      url : `${baseURL}/todos`,
      method :'POST',
      headers : {token : localStorage.getItem('acces_token')},
      data : {title,description,due_date,status}
    }) 
    .done((response) => { 
      console.log(response)
      authentication()
    }) 
    .fail((err) => { 
      console.log(err)
    }) 
    .always(() => { 
      $('#add-title').val('')
      $('#add-description').val('')
      $('#add-due-date').val('')
      $('#add-status').val('') 
    })
  })
  
}) 

function toLoginForm() { 
  $('#reg-form').hide()
  $('#log-form').show() 
  $('#navbar').hide()
  $('#todos-table').hide() 
  $('#add-todo-form').hide()
} 

function toRegisterForm() { 
    $('#navbar').hide()
    $('#log-form').hide() 
    $('#reg-form').show()
} 

function authentication() { 
    if(localStorage.acces_token) { 
        $('#navbar').show() 
        $('#todos-table').show() 
        getTodos()
        $('#log-form').hide() 
        $('#reg-form').hide() 
        $('#add-todo-form').hide()
    } else { 
        $('#navbar').hide() 
        $('#todos-table').hide() 
        $('#log-form').show() 
        $('#reg-form').hide() 
        $('#add-todo-form').hide()
    }
} 

function toAddToDoForm () { 
  $('#add-todo-form').show()
  $('#navbar').show()
  $('#reg-form').hide()
  $('#log-form').hide()
  $('#todos-table').hide() 
} 

function getTodos() { 
  $.ajax({ 
    url : `${baseURL}/todos`,
    method : 'GET',
    headers : { 
      token : localStorage.getItem('acces_token')
    }
  }) 
  .done((todos) => {  
    for (let i = 0 ; i < todos.length ; i ++) { 
      if (todos[i].status === true) { 
        $('#todos-table').append(` 
        <tr> 
          <td>${todos[i].title}</td>
          <td>${todos[i].description}</td>
          <td>${todos[i].status}</td>
          <td>${todos[i].due_date.split('T')[0]}</td> 
          <td><button onclick="editTodoForm(${todos[i].id})">Edit</button>&nbsp;&nbsp;<button onclick="deleteTodo(${todos[i].id})">Delete</button>&nbsp;&nbsp;<button onclick="changeTodoStatus(${todos[i].status},${todos[i].id})">Mark as undone</button></td>
        </tr> 
      `)
      } else {
        $('#todos-table').append(` 
        <tr> 
          <td>${todos[i].title}</td>
          <td>${todos[i].description}</td>
          <td>${todos[i].status}</td>
          <td>${todos[i].due_date.split('T')[0]}</td> 
          <td><button onclick="editTodoForm(${todos[i].id})">Edit</button>&nbsp;&nbsp;<button onclick="deleteTodo(${todos[i].id})">Delete</button>&nbsp;&nbsp;<button onclick="changeTodoStatus(${todos[i].status},${todos[i].id})">Mark as Done</button></td>
        </tr> 
      `)
      }
    } 
    
  }) 
  .fail((err) => { 
    console.log(err)
  })
} 

function deleteTodo(id) { 
  $.ajax({ 
    url : `${baseURL}/todos/${id}`,
    method : 'DELETE',
    headers : { 
      token : localStorage.getItem('acces_token')
    }
  }) 
  .done(() => { 
   authentication()
  }) 
  .fail((err) => { 
    console.log(err)
  }) 
} 

function editTodoForm(id) { 
  console.log(id)
}

function changeTodoStatus(currStatus,id) { 
  let newStatus
  if (currStatus === true) { 
    newStatus = false
  } else { 
    newStatus = true
  } 

  const update = { 
    status : newStatus
  } 
  $.ajax({ 
    url : `${baseURL}/todos/${id}`,
    method : 'PATCH',
    headers : {token : localStorage.getItem('acces_token')},
    data : update
  }) 
  .then(() => { 
    authentication()
  }) 
  .fail((err) => { 
    console.log(err)
  })
}
