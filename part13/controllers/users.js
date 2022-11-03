const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash']}
  })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  console.log(req.body)
  const {password, ...rest} = req.body
  if (!password) {
    return res.status(400).json({"error": "password missing"})
  }
  var passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({passwordHash, ...rest})
  var {passwordHash, ...returnUser } = user.toJSON()
  res.status(201).json(returnUser)
})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findByPk(req.body.id)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter