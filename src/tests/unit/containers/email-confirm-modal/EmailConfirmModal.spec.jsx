import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'

const closeModal = vi.fn()
const openModal = vi.fn()

const props = {
  confirmToken: 'test',
  closeModal: closeModal,
  openModal: openModal
}

vi.mock('~/hooks/use-axios')

const renderWithAxios = (fakeData) => {
  useAxios.mockImplementation(() => fakeData)
  renderWithProviders(<EmailConfirmModal {...props} />)
}

const expectRejectScenario = (title, description) => {
  expect(screen.getByAltText('info')).toBeInTheDocument()
  expect(screen.getByText(title)).toBeInTheDocument()
  expect(screen.getByText(description)).toBeInTheDocument()
}

describe('EmailConfirmModal test', () => {
  it('should render negative-scenario image and message (BAD_CONFIRM_TOKEN)', () => {
    renderWithAxios({
      error: { code: 'BAD_CONFIRM_TOKEN' },
      loading: false,
      response: null
    })

    expectRejectScenario(
      'modals.emailNotConfirm',
      'modals.emailReject.badToken'
    )
  })

  it('should render negative-scenario image and message (EMAIL_ALREADY_CONFIRMED)', () => {
    renderWithAxios({
      error: { code: 'EMAIL_ALREADY_CONFIRMED' },
      loading: false,
      response: null
    })

    expectRejectScenario(
      'modals.emailAlreadyConfirm',
      'modals.emailReject.alreadyConfirmed'
    )
  })

  it('should render success message and open login on button click', () => {
    renderWithAxios({ error: null, loading: false, response: '' })

    const title = screen.getByText('modals.emailConfirm')
    const button = screen.getByText('modals.goToLogin')

    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(openModal).toHaveBeenCalledTimes(1)
  })

  it('should render reject on transport failure (no error, no response)', () => {
    renderWithAxios({ error: null, loading: false, response: null })

    expect(screen.getByText('modals.emailNotConfirm')).toBeInTheDocument()
    expect(screen.queryByText('modals.emailConfirm')).not.toBeInTheDocument()
  })

  it('should render Loader - (loading from useAxios)', () => {
    renderWithAxios({ error: null, loading: true, response: null })

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
