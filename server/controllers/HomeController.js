const { Todo } = require('../models/index')

class HomeController {
  static showAllTodosPublic(req, res){
    const option = {
      where: {
        is_private: false
      }
    }
    
    Todo.findAll(option)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = HomeController