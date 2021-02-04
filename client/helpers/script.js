(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}((function () {
    'use strict';

    /**
     * The code was extracted from:
     * https://github.com/davidchambers/Base64.js
     */

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function InvalidCharacterError(message) {
        this.message = message;
    }

    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = "InvalidCharacterError";

    function polyfill(input) {
        var str = String(input).replace(/=+$/, "");
        if (str.length % 4 == 1) {
            throw new InvalidCharacterError(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }
        for (
            // initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = "";
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4) ?
                (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) :
                0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

    var atob = (typeof window !== "undefined" &&
        window.atob &&
        window.atob.bind(window)) ||
        polyfill;

    function b64DecodeUnicode(str) {
        return decodeURIComponent(
            atob(str).replace(/(.)/g, function (m, p) {
                var code = p.charCodeAt(0).toString(16).toUpperCase();
                if (code.length < 2) {
                    code = "0" + code;
                }
                return "%" + code;
            })
        );
    }

    function base64_url_decode(str) {
        var output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw "Illegal base64url string!";
        }

        try {
            return b64DecodeUnicode(output);
        } catch (err) {
            return atob(output);
        }
    }

    function InvalidTokenError(message) {
        this.message = message;
    }

    InvalidTokenError.prototype = new Error();
    InvalidTokenError.prototype.name = "InvalidTokenError";

    function jwtDecode(token, options) {
        if (typeof token !== "string") {
            throw new InvalidTokenError("Invalid token specified");
        }

        options = options || {};
        var pos = options.header === true ? 0 : 1;
        try {
            return JSON.parse(base64_url_decode(token.split(".")[pos]));
        } catch (e) {
            throw new InvalidTokenError("Invalid token specified: " + e.message);
        }
    }

    /*
     * Expose the function on the window object
     */

    //use amd or just through the window object.
    if (window) {
        if (typeof window.define == "function" && window.define.amd) {
            window.define("jwt_decode", function () {
                return jwtDecode;
            });
        } else if (window) {
            window.jwt_decode = jwtDecode;
        }
    }

})));


const baseUrl = "//localhost:3000"
function auth() {
    if (!localStorage.getItem("accessToken")) {
        $("#navbar").hide()
        $("#header-container").show()
        $("#signin-container").show()
        $("#todos-table-container").hide()
        $("#addtodo-container").hide()
        $("#edittodo-container").hide()
        $("#addtodo-button").hide()

    } else {
        $("#navbar").show()
        $("#header-container").hide()
        $("#signin-container").hide()
        $("#todos-table-container").show()
        $("#addtodo-container").hide()
        $("#edittodo-container").hide()
        $("#addtodo-button").show()
        getTodos()
    }
}
function createUser() {
    $("#register-form").on("submit", e => {
        e.preventDefault()
        const email = $("#email-register").val()
        const password = $("#password-register").val()
        $.ajax({
            url: baseUrl + "/users/signup",
            method: "post",
            data: {
                email, password
            }
        })
            .done(_ => {
                $("#header-container").show()
                $("#signin-container").show()
                $("#register-container").hide()
            })
            .fail((xml, text) => {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'please insert email and password correctly!',

                })
            })
    })
}
function getTodos() {
    $(".table tbody").empty()
    $.ajax({
        url: baseUrl + "/todos",
        method: "get",
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
        .done(todos => {
            console.log(todos, ' this is todos >>>>>>>>')
            todos.forEach((e, index, array) => {
                $(".table tbody").append(
                    `<tr>
                            <td>${index + 1}</td>
                            <td>${e.title}</td>
                            <td>${e.description}</td>
                            <td>${e.status}</td>
                            <td>${e.due_date.split('T')[0]}</td>
                            <td>
                                <div id="actions">
                                    <i class="fa fa-edit" onclick="editTodo('${e.id}','${e.title}','${e.description}', '${e.status}', '${e.due_date}', '${e.UserId}', '${array}')"></i>
                                    <i class="fa fa-trash" onclick="deleteTodo(${e.id})"></i>
                                </div>
                            </td>
                        </tr>`
                )
            })

        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })

}

function signin() {
    $("#signin-form").on("submit", (e) => {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        $.ajax({
            url: baseUrl + "/users/signin",
            method: "post",
            data: { email, password }

        })
            .done(response => {
                localStorage.setItem("accessToken", response.accessToken)
                auth()
            })
            .fail((xhr, text) => {

                $(document).ready(function () {

                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your email address or password is incorrect!',

                    })
                })

            })
            .always(_ => {
                $("#email").val("")
                $("#password").val("")
            })
    })
}

function signout() {
    $("#signout-tab").on("click", e => {
        e.preventDefault()
        localStorage.clear()
        auth()
    })
}

function launchRegister() {
    $("#register-button").on("click", e => {
        e.preventDefault

        $("#header-container").show()
        $("#signin-container").hide()
        $("#register-container").show()

    })

    $("#backtosignin-button").on("click", e => {
        e.preventDefault

        $("#header-container").show()
        $("#signin-container").show()
        $("#register-container").hide()

    })
    createUser()
}

function addTodo() {
    $("#addtodo-button").on("click", e => {
        e.preventDefault()
        $("#addtodo-container").show()
        $("#addtodo-button").hide()

        $("#addtodo-cancel-button").on("click", e => {
            e.preventDefault()
            $("#addtodo-container").hide()
            $("#addtodo-button").show()

        })
        $("#addtodo-form").on("submit", e => {
            e.preventDefault()

            const title = $("#title").val()
            const description = $("#description").val()
            const due_date = $("#due-date").val()
            const status = "unfinished"
            const accessToken = localStorage.getItem("accessToken")
            const currentUser = jwt_decode(accessToken)
            const UserId = currentUser.id
            console.log(title, description, status, due_date, UserId, 'form add todo');

            $.ajax({
                url: baseUrl + "/todos/add",
                method: "post",
                data: {
                    title, description, status, due_date, UserId
                },
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
                .done(_ => {
                    $("#addtodo-container").hide(1000)
                    $("#addtodo-button").show()

                    auth()
                })
                .fail((xhr, text) => {
                    $(document).ready(function () {
                        swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'invalid input!',
                        })
                    })

                })
                .always(_ => {
                    $("#title").val("")
                    $("#description").val("")
                    $("#due-date").val("")
                })
        })
    })
}

function editTodo(todoId, title, description, status, due_date, UserId) {
    let year = new Date (due_date).getFullYear().toString()
    let month = new Date (due_date).getMonth().toString()
    let date = new Date (due_date).getDate().toString()
    if(Number(month) < 10){month = "0" + month}
    if(Number(date) < 10){date = "0" + date}
    $("#todos-table-container").hide()
    $("#add-button-container").hide()
    $("#edittodo-container").show()
    $("#title-edit").val(title)
    $("#description-edit").val(description)
    $("#due-date-edit").val(year + "-" + month + "-" + date)
    


}

function deleteTodo(todoId) {
    console.log(todoId);

}

$(document).ready(function () {
    auth()
    launchRegister()
    signin()
    signout()
    addTodo()



});