import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const switchOptions = {
  left: { text: 'Tutors offers', tooltip: 'See tutors offers' },
  right: { text: 'Students requests', tooltip: 'See students requests' }
}

const renderSwitcher = (props = {}) => {
  const onChange = vi.fn()
  render(
    <AppContentSwitcher
      active={false}
      onChange={onChange}
      switchOptions={switchOptions}
      typographyVariant='body1'
      {...props}
    />
  )
  return { onChange }
}

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    renderSwitcher()

    expect(screen.getByText(switchOptions.left.text)).toBeInTheDocument()
    expect(screen.getByText(switchOptions.right.text)).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    const { onChange } = renderSwitcher()

    fireEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    renderSwitcher()

    fireEvent.mouseOver(screen.getByText(switchOptions.left.text))

    expect(
      await screen.findByText(switchOptions.left.tooltip)
    ).toBeInTheDocument()
  })

  it('should reflect the active prop on the switch checked state', () => {
    renderSwitcher({ active: true })

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should not render a block when its options are not provided', () => {
    renderSwitcher({ switchOptions: { left: switchOptions.left } })

    expect(screen.getByText(switchOptions.left.text)).toBeInTheDocument()
    expect(screen.queryByText(switchOptions.right.text)).not.toBeInTheDocument()
  })
})
