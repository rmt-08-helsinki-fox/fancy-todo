$(document).ready(function () {
  function fetchTodos() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/todos',
      headers: {
        access_token: localStorage.getItem("access_token"),
    },
    }).done(function (todos) {
      $('.card').remove();

      for (let i = 0; i < todos.length; i++) {
        // append ke mana?
        $('.container').append(`
          <div class="card">
            <h1>${todos[i].title}</h1>
            <p>${todos[i].description}</p>
            <p>${todos[i].due_date}</p>
          </div>
        `);
      }
    });
  }

  fetchTodos();

  $('#new-todo-title').change(function() {
    console.log('Title changed');
  });

  $('#add-todo-form').submit(function (event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/todos',
      data: {
        title: $('#new-todo-title').val(),
        description: $('#new-todo-description').val(),
        due_date: $('#new-todo-due_date').val(),
      },
    }).done(function () {
      fetchTodos();
    });
  });
});
