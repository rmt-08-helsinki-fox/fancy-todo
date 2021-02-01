const { todos } = require('../models');

class Controller {
  static main (req, res) {

  };

  static create (req, res) {
    todos.create(req.body)
  }
};

module.exports = Controller;