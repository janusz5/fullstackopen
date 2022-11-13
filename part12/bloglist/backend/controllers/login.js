const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const userDb = await User.findOne({ username: username });
  if (!userDb)
    return response.status(403).json({ error: "incorrect username" });

  const correctPassword = await bcrypt.compare(password, userDb.passwordHash);
  if (!correctPassword)
    return response.status(403).json({ error: "incorrect password" });

  const token = jwt.sign(
    { username: username, id: userDb.id },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  );

  response.status(200).send({ token, username, name: userDb.name });
});

module.exports = loginRouter;
