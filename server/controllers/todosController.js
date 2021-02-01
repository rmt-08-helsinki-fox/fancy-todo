const {Todo} = require('../models')
const {dateConvert} = require('../helpers/dateConversion')

class Controller {
    static async add(req, res){
        try {
            const {title, description, status, due_date} = req.body
            // console.log(dateConvert(due_date));
            console.log(due_date);
            Todo.create({
                title, description, status, due_date
            })

            res.send({msg: 'hello world'})
        } catch { 
            res.send(err)
        }
    }
}

module.exports = Controller