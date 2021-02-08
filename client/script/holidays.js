$("#toHolidays").click(function (event) {
  event.preventDefault();
  $("#holidays").fadeIn();
  getHolidays();
  $("#navbar").show();
  $("#status").hide();
  $("#home-page").hide();
  $("#list-todo").hide();
  $("#done-todo").hide();
  $("#register").hide();
  $("#add-form").hide();
  $("#edit-form").hide();
});

function getHolidays() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/holidays`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      $("#tbody").empty()
      console.log(response);
      response.forEach((el, i) => {
        $("#tbody").append(`
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${el.name}</td>
      <td>${el.description}</td>
      <td>${new Date(el.date).toString().slice(0, 16)}</td>
    </tr>
  `);
      });
    })
    .fail((jqXHR, textStatus) => {
      console.log(jqXHR, textStatus);
    });
}
