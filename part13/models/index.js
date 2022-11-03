const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");
const Session = require('./session')

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'marked_to_read' });
Blog.belongsToMany(User, { through: ReadingList, as: 'marked_by' });

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingList,
  Session
};
