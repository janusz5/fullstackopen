const errorHandler = (error, req, res, next) => {
  console.log("catched: ", error.name, error.message)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === "InputError") {
    return res.status(400).json({ error: error.message })
  }
  return res.status(400).json({ error: "unknown error" });
};

module.exports = { errorHandler };
