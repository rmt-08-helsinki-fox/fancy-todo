const { todos } = require('../models');

class C_Todos {
  static read (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.findAll()
      .then(data => {
        res.json([data, { msg: `Success read ${data.length} todos` }]);
      })
      .catch(err => {
        res.status(500).json({ msg: "Internal Server Error" });
      })
  };

  static create (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.create(req.body)
      .then(() => {
        res.status(201).json([req.body, {
          msg: `Success create ${req.body.title} todos`
        }]);
      })
      .catch(err => {
        console.log(err);
        if (err.errors) {
          const message = [];

          err.errors.forEach(el => {
            message.push(el.message);
          })

          res.status(404).json(message);
        }
        else res.status(500).json({ msg: "Internal Server Error" });
      })
  };

  static filter_id (req, res) {
    console.log(`URL: ${req.originalUrl}`);

    todos.findByPk(req.params.id)
      .then(data => {
        if (data) res.status(200).json([data, { 
          msg: `Success find todo with id: ${req.params.id}` 
        }]);
        else res.status(404).json({ msg: `Data with id: ${id} not found` })
      })
      .catch(err => {
        res.status(500).json({ msg: "Internal Server Error" });
      })
  };

  static update (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    const id = +req.params.id;

    todos.update(req.body, { where: {id}, returning: true })
      .then((data) => {
        if (data[0] == 1) res.status(200).json([data[1][0], { 
          msg: `Success update todo with id: ${id}` 
        }]);
        else res.status(404).json({ msg: `Data with id: ${id} not found` });
      })
      .catch(err => {
        if (err.errors.length) {
          const message = [];

          err.errors.forEach(el => {
            message.push(el.message);
          })

          res.status(404).json(message);
        }
        else res.status(500).json({ msg: "Internal Server Error" });
      })
  };

  static update_status (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    const id = +req.params.id;

    todos.findByPk(req.params.id)
      .then(data => {
        if (data) {
          data[0].status = req.body.status;
          return todos.update(data[0], { where: {id}, returning: true })
        }
        else res.status(404).json({ msg: `Data with id: ${id} not found` })
      })
      .then(data => { 
        res.status(200).json([data[1][0], { 
          msg: `Success update status todo with id: ${id}` 
        }]);
      })
      .catch(err => {
        res.status(500).json({ msg: "Internal Server Error" });
      })
  };

  static delete (req, res) {
    console.log(`URL: ${req.originalUrl}`);
    const id = +req.params.id;

    todos.destroy({ where: {id} })
      .then(() => {
        res.status(201).json({
          msg: `Success delete todo with id: ${id}`
        });
      })
      .catch(err => {
        res.status(500).json({ msg: "Internal Server Error" });
      })
  };
};

module.exports = C_Todos;