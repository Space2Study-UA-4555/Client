import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import FindOffers from '~/pages/find-offers/FindOffers'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')

categoryService.getCategoriesNames.mockResolvedValue({ data: [] })
subjectService.getSubjectsNames.mockResolvedValue({ data: [] })

const renderPage = (userRole) =>
  renderWithProviders(<FindOffers />, {
    preloadedState: { appMain: { userRole } }
  })

describe('FindOffers page', () => {
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
})
