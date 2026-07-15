import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn(() => ({
    userId: 'test-user-id'
  }))
}))

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: vi.fn(() => ({
    setAlert: vi.fn()
  }))
}))

vi.mock('~/services/user-service', () => ({
  userService: {
    updateUser: vi.fn(() => Promise.resolve({ data: null }))
  }
}))

vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn()
}))

import { useStepContext } from '~/context/step-context'

const mockHandleStepData = vi.fn()

useStepContext.mockReturnValue({
  stepData: {},
  handleStepData: mockHandleStepData
})

describe('AddPhotoStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useStepContext.mockReturnValue({
      stepData: {},
      handleStepData: mockHandleStepData
    })
  })

  it('should render upload button and photo preview placeholder', () => {
    render(<AddPhotoStep btnsBox={<button>Next</button>} stepLabel='photo' />)

    expect(screen.getByText('becomeTutor.photo.button')).toBeInTheDocument()
    expect(screen.getAllByText('becomeTutor.photo.placeholder').length).toBe(2)
    expect(
      screen.getByText('becomeTutor.photo.description')
    ).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('should restore saved photo from step context', () => {
    useStepContext.mockReturnValue({
      stepData: {
        photo: [{ name: 'avatar.png', src: 'data:image/png;base64,abc' }]
      },
      handleStepData: mockHandleStepData
    })

    render(<AddPhotoStep btnsBox={<button>Next</button>} stepLabel='photo' />)

    expect(
      screen.getAllByAltText('becomeTutor.photo.imageAlt')[0]
    ).toHaveAttribute('src', 'data:image/png;base64,abc')
    expect(screen.getByText('avatar.png')).toBeInTheDocument()
  })
})
