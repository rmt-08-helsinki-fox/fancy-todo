//@ts-check
// @ts-ignore
const { ToDo } = require("../models")
const { errorHandler } = require("../middlewares/errorHandler")

class toDoController {
    // ? 1. Create ToDo => 201, 400, 500
    // static form(req, res) {}
    static async create(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const data = await ToDo.create({ title, description, status, due_date })
            if (data) {
                res.status(201).json(data)
            } else {
                next({ status: 400 })
            }
        } catch (next) {}
    }
    // ? 2. Read ToDo => 200, 500
    static async read(req, res, next) {
        try {
            const data = await ToDo.findAll()
            if (data) {
                res.status(200).json(data)
            } else {
                next({ status: 500 })
            }
        } catch (next) {}
    }
    // ? 3. Get ToDo by id => 200, 404
    static async findById(req, res, next) {
        try {
            const data = await ToDo.findByPk(+req.params.id)
            if (data) {
                res.status(200).json(data)
            } else {
                next({ status: 404 })
            }
        } catch (next) {}
    }
    // ? 4. Update ToDo (using put) => 200, 400, 404, 500
    static async updatePut(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const data = await ToDo.update(
                { title, description, status, due_date },
                {
                    where: { id: +req.params.id },
                }
            )
            if (data) {
                res.status(200).json(data)
            } else {
                // ! ERROR 400 404
                next()
            }
        } catch (next) {}
    }
    // ? 5. Update ToDo (using patch) => 200, 400, 404, 500
    static async updatePatch(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const data = new ToDo.update(
                { title, description, status, due_date },
                {
                    where: { id: +req.params.id },
                }
            )
            if (data) {
                res.status(200).json(data)
            } else {
                // ! ERROR 400 404
                next()
            }
        } catch (next) {}
    }
    // ? 6. Delete ToDo => 200, 404, 500
    static async destroy(req, res, next) {
        try {
            const data = await ToDo.findByPk(+req.params.id)
            ToDo.destroy({
                where: { id: +req.params.id },
            })
            if (data) {
                // ! message: `todo success to delete`
                res.status(200).json(data)
            } else {
                next()
            }
        } catch (next) {}
    }
}

module.exports = toDoController
