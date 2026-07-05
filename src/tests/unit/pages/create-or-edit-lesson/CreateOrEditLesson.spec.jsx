import { fireEvent, screen, waitFor } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'

describe('CreateOrEditLesson create flow', () => {
  beforeEach(async () => {
    mockAxiosClient.onPost(URLs.resources.lessons.post).reply(201, {})
    await waitFor(() => renderWithProviders(<CreateOrEditLesson />))
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render the lesson form', () => {
    const title = screen.getByLabelText('lesson.labels.title')
    const description = screen.getByLabelText('lesson.labels.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should create a lesson on save with valid data', async () => {
    fireEvent.change(screen.getByLabelText('lesson.labels.title'), {
      target: { value: 'My lesson' }
    })
    fireEvent.change(screen.getByLabelText('lesson.labels.description'), {
      target: { value: 'My description' }
    })

    fireEvent.click(screen.getByText('common.save'))

    await waitFor(() => {
      expect(mockAxiosClient.history.post).toHaveLength(1)
    })
    expect(mockAxiosClient.history.post[0].url).toBe(
      URLs.resources.lessons.post
    )
  })

  it('should point Cancel to my-resources', () => {
    const cancel = screen.getByText('common.cancel').closest('a')

    expect(cancel).toHaveAttribute('href', '/my-resources')
  })
})

describe('CreateOrEditLesson edit flow', () => {
  const lessonId = '64fb2c33eba89699411d22bb'
  const categoryMock = { _id: '64fb2c33eba89699411d2200', name: 'Mathematics' }
  const lessonMock = {
    _id: lessonId,
    title: 'Existing lesson',
    description: 'Existing description',
    content: '',
    attachments: [],
    category: categoryMock
  }

  beforeEach(async () => {
    mockAxiosClient
      .onGet(createUrlPath(URLs.resources.lessons.get, lessonId))
      .reply(200, lessonMock)
    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.getNames)
      .reply(200, [categoryMock])
    mockAxiosClient
      .onPatch(createUrlPath(URLs.resources.lessons.patch, lessonId))
      .reply(200, {})

    await waitFor(() =>
      renderWithProviders(
        <Routes>
          <Route
            element={<CreateOrEditLesson />}
            path={'/my-resources/edit-lesson/:id'}
          />
        </Routes>,
        { initialEntries: `/my-resources/edit-lesson/${lessonId}` }
      )
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should prefill the form with the existing lesson', async () => {
    const title = await screen.findByDisplayValue('Existing lesson')
    const description = await screen.findByDisplayValue('Existing description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should prefill the category dropdown with the lesson category', async () => {
    const category = await screen.findByDisplayValue('Mathematics')

    expect(category).toBeInTheDocument()
  })

  it('should update the lesson on save', async () => {
    await screen.findByDisplayValue('Existing lesson')

    fireEvent.click(screen.getByText('common.save'))

    await waitFor(() => {
      expect(mockAxiosClient.history.patch).toHaveLength(1)
    })
    expect(mockAxiosClient.history.patch[0].url).toBe(
      createUrlPath(URLs.resources.lessons.patch, lessonId)
    )
  })
})
