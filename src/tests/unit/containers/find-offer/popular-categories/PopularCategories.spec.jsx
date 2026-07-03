import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import PopularCategories from '~/containers/find-offer/popular-categories/PopularCategories'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

const mockCategories = [
  {
    _id: '1',
    name: 'Languages',
    appearance: { icon: 'icon-path', color: '#79B260' },
    totalOffers: { student: 100, tutor: 234 }
  },
  {
    _id: '2',
    name: 'Mathematics',
    appearance: { icon: 'icon-path', color: '#FBC22D' },
    totalOffers: { student: 50, tutor: 90 }
  }
]

categoryService.getCategories.mockResolvedValue({
  data: { items: mockCategories, count: 2 }
})

const renderBlock = (userRole = 'student') =>
  renderWithProviders(<PopularCategories />, {
    preloadedState: { appMain: { userRole } }
  })

describe('PopularCategories container', () => {
  it('renders the title and fetched category cards', async () => {
    renderBlock()

    expect(screen.getByText('common.popularCategories')).toBeInTheDocument()
    expect(await screen.findByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Mathematics')).toBeInTheDocument()
    expect(screen.getAllByTestId('category-card')).toHaveLength(2)
  })

  it('shows offers count for the opposite role', async () => {
    renderBlock('student')

    expect(
      await screen.findByText('234 categoriesPage.offers')
    ).toBeInTheDocument()
  })

  it('links category card to the subjects page of the category', async () => {
    renderBlock()

    const card = await screen.findByText('Languages')

    expect(card.closest('a')).toHaveAttribute(
      'href',
      '/categories/subjects?categoryId=1'
    )
  })

  it('renders the view all categories button with a link', async () => {
    renderBlock()

    await screen.findByText('Languages')
    const button = screen.getByText('findOffers.viewAllCategories')

    expect(button.closest('a')).toHaveAttribute('href', '/categories')
  })
})
