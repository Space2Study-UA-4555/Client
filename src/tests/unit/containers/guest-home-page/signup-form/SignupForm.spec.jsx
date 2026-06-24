import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { vi } from 'vitest'

const errors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const data = {
  firstName: 'Test',
  lastName: 'User',
  email: 'email@mail.com',
  password: 'passTest1',
  confirmPassword: 'passTest1'
}
const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()

describe('Signup form test', () => {
  const preloadedState = { appMain: { authLoading: false } }
  beforeEach(() => {
    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )
  })

  it('should render first name input label', () => {
    const inputLabel = screen.getByLabelText(/common.labels.firstName/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render last name input label', () => {
    const inputLabel = screen.getByLabelText(/common.labels.lastName/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render email input label', () => {
    const inputLabel = screen.getByLabelText(/common.labels.email/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render confirm password input label', () => {
    const inputLabel = screen.getByLabelText(/common.labels.confirmPassword/i)

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render agreement text with terms and privacy policy', () => {
    expect(screen.getByText('common.labels.terms')).toBeInTheDocument()
    expect(screen.getByText('common.labels.privacyPolicy')).toBeInTheDocument()
  })

  it('should render signup button', () => {
    const button = screen.getByText('common.labels.signup')

    expect(button).toBeInTheDocument()
  })

  it('should keep signup button disabled until agreement is checked', () => {
    const button = screen.getByText('common.labels.signup').closest('button')
    expect(button).toBeDisabled()

    const checkbox = screen.getByTestId('agreement')
    fireEvent.click(checkbox)

    expect(button).toBeEnabled()
  })

  it('should toggle password visibility icon', async () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcons[0])

    await waitFor(() => {
      expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument()
    })
  })

  it('should submit', () => {
    handleSubmit.mockImplementation((event) => {
      event.preventDefault()
    })
    const checkbox = screen.getByTestId('agreement')
    fireEvent.click(checkbox)

    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })
})

describe('Signup form test with loading', () => {
  const preloadedState = { appMain: { authLoading: true } }
  it('should render loader', () => {
    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
