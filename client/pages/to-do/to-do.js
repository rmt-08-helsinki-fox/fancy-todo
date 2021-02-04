//@ts-check

// ? ADD TO DO BUTTON HIDE SHOW FORM
$("#add-to-do-form").hide()

$("#add-to-do-button").click((e) => {
    e.preventDefault()
    $("#add-to-do-form").show()
})

$("#add-to-do-form-cancel").click((e) => {
    e.preventDefault()
    $("#add-to-do-form").hide()
})

$("#add-to-do-form-submit").click((e) => {
    e.preventDefault()
    createToDo()
    auth()
})
