import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (title, author, url, token) => {
  const headers = {
    'Authorization': `bearer ${token}`
  }
  const response = await axios.post(baseUrl, {title, author, url}, {headers: headers})
  return response.data
}

export default { getAll, createBlog }