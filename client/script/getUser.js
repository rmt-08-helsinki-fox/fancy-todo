function getUser(){
  $('#username').empty()
  $('#status').empty()
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/user`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response =>{
    $('#username').append(`
    <p><b>${response.data.username}</b></p>
    `)
    $('#status').append(`
    <h1>Welcome ${response.data.username}</h1>
    <h1>You dont have anything todo</h1>
    <h3>Want to make some?</h3>
    <button class="addTodoBtn1 btn btn-success" onclick="formAdd()"><h5>Add Todo</h5></button>
    `)
  })
}