import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import CategoryCard from '~/components/category-card/CategoryCard'

const props = {
  title: 'Languages',
  description: '234 offers',
  icon: 'path-to-icon',
  color: '#79B260',
  link: '/categories/subjects?categoryId=1'
}

describe('CategoryCard component', () => {
  it('renders title, description and icon', () => {
    renderWithProviders(<CategoryCard {...props} />)

    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('234 offers')).toBeInTheDocument()
    expect(screen.getByAltText('category icon')).toHaveAttribute(
      'src',
      'path-to-icon'
    )
  })

  it('links to the passed location', () => {
    renderWithProviders(<CategoryCard {...props} />)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/categories/subjects?categoryId=1'
    )
  })
})
