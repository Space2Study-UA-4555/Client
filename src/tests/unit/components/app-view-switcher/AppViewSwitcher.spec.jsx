import { fireEvent, render, screen } from '@testing-library/react'

import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import { ViewModeEnum } from '~/types'

const onChange = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

const renderSwitcher = (activeView = ViewModeEnum.Inline) =>
  render(<AppViewSwitcher activeView={activeView} onChange={onChange} />)

describe('AppViewSwitcher component', () => {
  it('renders both view buttons', () => {
    renderSwitcher()

    expect(screen.getByTestId('inline-view-button')).toBeInTheDocument()
    expect(screen.getByTestId('grid-view-button')).toBeInTheDocument()
  })

  it('calls onChange with grid mode on grid button click', () => {
    renderSwitcher(ViewModeEnum.Inline)

    fireEvent.click(screen.getByTestId('grid-view-button'))

    expect(onChange).toHaveBeenCalledWith(ViewModeEnum.Grid)
  })

  it('calls onChange with inline mode on inline button click', () => {
    renderSwitcher(ViewModeEnum.Grid)

    fireEvent.click(screen.getByTestId('inline-view-button'))

    expect(onChange).toHaveBeenCalledWith(ViewModeEnum.Inline)
  })

  it('marks the active view button as pressed', () => {
    renderSwitcher(ViewModeEnum.Grid)

    expect(screen.getByTestId('grid-view-button')).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByTestId('inline-view-button')).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })
})
