const { Todo } = require('../models');

class TodoController {
  static read (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    console.log(req.decoded.id);
    Todo.findAll({ where: { user_id: req.decoded.id }, order: [['due_date', 'ASC']] })
      .then(data => {
        console.log(data);
        res.json([data, { msg: `Success read ${data.length} todos` }]);
      })
      .catch(err => next(err));
  };

  static create (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      user_id: req.decoded.id
    };
    console.log(obj);
    Todo.create(obj)
      .then(data => {
        res.status(201).json([data, {
          msg: `Success create ${title} todo`
        }]);
      })
      .catch(err => {
        next(err)
      })
  };

  static update (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    const id = +req.params.id;

    Todo.update(req.body, { where: { id, user_id: req.decoded.id }, returning: true })
      .then(data => {
        if (data[0] == 1) res.status(201).json([data[1][0], { 
          msg: `Success update todo with id: ${id}` 
        }]);
        else throw { msg: `Data with id: ${id} not found`, status: 404 };
      })
      .catch(err => next(err))
  };

  static filterId (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    const id = +req.params.id;

    Todo.findOne({ where: { id, user_id: req.decoded.id } })
      .then(data => {
        if (!data) throw `Data with id: ${id} not found`;
        else res.status(201).json([data, { msg: `Success find todo with id: ${req.params.id}` }]);
      })
      .catch(err => next(err))
  };

  static updateStatus (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    const id = req.params.id;

    Todo.update(req.body, { where: { id, user_id: req.decoded.id }, returning: true })
    .then(data => {
      if (data[0] == 1) res.status(201).json([data[1][0], { 
        msg: `Success complete todo with id: ${id}` 
      }]);
      else throw { msg: `Data with id: ${id} not found`, status: 404 };
    })
    .catch(err => next(err))
  };

  static delete (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);
    const id = req.params.id;

    Todo.destroy({ where: { id, user_id: req.decoded.id } })
      .then(() => {
        res.status(201).json({ 
          msg: `Success delete todo with id: ${id}` 
        });
      })
      .catch(err => next(err))
  };
};

module.exports = TodoController;