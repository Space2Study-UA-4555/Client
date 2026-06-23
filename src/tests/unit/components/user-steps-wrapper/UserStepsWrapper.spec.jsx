import { vi } from 'vitest'

import { renderWithProviders } from '~/tests/test-utils'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

const setNeedConfirmation = vi.fn()

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({ setNeedConfirmation })
}))

describe('UserStepsWrapper test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should enable close confirmation for stepper', () => {
    renderWithProviders(<UserStepsWrapper userRole='tutor' />)

    expect(setNeedConfirmation).toHaveBeenCalledWith(true)
  })
})
