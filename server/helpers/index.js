const {hashPassword, comparePass} = require('./bcrypt')
const {generateJwt, verifyJwt} = require('./jwt')

const todoOutputMaker = (todo) => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    due_date: todo.due_date,
    UserId: todo.UserId
  }
}

module.exports = {
  hashPassword,
  comparePass,
  generateJwt,
  verifyJwt,
  todoOutputMaker
}