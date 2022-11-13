const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3 || !password || password.length < 3) {
    return response.status(400).json({
      error:
        "username and password need to be given with at least 3 characters",
    });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
