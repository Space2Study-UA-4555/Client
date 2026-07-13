import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Provider } from 'react-redux'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'

// ---------------- MOCK TRANSLATION ----------------
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

// ---------------- MOCK REDUX ----------------
vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn(() => ({
    userId: 'test-user',
    userRole: 'tutor'
  }))
}))

const fakeStore = {
  getState: () => ({
    appMain: {
      userId: 'test-user',
      userRole: 'tutor'
    }
  }),
  subscribe: () => {},
  dispatch: () => {}
}

// ---------------- MOCK StepContext ----------------
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn()
}))
import { useStepContext } from '~/context/step-context'

const mockHandleStepData = vi.fn()

useStepContext.mockReturnValue({
  stepData: {},
  handleStepData: mockHandleStepData
})

// ---------------- MOCK AsyncAutocomplete ----------------
vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  __esModule: true,
  default: ({ textFieldProps }) => (
    <div data-testid={textFieldProps.label}></div>
  )
}))

// ---------------- MOCK useForm ----------------
vi.mock('~/hooks/use-form', () => ({
  useForm: vi.fn(() => ({
    data: {
      firstName: '',
      lastName: '',
      country: null,
      countryCode: null,
      state: null,
      stateCode: null,
      city: null,
      professionalSummary: ''
    },
    errors: {},
    handleBlur: vi.fn(() => vi.fn()),
    handleInputChange: vi.fn(() => vi.fn()),
    handleDataChange: vi.fn(),
    handleNonInputValueChange: vi.fn()
  }))
}))

// ---------------- MOCK useAxios ----------------
vi.mock('~/hooks/use-axios', () => ({
  default: vi.fn(() => ({
    fetchData: vi.fn(),
    loading: false,
    response: []
  }))
}))

// ---------------- RENDER ----------------
const renderStep = () =>
  render(
    <Provider store={fakeStore}>
      <GeneralInfoStep btnsBox={<button>Next</button>} />
    </Provider>
  )

// ---------------- TESTS ----------------
describe('GeneralInfoStep — stable unit tests', () => {
  it('renders title', () => {
    renderStep()
    expect(
      screen.getByText('becomeTutor.generalInfo.title')
    ).toBeInTheDocument()
  })

  it('renders first name and last name fields', () => {
    renderStep()
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(3)
  })

  it('calls handleStepData on mount', () => {
    renderStep()
    expect(mockHandleStepData).toHaveBeenCalled()
  })

  it('renders mocked AsyncAutocomplete components', () => {
    renderStep()
    expect(
      screen.getByTestId('becomeTutor.generalInfo.countryLabel')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('becomeTutor.generalInfo.stateLabel')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('becomeTutor.generalInfo.cityLabel')
    ).toBeInTheDocument()
  })
})
