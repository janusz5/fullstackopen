const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog)
Blog.belongsTo(User)

const models = {
  Blog,
  User
};

module.exports = models;
