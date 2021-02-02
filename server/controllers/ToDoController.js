const { ToDo } = require('../models/')

class ToDoController {
  static async createToDo(req, res) {
    try {
      const { title, description, status, due_date } = req.body

      const newToDo = {
        title,
        description,
        status,
        due_date
      }

      const data = await ToDo.create(newToDo)

      if (!data) throw (error)

      res.status(201).json(data)
    } 

    catch (error) {
      if (error.errors) {
        res.status(400).json(error.errors)
      } else {
        res.status(500).json()
      }
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ToDo.findAll()

      if(!data) throw (error)

      res.status(200).json(data)
    } 
    
    catch (error) {
      res.status(500).json()
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params

      const data = await ToDo.findByPk(id)

      if(!data) throw ({
        status: 404,
        error: "id not found"
      })

      res.status(200).json(data)
    } 
    
    catch (error) {
      res.status(404).json(error)
    }
  }

  static async editAllFieldById(req, res) {
    try {
      const { id } = req.params
      const { title, description, status, due_date } = req.body

      const editedToDo = {
        title,
        description,
        status,
        due_date
      }

      const checkIdExist = await ToDo.findByPk(id)

      if (!checkIdExist) throw ({
        status: 404,
        error: "id not found"
      })

      const data = await ToDo.update(editedToDo, {
        where: { id },
        returning: true
      })

      if(!data) throw (error)

      res.status(200).json(data)
    } 

    catch (error) {
      if (error.status === 404) {
        res.status(404).json(error)
      } else if(error.errors) {
        res.status(400).json(error)
      } else {
        res.status(500).json()
      }
    }
  }

  static async editSpecificFieldById(req, res) {
    try {
      const { id } = req.params
      const { status } = req.body

      const checkIdExist = await ToDo.findByPk(id)

      if (!checkIdExist) throw ({
        status: 404,
        error: "id not found"
      })

      const data = await ToDo.update({status}, {
        where: {
          id
        },
        returning: true
      })

      if(!data) throw (error)

      res.status(200).json(data)
    } 
    
    catch (error) {
      if (error.status === 404) {
        res.status(404).json(error)
      } else if (error) {
        res.status(400).json(error)
      } else {
        res.status(500).json()
      }
    }
  }

  static async deleteById(req, res) {
    try {
      const { id } = req.params

      const checkIdExist = await ToDo.findByPk(id)
      if (!checkIdExist) throw ({
        status: 404,
        error: "id not found"
      })

      const data = await ToDo.destroy({
        where: {
          id
        }
      })

      res.status(200).json({
        message: "todo success to delete"
      })
    }
     
    catch (error) {
      if (error.status === 404) {
        res.status(404).json(error)
      } else {
        res.status(500).json()
      }
    }
  }
}

module.exports = ToDoController