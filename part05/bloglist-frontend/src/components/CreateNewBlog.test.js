import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlog from './CreateNewBlog'

describe('CreateNewBlog', () => {
  test('creating a new blog', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<CreateNewBlog
      createNewBlogRef={{ current: { toggleVisibility: () => { } } }}
      setBlogs={mockHandler}
      blogs={[]}
      setNotification={() => { }}
    />)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const submitButton = container.querySelector('#submitButton')

    screen.debug(submitButton)

    await user.type(title, 'testTitle')
    await user.type(author, 'testAuthor')
    await user.type(url, 'testURL')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    const parameters = mockHandler.mock.calls[0][0].content

    expect(parameters[0].title).toMatch(/testTitle/)
    expect(parameters[0].author).toMatch(/testAuthor/)
    expect(parameters[0].url).toMatch(/testURL/)
  })
})