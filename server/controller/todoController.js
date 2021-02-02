const { Todo } = require('../models/index');

class todoController {
  static async addToDoList(req, res, next) {

    const { title, description, status, due_date } = req.body;

    try {

      const todo = await Todo.create({
        title,
        description,
        status,
        due_date: new Date(due_date),
        UserId: +id
      }, {
        returning: true
      });

      if (todo) res.status(201).json(todo);

    } catch (err) {

      next(err);

    }
  }

  static async getToDoList(req, res, next) {

    try {

      let lists = await Todo.findAll({ order: [['id', 'ASC']] });

      if (lists.length === 0) throw {
        name: 'CustomError',
        error: 'No item is found!',
        status: 404
      };

      res.status(200).json(lists);

    } catch (err) {

      next(err);

    }
  }

  static async getToDoListIdParam(req, res, next) {

    let id = +req.params.id;

    try {

      let list = await Todo.findOne({ where: { id } });

      if (list) res.status(200).json(list);

      throw { name: 'CustomError', error: 'ID not found!', status: 404 };

    } catch (err) {

      next(err);

    }
  }

  static async updateToDoList(req, res, next) {

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
        throw {
          name: 'CustomError',
          error: "ID not found!",
          status: 404
        };
      }

    } catch (err) {

      next(err);

    }
  }

  static async updateStatusToDoList(req, res, next) {

    let id = +req.params.id;
    let { status } = req.body;

    try {

      let list = await Todo.update({ status }, { where: { id }, returning: true });

      if (list[0] !== 0) res.status(200).json(list[1][0]);

      throw {
        name: "CustomError",
        error: "ID not found!",
        status: 404
      };

    } catch (err) {

      next(err);

    }
  }

  static async deleteToDoList(req, res, next) {

    let id = +req.params.id;

    try {

      let listFound = await Todo.findByPk(id);

      if (listFound) {

        let deletedList = await Todo.destroy({
          where: {
            id: listFound.id
          }
        })

        if (deletedList) res.status(200).json({ listDeleted: listFound, message: 'todo success to delete' });

        throw {
          name: 'CustomError',
          error: 'ID not found!',
          status: 404
        }

      } else {

        throw {
          name: 'CustomError',
          error: 'ID not found!',
          status: 404
        }

      }

    } catch (err) {

      next(err);

    }
  }
}

module.exports = todoController;