const base_URL = 'http://localhost:3000/';

const auth = () => {
  if (!localStorage.getItem('token')) {
    $('#login-nav').hide();
    $('#register-nav').show();
    $('#login-page').show();
    $('#register-page').hide();
    $('#home-nav').hide();
    $('#main-nav').show();
    $('#main-page').show();
    $('#home-page').hide();
  } else {
    $('#main-nav').hide();
    $('#home-nav').show();
    $('#main-page').hide();
    $('#home-page').show();
    $('#home-todo').show();
    $('#show-todo').hide();
    $('#create-todo').hide();
    $('#edit-todo').hide();
  }
};

const login = () => {
  const email = $('#email-login').val();
  const password = $('#password-login').val();

  $.ajax({
    url: base_URL + `user/login`,
    method: 'POST',
    data: { email, password }
  })
    .done(data => {
      console.log(data.msg);
      localStorage.setItem('token', data.token);
      auth();
    })
    .fail(err => {
      $('#validate-login').text(`Invalid email or password`);
      auth();
    })
    .always(_ => {
      $('#login-form').trigger('reset');
    })
};

const logout = () => {
  localStorage.clear();
  auth();
};

const register = () => {
  const email = $('#email-register').val();
  const password = $('#password-register').val();
  const re_password = $('#re-password-register').val();
  console.log(password, re_password, email);
  if (password != re_password) {
    $('#validate-register').text(`Password didn't match`);
    return;
  } else {
    $.ajax({
      url: base_URL + `user/register`,
      method: 'POST',
      data: { email, password }
    })
      .done(data => {
        console.log(data.msg);
        $('.success-msg').text(data.msg);
        auth();
      })
      .fail(err => {
        $('#login-page').hide();

        let errors = '';
        err.responseJSON.msg.forEach(el => {
          let temp = `<div class="error-register">${el}</div>`;
          errors += temp;
        })

        $('#validate-register').html(errors)
      })
  }
};

const signin = () => {
  $('#login-nav').hide();
  $('#register-nav').show();
  $('#login-page').show();
  $('#register-page').hide();
};

const signup = () => {
  $('#login-nav').show();
  $('#register-nav').hide();
  $('#login-page').hide();
  $('#register-page').show();
};

const show = () => {
  $('#home-todo').hide();
  $('#show-todo').show();
  $('#create-todo').hide();
  $('#edit-todo').hide();
  $.ajax({
    url: base_URL + `todo/`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      console.log(data[1]);
      if (data[0].length) {
        let input = ``;
        
        data[0].forEach(el => {
          input += `
          <tr>
            <th>${el.title}</th>
            <th>${el.description}</th>
            <th>${el.status}</th>
            <th>${el.due_date}</th>
            <th><a class="todo-edit" href="">Edit</a> | <a class="todo-complete" href="">Complete</a> | <a class="todo-delete" href="">Delete</a></th>
          </tr>`
        });

        $('#input-todo').html(input);
        $('#with-data').show();
        $('#without-data').hide();
      } else {
        $('#with-data').hide();
        $('#without-data').show();
      }
    })
    .fail(err => {
      console.log(err);
    })
};

const homepage = () => {
  $('#home-todo').show();
  $('#show-todo').hide();
  $('#create-todo').hide();
  $('#edit-todo').hide();
};

const showCreate = () => {
  $('#home-todo').hide();
  $('#show-todo').hide();
  $('#create-todo').show();
  $('#edit-todo').hide();
};

const create = () => {
  const title = $('#title').val();
  const description = $('#description').val();
  const due_date = $('#due_date').val();

  $.ajax({
    url: base_URL + `todo/`,
    method: 'POST',
    data: {
      title, description, due_date, status: 'Ongoing'
    }, headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('.success-msg').text(data[1].msg);
      homepage();
    })
    .fail(err => {
      console.log(err);
    })
    .always(_ => {
      $('#create-form').trigger('reset');
    })
};

const showUpdate = (id) => {
  $('#home-todo').hide();
  $('#show-todo').hide();
  $('#create-todo').hide();
  $('#edit-todo').show();

  $.ajax({
    url: base_URL + `todo/${id}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      let obj = `
      <form id="edit-form">
        <label for="">Todo</label><br>
        <input type="text" name="title" id="title-update" value="${data.title}"><br><br>
        <label for="">Description</label><br>
        <input type="text" name="description" id="description-update" value="${data.description}"><br><br>
        <label for="">Due Date</label><br>
        <input type="date" name="due_date" id="due_date-update"><br><br>
        <input type="submit" value="Edit">
      </form>
      `
      $('#edit-form').text(obj);
    })
    .fail(err => {
      console.log(err);
    })
    // .always(_ => {
    //   $('#create-form').trigger('reset');
    // })
};

const update = () => {
  const id = $('#id-update').val();
  const title = $('#title-update').val();
  const description = $('#description-update').val();
  const due_date = $('#due_date-update').val();

  $.ajax({
    url: base_URL + `todo/`,
    method: 'PUT',
    data: {
      title, description, due_date, status: 'Ongoing'
    }, headers: {
      token: localStorage.getItem('token')
    }
  })
};