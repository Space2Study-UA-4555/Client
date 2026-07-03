import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'

import { renderWithProviders } from '~tests/test-utils'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')

const mockCategories = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]
const mockSubjects = [
  { _id: '10', name: 'Subject 1' },
  { _id: '20', name: 'Subject 2' }
]

categoryService.getCategoriesNames.mockResolvedValue({ data: mockCategories })
subjectService.getSubjectsNames.mockResolvedValue({ data: mockSubjects })

const Harness = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <OfferSearchToolbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div data-testid='search-params'>{searchParams.toString()}</div>
    </>
  )
}

const renderToolbar = (initialEntries = '/') =>
  renderWithProviders(<Harness />, { initialEntries })

const selectOption = async (label, optionText) => {
  const input = screen.getByLabelText(label)
  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: 'ArrowDown' })
  const option = await screen.findByText(optionText)
  fireEvent.click(option)
}

describe('OfferSearchToolbar container', () => {
  it('renders category and subject autocompletes and search input', () => {
    renderToolbar()

    expect(screen.getByLabelText('breadCrumbs.category')).toBeInTheDocument()
    expect(screen.getByLabelText('breadCrumbs.subject')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('findOffers.searchToolbar.label')
    ).toBeInTheDocument()
    expect(screen.getByText('common.search')).toBeInTheDocument()
  })

  it('sets categoryId and resets subjectId on category select', async () => {
    renderToolbar('/?subjectId=10')

    await selectOption('breadCrumbs.category', 'Category 1')

    await waitFor(() => {
      const params = screen.getByTestId('search-params').textContent
      expect(params).toContain('categoryId=1')
      expect(params).not.toContain('subjectId')
    })
  })

  it('sets subjectId on subject select', async () => {
    renderToolbar()

    await selectOption('breadCrumbs.subject', 'Subject 1')

    await waitFor(() => {
      expect(screen.getByTestId('search-params').textContent).toContain(
        'subjectId=10'
      )
    })
  })

  it('sets search param on search button click', async () => {
    renderToolbar()

    const input = screen.getByPlaceholderText('findOffers.searchToolbar.label')
    fireEvent.change(input, { target: { value: 'John' } })
    fireEvent.click(screen.getByText('common.search'))

    await waitFor(() => {
      expect(screen.getByTestId('search-params').textContent).toContain(
        'search=John'
      )
    })
  })

  it('sets search param on enter press', async () => {
    renderToolbar()

    const input = screen.getByPlaceholderText('findOffers.searchToolbar.label')
    fireEvent.change(input, { target: { value: 'Jane' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    await waitFor(() => {
      expect(screen.getByTestId('search-params').textContent).toContain(
        'search=Jane'
      )
    })
  })
})
