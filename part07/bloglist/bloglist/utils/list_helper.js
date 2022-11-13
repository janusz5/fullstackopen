var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, curr) => prev + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  let maxLikes = 0;
  let maxLikeBlog = {};
  blogs.forEach((element) => {
    if (element.likes > maxLikes) {
      maxLikes = element.likes;
      maxLikeBlog = element;
    }
  });
  return maxLikeBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authors = _.countBy(blogs, "author");
  let maxBlogs = 0;
  let maxBlogsAuthor = {};
  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs > maxBlogs) {
      maxBlogs = blogs;
      maxBlogsAuthor = { author: author, blogs: blogs };
    }
  }
  return maxBlogsAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  const authors = _.groupBy(blogs, "author");
  let maxLikes = 0;
  let maxLikesAuthor = {};
  for (const [author, likesArray] of Object.entries(authors)) {
    likes = _.sumBy(likesArray, "likes");
    if (likes > maxLikes) {
      maxLikes = likes;
      maxLikesAuthor = { author: author, likes: likes };
    }
  }
  return maxLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
