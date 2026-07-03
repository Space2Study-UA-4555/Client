import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import { ViewModeEnum } from '~/types'

const createMockOffer = (id) => ({
  _id: id,
  title: `Offer ${id}`,
  description: 'Description',
  price: 75,
  proficiencyLevel: ['Beginner'],
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  author: {
    _id: `author-${id}`,
    firstName: 'Jennifer',
    lastName: 'Wilson',
    photo: '',
    totalReviews: { tutor: 10, student: 0 },
    averageRating: { tutor: 4.5, student: 0 }
  },
  subject: { _id: 'subject-1', name: 'German' }
})

const mockOffers = [createMockOffer('1'), createMockOffer('2')]
const onBookmarkClick = vi.fn()

const renderContainer = (viewMode) =>
  renderWithProviders(
    <OfferContainer
      offers={mockOffers}
      onBookmarkClick={onBookmarkClick}
      viewMode={viewMode}
    />
  )

describe('OfferContainer container', () => {
  it('renders square cards in grid mode', () => {
    renderContainer(ViewModeEnum.Grid)

    expect(screen.getAllByTestId('offer-card-square')).toHaveLength(2)
    expect(screen.queryByTestId('offer-card')).not.toBeInTheDocument()
  })

  it('renders inline cards in inline mode', () => {
    renderContainer(ViewModeEnum.Inline)

    expect(screen.getAllByTestId('offer-card')).toHaveLength(2)
    expect(screen.queryByTestId('offer-card-square')).not.toBeInTheDocument()
  })

  it('renders a card per offer', () => {
    renderContainer(ViewModeEnum.Inline)

    expect(screen.getByText('Offer 1')).toBeInTheDocument()
    expect(screen.getByText('Offer 2')).toBeInTheDocument()
  })
})
