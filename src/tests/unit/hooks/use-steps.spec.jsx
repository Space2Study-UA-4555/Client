import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useSteps from '~/hooks/use-steps'

const mockFetchData = vi.fn()

vi.mock('~/hooks/use-axios', () => ({
  default: vi.fn(() => ({
    loading: false,
    fetchData: mockFetchData
  }))
}))

vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn()
}))

vi.mock('~/context/modal-context', () => ({
  useModalContext: vi.fn(() => ({ closeModal: vi.fn() }))
}))

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: vi.fn(() => ({ setAlert: vi.fn() }))
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn(() => ({ userId: 'user-1' }))
}))

import { useStepContext } from '~/context/step-context'

const stepDataMock = {
  generalInfo: {
    data: {
      firstName: 'Local',
      lastName: 'Tutor',
      country: 'Ukraine',
      state: 'Kyiv Oblast',
      city: 'Kyiv',
      professionalSummary: 'qwerty'
    },
    errors: {}
  },
  subjects: [],
  language: 'English',
  photo: []
}

describe('useSteps custom hook', () => {
  beforeEach(() => {
    mockFetchData.mockClear()
    useStepContext.mockReturnValue({
      stepData: stepDataMock
    })
  })

  it('should send address.state in PATCH payload on Finish', () => {
    const { result } = renderHook(() =>
      useSteps({ steps: ['generalInfo', 'subjects', 'language', 'photo'] })
    )

    act(() => {
      result.current.stepOperation.handleSubmit()
    })

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.objectContaining({
        address: {
          country: 'Ukraine',
          state: 'Kyiv Oblast',
          city: 'Kyiv'
        }
      })
    )
  })

  it('should send empty state when state is not set', () => {
    useStepContext.mockReturnValue({
      stepData: {
        ...stepDataMock,
        generalInfo: {
          data: {
            ...stepDataMock.generalInfo.data,
            state: null
          },
          errors: {}
        }
      }
    })

    const { result } = renderHook(() =>
      useSteps({ steps: ['generalInfo', 'subjects', 'language', 'photo'] })
    )

    act(() => {
      result.current.stepOperation.handleSubmit()
    })

    expect(mockFetchData).toHaveBeenCalledWith(
      expect.objectContaining({
        address: expect.objectContaining({
          state: ''
        })
      })
    )
  })

  it('should not call updateUser when step has validation errors', () => {
    useStepContext.mockReturnValue({
      stepData: {
        ...stepDataMock,
        generalInfo: {
          data: stepDataMock.generalInfo.data,
          errors: { firstName: 'errorRequired' }
        }
      }
    })

    const { result } = renderHook(() =>
      useSteps({ steps: ['generalInfo', 'subjects', 'language', 'photo'] })
    )

    act(() => {
      result.current.stepOperation.handleSubmit()
    })

    expect(mockFetchData).not.toHaveBeenCalled()
  })
})
