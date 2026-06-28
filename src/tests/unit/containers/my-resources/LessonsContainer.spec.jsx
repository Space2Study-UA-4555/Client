import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'

import { URLs } from '~/constants/request'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

const lessonMock = {
  _id: '64fb2c33eba89699411d22bb',
  title: 'First Lesson',
  description: 'Lesson description',
  content: '',
  attachments: [],
  category: null,
  author: '648afee884936e09a37deaaa',
  createdAt: '2023-09-08T14:14:11.373Z',
  updatedAt: '2023-09-08T14:14:11.373Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...lessonMock,
    _id: `${index}`,
    title: index + lessonMock.title
  }))

const lessonResponseMock = {
  count: 10,
  items: responseItemsMock
}

const responseItemsMockCategory = Array(10)
  .fill()
  .map((_, index) => ({
    ...lessonMock,
    category: { _id: '64fb2c33eba89699411d22bb', name: 'New Category' },
    _id: `${index}`,
    title: index + lessonMock.title
  }))

const lessonResponseMockCategory = {
  count: 10,
  items: responseItemsMockCategory
}

describe('LessonsContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMock)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New lesson" button', () => {
    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')

    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with lessons', async () => {
    const columnLabel = await screen.findByText('myResourcesPage.lessons.title')
    const lessonTitle = await screen.findByText(responseItemsMock[5].title)

    expect(columnLabel).toBeInTheDocument()
    expect(lessonTitle).toBeInTheDocument()
  })
})

describe('LessonsContainer search test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMock)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should send title param when searching by lesson name', async () => {
    vi.useFakeTimers()

    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.change(searchInput, { target: { value: 'First' } })

    await act(async () => {
      vi.runAllTimers()
    })
    vi.useRealTimers()

    await waitFor(() => {
      const requests = mockAxiosClient.history.get
      const lastRequest = requests[requests.length - 1]
      expect(lastRequest.params.title).toBe('First')
    })
  })
})

describe('LessonsContainer category test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMockCategory)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render correct category', async () => {
    const category = await screen.findByText(
      'myResourcesPage.categories.category'
    )

    expect(category).toBeInTheDocument()
  })
})

describe('LessonsContainer delete test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMock)
      mockAxiosClient.onDelete(/\/lessons\/.*/).reply(204)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should delete a lesson after confirmation', async () => {
    const menuIcon = (await screen.findAllByTestId('menu-icon'))[0]
    fireEvent.click(menuIcon)

    const deleteAction = await screen.findByText('common.delete')
    fireEvent.click(deleteAction)

    const confirmTitle = await screen.findByText(
      'myResourcesPage.lessons.confirmDeletionTitle'
    )
    expect(confirmTitle).toBeInTheDocument()

    const confirmButton = screen.getByText('common.yes')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockAxiosClient.history.delete).toHaveLength(1)
    })
    expect(mockAxiosClient.history.delete[0].url).toContain('/lessons/')
  })
})
