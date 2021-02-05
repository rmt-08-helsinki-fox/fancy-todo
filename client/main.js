const basUrl = "http://localhost:3000/"

$(document).ready(() => {
    beforeLogin()
    // afterLogin()
})

function beforeLogin() {
    $("#logout-btn").hide()
    $("#register-form").show()
    $("#login-form").hide()
    $("#add-todo").hide()
}

function afterLogin() {
    $("#logout-btn").show()
    $("#register-form").hide()
    $("#login-form").show()
    $("#add-todo").show()

    
}

function auth() {

}

function weather() {

}

