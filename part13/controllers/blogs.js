const router = require('express').Router()

const { Blog } = require('../models')

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json(error);
  }
});


const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete("/:id", blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(204).end()
  }
  try {
    await req.blog.destroy()
    res.status(200).end()
  } catch (error) {
    return res.status(400).json(error);
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
}) 

module.exports = router
