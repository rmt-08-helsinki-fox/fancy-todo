const { message } = require('statuses')
const {Todo} = require('../models/index') 

class Controller { 
    static showTodos (req,res) { 
        Todo.findAll() 
        .then((data) => { 
            res.status(200).json(data)
        })
        .catch ((err) => { 
            res.status(500).json(err)
        })
    } 

    static addTodo (req,res) { 
        const {title,description,status,due_date} = req.body
        const todo = {title,description,status,due_date}
        Todo.create(todo) 
        .then((data) => { 
            res.status(201).json(data)
        }) 
        .catch ((err) => { 
            if (err.name === 'SequelizeValidationError') { 
                res.status(400).json(err)
            } else { 
                res.status(500).json({msg : 'Internal Server Error'})
            }
            
        })
    } 
 
    static findOneById(req,res) { 
        Todo.findOne({ 
            where : { 
                id : +req.params.id
            }
        }) 
        .then((data) => { 
            if (data === null) { 
                res.status(404).json({msg : 'Todo not found'})
            } else { 
                res.status(200).json(data)
            }
        }) 
        .catch ((err) => { 
            res.status(500).json(err)
        })
    } 

    static update(req,res) { 
        const {title,description,status,due_date} = req.body 
        const updatedTodo = {title,description,status,due_date} 
        Todo.update(updatedTodo, { 
            where : { 
                id : +req.params.id 
            }, 
            returning : true
        }) 
        .then((data) => { 
            if (data[1].length === 0) { 
                res.status(404).json({msg : 'Todo not found'})
            } else { 
                res.status(200).json(data[1][0])
            }
        }) 
        .catch((err) => { 
            if (err.name === 'SequelizeValidationError') { 
                res.status(400).json(err)
            } else { 
                res.status(500).json({msg : 'Internal Server Error'})
            }
        })
    } 

    static changeStatus (req,res) { 
        const {status} = req.body 
        const updatedStatus = {status} 
        Todo.update(updatedStatus, { 
            where : { 
                id : +req.params.id 
            }, 
            returning : true
        }) 
        .then((data) => { 
            if (data[1].length === 0) { 
                res.status(404).json({msg : 'Todo not found'})
            } else { 
                res.status(200).json(data[1][0])
            }
        }) 
        .catch((err) => { 
            if (err.name === 'SequelizeValidationError') { 
                res.status(400).json(err)
            } else { 
                res.status(500).json({msg : 'Internal Server Error'})
            }
        })
    } 

    static delete (req,res) { 
        Todo.destroy({ 
            where :  { 
                id : +req.params.id
        }}) 
        .then((data) => { 
            if (data === 0) { 
                res.status(404).json({msg : 'Todo not found'})
            } else { 
                res.status(200).json({message : 'todo success to delete'})
            }
        }) 
        .catch((err) => { 
            res.status(500).json(err)
        })
    }
} 

module.exports = Controller