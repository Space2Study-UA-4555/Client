/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('SearchFilterInput', () => {
  const setup = (updateFilter = vi.fn()) => {
    render(
      <SearchFilterInput
        textFieldProps={{ placeholder: 'Search...' }}
        updateFilter={updateFilter}
      />
    )
    return { updateFilter }
  }

  it('should render text correctly', () => {
    setup()

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'common.search' })
    ).toBeInTheDocument()
  })

  it('should call setSearch when search icon is clicked', async () => {
    const user = userEvent.setup()
    const { updateFilter } = setup()

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'test query')

    const searchButton = screen.getByRole('button', { name: 'common.search' })
    await user.click(searchButton)

    expect(updateFilter).toHaveBeenCalledWith('test query')
  })

  it('should call setState with empty string when delete icon is clicked', async () => {
    const user = userEvent.setup()
    const { updateFilter } = setup()

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'test query')

    const clearIcon = screen.getByTestId('clearIcon')
    await user.click(clearIcon)

    expect(updateFilter).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })

  it('should call setSearch when enter is pressed', async () => {
    const user = userEvent.setup()
    const { updateFilter } = setup()

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'test query{Enter}')

    expect(updateFilter).toHaveBeenCalledWith('test query')
  })

  it('should have hidden class if search is empty', () => {
    setup()

    expect(screen.queryByTestId('clearIcon')).not.toBeInTheDocument()
  })

  it('should have visible class if search is not empty', async () => {
    const user = userEvent.setup()
    setup()

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'a')

    expect(screen.getByTestId('clearIcon')).toBeInTheDocument()
  })
})
