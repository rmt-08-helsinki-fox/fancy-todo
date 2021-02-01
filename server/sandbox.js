//@ts-check
const notFoundError = require("../helper/error")

class Controller {
    // ? 1. Create ToDo
    // static form(req, res) {}
    static create(req, res) {
        const datum = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        // ! TODO: due_date > validasi gak boleh masukin tanggal yang udah lewat hari ini
        ToDo.create(datum)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                // ! TODO: request gagal 400 status code
                res.status(500).json(err)
            })
    }

    // ? 2. Read ToDo
    static read(req, res) {
        ToDo.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    // ? 3. Get ToDo by id
    static findById(req, res) {
        ToDo.findByPk(+req.params.id)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(404).json(err)
            })
    }
    // ? 4. Update ToDo (using put)
    static updatePut(req, res) {
        const datum = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        ToDo.update(datum, {
            where: {
                id: +req.params.id,
            },
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                // ! TODO: request gagal 400 status code
                // ! TODO: request gagal 500 status code
                res.status(404).json(err)
            })
    }
    // ? 5. Update ToDo (using patch)
    static updatePatch(req, res) {
        const datum = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        ToDo.update(datum, {
            where: {
                id: +req.params.id,
            },
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                // ! TODO: request gagal 400 status code
                // ! TODO: request gagal 500 status code
                res.status(404).json(err)
            })
    }

    // ? 6. Delete ToDo
    static destroy(req, res) {
        ToDo.destroy({
            where: {
                id: +req.params.id,
            },
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(404).json(err)
            })
    }
}

module.exports = Controller
