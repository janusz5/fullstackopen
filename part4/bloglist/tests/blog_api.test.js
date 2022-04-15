const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const supertest = require('supertest')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const postResponse = await api.post('/api/users').send(helper.testuser)
  const testUserId = postResponse.body.id

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({...blog, user: testUserId})
    await blogObject.save()
  }
})

describe('backend api', () => {
  test('all blogs are returned of type json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('post creates a new post', async () => {
    const newBlog = {
      title: "Added Blog",
      author: "Supertest",
      url: "http://localhost",
      likes: 1
    }
    
    const loginResponse = await api.post('/api/login').send({username: 'testuser', password: 'testpassword'})
    const response = await api.post('/api/blogs').send(newBlog).set({'Authorization': `bearer ${loginResponse.body.token}`})
    expect(response.status).toEqual(201)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body.likes).toEqual(1)

    const blogsDB = await helper.blogsInDb()
    expect(blogsDB.length).toEqual(helper.initialBlogs.length + 1)

    const contents = blogsDB.map(b => b.title)
    expect(contents).toContain('Added Blog')
  })

  test('adding a blog is only allowed with a token', async () => {
    const newBlog = {
      title: "Added Blog",
      author: "Supertest",
      url: "http://localhost",
      likes: 1
    }
    
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toEqual(401)

    const blogsDB = await helper.blogsInDb()
    expect(blogsDB.length).toEqual(helper.initialBlogs.length)
  })

  test('missing like property is amended with zero', async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Supertest",
      url: "http://localhost"
    }

    const loginResponse = await api.post('/api/login').send({username: 'testuser', password: 'testpassword'})
    const response = await api.post('/api/blogs').send(newBlog).set({'Authorization': `bearer ${loginResponse.body.token}`})
    expect(response.status).toEqual(201)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body.likes).toEqual(0)
  })

  test('missing title and url property is rejected with 400', async () => {
    const newBlog = {
      author: "Supertest",
      likes: 1
    }
    const loginResponse = await api.post('/api/login').send({username: 'testuser', password: 'testpassword'})
    await api.post('/api/blogs').send(newBlog).set({'Authorization': `bearer ${loginResponse.body.token}`}).expect(400)
  })

  test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedBlog = blogsAtStart[0]
    const loginResponse = await api.post('/api/login').send({username: 'testuser', password: 'testpassword'})
    await api.delete(`/api/blogs/${deletedBlog.id}`).set({'Authorization': `bearer ${loginResponse.body.token}`}).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain(deletedBlog.title)
  })

  test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const unchangedBlog = blogsAtStart[0]
    const changedBlogObject = {
      title: unchangedBlog.title,
      author: unchangedBlog.author,
      url: unchangedBlog.url,
      likes: 100
    }

    const putResponse = await api.put(`/api/blogs/${unchangedBlog.id}`).send(changedBlogObject)
    expect(putResponse.status).toEqual(200)
    expect(putResponse.body.id).toEqual(unchangedBlog.id)
    expect(putResponse.body.likes).toEqual(changedBlogObject.likes)

    const blogsDB = await helper.blogsInDb()
    const changedBlog = blogsDB.filter(b => b.id === unchangedBlog.id)[0]
    expect(changedBlog.likes).toEqual(changedBlogObject.likes)
  })

  test('incorrect user creation', async () => {
    const onlyUsernameResponse = await api.post('/api/users').send({username: 'user'})
    expect(onlyUsernameResponse.status).toEqual(400)
    expect(onlyUsernameResponse.body.error).toMatch(/username and password need to be given with at least 3 characters/)

    const onlyPasswordResponse = await api.post('/api/users').send({password: 'password'})
    expect(onlyPasswordResponse.status).toEqual(400)
    expect(onlyPasswordResponse.body.error).toMatch(/username and password need to be given with at least 3 characters/)

    const shortUsernameResponse = await api.post('/api/users').send({username: 'u', password: 'password'})
    expect(shortUsernameResponse.status).toEqual(400)
    expect(shortUsernameResponse.body.error).toMatch(/username and password need to be given with at least 3 characters/)

    const shortPasswordResponse = await api.post('/api/users').send({username: 'user', password: 'p'})
    expect(shortPasswordResponse.status).toEqual(400)
    expect(shortPasswordResponse.body.error).toMatch(/username and password need to be given with at least 3 characters/)
  })

  test('correct user creation', async () => {
    const correctResponse = await api.post('/api/users').send({password: 'password', username: 'user', name: "User Name"})
    expect(correctResponse.status).toEqual(201)
    expect(correctResponse.body.username).toMatch(/user/)
    expect(correctResponse.body.name).toMatch(/User Name/)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
