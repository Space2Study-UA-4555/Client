import { fireEvent, render, screen } from '@testing-library/react'

import OfferSortMenu from '~/containers/find-offer/offer-sort-menu/OfferSortMenu'
import { SortByEnum } from '~/types'

const setSort = vi.fn()

const renderMenu = (sort = SortByEnum.Newest) =>
  render(<OfferSortMenu setSort={setSort} sort={sort} />)

describe('OfferSortMenu container', () => {
  it('renders the select with the sort title and current value', () => {
    renderMenu()

    expect(screen.getByText('common.labels.sortBy')).toBeInTheDocument()
    expect(screen.getByTestId('app-select').value).toBe(SortByEnum.Newest)
  })

  it('contains all four sorting options', () => {
    renderMenu()

    fireEvent.mouseDown(screen.getByRole('combobox'))

    const options = screen.getAllByRole('option')
    const optionLabels = options.map((option) => option.textContent)

    expect(optionLabels).toEqual([
      'findOffers.sortTitles.newest',
      'findOffers.sortTitles.rating',
      'findOffers.sortTitles.priceAsc',
      'findOffers.sortTitles.priceDesc'
    ])
  })

  it('calls setSort with the chosen option', () => {
    renderMenu()

    fireEvent.change(screen.getByTestId('app-select'), {
      target: { value: SortByEnum.PriceAsc }
    })

    expect(setSort).toHaveBeenCalledWith(SortByEnum.PriceAsc)
  })
})
