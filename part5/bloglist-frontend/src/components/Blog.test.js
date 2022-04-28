import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  test('Only author and Title are shown at the beginning', async () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testURL',
      likes: 0,
      user: {
        name: 'testUserName'
      }
    }

    const { container } = render(<Blog blog={blog} user={{ username: '' }} />)

    const title = await screen.findByText(/testTitle/)
    const author = await screen.findByText(/testAuthor/)
    expect(title).not.toHaveStyle('display: none')
    expect(author).not.toHaveStyle('display: none')

    const div = container.querySelector('.hiddenContent')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('testURL')
    expect(div).toHaveTextContent(0)
  })
})