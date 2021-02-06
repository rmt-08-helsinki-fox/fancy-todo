function getTodoById(id, currentStatus, event) {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      $("#edit-form").fadeIn();
      $("#edit-form-title").val(response.title);
      $("#edit-form-date").val(response.due_date.slice(0, 10));
      $("#edit-form-description").val(response.description);
      $("#editFormBtn").data("id", id);
      $("#editFormBtn").data("status", currentStatus);
      $("#navbar").hide();
      $("#status").hide();
      $("#list-todo").hide();
      $("#done-todo").hide();
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}

$("#editFormBtn").click(function (event) {
  event.preventDefault();
  let idTodo = $("#editFormBtn").data("id");
  let status = $("#editFormBtn").data("status");
  let title = $("#edit-form-title").val();
  let due_date = $("#edit-form-date").val();
  let description = $("#edit-form-description").val();

  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${idTodo}`,
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      status,
      title,
      due_date,
      description,
    },
  })
    .done((response) => {
      SuccessEdit()
      auth();
    })
    .fail((jqXHR, textStatus) => {
      if (Array.isArray(jqXHR.responseJSON)) {
        let err = jqXHR.responseJSON;
        err.forEach((el) => {
          Swal.fire({
            icon: "error",
            title: `${el.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `${jqXHR.responseJSON.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      console.log(jqXHR, textStatus);
    });
});

$("#editFormCancelBtn").click(function (event) {
  event.preventDefault();
  auth();
});

function SuccessEdit() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Edit Todo sucessfully`,
    showConfirmButton: false,
    timer: 1500,
  });
}
