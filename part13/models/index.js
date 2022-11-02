const Blog = require('./blog')

Blog.sync();

const models = {
  Blog,
};

module.exports = models;
