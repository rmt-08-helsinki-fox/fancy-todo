const { ToDo } = require('../models/index.js')
const axios = require("axios")
const WEATHER_KEY = process.env.WEATHER_KEY

class ToDoController {
  static getToDos(req, res) {
    // res.send('tes')

    ToDo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }

  static addToDos(req, res) {
    //tes dulu
    // console.log(req.body);
    // res.send('tes add')
    const id = req.decoded.id
    const { title, description, status, due_date } = req.body
    ToDo.create({
      title, description, status, due_date,
      user_id: id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }

  static getId(req, res) {
    // res.json('ini dari Id')
    const id = req.params.id

    ToDo.findOne({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static updateToDos(req, res) {
    // tes dulu
    // res.json('tes baru updateToDOs')

    const id = Number(req.params.id)
    const { title, description, status, due_date } = req.body
    // console.log(req.body);
    ToDo.update({
      title, description, status, due_date
    }, { where: { id }, returning: true })

      .then(data => {
        console.log(data[1][0]);
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static patchToDos(req, res) {
    // tes dulu
    // res.json('tes baru patchToDOs')

    const id = Number(req.params.id)
    const { status } = req.body
    // console.log(req.body);
    ToDo.update({
      status
    }, { where: { id }, returning: true })

      .then(data => {
        console.log(data[1][0]);
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static destroyToDos(req, res) {
    // tes dulu
    // res.json('tes destroyToDOs')

    const id = Number(req.params.id)
    // const { title, description, status, due_date } = req.body

    ToDo.destroy({ where: { id } })

      .then(data => {
        // console.log(data);
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // static todayWeather(req, res) {
  //   axios.get(`api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${WEATHER_KEY}&units=metric`)
  //     .then(response => {
  //       res.json(response.data)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json(err.name)
  //     })
  // }

  static todayWeather(req, res) {
    axios.get(`http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=Jakarta&units=m`)
      .then(response => {
        res.json(response.data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err.name)
      })
  }

}

module.exports = ToDoController