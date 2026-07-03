import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import OfferCard from '~/components/offer-card/OfferCard'

const mockOffer = {
  _id: 'offer-1',
  title: 'Advanced Quantum Mechanics',
  description: 'Hello. There are many variations of passages of Lorem Ipsum',
  price: 75,
  proficiencyLevel: ['Beginner', 'Advanced'],
  languages: ['Ukrainian', 'English'],
  authorRole: 'tutor',
  author: {
    _id: 'author-1',
    firstName: 'Jennifer',
    lastName: 'Wilson',
    photo: '',
    totalReviews: { tutor: 10, student: 0 },
    averageRating: { tutor: 3.5, student: 0 }
  },
  subject: { _id: 'subject-1', name: 'German' }
}

const onBookmarkClick = vi.fn()
const onActionClick = vi.fn()

const buttonActions = [
  {
    label: 'common.labels.viewDetails',
    buttonProps: { onClick: onActionClick }
  },
  { label: 'common.labels.sendMessage', buttonProps: {} }
]

const renderCard = (props = {}) =>
  renderWithProviders(
    <OfferCard
      buttonActions={buttonActions}
      offer={mockOffer}
      onBookmarkClick={onBookmarkClick}
      {...props}
    />
  )

describe('OfferCard component', () => {
  it('renders all the offer info', () => {
    renderCard()

    expect(screen.getByText('Jennifer W.')).toBeInTheDocument()
    expect(screen.getByText('Advanced Quantum Mechanics')).toBeInTheDocument()
    expect(screen.getByText('75 common.uah')).toBeInTheDocument()
    expect(screen.getByText('/common.hour')).toBeInTheDocument()
    expect(screen.getByText('German')).toBeInTheDocument()
    expect(screen.getByText('Beginner - Advanced')).toBeInTheDocument()
    expect(screen.getByText('Ukrainian, English')).toBeInTheDocument()
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument()
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

    const detailsButton = screen.getByText('common.labels.viewDetails')
    fireEvent.click(detailsButton)

    expect(onActionClick).toHaveBeenCalled()
    expect(screen.getByText('common.labels.sendMessage')).toBeInTheDocument()
  })

  it('skips null button actions', () => {
    renderCard({
      buttonActions: [
        { label: 'common.labels.viewDetails', buttonProps: {} },
        null
      ]
    })

    expect(screen.getAllByRole('button').length).toBe(2) // details + bookmark
  })
})
