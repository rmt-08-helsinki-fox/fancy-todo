const {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  patchTodo,
  getDashboard,
  getTodoMember
} = require("./todo")

function getAnime() {
  $.ajax({
      url: baseUrl + "/todos/anime",
      method: "GET",
      headers: { access_token: localStorage.access_token }
    })
    .done(response => {
      localStorage.setItem("anime_title", response.title)
      localStorage.setItem("anime_episode", response.episodes)
      $("#anime-area").empty()
        .show()
        .append(`
            <div class="row g-0">
                <div class="col-md-4" id="anime-image-cover">
                    <img src="${response.image_url}" alt="${response.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <p class="card-text">Rating: <strong>${response.rating}</strong> by <strong>${response.rating_by}</strong> users.</p>
                        <p class="card-text">Genres: ${response.genres.join(", ")}</p>
                        <p class="card-text">${response.synopsis.slice(0, 155)} . . .</p>
                        <a class="btn btn-primary text-end" id="add-anime-to-todo">Add todo</a>
                        <a class="btn btn-primary text-end" id="btn-close-add-anime">close</a>
                    </div>
                </div>
            </div>
      `)
    })
    .fail(err => {
      console.log(err)
    })
}

module.exports = { getAnime }