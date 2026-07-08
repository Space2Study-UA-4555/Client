import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Categories from '~/pages/categories/Categories'
import { URLs } from '~/constants/request'
import { renderWithProviders, mockAxiosClient } from '~/tests/test-utils'

const categories = [
  {
    _id: '686500000000000000000001',
    name: 'Frontend',
    appearance: {
      icon: 'https://placehold.co/64x64',
      color: '#66C42C'
    },
    totalOffers: {
      student: 0,
      tutor: 1
    },
    createdAt: '2026-07-01T00:00:00.000Z',
    updatedAt: '2026-07-01T00:00:00.000Z'
  },
  {
    _id: '686500000000000000000002',
    name: 'Backend',
    appearance: {
      icon: 'https://placehold.co/64x64',
      color: '#5C9DED'
    },
    totalOffers: {
      student: 0,
      tutor: 2
    },
    createdAt: '2026-07-01T00:00:00.000Z',
    updatedAt: '2026-07-01T00:00:00.000Z'
  }
]

const categoriesResponse = {
  count: 2,
  items: categories
}

const filteredCategoriesResponse = {
  count: 1,
  items: [categories[0]]
}

const categoriesNames = categories.map(({ _id, name }) => ({ _id, name }))

describe('Categories page', () => {
  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render title, description and search input', async () => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, categoriesResponse)

    renderWithProviders(<Categories />)

    expect(screen.getByText('categoriesPage.title')).toBeInTheDocument()
    expect(screen.getByText('categoriesPage.description')).toBeInTheDocument()
    expect(
      screen.getByLabelText('categoriesPage.searchLabel')
    ).toBeInTheDocument()

    expect(await screen.findByText('Frontend')).toBeInTheDocument()
  })

  it('should load category names on search input focus', async () => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, categoriesResponse)
    mockAxiosClient.onGet(URLs.categories.getNames).reply(200, categoriesNames)

    renderWithProviders(<Categories />)

    const searchInput = screen.getByLabelText('categoriesPage.searchLabel')

    fireEvent.focus(searchInput)

    await waitFor(() => {
      expect(
        mockAxiosClient.history.get.some(
          (request) => request.url === URLs.categories.getNames
        )
      ).toBe(true)
    })
  })

  it('should search categories by name after Search button click', async () => {
    mockAxiosClient
      .onGet(URLs.categories.get)
      .replyOnce(200, categoriesResponse)
      .onGet(URLs.categories.get)
      .replyOnce(200, filteredCategoriesResponse)

    renderWithProviders(<Categories />)

    expect(await screen.findByText('Frontend')).toBeInTheDocument()
    expect(await screen.findByText('Backend')).toBeInTheDocument()

    const searchInput = screen.getByLabelText('categoriesPage.searchLabel')

    await userEvent.type(searchInput, 'Front')
    await userEvent.click(screen.getByRole('button', { name: 'common.search' }))

    await waitFor(() => {
      expect(mockAxiosClient.history.get.at(-1).params).toEqual(
        expect.objectContaining({
          name: 'Front'
        })
      )
    })
  })

  it('should search categories by name after Enter press', async () => {
    mockAxiosClient
      .onGet(URLs.categories.get)
      .replyOnce(200, categoriesResponse)
      .onGet(URLs.categories.get)
      .replyOnce(200, filteredCategoriesResponse)

    renderWithProviders(<Categories />)

    const searchInput = screen.getByLabelText('categoriesPage.searchLabel')

    expect(await screen.findByText('Frontend')).toBeInTheDocument()

    await userEvent.type(searchInput, 'Front')
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(mockAxiosClient.history.get.at(-1).params).toEqual(
        expect.objectContaining({
          name: 'Front'
        })
      )
    })
  })
})
