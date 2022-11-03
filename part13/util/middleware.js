const jwt = require('jsonwebtoken')
const {SECRET} = require('./config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  console.log("catched: ", error.name, error.message)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === "InputError") {
    return res.status(400).json({ error: error.message })
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: error.errors[0].message})
  }
  return res.status(400).json({ error: "unknown error" });
};

module.exports = { errorHandler, tokenExtractor };
