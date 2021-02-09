const onClickedMovie = (data) => {
  data = JSON.parse(data)
  console.log(data);

  const data1item = `
  <div class="col">
    <div class="card" style="width: max-content; border-radius: 20px">
      <img src="${data.poster_path}" width="220px" height="330px" style="border-radius: 20px"  />
      <div class="card-desc">
        <b>${data.title}</b><br/>
        "${data.overview.slice(0, 50) + "..."}"
      </div>
    </div>
  </div>
  `

  localStorage.setItem("selectedMovie", JSON.stringify(data));
  $("#list-movie").empty()
  $("#list-movie").append(data1item)
}