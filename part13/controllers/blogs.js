const router = require("express").Router();
const { Op } = require('sequelize')
const { tokenExtractor } = require("../util/middleware");
const { Blog, User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userExtractor = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id)
  next()
}

router.get("/", async (req, res) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = {
      title: { [Op.iLike]: `%${req.query.search}%` },
      author: { [Op.iLike]: `%${req.query.search}%` }
    }
  }
  const blogs = await Blog.findAll({
    include: {model: User, attributes: {exclude: ["passwordHash"]}},
    where,
    order: [['likes', 'DESC']]
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const blog = await Blog.create({...req.body, userId: req.user.id});
  res.status(201).json(blog);
});

router.delete("/:id", blogFinder, tokenExtractor, userExtractor, async (req, res) => {
  if (!req.blog) 
    return res.status(204).end();
  if (req.blog.userId !== req.user.id) 
    return res.status(401).json({"error": "only the creator of the blog can delete it"})
  await req.blog.destroy();
  return res.status(200).end()
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
