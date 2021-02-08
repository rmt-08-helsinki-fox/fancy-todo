


const base_url = 'http://localhost:4000/'

    function auth(email){
    
        if(!localStorage.getItem('access_token')){
            console.log('ga ada gan')
            $('.logout').hide()
            $('#content').hide()
            $('#reg-form').hide()
            $('#login-form').show()
            $('#editForm').hide()
        }else{
            const token = localStorage.getItem('access_token')
            // console.log(token)
            console.log('ada akses token')
            $('.logout').show()
            $('#content').show()
            $('#login-form').hide()
            $('#reg-form').hide()
            $('#hi').append(email)
            $('#editForm').hide()

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

        $('#showAddForm').on('click', (e)=>{
            e.preventDefault()
            $('#editForm').hide()
            $('#addForm').show()
        })

        $('#editForm').on('submit', (e)=>{
            e.preventDefault()
            edit()
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
            // console.log(response)
            $('tbody').append(`
            <tr id="tr${response.id}">
                <td>${response.title}</td>
                <td>${response.description}</td>
                <td>${response.status}</td>
                <td>${response.due_date}</td>
                <td>
                    <a href="#" onclick="dltTodo(${response.id})">Delete </a> || 
                    <a href="#" onclick="showEditForm(${response.id})">Edit</a>
                </td>
            </tr>
        `)
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
                        <tr id="tr${el.id}">
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                                <a href="#" onclick="dltTodo(${el.id})">Delete</a> || 
                                <a href="#" onclick="showEditForm(${el.id})">Edit</a>
                            </td>
                        </tr>
                    `)
                    
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
            $(`#tr${id}`).text('')
        
          
        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
        })
        .always(_=>{
            console.log('always delete')
        })
    }

    function showEditForm(id){
        $(`#editForm`).show()
        $('#addForm').hide()

        $.ajax({
            url: base_url + `todos/${id}`,
            headers: {
                token: localStorage.access_token
            },
            method: 'GET'
        })
        .done(response=>{
            console.log(response,'<<<<<<<<<<<<<<<<<<<<<<<')
            $('#idEdit').val(`${response.id}`)
            $('#titleEdit').val(`${response.title}`)
            $('#descriptionEdit').val(`${response.description}`)
            let tgl = new Date(response.due_date)
            let moon = `${tgl.getMonth()+1}`
                moon = moon.length > 1 ? moon : `0${moon}`
            let date = `${tgl.getDate()}`
                date = date.length > 1 ? date : `0${date}`
                tgl = `${tgl.getFullYear()}-${moon}-${date}`
                // console.log(tgl,'<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>')
                console.log(tgl)
                // console.log(moon.length, moon)
            $('#due_dateEdit').val(`${tgl}`)

        })
        .fail((xhr, text)=>{
            console.log('xxxxxxxxxxxxxxxxxxxxx')
            console.log(xhr, text)
            console.log('xxxxxxxxxxxxxxxxxxxxx')
        })
        .always(_=>{
            // console.log('always getTodoById')
        })
    }

    function edit(){
        const title = $('#titleEdit').val()
        const description = $('#descriptionEdit').val()
        const due_date = $('#due_dateEdit').val()
        const id = $('#idEdit').val()

        $.ajax({
            url : base_url + 'todos/'+id,
            method: 'PUT',
            data : {
                title,
                description,
                due_date
            },
            headers : {
                token : localStorage.access_token
            }
        })
        .done(response=>{
            console.log(response.id)
            $(`#tr${response.id}`).text('')

            $(`#tr${response.id}`).append(`
                <td>${response.title}</td>
                <td>${response.description}</td>
                <td>${response.status}</td>
                <td>${response.due_date}</td>
                <td>
                <a href="#" onclick="dltTodo(${response.id})">Delete</a> || 
                <a href="#" onclick="showEditForm(${response.id})">Edit</a>
                </td>
            `)

            // console.log(response[1]['0'].description) PATCH


        })
        .fail((xhr, text)=>{
            console.log(xhr, text)
        })
        .always(_=>{
            $('#editForm').hide()
            $('#addForm').show()
        })
    }



  