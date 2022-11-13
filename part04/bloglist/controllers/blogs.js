const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.title && !request.body.url) return response.status(400).end()

  const user = request.user

  const blog = new Blog({
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()

  await User.updateOne({ _id: user.id }, { $push: { blogs: savedBlog.id } })

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(populatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!blog)
    return response.status(204).end()

  if (user.id != blog.user.toString())
    return response.status(401).json({ 'error': 'only the user who created a blog can delete it' })

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: request.body.user
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogRouter