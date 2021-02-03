module.exports = (err, _, res) => {
  console.log(err, "<<<<<<<:ERROR MASUK")
  console.log(err.name, "<<<<<<:ERROR NAME")
  console.log(err.message, "<<<<<<<:ERROR MSG")
  let status = 500
  let error = "Internal server error"
  let message = "Unexpected error."

  switch (err.name) {
    case "SequelizeValidationError":
      status = 400
      error = "Validation error"
      let ers = []
      err.errors.forEach(er => {
        ers.push(er.message)
      });
      message = ers
      break;

    case "SequelizeForeignKeyConstraintError":
      status = 400
      error = "Validation error"
      message = err.message
      break;

    case "error_404_todo_not_found":
      status = 404
      error = "Not Found"
      message = "Requested todo was not found"
      break;

    case "error_403_todo_forbidden":
      status = 403
      error = "Forbidden access"
      message = "You cannot access this todo"
      break;

    case "error_401_invalid_token":
      status = 401
      error = "Unauthorized"
      message = "Please login first"
      break;

    case "error_400_no_email_password":
      status = 400
      error = "Validation error"
      message = "Please enter email and password"
      break;

    case "error_400_wrong_email_password":
      status = 400
      error = "Validation error"
      message = "Wrong email or password"
      break;

    case "SequelizeUniqueConstraintError":
      status = 400
      error = "Validation error"
      message = err.errors[0].message
      break;

    default:
      break;
  }

  res.status(status).json({ error, message })
}