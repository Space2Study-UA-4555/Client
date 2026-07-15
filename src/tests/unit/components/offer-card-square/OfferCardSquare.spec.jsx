import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import OfferCardSquare from '~/components/offer-card-square/OfferCardSquare'

const mockOffer = {
  _id: 'offer-1',
  title: 'Advanced Quantum Mechanics',
  description: 'Hello. There are many variations of passages of Lorem Ipsum',
  price: 75,
  proficiencyLevel: ['Beginner', 'Professional'],
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  author: {
    _id: 'author-1',
    firstName: 'Jennifer',
    lastName: 'Wilsonsontelberg',
    photo: '',
    totalReviews: { tutor: 23, student: 0 },
    averageRating: { tutor: 5, student: 0 }
  },
  subject: { _id: 'subject-1', name: 'Ukrainian' }
}

const onBookmarkClick = vi.fn()
const onActionClick = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

const buttonActions = [
  {
    label: 'common.labels.viewDetails',
    buttonProps: { onClick: onActionClick }
  },
  { label: 'common.labels.sendMessage', buttonProps: {} }
]

const renderCard = (props = {}) =>
  renderWithProviders(
    <OfferCardSquare
      buttonActions={buttonActions}
      offer={mockOffer}
      onBookmarkClick={onBookmarkClick}
      {...props}
    />
  )

describe('OfferCardSquare component', () => {
  it('renders all the offer info', () => {
    renderCard()

    expect(screen.getByText('Jennifer Wilsonsontelberg')).toBeInTheDocument()
    expect(screen.getByText('Advanced Quantum Mechanics')).toBeInTheDocument()
    expect(screen.getByText('75 common.uah')).toBeInTheDocument()
    expect(screen.getByText('/common.hour')).toBeInTheDocument()
    expect(screen.getByText('common.labels.subject')).toBeInTheDocument()
    expect(screen.getByText('common.labels.level')).toBeInTheDocument()
    expect(screen.getByText('Beginner - Professional')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(
      screen.getByText('tutorProfilePage.reviews.reviewsCount')
    ).toBeInTheDocument()
  })

  it('links author name and avatar to the author profile', () => {
    renderCard()

    const links = screen.getAllByRole('link')
    const authorLinks = links.filter((link) =>
      link.getAttribute('href').includes('/user/author-1')
    )

    expect(authorLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('calls onBookmarkClick with the offer id', () => {
    renderCard()

    fireEvent.click(screen.getByTestId('bookmark-button'))

    expect(onBookmarkClick).toHaveBeenCalledWith('offer-1')
  })

  it('renders action buttons and handles clicks', () => {
    renderCard()

    fireEvent.click(screen.getByText('common.labels.viewDetails'))

    expect(onActionClick).toHaveBeenCalled()
    expect(screen.getByText('common.labels.sendMessage')).toBeInTheDocument()
  })
})
