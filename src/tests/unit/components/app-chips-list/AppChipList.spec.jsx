import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import AppChipList from '~/components/app-chips-list/AppChipList'

describe('AppChipList component', () => {
  it('should render chips list', () => {
    const mockedItems = ['React', 'Node', 'MongoDB']
    const mockedDefaultQuantity = 3
    render(
      <AppChipList
        defaultQuantity={mockedDefaultQuantity}
        items={mockedItems}
      />
    )

    const reactChip = screen.getByText('React')
    const nodeChip = screen.getByText('Node')
    const mongoChip = screen.getByText('MongoDB')

    const chips = screen.getAllByTestId('chip')

    expect(reactChip).toBeInTheDocument()
    expect(nodeChip).toBeInTheDocument()
    expect(mongoChip).toBeInTheDocument()
    expect(chips).toHaveLength(mockedItems.length)
  })
  it('should show only 7 chips when defaultQuantity is 7', () => {
    const mockedItems = [
      'React',
      'Node',
      'MongoDB',
      'TypeScript',
      'JavaScript',
      'Vitest',
      'Git',
      'Docker'
    ]
    const mockedDefaultQuantity = 7
    render(
      <AppChipList
        defaultQuantity={mockedDefaultQuantity}
        items={mockedItems}
      />
    )

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(7)
    expect(screen.queryByText('Docker')).not.toBeInTheDocument()
  })
  it('should show only 10 chips when defaultQuantity is 10', () => {
    const mockedItems = [
      'React',
      'Node',
      'MongoDB',
      'TypeScript',
      'JavaScript',
      'Vitest',
      'Git',
      'Docker',
      'SonarCloud',
      'Swagger',
      'Linter'
    ]
    const mockedDefaultQuantity = 10
    render(
      <AppChipList
        defaultQuantity={mockedDefaultQuantity}
        items={mockedItems}
      />
    )

    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(10)
    expect(screen.queryByText('Linter')).not.toBeInTheDocument()
  })
  it('should show chip with +3', () => {
    const mockedItems = [
      'React',
      'Node',
      'MongoDB',
      'TypeScript',
      'Git',
      'Docker',
      'SonarCloud',
      'Swagger'
    ]
    const mockedDefaultQuantity = 5
    render(
      <AppChipList
        defaultQuantity={mockedDefaultQuantity}
        items={mockedItems}
      />
    )
    const hiddenChipsLabel = screen.getByText('+3')
    expect(hiddenChipsLabel).toBeInTheDocument()
  })
  it('should call delete handler when chip is deleted', () => {
    const mockedItems = ['React']
    const mockedDefaultQuantity = 1
    const mockedHandleChipDelete = vi.fn()
    render(
      <AppChipList
        defaultQuantity={mockedDefaultQuantity}
        handleChipDelete={mockedHandleChipDelete}
        items={mockedItems}
      />
    )
    const deleteButton = screen.getByTestId('close-btn')
    fireEvent.click(deleteButton)
    expect(mockedHandleChipDelete).toHaveBeenCalledWith('React')
  })
})
