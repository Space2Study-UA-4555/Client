import { screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import FindOffers from '~/pages/find-offers/FindOffers'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'

vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')
vi.mock('~/services/offer-service')

const mockOffer = {
  _id: 'offer-1',
  title: 'Advanced Quantum Mechanics',
  description: 'Description',
  price: 75,
  proficiencyLevel: ['Beginner'],
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  author: {
    _id: 'author-1',
    firstName: 'Jennifer',
    lastName: 'Wilson',
    photo: '',
    totalReviews: { tutor: 10, student: 0 },
    averageRating: { tutor: 4.5, student: 0 }
  },
  subject: { _id: 'subject-1', name: 'German' }
}

categoryService.getCategoriesNames.mockResolvedValue({ data: [] })
categoryService.getCategories.mockResolvedValue({
  data: { items: [], count: 0 }
})
subjectService.getSubjectsNames.mockResolvedValue({ data: [] })
offerService.getOffers.mockResolvedValue({
  data: { items: [mockOffer], count: 1 }
})

const renderPage = (userRole) =>
  renderWithProviders(<FindOffers />, {
    preloadedState: { appMain: { userRole } }
  })

describe('FindOffers page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title with description', () => {
    renderPage('student')

    expect(
      screen.getByText('findOffers.titleWithDescription.title')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.titleWithDescription.description')
    ).toBeInTheDocument()
  })

  it('renders the back to all categories link', () => {
    renderPage('student')

    const link = screen.getByRole('link', {
      name: 'subjectsPage.subjects.backToAllCategories'
    })

    expect(link).toHaveAttribute('href', '/categories')
  })

  it('renders the search toolbar', () => {
    renderPage('student')

    expect(
      screen.getByPlaceholderText('findOffers.searchToolbar.label')
    ).toBeInTheDocument()
  })

  it('renders the tutor/student switcher', () => {
    renderPage('student')

    expect(
      screen.getByText('findOffers.topMenu.tutorsOffers')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.topMenu.studentsRequests')
    ).toBeInTheDocument()
  })

  it('selects tutors offers by default for a student', () => {
    renderPage('student')

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('selects students requests by default for a tutor', () => {
    renderPage('tutor')

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('toggles the selection on switch click', () => {
    renderPage('student')
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('renders the view switcher with inline mode active by default', () => {
    renderPage('student')

    expect(screen.getByTestId('inline-view-button')).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('activates grid mode on grid button click', () => {
    renderPage('student')

    fireEvent.click(screen.getByTestId('grid-view-button'))

    expect(screen.getByTestId('grid-view-button')).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('renders fetched offers as cards', async () => {
    renderPage('student')

    expect(await screen.findByTestId('offer-container')).toBeInTheDocument()
    expect(screen.getByText('Advanced Quantum Mechanics')).toBeInTheDocument()
  })

  it('switches cards to grid view', async () => {
    renderPage('student')

    await screen.findByTestId('offer-card')
    fireEvent.click(screen.getByTestId('grid-view-button'))

    expect(await screen.findByTestId('offer-card-square')).toBeInTheDocument()
  })

  it('requests offers with the opposite author role on toggle', async () => {
    renderPage('student')

    await screen.findByTestId('offer-container')
    fireEvent.click(screen.getByRole('checkbox'))

    await waitFor(() => {
      expect(offerService.getOffers).toHaveBeenLastCalledWith(
        expect.objectContaining({ authorRole: 'student' })
      )
    })
  })

  it('renders not found results for an empty response', async () => {
    offerService.getOffers.mockResolvedValueOnce({
      data: { items: [], count: 0 }
    })
    renderPage('student')

    expect(
      await screen.findByText('findOffers.notFound.description')
    ).toBeInTheDocument()
  })
})
