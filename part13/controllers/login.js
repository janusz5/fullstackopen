const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const {User, Session} = require("../models");
const { SECRET } = require("../util/config");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (!user) return res.status(404).json({ error: "user doesn't exist" });

  const correctPassword = await bcrypt.compare(password, user.passwordHash);
  if (!correctPassword) return res.status(401).json({ error: "incorrect password" });

  const session = await Session.create({userId: user.id})

  const token = jwt.sign({ username: user.username, id: user.id, sessionId: session.id }, SECRET, { expiresIn: 60 * 60 })
  return res.json({token, username, name: user.name});
});

module.exports = router;
