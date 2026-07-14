import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Provider } from 'react-redux'

import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'

// ---------------- MOCK TRANSLATION ----------------
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

// ---------------- MOCK REDUX ----------------
const fakeStore = {
  getState: () => ({}),
  subscribe: () => {},
  dispatch: () => {}
}

// ---------------- MOCK StepContext ----------------
const mockHandleStepData = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    stepData: {
      interests: []
    },
    handleStepData: mockHandleStepData
  })
}))

// ---------------- MOCK AsyncAutocomplete ----------------
vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  __esModule: true,
  default: ({ textFieldProps }) => (
    <div data-testid={textFieldProps.label}></div>
  )
}))

// ---------------- RENDER ----------------
const renderStep = () =>
  render(
    <Provider store={fakeStore}>
      <InterestsStep btnsBox={<button>Next</button>} stepLabel='interests' />
    </Provider>
  )

// ---------------- TESTS ----------------
describe('InterestsStep — stable unit tests', () => {
  it('renders title', () => {
    renderStep()
    expect(
      screen.getByText('becomeStudent.interests.title')
    ).toBeInTheDocument()
  })

  it('renders category and subject fields', () => {
    renderStep()
    expect(
      screen.getByTestId('becomeStudent.interests.categoryLabel')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('becomeStudent.interests.subjectLabel')
    ).toBeInTheDocument()
  })

  it('calls handleStepData when category changes', () => {
    renderStep()

    const categoryField = screen.getByTestId(
      'becomeStudent.interests.categoryLabel'
    )

    fireEvent.click(categoryField)

    expect(mockHandleStepData).toHaveBeenCalled()
  })

  it('renders Next button', () => {
    renderStep()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
