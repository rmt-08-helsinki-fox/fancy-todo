const base_url = 'http://localhost:4000/'

    function auth(email){
    
        if(!localStorage.getItem('access_token')){
            console.log('ga ada gan')
            $('.logout').hide()
            $('#content').hide()
            $('#reg-form').hide()
            $('#login-form').show()
        }else{
            const token = localStorage.getItem('access_token')
            // console.log(token)
            console.log('ada akses token')
            $('.logout').show()
            $('#content').show()
            $('#login-form').hide()
            $('#reg-form').hide()
            $('#hi').append(email)
        }
    }

        $(document).ready(()=>{
            auth()
        })

        $('#show-reg').on('click', (e)=>{
            e.preventDefault()
            $('#reg-form').show()
            $('#login-form').hide()
        })

        $('#reg-form').on('submit', (e)=>{
            e.preventDefault()
            auth()
            register()
        })

        $('#login-form').on('submit', (e)=>{
            e.preventDefault()
            auth()
            login()
        })

        $('.logout').on('click', ()=>{
            logout()
        })

        $('#addForm').on('submit', (e)=>{
            e.preventDefault()
            addTodo()
        })

     function logout(){
         localStorage.clear()
         auth()
     }
     
     function register(){
        const email = $('#reg-email').val()
        const password = $('#reg-pswd').val()
        $.ajax({
            url: base_url + 'register',
            method: 'POST',
            data: {email, password}
        })
        .done(response=>{
            console.log(response)
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
        })
        .always(_=>{
            console.log('always')
        })
    }

    function login(){
        const email = $('#email').val()
        const password = $('#password').val()
        $.ajax({
            url : base_url + 'login',
            method : 'POST',
            data: {email, password}
        })
        .done(response=>{
            localStorage.setItem("access_token", response.access_token)
            auth(email)
            // console.log(response.email)
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
        })
        .always(_=>{
            console.log('always')
            $('#email').val('')
            $('#password').val('')
        })
        // console.log(`${email} || ${password}`)
    }

    function addTodo(){
       const title = $('#title').val()
       const description = $('#description').val()
       const status = $('#status').val()
       const due_date = $('#due_date').val()
       const task = {title, description, status, due_date}
    //    console.log('8888888888888888888888888888888888888')
    //    console.log(localStorage.access_token)
    //    console.log(data)
   
        $.ajax({
            url: base_url + 'todos',
            method: 'POST',
            data : task,
            headers: {
                token: localStorage.access_token
            }
        })
        .done(response=>{
            console.log(response)
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
            // console.log(headers,'kkkkkkkdaldkfaldkfjaldjfladjflasjdfal')
        })
        .always(_=>{
            console.log('always')
        })
   
    }

    function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token)
        $.ajax({
          url: `${base_url}google-login`,
          method: "POST",
          data: { id_token },
        })
          .done((response) => {
            localStorage.setItem("access_token", response.access_token);
            auth();
          })
          .fail((xhr, text) => {
            console.log(xhr, text)
          })
          .always((_) => {
          
          });
      }
      
    //   function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //       // console.log("User signed out.");
    //     });
    // }