const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User, Session } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  const session = await Session.findByPk(req.decodedToken.sessionId, {
    include: { model: User, attributes: ["disabled"] },
  });
  console.log(session);
  if (!session) return res.status(401).json({ error: "token not logged in" });
  if (session.user.disabled) {
    session.destroy();
    return res.status(401).json({ error: "token disabled" });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id);
  next();
};

const errorHandler = (error, req, res, next) => {
  console.log("catched: ", error.name, error.message);
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: `${error.message} with ${error.errors[0].validatorArgs[0]}`,
    });
  } else if (
    error.name === "InputError" ||
    error.name === "SequelizeDatabaseError"
  ) {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: error.errors[0].message });
  }
  return res.status(400).json({ error: "unknown error" });
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
