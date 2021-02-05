const http = require("https");
const { Todo, User } = require('../models/index');

class todoController {
  static async addToDoList(req, res, next) {

    const { title, description, status, due_date } = req.body;
    const { id } = req.decoded;

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
      res.status(201).json(todo);
    } catch (err) {
      err.from = 'todoController:addToDoList';
      next(err);
    }
  }

  static async getToDoList(req, res, next) {
    try {
      let { id } = req.decoded;
      let lists = await Todo.findAll({
        where: {
          UserId: id
        },
        order: [
          ['id', 'ASC']
        ],
        include: [User]
      });
      res.status(200).json(lists);
    } catch (err) {
      err.from = 'todoController:getToDoList';
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
      err.from = 'todoController:getToDoListIdParam';
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
      err.from = 'todoController:updateToDoList';
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
      err.from = 'todoController:updateStatusToDoList';
      next(err);
    }
  }

  static async deleteToDoList(req, res, next) {
    let id = +req.params.id;
    try {
      let listFound = await Todo.findByPk(id);
      if (listFound) {
        Todo.destroy({
          where: {
            id: listFound.id
          }
        })
        res.status(200).json({ listDeleted: listFound, message: 'todo success to delete' });
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

  static async getDictionary(req, res, next) {
    const app_id = process.env.OXFORD_APP_ID;
    const app_key = process.env.OXFORD_APP_KEY;
    const wordQuery = req.query.word;
    const strictMatch = "false";

    const options = {
      host: 'od-api.oxforddictionaries.com',
      port: '443',
      path: '/api/v2/entries/en-gb/' + wordQuery + '?strictMatch=' + strictMatch,
      method: "GET",
      headers: {
        'app_id': app_id,
        'app_key': app_key
      }
    };

    try {
      http.get(options, (resp) => {
        let body = '';
        resp.on('data', (d) => {
          body += d;
        });
        resp.on('end', () => {
          let parsed = JSON.parse(body);
          if (!parsed.results) return res.status(404).json({ error: 'Kata yang anda cari tidak terdaftar!' })
          res.status(200).json({ definition: parsed.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0] });
        });
      });
    } catch (err) {
      err.from = 'todoController:getDictionary';
      res.status(500).json({ error: err });
    }
  }
}

module.exports = todoController;