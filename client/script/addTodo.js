$(".addTodoBtn1").click(function (event) {
  event.preventDefault();
  $("#add-form").fadeIn();
  $("#navbar").hide();
  $("#status").hide();
});

function formAdd() {
  $("#add-form").fadeIn();
  $("#navbar").hide();
  $("#status").hide();
  $("#list-todo").hide();
  $("#done-todo").hide();
}

$("#add-form-cancelBtn").click(function (event) {
  event.preventDefault();
  auth();
});

$("#add-form-addBtn").click(function (event) {
  event.preventDefault();
  let title = $("#add-form-title").val();
  let due_date = $("#add-form-date").val();
  let description = $("#add-form-description").val();
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      title,
      due_date,
      description,
    },
  })
    .done((response) => {
      SuccessAdd();
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
        $("#errorRegister").empty();
        $("#errorAdd").empty();
        $(".error").fadeIn();

        $("#errorAdd").append(`
      <h5>${jqXHR.responseJSON.message}</h5>
    `);
      }
    })
    .always(() => {
      $("#add-form-title").val("");
      $("#add-form-date").val("");
      $("#add-form-description").val("");
    });
});

function SuccessAdd() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Create Todo sucessfully`,
    showConfirmButton: false,
    timer: 1500,
  });
}
