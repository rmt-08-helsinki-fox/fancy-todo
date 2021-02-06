$(document).ready(()=>{
    auth()
    $("#loginform").on("submit", (e)=>{
        e.preventDefault()
        login()
    })

    $("#registerform").on("submit", (e)=>{
        e.preventDefault()
        register()
    })

    $("#loginbutton").click((e)=>{
        e.preventDefault()
        changeLoginForm()
    })
    $("#registerbutton").click((e)=>{
        e.preventDefault()
        changeRegisterForm()
    })
    $("#loginbuttona").click((e)=>{
        e.preventDefault()
        changeLoginForm()
    })
    $("#registerbuttona").click((e)=>{
        e.preventDefault()
        changeRegisterForm()
    })
    $("#registerreminder").click((e)=>{
        e.preventDefault()
        changeRegisterForm()
    })

    $("#addtodocard").on("submit", (e)=>{
      e.preventDefault()
      addTodo()
    })

    $("#addtodo").click((e)=>{
      e.preventDefault()
      $("#todostable").hide()
      $("#addtodocard").show()
    })

    $("#titlelogo").click((e)=>{
      e.preventDefault()
      auth()
    })

    $("#edittodocard").on("submit", (e)=>{
        e.preventDefault()
        postEditTodo()
    })

    $("#logout").click((e)=>{
        e.preventDefault()
        logout()
      })
})