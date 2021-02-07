

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
            getTodo()
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
    //    const status = $('#status').val()
       const due_date = $('#due_date').val()
       const task = {
           title, 
           description, 
           status: false,
           due_date
        }
   
   
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
            $('#title').val('')
            $('#description').val('')
            $('#due_date').val('')
        })
   
    }

    function getTodo(){
        $.ajax({
            url: base_url + 'todos',
            headers: {
                token: localStorage.access_token
            },
            method: 'GET',
        })
        .done(response=>{
            // console.log(response[0].title)
            if(response[0]){
                const {title, description, status, due_date} = response[0]
                // console.log(title, description, status, due_date)
                response.forEach(el=>{
                    $('tbody').append(`
                        <tr>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                                <a href="#" onclick="dltTodo(${el.id})">Delete ${el.id}</a> || 
                                <a href="">Edit</a>
                            </td>
                        </tr>
                    `)
                    $('#del')
                })
            }
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
            // console.log(localStorage.access_token)
        })
        .always(_=>{
            
        })
    }

    function dltTodo(id){
        $.ajax({
            url: base_url + `todos/${id}`,
            method: 'DELETE',
            headers: {
                token : localStorage.access_token
            }
        })
        .done(response=>{
            console.log(response)
            // auth()
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
        })
        .always(_=>{
            console.log('always delete')
        })
    }



  