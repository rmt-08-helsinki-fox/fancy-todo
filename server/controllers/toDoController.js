//@ts-check
// @ts-ignore
const { ToDo } = require("../models")
const { errorHandler } = require("../middlewares/errorHandler")

class toDoController {
    // ? 1. Create ToDo => 201, 400, 500
    static async create(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const data = await ToDo.create({ title, description, status, due_date })
            if (data) {
                res.status(201).json(data)
                return
            }
            next({ status: 400 })
        } catch (err) {
            next(err)
        }
    }
    // ? 2. Read ToDo => 200, 500
    static async read(req, res, next) {
        try {
            const data = await ToDo.findAll()
            if (data.length) {
                res.status(200).json(data)
                // ! v Usually data becomes object on works, best practice
                // res.status(200).json({data})
                return
            }
            next({
                status: 500,
                msg: "No data found",
            })
        } catch (err) {
            next(err)
        }
    }
    // ? 3. Get ToDo by id => 200, 404
    static async findById(req, res, next) {
        try {
            const data = await ToDo.findByPk(+req.params.id)
            if (data) {
                res.status(200).json(data)
                return
            }
            next({ status: 404 })
        } catch (err) {
            next(err)
        }
    }
    // ? 4. Update ToDo (using put) => 200, 400, 404, 500
    static async updatePut(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body
            const [count, data] = await ToDo.update(
                { title, description, status, due_date },
                {
                    where: { id: +req.params.id },
                    returning: true,
                }
            )
            if (count === 0) {
                next({ status: 404 })
                return
            }
            res.status(200).json(data[0])
        } catch (err) {
            next(err)
        }
    }
    // ? 5. Update ToDo (using patch) => 200, 400, 404, 500
    static async updatePatch(req, res, next) {
        try {
            const { status } = req.body
            const [count, data] = await ToDo.update(
                { status },
                {
                    where: { id: +req.params.id },
                    returning: true,
                }
            )
            if (count === 0) {
                next({ status: 404 })
                return
            }
            res.status(200).json(data[0])
        } catch (err) {
            next(err)
        }
    }
    // ? 6. Delete ToDo => 200, 404, 500
    static async destroy(req, res, next) {
        try {
            const data = await ToDo.findByPk(+req.params.id)
            if (data) {
                await ToDo.destroy({
                    where: { id: +req.params.id },
                })
                res.status(200).json({
                    msg: `ToDo success to delete`,
                    data,
                })
            } else {
                next({ status: 404 })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = toDoController
