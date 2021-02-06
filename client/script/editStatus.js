function getTodoByIdForUpdateStatus(id, event) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
     updateStatus(response.id, response.status)
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

function updateStatus(id, currentStatus){
  let status;
  if(currentStatus){
    status = false
  } else {
    status = true
  }

  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status
    }
  })
  .done(response => {
    auth() 
  })
  .fail((jqXHR, textStatus)=>{
    console.log(jqXHR, textStatus)
  })
}