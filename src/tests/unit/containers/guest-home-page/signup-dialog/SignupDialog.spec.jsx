import { screen, fireEvent, waitFor } from '@testing-library/react'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const mockSelector = vi.fn()
const unwrap = vi.fn().mockResolvedValue({ userId: '1', userEmail: 'a@a.com' })
const signUp = vi.fn().mockReturnValue({ unwrap })
const setNeedConfirmation = vi.fn()

const mockState = {
  appMain: { authLoading: false }
}

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: () => mockSelector.mockReturnValue(mockState)
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation })
  }
})

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useSignUpMutation: () => [signUp]
  }
})

const fillAndSubmitForm = () => {
  const values = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@mail.com',
    password: 'passTest1',
    confirmPassword: 'passTest1'
  }

  Object.entries(values).forEach(([field, value]) => {
    fireEvent.change(
      screen.getByLabelText(`common.labels.${field}`, { exact: false }),
      {
        target: { value }
      }
    )
  })

  fireEvent.click(screen.getByTestId('agreement'))
  fireEvent.click(screen.getByText('common.labels.signup'))
}

describe('Signup dialog test', () => {
  it('should render student head text by default', () => {
    renderWithProviders(<SignupDialog />)

    expect(screen.getByText('signup.head.student')).toBeInTheDocument()
  })

  it('should render tutor head text for tutor type', () => {
    renderWithProviders(<SignupDialog type='tutor' />)

    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })

  describe('with default render', () => {
    beforeEach(() => {
      renderWithProviders(<SignupDialog />)
    })

    it('should render signup img', () => {
      const img = screen.getByAltText(/signup/i)

      expect(img).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      expect(
        screen.getByLabelText(/common.labels.firstName/i)
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/common.labels.lastName/i)
      ).toBeInTheDocument()
      expect(screen.getByLabelText(/common.labels.email/i)).toBeInTheDocument()
      expect(
        screen.getByLabelText(/common.labels.password/i)
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/common.labels.confirmPassword/i)
      ).toBeInTheDocument()
    })

    it('should change first name value', () => {
      const input = screen.getByLabelText(/common.labels.firstName/i)
      fireEvent.change(input, { target: { value: 'John' } })

      expect(input.value).toBe('John')
    })

    it('should render disabled google login button', () => {
      const googleButton = screen.getByText('Google')

      expect(googleButton).toBeInTheDocument()
    })

    it('should require confirmation on close', () => {
      expect(setNeedConfirmation).toHaveBeenCalledWith(true)
    })

    it('should show empty field error on blur of empty first name', () => {
      const input = screen.getByLabelText(/common.labels.firstName/i)
      fireEvent.focusOut(input)

      expect(
        screen.getByText('common.errorMessages.emptyField')
      ).toBeInTheDocument()
    })

    it('should show email format error on blur of invalid email', () => {
      const input = screen.getByLabelText(/common.labels.email/i)
      fireEvent.change(input, { target: { value: 'invalid' } })
      fireEvent.focusOut(input)

      expect(
        screen.getByText('common.errorMessages.emailValid')
      ).toBeInTheDocument()
    })

    it('should sign up user after submitting filled form', async () => {
      fillAndSubmitForm()

      await waitFor(() => {
        expect(signUp).toHaveBeenCalledTimes(1)
      })
      expect(signUp).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@mail.com',
          password: 'passTest1',
          confirmPassword: 'passTest1',
          role: 'student'
        })
      )
    })

    it('should show email confirmation modal after successful signup', async () => {
      fillAndSubmitForm()

      await waitFor(() => {
        expect(screen.getByText('signup.confirmEmailTitle')).toBeInTheDocument()
      })
      expect(screen.getByText('common.confirmButton')).toBeInTheDocument()
    })
  })
})
