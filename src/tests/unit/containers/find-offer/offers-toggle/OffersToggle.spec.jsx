import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { renderWithProviders } from '~tests/test-utils'
import OffersToggle from '~/containers/find-offer/offers-toggle/OffersToggle'

const renderToggle = (props = {}) => {
  const setIsTutorsOffers = vi.fn()
  renderWithProviders(
    <OffersToggle
      isTutorsOffers
      setIsTutorsOffers={setIsTutorsOffers}
      {...props}
    />
  )
  return { setIsTutorsOffers }
}

describe('OffersToggle', () => {
  it('renders both switch labels', () => {
    renderToggle()

    expect(
      screen.getByText('findOffers.topMenu.tutorsOffers')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.topMenu.studentsRequests')
    ).toBeInTheDocument()
  })

  it('keeps the switch off when tutors offers are selected', () => {
    renderToggle({ isTutorsOffers: true })

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('turns the switch on when students requests are selected', () => {
    renderToggle({ isTutorsOffers: false })

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls setIsTutorsOffers with the negated value on change', () => {
    const { setIsTutorsOffers } = renderToggle({ isTutorsOffers: true })

    fireEvent.click(screen.getByRole('checkbox'))

    expect(setIsTutorsOffers).toHaveBeenCalledWith(false)
  })
})
