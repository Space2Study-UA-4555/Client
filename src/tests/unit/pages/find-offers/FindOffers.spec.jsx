import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import FindOffers from '~/pages/find-offers/FindOffers'

const renderPage = (userRole) =>
  renderWithProviders(<FindOffers />, {
    preloadedState: { appMain: { userRole } }
  })

describe('FindOffers page', () => {
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
})
