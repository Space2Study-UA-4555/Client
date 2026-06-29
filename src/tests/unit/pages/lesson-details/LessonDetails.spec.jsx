import { screen, waitFor } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import LessonDetails from '~/pages/lesson-details/LessonDetails'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'

const lessonId = '64fb2c33eba89699411d22bb'
const lessonMock = {
  _id: lessonId,
  title: 'Quantum Mechanics',
  description: 'A detailed lesson description',
  content: '<p>Rich content paragraph</p>',
  attachments: [],
  category: null,
  author: '648afee884936e09a37deaaa',
  createdAt: '2023-09-08T14:14:11.373Z',
  updatedAt: '2023-09-08T14:14:11.373Z'
}

describe('LessonDetails test', () => {
  beforeEach(async () => {
    mockAxiosClient
      .onGet(createUrlPath(URLs.resources.lessons.get, lessonId))
      .reply(200, lessonMock)

    await waitFor(() =>
      renderWithProviders(
        <Routes>
          <Route
            element={<LessonDetails />}
            path={'/my-resources/lesson/:id'}
          />
        </Routes>,
        { initialEntries: `/my-resources/lesson/${lessonId}` }
      )
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render the lesson title and description', async () => {
    const title = await screen.findByText('Quantum Mechanics')
    const description = await screen.findByText('A detailed lesson description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render the rich content', async () => {
    const content = await screen.findByText('Rich content paragraph')

    expect(content).toBeInTheDocument()
  })

  it('should point Edit button to the edit-lesson route', async () => {
    await screen.findByText('Quantum Mechanics')

    const editLink = screen.getByText('common.edit').closest('a')

    expect(editLink).toHaveAttribute(
      'href',
      `/my-resources/edit-lesson/${lessonId}`
    )
  })
})

describe('LessonDetails content sanitization test', () => {
  let container

  const maliciousMock = {
    ...lessonMock,
    content:
      '<p>Safe text</p><img src="x" onerror="alert(1)"><script>alert(2)</script>'
  }

  beforeEach(async () => {
    mockAxiosClient
      .onGet(createUrlPath(URLs.resources.lessons.get, lessonId))
      .reply(200, maliciousMock)

    await waitFor(() => {
      const rendered = renderWithProviders(
        <Routes>
          <Route
            element={<LessonDetails />}
            path={'/my-resources/lesson/:id'}
          />
        </Routes>,
        { initialEntries: `/my-resources/lesson/${lessonId}` }
      )
      container = rendered.container
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should strip dangerous markup before rendering content', async () => {
    await screen.findByText('Safe text')

    expect(container.querySelector('script')).not.toBeInTheDocument()
    expect(container.querySelector('img[onerror]')).not.toBeInTheDocument()
  })
})
