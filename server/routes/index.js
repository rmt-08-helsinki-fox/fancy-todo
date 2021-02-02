// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const todosRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const auth = require('../middleware/authentication')

const checkToken = function(req, res, next) {
  let auth = auth(req.headers.token)
  // console.log(req.headers.token);
  console.log(auth);
  // next()
}
router.post('/test', checkToken, (req, res) => {
  return res.status(200).json({ ok: true });
})


router.use('/todos', todosRouter)
router.use('/users', userRouter)

module.exports = router