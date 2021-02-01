const { todos } = require('../models');

class C_Todos {
  static read (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        const error = err.errors[0].message;
        res.status(500).json({ error });
      })
  };

  static create (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.create(req.body)
      .then(todos => {
        res.status(201).json({
          msg: `Success create ${req.body.title} todos`
        });
      })
      .catch(err => {
        const error = err.errors[0].message;
        res.status(400).json({ error });
      })
  };

  static filter_id (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.findByPk(req.params.id)
      .then(data => {
        res.json(data[0]);
      })
      .catch(err => {
        const error = err.errors[0].message || `Error cannot found todos with id: ${id}`; 
        res.status(404).json({ error });
      })
  };

  static update (req, res) {
    console.log(`URL: ${req.originalUrl}`);


  };

  static delete (req, res) {
    console.log(`URL: ${req.originalUrl}`);
  };
};

module.exports = C_Todos;