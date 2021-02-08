$(document).ready(() => {
  auth();

  $('#login-form').on('submit', e => {
    e.preventDefault();
    login();
  });

  $('#logout-nav').on('click', e => {
    e.preventDefault();
    logout();
  });

  $('#register-form').on('submit', e => {
    e.preventDefault();
    register();
  });

  $('#login-nav').on('click', e => {
    e.preventDefault();
    signin();
  });

  $('#register-nav').on('click', e => {
    e.preventDefault();
    signup();
  });

  $('.back').on('click', e => {
    e.preventDefault();
    homepage();
  })

  $('#show-nav').on('click', e => {
    e.preventDefault();
    show();
  });

  $('#create-nav').on('click', e => {
    e.preventDefault();
    showCreate();
  });

  $('#create-form').on('submit', e => {
    e.preventDefault();
    create();
  });

  $('.todo-edit').on('click', e => {
    e.preventDefault();
    showUpdate(e.target.dataset.id);
  })
});

// $(document).on('click', '.todo-edit', () => {
//   e.preventDefault();
//   console.log(e.target.dataset.id, 'ini dataset');
//   showUpdate(e.target.dataset.id);
// });