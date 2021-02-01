const { Todo } = require('../models/index');

class Controller {
  static async addToDoList(req, res) {

    const { title, description, status, due_date } = req.body;
    try {

      const todo = await Todo.create({
        title,
        description,
        status,
        due_date: new Date(due_date)
      }, {
        returning: true
      });

      if (todo) {
        res.status(201).json(todo);
      }

    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors[0]);
      } else {
        res.status(500).json(err);
      }

    }
  }

  static async getToDoList(req, res) {

    try {

      let lists = await Todo.findAll({ order: [['id', 'ASC']] });

      if (lists) {
        res.status(200).json(lists);
      }

    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getToDoListIdParam(req, res) {

    let id = +req.params.id;

    try {

      let list = await Todo.findOne({ where: { id } });

      if (list) {
        res.status(200).json(list);
      } else {
        throw { error: 'ID not found!' };
      }

    } catch (err) {

      if (err.error) {
        res.status(404).json(err);
      } else {
        res.status(500).json(err);
      }

    }
  }

  static async updateToDoList(req, res) {

    let id = +req.params.id;
    let { title, description, status, due_date } = req.body;

    try {
      let list = await Todo.update({
        title,
        description,
        status,
        due_date
      }, {
        where: {
          id
        },
        returning: true
      });

      if (list[0] !== 0) {
        res.status(200).json(list[1][0]);
      } else {
        throw { error: "ID not found!" };
      }

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors[0]);
      } else if (err.error) {
        res.status(404).json(err)
      } else {
        res.status(500).json(err);
      }

    }
  }

  static async updateStatusToDoList(req, res) {

    let id = +req.params.id;
    let { status } = req.body;

    try {

      let list = await Todo.update({ status }, { where: { id }, returning: true });

      if (list[0] !== 0) {
        res.status(200).json(list[1][0]);
      } else {
        throw { error: "ID not found!" };
      }

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors[0]);
      } else if (err.error) {
        res.status(404).json(err);
      } else {
        res.status(500).json(err);
      }

    }
  }

  static async deleteToDoList(req, res) {

    let id = +req.params.id;

    try {

      let listFound = await Todo.findOne({
        where: {
          id
        }
      });

      if (listFound) {

        let deleteList = await Todo.destroy({
          where: {
            id: listFound.id
          }
        })

        if (deleteList) {
          res.status(200).json({ listDeleted: listFound, message: 'todo success to delete' });
        } else {
          throw { error: 'ID not found!' };
        }

      } else {
        throw { error: 'ID not found!' };
      }

    } catch (err) {

      if (err.error) {
        res.status(404).json(err);
      } else {
        res.status(500).json(err);
      }

    }
  }
}

module.exports = Controller;