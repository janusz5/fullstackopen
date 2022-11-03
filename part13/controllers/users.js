const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const {User, Blog} = require('../models')

const getUserWithoutPWHash = (user) => {
  var {passwordHash, ...returnUser } = user.toJSON()
  return returnUser
}

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: { model: Blog }
  })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const {password, ...rest} = req.body
  if (!password) {
    return res.status(400).json({"error": "password missing"})
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({passwordHash, ...rest})
  res.status(201).json(getUserWithoutPWHash(user))
})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findByPk(req.body.id)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(getUserWithoutPWHash(user))
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter