const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { Op } = require("sequelize");
const { User, Blog } = require("../models");

const getUserWithoutPWHash = (user) => {
  var { passwordHash, ...returnUser } = user.toJSON();
  return returnUser;
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: { model: Blog },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["passwordHash"] },
    include: [{
      model: Blog,
      as: 'marked_to_read',
      through: {
        attributes: ["id", "read"]
      }
    },{
      model: Blog
    }]
  });
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { password, ...rest } = req.body;
  if (!password) {
    return res.status(400).json({ error: "password missing" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ passwordHash, ...rest });
  res.status(201).json(getUserWithoutPWHash(user));
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { username: { [Op.eq]: req.params.username } },
  });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(getUserWithoutPWHash(user));
  } else {
    res.status(404).end();
  }
});

module.exports = router;
